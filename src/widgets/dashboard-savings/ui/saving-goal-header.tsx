import { useTranslation } from 'react-i18next'

import { formatIsoDateDisplay, isDeadlinePassed } from '@/shared/lib/date-utils'
import { cn } from '@/shared/ui/utils'

interface SavingGoalHeaderProps {
  title: string
  deadline?: string
}

export const SavingGoalHeader = ({ title, deadline }: SavingGoalHeaderProps) => {
  const { t } = useTranslation('home')
  const isPeriodExpired = deadline ? isDeadlinePassed(deadline) : false

  return (
    <div
      className={
        'flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4'
      }
    >
      <h2 className={'font-display text-base font-bold text-brand-purple sm:text-2xl md:text-3xl'}>
        {title}
      </h2>
      {deadline ? (
        <div className={'flex flex-wrap items-center justify-start gap-2 sm:justify-end'}>
          <p
            className={cn(
              'font-display text-sm font-bold leading-none sm:text-base md:text-lg',
              isPeriodExpired ? 'text-destructive' : 'text-brand-purple/80'
            )}
          >
            <span className={isPeriodExpired ? 'text-destructive/80' : 'text-brand-purple/60'}>
              {t('dashboard.savingDeadline')}
            </span>{' '}
            {formatIsoDateDisplay(deadline)}
          </p>
          {isPeriodExpired ? (
            <span
              className={
                'rounded-lg bg-destructive/15 px-2 py-1 font-display text-[10px] font-bold uppercase tracking-wide text-destructive sm:text-xs'
              }
            >
              {t('dashboard.deadlineExpired')}
            </span>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
