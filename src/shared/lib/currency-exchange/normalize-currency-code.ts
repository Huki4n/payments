import { GOAL_CURRENCIES, type GoalCurrency } from '@/shared/config/currencies'

const SUPPORTED = new Set<string>(GOAL_CURRENCIES)

export function normalizeCurrencyCode(value: string): GoalCurrency {
  const code = value.trim().toUpperCase()

  if (!SUPPORTED.has(code)) {
    throw new Error(`Unsupported currency: ${value}`)
  }

  return code as GoalCurrency
}
