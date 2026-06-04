import type { DashboardSpendCategoryIcon } from '@/shared/ui/icons/category-icons'

export type EarningMockRow = {
  id: string
  amount: string
  label: string
}

export type SpendMockRow = {
  id: string
  amount: string
  label: string
  icon: DashboardSpendCategoryIcon
  category?: string
}

export type TransactionsCardFilter = {
  nameQuery?: string
  amountQuery?: string
  spendCategory?: string
}
