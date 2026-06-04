import { describe, expect, it } from 'vitest'

import type { GoalContributionItemResponse } from '@/entities/goal'

import { buildPeriodSavingsChart } from '../build-period-savings-chart'

const contributions: GoalContributionItemResponse[] = [
  {
    id: 1,
    goalId: 10,
    goalTitle: 'Trip',
    amount: 1000,
    type: 'MANUAL',
    createdAt: '2026-03-15T10:00:00',
  },
  {
    id: 2,
    goalId: 11,
    goalTitle: 'Car',
    amount: 500,
    type: 'MANUAL',
    createdAt: '2026-04-03T10:00:00',
  },
]

describe('buildPeriodSavingsChart', () => {
  it('builds cumulative values by month', () => {
    const chartFrom = new Date(2026, 2, 1)
    const chartTo = new Date(2026, 3, 30)

    const points = buildPeriodSavingsChart(contributions, chartFrom, chartTo)

    expect(points).toHaveLength(2)
    expect(points[0]).toEqual({ monthKey: 'mar', monthId: '2026-03', value: 1000 })
    expect(points[1]).toEqual({ monthKey: 'apr', monthId: '2026-04', value: 1500 })
  })
})
