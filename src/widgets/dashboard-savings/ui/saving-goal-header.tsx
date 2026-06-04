import { useTranslation } from 'react-i18next'

import { formatIsoDateDisplay } from '@/shared/lib/date-utils'

interface SavingGoalHeaderProps {
  title: string
  deadline?: string
}

export const SavingGoalHeader = ({ title, deadline }: SavingGoalHeaderProps) => {
  const { t } = useTranslation('home')

  return (
    <div
      className={
        'flex shrink-0 flex-col gap-1 sm:flex-row items-center sm:justify-between sm:gap-4'
      }
    >
      <h2 className={'font-display text-base font-bold text-brand-purple sm:text-2xl md:text-3xl'}>
        {title}
      </h2>
      {deadline ? (
        <p
          className={
            'font-display text-sm font-bold leading-none text-brand-purple/80 sm:text-base md:text-lg'
          }
        >
          <span className={'text-brand-purple/60'}>{t('dashboard.savingDeadline')}</span>{' '}
          {formatIsoDateDisplay(deadline)}
        </p>
      ) : null}
    </div>
  )
}
