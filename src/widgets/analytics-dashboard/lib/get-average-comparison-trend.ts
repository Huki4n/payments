export type AverageComparisonTrend = 'positive' | 'negative'

/** Положительная тенденция: средний дневной доход выше среднего дневного расхода. */
export function getAverageComparisonTrend(
  averageIncome?: number,
  averageExpense?: number
): AverageComparisonTrend {
  const income = averageIncome ?? 0
  const expense = averageExpense ?? 0

  return income > expense ? 'positive' : 'negative'
}
