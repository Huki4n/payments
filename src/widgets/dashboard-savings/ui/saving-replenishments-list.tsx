import { useTranslation } from 'react-i18next'

import { formatContributionAmount, type SavingsSlide } from '@/entities/goal'

import { SavingReplenishmentRow } from './saving-replenishment-row'

interface SavingReplenishmentsListProps {
  slideId: string
  replenishments: SavingsSlide['replenishments']
  currency: string
}

export const SavingReplenishmentsList = ({
  slideId,
  replenishments,
  currency,
}: SavingReplenishmentsListProps) => {
  const { t } = useTranslation('home')

  return (
    <div>
      <p className={'mb-2 font-display text-xs font-medium text-brand-purple/80 sm:text-sm'}>
        {t('dashboard.savingsReplenishments')}
      </p>
      <ul className={'flex min-h-35 flex-col gap-2'}>
        {replenishments.map((r, idx) => (
          <SavingReplenishmentRow
            key={`${slideId}-${r.date}-${idx}`}
            date={r.date}
            amount={formatContributionAmount(r.amount, currency)}
            isWithdrawal={r.isWithdrawal}
          />
        ))}
      </ul>
    </div>
  )
}
