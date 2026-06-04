import { eachMonthOfInterval, endOfMonth, format, startOfMonth, startOfYear } from 'date-fns'

import type { GoalCurrency } from '@/shared/config/currencies'
import type { ExchangeRates } from '@/shared/lib/currency-exchange'

import { convertCurrency } from '@/shared/lib/currency-exchange'

import type { Contribution } from '../model/contributions-types'
import type { GoalDetails } from '../model/goals-types'
import type { SavingsSlide } from '../model/savings-slide'

export interface MapGoalToSavingsSlideOptions {
  displayCurrency: GoalCurrency
  rates: ExchangeRates
}

function convertAmount(
  amount: number,
  fromCurrency: string,
  { displayCurrency, rates }: MapGoalToSavingsSlideOptions
): number {
  return convertCurrency(amount, fromCurrency, displayCurrency, rates)
}

function buildProgressChart(
  contributions: Contribution[],
  currentAmount: number,
  sourceCurrency: string,
  options: MapGoalToSavingsSlideOptions
): SavingsSlide['progressChart'] {
  const sorted = [...contributions].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  )

  const now = new Date()
  const rangeEnd = startOfMonth(now)
  const rangeStart = startOfMonth(
    sorted.length > 0 ? startOfYear(new Date(sorted[0].createdAt)) : startOfYear(now)
  )

  const months = eachMonthOfInterval({ start: rangeStart, end: rangeEnd })

  let cumulative = 0
  let contributionIndex = 0

  const points = months.map((monthDate, index) => {
    const monthEnd = endOfMonth(monthDate)

    while (contributionIndex < sorted.length) {
      const createdAt = new Date(sorted[contributionIndex].createdAt)

      if (createdAt <= monthEnd) {
        cumulative = Math.max(
          0,
          cumulative + convertAmount(sorted[contributionIndex].amount, sourceCurrency, options)
        )
        contributionIndex += 1
      } else {
        break
      }
    }

    const isLast = index === months.length - 1

    return {
      month: format(monthDate, 'MMM'),
      value: isLast ? currentAmount : cumulative,
    }
  })

  if (points.length >= 2) {
    return points
  }

  return [
    { month: format(rangeStart, 'MMM'), value: 0 },
    {
      month: format(rangeEnd, 'MMM'),
      value: currentAmount,
    },
  ]
}

export function mapGoalToSavingsSlide(
  goal: GoalDetails,
  contributions: Contribution[],
  options: MapGoalToSavingsSlideOptions
): SavingsSlide {
  const sourceCurrency = goal.currency
  const targetAmount = convertAmount(goal.targetAmount, sourceCurrency, options)
  const convertedContributions = contributions.map(item =>
    convertAmount(item.amount, sourceCurrency, options)
  )
  const total = convertAmount(goal.progressInfo.currentAmount, sourceCurrency, options)

  return {
    id: String(goal.id),
    title: goal.title,
    currency: options.displayCurrency,
    goal: targetAmount,
    total,
    replenishments: contributions.map((item, index) => ({
      date: format(new Date(item.createdAt), 'dd.MM.yyyy'),
      amount: convertedContributions[index],
      isWithdrawal: item.amount < 0,
    })),
    progressChart: buildProgressChart(contributions, total, sourceCurrency, options),
  }
}
