import { useTranslation } from 'react-i18next'

import { formatGoalMoney } from '@/entities/goal'

interface SavingGoalStatsProps {
  goal: number
  total: number
  currency: string
}

export const SavingGoalStats = ({ goal, total, currency }: SavingGoalStatsProps) => {
  const { t } = useTranslation('home')

  return (
    <div className={'flex flex-col gap-1'}>
      <div className={'flex items-center justify-between gap-4'}>
        <span
          className={
            'min-w-0 font-display text-lg font-bold leading-none text-brand-purple sm:text-md md:text-lg'
          }
        >
          {t('dashboard.savingGoal')}
        </span>
        <span
          className={
            'inline-flex min-w-35 shrink-0 items-center justify-center min-h-10 px-4 py-2 font-display text-lg font-bold leading-none sm:px-6 sm:text-xl md:text-2xl'
          }
        >
          {formatGoalMoney(goal, currency)}
        </span>
      </div>
      <div className={'flex items-center justify-between gap-4'}>
        <span
          className={
            'min-w-0 font-display text-lg font-bold leading-none text-brand-purple sm:text-md md:text-lg'
          }
        >
          {t('dashboard.savingTotal')}
        </span>
        <span
          className={
            'inline-flex min-w-35 shrink-0 items-center justify-center min-h-10 rounded-2xl bg-dashboard-income-pill px-4 py-2 font-display text-lg font-bold leading-none text-brand-purple sm:px-6 sm:text-xl md:text-2xl'
          }
        >
          {formatGoalMoney(total, currency)}
        </span>
      </div>
    </div>
  )
}
