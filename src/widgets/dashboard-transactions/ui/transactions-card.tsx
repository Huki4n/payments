import { useTranslation } from 'react-i18next'

import { cn } from '@/shared/ui/utils'

import {
  earningsMock,
  spendsMock,
  type EarningMockRow,
  type SpendMockRow,
} from '../model/transactions-mock'
import { RecentEarningsColumn } from './recent-earnings-column'
import { RecentSpendsColumn } from './recent-spends-column'

export interface DashboardTransactionsCardProps {
  showSectionTitle?: boolean
  className?: string
  earningsRows?: readonly EarningMockRow[]
  spendsRows?: readonly SpendMockRow[]
  sectionTitle?: string
  earningsTitle?: string
  spendsTitle?: string
  addNewLabel?: string
}

export const DashboardTransactionsCard = ({
  showSectionTitle = true,
  className,
  earningsRows = earningsMock,
  spendsRows = spendsMock,
  sectionTitle,
  earningsTitle,
  spendsTitle,
  addNewLabel,
}: DashboardTransactionsCardProps) => {
  const { t } = useTranslation('home')
  const resolvedSectionTitle = sectionTitle ?? t('dashboard.transactionsTitle')
  const resolvedEarningsTitle = earningsTitle ?? t('dashboard.recentEarnings')
  const resolvedSpendsTitle = spendsTitle ?? t('dashboard.recentSpends')
  const resolvedAddNewLabel = addNewLabel ?? t('addData.manualForm.addNew')

  return (
    <section className={cn(className)}>
      {showSectionTitle ? (
        <h2
          className={
            'mb-4 text-center font-display text-base font-bold text-brand-purple sm:text-lg md:text-xl'
          }
        >
          {resolvedSectionTitle}
        </h2>
      ) : null}

      <div
        className={
          'grid gap-4 rounded-4xl bg-dashboard-card px-4 py-5 shadow-sm sm:grid-cols-2 sm:gap-5 sm:px-6 sm:py-6 pr-3 sm:pr-4'
        }
      >
        <RecentEarningsColumn
          title={resolvedEarningsTitle}
          rows={earningsRows}
          addNewLabel={resolvedAddNewLabel}
        />
        <RecentSpendsColumn
          title={resolvedSpendsTitle}
          rows={spendsRows}
          addNewLabel={resolvedAddNewLabel}
        />
      </div>
    </section>
  )
}
