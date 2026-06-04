import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { getMinGoalDeadline, useUpdateGoalMutation, type GoalDetails } from '@/entities/goal'
import { getApiErrorMessage } from '@/entities/session'
import { GOAL_CURRENCIES, type GoalCurrency } from '@/shared/config/currencies'
import { toast } from '@/shared/lib/toast'
import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui'

import type { EditGoalFormValues } from '../model/edit-goal-form-values'

import { parseGoalAmount } from '../lib/parse-goal-amount'

export interface EditGoalDetailsFormProps {
  goalId: number | null
  goal: GoalDetails | undefined
  open: boolean
  disabled?: boolean
  onRootError?: (message: string | null) => void
}

export const EditGoalDetailsForm = ({
  goalId,
  goal,
  open,
  disabled = false,
  onRootError,
}: EditGoalDetailsFormProps) => {
  const { t } = useTranslation('home')
  const [updateGoal, { isLoading: isUpdating }] = useUpdateGoalMutation()

  const form = useForm<EditGoalFormValues>({
    defaultValues: {
      title: '',
      targetAmount: '',
      currency: 'USD',
      deadline: '',
    },
    mode: 'onSubmit',
  })

  useEffect(() => {
    if (!goal || !open) return
    form.reset({
      title: goal.title,
      targetAmount: String(goal.targetAmount),
      currency: goal.currency as GoalCurrency,
      deadline: goal.deadline,
    })
  }, [goal, open, form])

  useEffect(() => {
    onRootError?.(form.formState.errors.root?.message ?? null)
  }, [form.formState.errors.root?.message, onRootError])

  const placeholders = goal
    ? {
        title: goal.title,
        targetAmount: String(goal.targetAmount),
        deadline: goal.deadline,
      }
    : null

  const isBusy = disabled || isUpdating

  const onSubmit = form.handleSubmit(async values => {
    if (goalId == null) return

    const targetAmount = parseGoalAmount(values.targetAmount)

    if (targetAmount == null) {
      form.setError('targetAmount', {
        message: t('savingsPage.editGoal.errors.invalidAmount'),
      })

      return
    }

    try {
      await updateGoal({
        goalId,
        body: {
          title: values.title.trim(),
          targetAmount,
          currency: values.currency,
          deadline: values.deadline,
        },
      }).unwrap()
      toast.success(t('savingsPage.editGoal.success.saved'))
      form.clearErrors('root')
      onRootError?.(null)
    } catch (error) {
      const message = getApiErrorMessage(error, t('savingsPage.editGoal.errors.save'))

      toast.error(message)
      form.setError('root', { message })
      onRootError?.(message)
    }
  })

  return (
    <form noValidate onSubmit={onSubmit} className={'flex flex-col gap-4'}>
      <h3 className={'font-display text-lg font-bold text-brand-purple'}>
        {t('savingsPage.editGoal.goalSection')}
      </h3>

      <div className={'flex flex-col gap-2'}>
        <Label htmlFor={'edit-goal-title'}>{t('savingsPage.editGoal.titleLabel')}</Label>
        <Input
          id={'edit-goal-title'}
          disabled={isBusy}
          placeholder={placeholders?.title}
          {...form.register('title', {
            required: t('savingsPage.editGoal.errors.required'),
            maxLength: {
              value: 255,
              message: t('savingsPage.editGoal.errors.titleTooLong'),
            },
          })}
          className={'font-display'}
        />
        {form.formState.errors.title?.message ? (
          <p className={'text-sm text-destructive'}>{form.formState.errors.title.message}</p>
        ) : null}
      </div>

      <div className={'grid grid-cols-1 gap-4 sm:grid-cols-2'}>
        <div className={'flex flex-col gap-2'}>
          <Label htmlFor={'edit-goal-amount'}>{t('savingsPage.editGoal.amountLabel')}</Label>
          <Input
            id={'edit-goal-amount'}
            type={'number'}
            min={0.01}
            step={0.01}
            inputMode={'decimal'}
            disabled={isBusy}
            placeholder={placeholders?.targetAmount}
            {...form.register('targetAmount', {
              required: t('savingsPage.editGoal.errors.required'),
            })}
            className={'font-display'}
          />
          {form.formState.errors.targetAmount?.message ? (
            <p className={'text-sm text-destructive'}>
              {form.formState.errors.targetAmount.message}
            </p>
          ) : null}
        </div>

        <div className={'flex flex-col gap-2'}>
          <Label htmlFor={'edit-goal-currency'}>{t('savingsPage.editGoal.currencyLabel')}</Label>
          <Controller
            control={form.control}
            name={'currency'}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={field.onChange}
                disabled={isBusy}
              >
                <SelectTrigger
                  id={'edit-goal-currency'}
                  className={
                    'h-10 w-full font-display text-brand-purple dark:bg-input/30 dark:hover:bg-input/50'
                  }
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent
                  position={'popper'}
                  sideOffset={6}
                  className={
                    'min-w-(--radix-select-trigger-width) rounded-2xl border border-border/80 bg-card font-display text-brand-purple shadow-lg'
                  }
                >
                  {GOAL_CURRENCIES.map(code => (
                    <SelectItem
                      key={code}
                      value={code}
                      className={
                        'rounded-xl py-2.5 pr-8 pl-3 font-display text-sm text-brand-purple focus:bg-accent focus:text-accent-foreground'
                      }
                    >
                      {code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      <div className={'flex flex-col gap-2'}>
        <Label htmlFor={'edit-goal-deadline'}>{t('savingsPage.editGoal.deadlineLabel')}</Label>
        <Input
          id={'edit-goal-deadline'}
          type={'date'}
          min={getMinGoalDeadline()}
          disabled={isBusy}
          placeholder={placeholders?.deadline}
          {...form.register('deadline', {
            required: t('savingsPage.editGoal.errors.required'),
          })}
          className={'font-display'}
        />
        {form.formState.errors.deadline?.message ? (
          <p className={'text-sm text-destructive'}>{form.formState.errors.deadline.message}</p>
        ) : null}
      </div>

      <Button
        type={'submit'}
        disabled={isBusy}
        className={
          'h-10 bg-brand-purple-bg font-display font-bold text-white hover:bg-brand-purple-bg/90'
        }
      >
        {t('savingsPage.editGoal.save')}
      </Button>
    </form>
  )
}
