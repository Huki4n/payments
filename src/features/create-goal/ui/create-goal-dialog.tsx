import { useTranslation } from 'react-i18next'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/shared/ui'

import { CreateGoalForm } from './create-goal-form'

export interface CreateGoalDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const CreateGoalDialog = ({ open, onOpenChange }: CreateGoalDialogProps) => {
  const { t } = useTranslation('home')

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={'max-w-md gap-0 overflow-hidden p-0 sm:max-w-lg'}>
        <DialogHeader className={'px-6 pt-6 pb-4 sm:px-8'}>
          <DialogTitle className={'font-display text-2xl font-bold text-brand-purple'}>
            {t('savingsPage.createGoal.title')}
          </DialogTitle>
          <DialogDescription className={'text-muted-foreground'}>
            {t('savingsPage.createGoal.description')}
          </DialogDescription>
        </DialogHeader>

        <CreateGoalForm
          onSuccess={() => onOpenChange(false)}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  )
}
