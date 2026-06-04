import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import {
  formatDateRangeLabel,
  formatIsoDateDayMonthLabel,
  getCurrentMonthRange,
  getDefaultGoalDeadline,
  isDeadlinePassed,
  getLast30DaysRange,
  getMinGoalDeadline,
  getMonthKeyFromIso,
  todayIsoDateLocal,
  toIsoDateLocal,
} from '../date-utils'

describe('toIsoDateLocal', () => {
  it('formats local calendar date as yyyy-MM-dd with zero padding', () => {
    expect(toIsoDateLocal(new Date(2024, 0, 5))).toBe('2024-01-05')
    expect(toIsoDateLocal(new Date(2024, 8, 9))).toBe('2024-09-09')
    expect(toIsoDateLocal(new Date(2024, 11, 31))).toBe('2024-12-31')
  })
})

describe('todayIsoDateLocal', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2026, 5, 3, 15, 30, 0))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns iso date for the mocked local today', () => {
    expect(todayIsoDateLocal()).toBe('2026-06-03')
  })
})

describe('getMonthKeyFromIso', () => {
  it('returns month key for iso date', () => {
    expect(getMonthKeyFromIso('2024-08-13')).toBe('aug')
    expect(getMonthKeyFromIso('2024-12-11')).toBe('dec')
  })
})

describe('formatDateRangeLabel', () => {
  it('returns empty label when range is missing', () => {
    expect(formatDateRangeLabel(undefined, 'All time')).toBe('All time')
  })

  it('formats partial range with ellipsis', () => {
    expect(
      formatDateRangeLabel({ from: new Date(2026, 5, 1) }, 'All time')
    ).toBe('01.06.2026 — …')
  })

  it('formats full range', () => {
    expect(
      formatDateRangeLabel(
        { from: new Date(2026, 0, 5), to: new Date(2026, 5, 3) },
        'All time'
      )
    ).toBe('05.01.2026 — 03.06.2026')
  })
})

describe('formatIsoDateDayMonthLabel', () => {
  it('formats day and month abbreviation', () => {
    expect(formatIsoDateDayMonthLabel('2024-08-13', 'Aug')).toBe('13. Aug')
    expect(formatIsoDateDayMonthLabel('2024-12-11', 'Dec')).toBe('11. Dec')
  })
})

describe('getCurrentMonthRange', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns from the 1st of the current month through today', () => {
    vi.setSystemTime(new Date(2026, 5, 3, 12, 0, 0))

    expect(getCurrentMonthRange()).toEqual({
      fromDate: '2026-06-01',
      toDate: '2026-06-03',
    })
  })

  it('when today is the 1st, uses only that day', () => {
    vi.setSystemTime(new Date(2026, 5, 1, 12, 0, 0))

    expect(getCurrentMonthRange()).toEqual({
      fromDate: '2026-06-01',
      toDate: '2026-06-01',
    })
  })
})

describe('getLast30DaysRange', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2026, 5, 3, 12, 0, 0))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns 30 days before today through today (inclusive)', () => {
    expect(getLast30DaysRange()).toEqual({
      fromDate: '2026-05-04',
      toDate: '2026-06-03',
    })
  })

  it('spans month boundaries correctly', () => {
    vi.setSystemTime(new Date(2026, 2, 5, 12, 0, 0))

    expect(getLast30DaysRange()).toEqual({
      fromDate: '2026-02-03',
      toDate: '2026-03-05',
    })
  })
})

describe('isDeadlinePassed', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2026, 5, 4, 12, 0, 0))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns true when deadline is before today', () => {
    expect(isDeadlinePassed('2026-06-03')).toBe(true)
  })

  it('returns false for today and future deadlines', () => {
    expect(isDeadlinePassed('2026-06-04')).toBe(false)
    expect(isDeadlinePassed('2026-07-01')).toBe(false)
  })
})

describe('getDefaultGoalDeadline', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2026, 5, 3, 12, 0, 0))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns the same calendar date one year ahead', () => {
    expect(getDefaultGoalDeadline()).toBe('2027-06-03')
  })

  it('handles leap day', () => {
    vi.setSystemTime(new Date(2024, 1, 29, 12, 0, 0))

    expect(getDefaultGoalDeadline()).toBe('2025-02-28')
  })
})

describe('getMinGoalDeadline', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2026, 5, 3, 12, 0, 0))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns tomorrow in local calendar', () => {
    expect(getMinGoalDeadline()).toBe('2026-06-04')
  })

  it('rolls over at month end', () => {
    vi.setSystemTime(new Date(2026, 4, 31, 12, 0, 0))

    expect(getMinGoalDeadline()).toBe('2026-06-01')
  })
})
