import type { GoalCurrency } from '@/shared/config/currencies'

import { formatGoalMoney } from '@/entities/goal'

export const SPENDS_PIE_TOOLTIP_CONTENT_STYLE = {
  borderRadius: 12,
  border: '1px solid var(--dashboard-tooltip-border)',
  fontFamily: 'var(--font-display)',
} as const

export function formatSpendsPieTooltip(
  value: unknown,
  name: unknown,
  item: { payload?: { name?: string } } | undefined,
  currency: GoalCurrency
): [string, string] {
  const num = typeof value === 'number' ? value : Number(value ?? 0)
  const categoryName = item?.payload?.name ?? String(name ?? '')

  return [`-${formatGoalMoney(num, currency)}`, categoryName]
}
