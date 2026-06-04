import type { TransactionResponse } from '@/entities/transaction'

import { formatIsoDateDisplay, toIsoDateLocal } from './date-utils'

export const CHART_MONTH_KEYS = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec',
] as const

export type ChartMonthKey = (typeof CHART_MONTH_KEYS)[number]

export type IncomeSpendMonthPoint = {
  monthKey: ChartMonthKey
  /** Уникальный ключ месяца для оси (`yyyy-MM`). */
  monthId: string
  income: number
  spend: number
  periodDate: string
}

export type IncomeSpendDayPoint = {
  dayLabel: string
  income: number
  spend: number
  periodDate: string
}

function enumerateDays(from: Date, to: Date): Date[] {
  const days: Date[] = []
  const cursor = new Date(from.getFullYear(), from.getMonth(), from.getDate())
  const end = new Date(to.getFullYear(), to.getMonth(), to.getDate())

  while (cursor <= end) {
    days.push(new Date(cursor))
    cursor.setDate(cursor.getDate() + 1)
  }

  return days
}

function enumerateMonths(from: Date, to: Date): Date[] {
  const months: Date[] = []
  const cursor = new Date(from.getFullYear(), from.getMonth(), 1)
  const end = new Date(to.getFullYear(), to.getMonth(), 1)

  while (cursor <= end) {
    months.push(new Date(cursor))
    cursor.setMonth(cursor.getMonth() + 1)
  }

  return months
}

/** Агрегирует доходы и расходы по месяцам в выбранном периоде. */
export function buildIncomeSpendMonthSeries(
  transactions: TransactionResponse[] | undefined,
  from: Date,
  to: Date
): IncomeSpendMonthPoint[] {
  const monthDates = enumerateMonths(from, to)
  const buckets = new Map(
    monthDates.map(monthDate => [toIsoDateLocal(monthDate).slice(0, 7), { income: 0, spend: 0 }])
  )

  for (const tx of transactions ?? []) {
    const key = tx.operationDate.slice(0, 7)

    if (!/^\d{4}-\d{2}$/.test(key)) {
      continue
    }

    const bucket = buckets.get(key)

    if (!bucket) {
      continue
    }

    if (tx.type === 'INCOME') {
      bucket.income += tx.amount
    } else {
      bucket.spend += tx.amount
    }
  }

  return monthDates.map(monthDate => {
    const isoMonth = toIsoDateLocal(monthDate).slice(0, 7)
    const totals = buckets.get(isoMonth)!

    return {
      monthKey: CHART_MONTH_KEYS[monthDate.getMonth()],
      monthId: isoMonth,
      income: totals.income,
      spend: totals.spend,
      periodDate: formatIsoDateDisplay(toIsoDateLocal(monthDate)),
    }
  })
}

/** Доходы и расходы по дням в выбранном периоде (для графика за текущий месяц). */
export function buildIncomeSpendDaySeries(
  transactions: TransactionResponse[] | undefined,
  from: Date,
  to: Date
): IncomeSpendDayPoint[] {
  const dayDates = enumerateDays(from, to)
  const buckets = new Map(
    dayDates.map(dayDate => [toIsoDateLocal(dayDate), { income: 0, spend: 0 }])
  )

  for (const tx of transactions ?? []) {
    const key = tx.operationDate.slice(0, 10)

    if (!/^\d{4}-\d{2}-\d{2}$/.test(key)) {
      continue
    }

    const bucket = buckets.get(key)

    if (!bucket) {
      continue
    }

    if (tx.type === 'INCOME') {
      bucket.income += tx.amount
    } else {
      bucket.spend += tx.amount
    }
  }

  return dayDates.map(dayDate => {
    const isoDay = toIsoDateLocal(dayDate)
    const totals = buckets.get(isoDay)!

    return {
      dayLabel: String(dayDate.getDate()),
      income: totals.income,
      spend: totals.spend,
      periodDate: formatIsoDateDisplay(isoDay),
    }
  })
}
