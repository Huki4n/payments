import { DashboardSpendCategoryIcon } from '@/shared/ui/icons/category-icons'
import { cn } from '@/shared/ui/utils'

import type { SpendMockRow } from '../model/transactions-mock'

export interface RecentSpendRowProps {
  amount: string
  label: string
  icon: SpendMockRow['icon']
}

export const RecentSpendRow = ({ amount, label, icon }: RecentSpendRowProps) => {
  return (
    <li className={'flex items-center gap-3 rounded-2xl bg-card/95 px-3 py-2.5 shadow-sm'}>
      <span className={'min-w-26 shrink-0 rounded-lg bg-dashboard-expense-pill px-2.5 py-1.5 text-center font-display text-xs font-bold text-brand-purple sm:text-sm'}>
        {amount}
      </span>
      <DashboardSpendCategoryIcon
        name={icon}
        className={cn(
          'size-5 shrink-0 text-brand-purple/50',
          icon === 'gamepad' && 'text-brand-purple/60'
        )}
      />
      <span className={'min-w-0 flex-1 text-left font-display text-xs text-brand-purple sm:text-sm'}>
        {label}
      </span>
    </li>
  )
}
