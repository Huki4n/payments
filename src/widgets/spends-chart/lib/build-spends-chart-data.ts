import type { TFunction } from 'i18next'

import type { TransactionResponse } from '@/entities/transaction'
import type { GoalCurrency } from '@/shared/config/currencies'
import type { DashboardSpendCategoryIcon } from '@/shared/ui/icons/category-icons'

import { formatGoalMoney } from '@/entities/goal'
import {
  SPEND_CATEGORIES,
  resolveSpendCategoryId,
  type SpendCategoryId,
} from '@/shared/config/spend-categories'
import { translateTransactionCategory } from '@/shared/config/transaction-categories'

import { SPEND_CHART_COLORS } from '../model/spend-chart-colors'

export type SpendsChartRow = {
  categoryId: SpendCategoryId
  name: string
  value: number
  color: string
  icon: DashboardSpendCategoryIcon
  formattedAmount: string
}

export function buildSpendsChartData(
  transactions: TransactionResponse[] | undefined,
  currency: GoalCurrency,
  t: TFunction<'home'>
): SpendsChartRow[] {
  const totals = new Map<SpendCategoryId, number>()

  for (const category of SPEND_CATEGORIES) {
    totals.set(category.id, 0)
  }

  for (const tx of transactions ?? []) {
    if (tx.type !== 'EXPENSE') {
      continue
    }

    const categoryId = resolveSpendCategoryId(tx.category)

    totals.set(categoryId, (totals.get(categoryId) ?? 0) + tx.amount)
  }

  return SPEND_CATEGORIES.map(category => ({
    categoryId: category.id,
    icon: category.icon,
    color: SPEND_CHART_COLORS[category.id],
    name: translateTransactionCategory(t, category.id),
    value: totals.get(category.id) ?? 0,
    formattedAmount: `-${formatGoalMoney(totals.get(category.id) ?? 0, currency)}`,
  }))
    .filter(row => row.value > 0)
    .sort((a, b) => b.value - a.value)
}
