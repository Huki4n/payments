import type { DateRange } from 'react-day-picker'

export type IsoDateRange = {
  fromDate: string
  toDate: string
}

/** Локальная календарная дата в формате `yyyy-MM-dd` (без сдвига UTC). */
export function toIsoDateLocal(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export function todayIsoDateLocal(): string {
  return toIsoDateLocal(new Date())
}

/** Начало календарного дня в локальной таймзоне. */
export function startOfDayLocal(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export function isSameCalendarDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export function addCalendarDays(date: Date, days: number): Date {
  const next = new Date(date)

  next.setDate(next.getDate() + days)

  return next
}

/** Дедлайн (`yyyy-MM-dd`) раньше сегодняшнего календарного дня. */
export function isDeadlinePassed(deadlineIso: string, now: Date = new Date()): boolean {
  const day = deadlineIso.slice(0, 10)

  if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) {
    return false
  }

  const deadline = startOfDayLocal(parseIsoDateLocal(day))
  const today = startOfDayLocal(now)

  return deadline.getTime() < today.getTime()
}

/** Число календарных дней между датами (включительно). */
export function calendarDaysInclusive(from: Date, to: Date): number {
  const start = startOfDayLocal(from).getTime()
  const end = startOfDayLocal(to).getTime()
  const dayMs = 24 * 60 * 60 * 1000

  return Math.floor((end - start) / dayMs) + 1
}

/** `yyyy-MM-dd` → локальная дата без сдвига UTC. */
export function parseIsoDateLocal(iso: string): Date {
  const [year, month, day] = iso.split('-').map(Number)

  return new Date(year, month - 1, day)
}

/** `yyyy-MM-dd` → `dd.MM.yyyy` для подписей в UI. */
export function formatIsoDateDisplay(iso: string): string {
  const [year, month, day] = iso.split('-')

  if (!year || !month || !day) {
    return iso
  }

  return `${day}.${month}.${year}`
}

/** Диапазон из календаря → подпись `dd.MM.yyyy — dd.MM.yyyy` или `emptyLabel`. */
export function formatDateRangeLabel(range: DateRange | undefined, emptyLabel: string): string {
  if (!range?.from) {
    return emptyLabel
  }

  const from = formatIsoDateDisplay(toIsoDateLocal(range.from))

  if (!range.to) {
    return `${from} — …`
  }

  const to = formatIsoDateDisplay(toIsoDateLocal(range.to))

  return `${from} — ${to}`
}

export const ISO_MONTH_KEYS = [
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

export type IsoMonthKey = (typeof ISO_MONTH_KEYS)[number]

/** `yyyy-MM-dd` → ключ месяца для `dashboard.months.*`. */
export function getMonthKeyFromIso(iso: string): IsoMonthKey {
  const monthIndex = parseIsoDateLocal(iso).getMonth()

  return ISO_MONTH_KEYS[monthIndex] ?? 'jan'
}

/** `yyyy-MM-dd` → `13. Dec` (день + локализованное сокращение месяца). */
export function formatIsoDateDayMonthLabel(iso: string, monthLabel: string): string {
  const day = parseIsoDateLocal(iso).getDate()

  return `${day}. ${monthLabel}`
}

/** Текущий календарный месяц: с 1-го числа по сегодня (включительно). */
export function getCurrentMonthRange(): IsoDateRange {
  const to = new Date()
  const from = new Date(to.getFullYear(), to.getMonth(), 1)

  return {
    fromDate: toIsoDateLocal(from),
    toDate: toIsoDateLocal(to),
  }
}

/** @deprecated Используйте {@link getCurrentMonthRange}. */
export function getCurrentMonthRangeToYesterday(): IsoDateRange {
  return getCurrentMonthRange()
}

/** Последние 30 дней: от (сегодня − 30) до сегодня (включительно). */
export function getLast30DaysRange(): IsoDateRange {
  const to = new Date()
  const from = new Date(to)

  from.setDate(from.getDate() - 30)

  return {
    fromDate: toIsoDateLocal(from),
    toDate: toIsoDateLocal(to),
  }
}

/** Дедлайн цели по умолчанию: через год от сегодня (29 фев → 28 фев в невисокосном году). */
export function getDefaultGoalDeadline(): string {
  const now = new Date()
  const targetYear = now.getFullYear() + 1
  const month = now.getMonth()
  const day = now.getDate()
  const lastDayOfMonth = new Date(targetYear, month + 1, 0).getDate()
  const date = new Date(targetYear, month, Math.min(day, lastDayOfMonth))

  return toIsoDateLocal(date)
}

/** Минимальный дедлайн цели: завтра. */
export function getMinGoalDeadline(): string {
  const date = new Date()

  date.setDate(date.getDate() + 1)

  return toIsoDateLocal(date)
}
