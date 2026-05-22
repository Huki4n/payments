import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useDeleteGoalMutation, useGetGoalByIdQuery } from '@/entities/goal'
import { getApiErrorMessage } from '@/entities/session'
import { toast } from '@/shared/lib/toast'
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Separator,
} from '@/shared/ui'

import { EditGoalDepositForm } from './edit-goal-deposit-form'
import { EditGoalDetailsForm } from './edit-goal-details-form'
import { EditGoalWithdrawForm } from './edit-goal-withdraw-form'

export interface EditGoalDialogProps {
  goalId: number | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const EditGoalDialog = ({ goalId, open, onOpenChange }: EditGoalDialogProps) => {
  const { t } = useTranslation('home')
  const numericGoalId = goalId ?? 0

  const { data: goal, isLoading: isGoalLoading } = useGetGoalByIdQuery(numericGoalId, {
    skip: !open || goalId == null,
  })

  const [deleteGoal, { isLoading: isDeleting }] = useDeleteGoalMutation()
  const [rootError, setRootError] = useState<string | null>(null)

  const isBusy = isDeleting || isGoalLoading
  const formResetKey = open ? goalId : null

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      setRootError(null)
    }
    onOpenChange(next)
  }

  const onDelete = async () => {
    if (goalId == null) return
    if (!window.confirm(t('savingsPage.editGoal.deleteConfirm'))) return

    try {
      await deleteGoal(goalId).unwrap()
      toast.success(t('savingsPage.editGoal.success.deleted'))
      handleOpenChange(false)
    } catch (error) {
      const message = getApiErrorMessage(error, t('savingsPage.editGoal.errors.delete'))

      toast.error(message)
      setRootError(message)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className={'flex max-h-[min(90vh,640px)] max-w-lg flex-col gap-0 p-0 sm:max-w-xl'}
      >
        <DialogHeader className={'shrink-0 px-6 pt-6 pb-4 sm:px-8'}>
          <DialogTitle className={'font-display text-2xl font-bold text-brand-purple'}>
            {t('savingsPage.editGoal.title')}
          </DialogTitle>
          <DialogDescription>{t('savingsPage.editGoal.description')}</DialogDescription>
        </DialogHeader>

        <div className={'min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-1 pb-4 sm:px-7'}>
          <div className={'flex flex-col gap-5'}>
            <EditGoalDetailsForm
              goalId={goalId}
              goal={goal}
              open={open}
              disabled={isBusy}
              onRootError={setRootError}
            />

            <Separator />

            <div className={'flex flex-col gap-5'}>
              <EditGoalDepositForm goalId={goalId} disabled={isBusy} resetKey={formResetKey} />
              <EditGoalWithdrawForm goalId={goalId} disabled={isBusy} resetKey={formResetKey} />
            </div>
          </div>
        </div>

        <div className={'shrink-0 border-t px-6 py-4 sm:px-8'}>
          {rootError ? (
            <p className={'mb-3 text-center text-sm text-destructive'}>{rootError}</p>
          ) : null}
          <div className={'flex flex-col-reverse gap-2 sm:flex-row sm:justify-between'}>
            <Button
              type={'button'}
              variant={'destructive'}
              onClick={onDelete}
              disabled={isBusy}
              className={'font-display'}
            >
              {t('savingsPage.editGoal.delete')}
            </Button>
            <Button
              type={'button'}
              variant={'outline'}
              onClick={() => handleOpenChange(false)}
              disabled={isBusy}
              className={'font-display'}
            >
              {t('savingsPage.editGoal.close')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
