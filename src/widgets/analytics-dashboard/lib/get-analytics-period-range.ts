import type { DateRange } from 'react-day-picker'

import { subMonths, subYears } from 'date-fns'

import type { IsoDateRange } from '@/shared/lib/date-utils'

import { toIsoDateLocal } from '@/shared/lib/date-utils'

export type AnalyticsPeriodPreset = 'all' | 'week' | 'month' | '3m' | '6m' | 'year' | 'custom'

/** Параметры дат для API; для пресета «Все» — без фильтра. */
export type AnalyticsApiRange = IsoDateRange | undefined

function startOfTodayLocal(): Date {
  const now = new Date()

  return new Date(now.getFullYear(), now.getMonth(), now.getDate())
}

function capToToday(date: Date): Date {
  const today = startOfTodayLocal()

  return date > today ? today : date
}

/** Диапазон для API и построения графика по пресету / календарю. */
export function getAnalyticsPeriodRange(
  preset: AnalyticsPeriodPreset,
  range: DateRange | undefined
): { api: AnalyticsApiRange; chartFrom: Date; chartTo: Date } {
  const today = startOfTodayLocal()
  const now = new Date()
  const defaultChartFrom = subMonths(new Date(today.getFullYear(), today.getMonth(), 1), 11)

  if (preset === 'all') {
    return {
      api: undefined,
      chartFrom: defaultChartFrom,
      chartTo: today,
    }
  }

  if (!range?.from) {
    return {
      api: {
        fromDate: toIsoDateLocal(defaultChartFrom),
        toDate: toIsoDateLocal(today),
      },
      chartFrom: defaultChartFrom,
      chartTo: today,
    }
  }

  const chartFrom = range.from
  const chartTo = capToToday(range.to ?? now)

  return {
    api: {
      fromDate: toIsoDateLocal(chartFrom),
      toDate: toIsoDateLocal(chartTo),
    },
    chartFrom,
    chartTo,
  }
}

export const ANALYTICS_PRESET_RANGES: Record<
  Exclude<AnalyticsPeriodPreset, 'custom' | 'all'>,
  (now: Date) => DateRange
> = {
  week: now => {
    const to = capToToday(now)
    const from = new Date(to)

    from.setDate(from.getDate() - 7)

    return { from, to }
  },
  month: now => ({ from: subMonths(capToToday(now), 1), to: capToToday(now) }),
  '3m': now => ({ from: subMonths(capToToday(now), 3), to: capToToday(now) }),
  '6m': now => ({ from: subMonths(capToToday(now), 6), to: capToToday(now) }),
  year: now => ({ from: subYears(capToToday(now), 1), to: capToToday(now) }),
}
