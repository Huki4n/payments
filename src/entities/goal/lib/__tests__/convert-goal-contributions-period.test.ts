import { describe, expect, it } from 'vitest'

import type { GoalContributionsPeriodResponse } from '../../model/contributions-types'

import { convertGoalContributionsPeriodToDisplayCurrency } from '../convert-goal-contributions-period'

const rates = {
  base: 'USD' as const,
  rates: { EUR: 0.5, RUB: 100 },
}

const data: GoalContributionsPeriodResponse = {
  totalAmount: 300,
  count: 2,
  contributions: [
    {
      id: 1,
      goalId: 10,
      goalTitle: 'Trip',
      amount: 100,
      type: 'MANUAL',
      createdAt: '2026-01-01',
    },
    {
      id: 2,
      goalId: 11,
      goalTitle: 'Car',
      amount: 200,
      type: 'MANUAL',
      createdAt: '2026-01-02',
    },
  ],
}

describe('convertGoalContributionsPeriodToDisplayCurrency', () => {
  it('converts each contribution by goal currency and recomputes total', () => {
    const goalCurrencyById = new Map([
      [10, 'EUR'],
      [11, 'USD'],
    ])

    const result = convertGoalContributionsPeriodToDisplayCurrency(
      data,
      goalCurrencyById,
      'USD',
      rates
    )

    expect(result.contributions[0]?.amount).toBe(200)
    expect(result.contributions[1]?.amount).toBe(200)
    expect(result.totalAmount).toBe(400)
  })
})
