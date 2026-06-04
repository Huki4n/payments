import { eachMonthOfInterval, endOfMonth, startOfMonth } from 'date-fns'

import type { GoalContributionItemResponse } from '@/entities/goal'

import { getMonthKeyFromIso, toIsoDateLocal, type IsoMonthKey } from '@/shared/lib/date-utils'

export type PeriodSavingsChartPoint = {
  monthKey: IsoMonthKey
  monthId: string
  value: number
}

export function buildPeriodSavingsChart(
  contributions: GoalContributionItemResponse[] | undefined,
  chartFrom: Date,
  chartTo: Date
): PeriodSavingsChartPoint[] {
  const sorted = [...(contributions ?? [])].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  )

  const rangeStart = startOfMonth(chartFrom)
  const rangeEnd = startOfMonth(chartTo)
  const months = eachMonthOfInterval({ start: rangeStart, end: rangeEnd })

  let cumulative = 0
  let contributionIndex = 0

  const points = months.map(monthDate => {
    const monthEnd = endOfMonth(monthDate)

    while (contributionIndex < sorted.length) {
      const createdAt = new Date(sorted[contributionIndex].createdAt)

      if (createdAt <= monthEnd) {
        cumulative += sorted[contributionIndex].amount
        contributionIndex += 1
      } else {
        break
      }
    }

    const monthIso = toIsoDateLocal(monthDate).slice(0, 7)

    return {
      monthKey: getMonthKeyFromIso(toIsoDateLocal(monthDate)),
      monthId: monthIso,
      value: cumulative,
    }
  })

  if (points.length >= 2) {
    return points
  }

  const fallbackMonth = rangeEnd

  const startIso = toIsoDateLocal(rangeStart).slice(0, 7)
  const endIso = toIsoDateLocal(fallbackMonth).slice(0, 7)

  return [
    { monthKey: getMonthKeyFromIso(toIsoDateLocal(rangeStart)), monthId: startIso, value: 0 },
    {
      monthKey: getMonthKeyFromIso(toIsoDateLocal(fallbackMonth)),
      monthId: endIso,
      value: cumulative,
    },
  ]
}
