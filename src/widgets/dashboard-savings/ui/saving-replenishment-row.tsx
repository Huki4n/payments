import { cn } from '@/shared/ui'

interface SavingReplenishmentRowProps {
  date: string
  amount: string
  isWithdrawal?: boolean
}

export const SavingReplenishmentRow = ({
  date,
  amount,
  isWithdrawal = false,
}: SavingReplenishmentRowProps) => {
  return (
    <li
      className={
        'flex items-center justify-between gap-2 rounded-xl bg-card/95 px-3 py-2 shadow-sm'
      }
    >
      <span className={'font-display text-xs text-brand-purple sm:text-sm'}>{date}</span>
      <span
        className={cn(
          'min-w-26 rounded-lg px-2 py-1 text-center font-display text-xs font-bold text-brand-purple sm:text-sm',
          isWithdrawal ? 'bg-dashboard-expense-pill' : 'bg-dashboard-income-pill'
        )}
      >
        {amount}
      </span>
    </li>
  )
}
