import type { GoalCurrency } from '@/shared/config/currencies'

import { convertCurrency, type ExchangeRates } from '@/shared/lib/currency-exchange'

import type { GoalContributionsPeriodResponse } from '../model/contributions-types'

function convertAmount(
  amount: number,
  fromCurrency: string,
  displayCurrency: GoalCurrency,
  rates: ExchangeRates
): number {
  return convertCurrency(amount, fromCurrency, displayCurrency, rates)
}

export function convertGoalContributionsPeriodToDisplayCurrency(
  data: GoalContributionsPeriodResponse,
  goalCurrencyById: ReadonlyMap<number, string>,
  displayCurrency: GoalCurrency,
  rates: ExchangeRates
): GoalContributionsPeriodResponse {
  const contributions = data.contributions.map(item => {
    const sourceCurrency = goalCurrencyById.get(item.goalId) ?? displayCurrency

    return {
      ...item,
      amount: convertAmount(item.amount, sourceCurrency, displayCurrency, rates),
    }
  })

  const totalAmount = contributions.reduce((sum, item) => sum + item.amount, 0)

  return {
    ...data,
    contributions,
    totalAmount: Number(totalAmount.toFixed(2)),
  }
}
