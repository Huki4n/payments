import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { useAddContributionMutation } from '@/entities/goal'
import { getApiErrorMessage } from '@/entities/session'
import { toast } from '@/shared/lib/toast'
import { Button, Input, Label } from '@/shared/ui'
import { cn } from '@/shared/ui/utils'

import { EDIT_GOAL_ACTION_BTN_CLASS } from '../config/form-ui'
import { parseGoalAmount } from '../lib/parse-goal-amount'

export interface EditGoalDepositFormProps {
  goalId: number | null
  disabled?: boolean
  resetKey?: number | null
}

export const EditGoalDepositForm = ({
  goalId,
  disabled = false,
  resetKey,
}: EditGoalDepositFormProps) => {
  const { t } = useTranslation('home')
  const [addContribution, { isLoading }] = useAddContributionMutation()

  const form = useForm<{ amount: string }>({
    defaultValues: { amount: '' },
    mode: 'onSubmit',
  })

  const isBusy = disabled || isLoading

  const onSubmit = form.handleSubmit(async ({ amount: raw }) => {
    if (goalId == null) return

    const amount = parseGoalAmount(raw)

    if (amount == null) {
      form.setError('amount', {
        message: t('savingsPage.editGoal.errors.invalidAmount'),
      })

      return
    }

    try {
      await addContribution({
        goalId,
        body: { amount, type: 'MANUAL' },
      }).unwrap()
      toast.success(t('savingsPage.editGoal.success.deposit'))
      form.reset({ amount: '' })
    } catch (error) {
      const message = getApiErrorMessage(error, t('savingsPage.editGoal.errors.contribution'))

      toast.error(message)
      form.setError('root', { message })
    }
  })

  return (
    <form
      key={`deposit-${resetKey ?? 'closed'}`}
      noValidate
      onSubmit={onSubmit}
      className={'flex flex-col gap-3'}
    >
      <h3 className={'font-display text-lg font-bold text-brand-purple'}>
        {t('savingsPage.editGoal.depositSection')}
      </h3>
      <div className={'grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr)_8.75rem] sm:items-end'}>
        <div className={'flex min-w-0 flex-col gap-2'}>
          <Label htmlFor={'edit-goal-deposit'}>{t('savingsPage.editGoal.amountLabel')}</Label>
          <Input
            id={'edit-goal-deposit'}
            type={'number'}
            min={0.01}
            step={0.01}
            inputMode={'decimal'}
            disabled={isBusy}
            placeholder={'0'}
            {...form.register('amount')}
            className={'font-display'}
          />
          {form.formState.errors.amount?.message ? (
            <p className={'text-sm text-destructive'}>{form.formState.errors.amount.message}</p>
          ) : null}
        </div>
        <Button
          type={'submit'}
          disabled={isBusy}
          className={cn(
            EDIT_GOAL_ACTION_BTN_CLASS,
            'bg-brand-purple-bg text-white hover:bg-brand-purple-bg/90'
          )}
        >
          {t('savingsPage.editGoal.deposit')}
        </Button>
      </div>
      {form.formState.errors.root?.message ? (
        <p className={'text-sm text-destructive'}>{form.formState.errors.root.message}</p>
      ) : null}
    </form>
  )
}
