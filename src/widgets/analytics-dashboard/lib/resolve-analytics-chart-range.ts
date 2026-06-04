import { parseIsoDateLocal } from '@/shared/lib/date-utils'

import type { AnalyticsPeriodPreset } from './get-analytics-period-range'

function startOfTodayLocal(): Date {
  const now = new Date()

  return new Date(now.getFullYear(), now.getMonth(), now.getDate())
}

function earliestIsoDay(isoDates: readonly string[]): Date | undefined {
  let minTime = Number.POSITIVE_INFINITY

  for (const iso of isoDates) {
    const day = iso.slice(0, 10)

    if (!day) {
      continue
    }

    minTime = Math.min(minTime, parseIsoDateLocal(day).getTime())
  }

  return Number.isFinite(minTime) ? new Date(minTime) : undefined
}

/**
 * Для пресета «Все» — от первой даты в данных до сегодня (включительно),
 * с нулевыми точками на промежуточных месяцах; иначе — диапазон из контекста.
 */
export function resolveAnalyticsChartRange(
  preset: AnalyticsPeriodPreset,
  isoDates: readonly string[],
  fallbackFrom: Date,
  fallbackTo: Date
): { chartFrom: Date; chartTo: Date } {
  const today = startOfTodayLocal()

  if (preset !== 'all') {
    return { chartFrom: fallbackFrom, chartTo: fallbackTo }
  }

  const firstDay = earliestIsoDay(isoDates)

  return {
    chartFrom: firstDay ?? fallbackFrom,
    chartTo: today,
  }
}

export function chartRangeSpansMultipleYears(chartFrom: Date, chartTo: Date): boolean {
  return chartFrom.getFullYear() !== chartTo.getFullYear()
}
