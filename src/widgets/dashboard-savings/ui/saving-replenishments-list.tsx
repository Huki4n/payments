import { useTranslation } from 'react-i18next'

import { formatContributionAmount, type SavingsSlide } from '@/entities/goal'
import { ScrollArea } from '@/shared/ui/scroll-area'

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
      <ScrollArea persistentScrollbarWhenOverflow className={'h-35 min-h-0 w-full pr-1 sm:h-37'}>
        <ul className={'flex flex-col gap-2 pr-2'}>
          {replenishments.map((r, idx) => (
            <SavingReplenishmentRow
              key={`${slideId}-${r.date}-${idx}`}
              date={r.date}
              amount={formatContributionAmount(r.amount, currency)}
              isWithdrawal={r.isWithdrawal}
            />
          ))}
        </ul>
      </ScrollArea>
    </div>
  )
}
