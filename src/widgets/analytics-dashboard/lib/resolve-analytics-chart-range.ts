import {
  addCalendarDays,
  calendarDaysInclusive,
  isSameCalendarDay,
  parseIsoDateLocal,
  startOfDayLocal,
} from '@/shared/lib/date-utils'

import type { AnalyticsPeriodPreset } from './get-analytics-period-range'

const INCOME_SPEND_DAY_SCALE_MAX_DAYS = 31

function startOfTodayLocal(): Date {
  return startOfDayLocal(new Date())
}

function isoDayFromTransaction(iso: string): string | undefined {
  const day = iso.slice(0, 10)

  if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) {
    return undefined
  }

  return day
}

function earliestIsoDay(isoDates: readonly string[]): Date | undefined {
  let minTime = Number.POSITIVE_INFINITY

  for (const iso of isoDates) {
    const day = isoDayFromTransaction(iso)

    if (!day) {
      continue
    }

    minTime = Math.min(minTime, parseIsoDateLocal(day).getTime())
  }

  return Number.isFinite(minTime) ? new Date(minTime) : undefined
}

/**
 * Для пресета «Все» — от первой даты в данных до сегодня (включительно),
 * с нулевыми точками на промежуточных месяцах/днях; иначе — диапазон из контекста.
 * Если первая транзакция сегодня — конец диапазона завтра (+1 день).
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
  const chartFrom = firstDay ?? fallbackFrom
  let chartTo = today

  if (firstDay && isSameCalendarDay(firstDay, today)) {
    chartTo = addCalendarDays(today, 1)
  }

  return { chartFrom, chartTo }
}

export function chartRangeSpansMultipleYears(chartFrom: Date, chartTo: Date): boolean {
  return chartFrom.getFullYear() !== chartTo.getFullYear()
}

/** Дневная шкала для короткого периода «Все» (в т.ч. первая транзакция сегодня). */
export function shouldUseIncomeSpendDayScale(chartFrom: Date, chartTo: Date): boolean {
  return calendarDaysInclusive(chartFrom, chartTo) <= INCOME_SPEND_DAY_SCALE_MAX_DAYS
}
