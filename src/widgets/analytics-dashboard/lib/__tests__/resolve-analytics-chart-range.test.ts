import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { resolveAnalyticsChartRange } from '../resolve-analytics-chart-range'

describe('resolveAnalyticsChartRange', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2026, 5, 4, 12, 0, 0))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('for preset all uses first data day through today', () => {
    const fallbackFrom = new Date(2025, 6, 1)
    const fallbackTo = new Date(2026, 5, 3)

    expect(
      resolveAnalyticsChartRange('all', ['2026-03-15T10:00:00', '2026-01-02T10:00:00'], fallbackFrom, fallbackTo)
    ).toEqual({
      chartFrom: new Date(2026, 0, 2),
      chartTo: new Date(2026, 5, 4),
    })
  })

  it('for preset all without data falls back to default from and today', () => {
    const fallbackFrom = new Date(2025, 6, 1)
    const fallbackTo = new Date(2026, 5, 3)

    expect(resolveAnalyticsChartRange('all', [], fallbackFrom, fallbackTo)).toEqual({
      chartFrom: fallbackFrom,
      chartTo: new Date(2026, 5, 4),
    })
  })

  it('for other presets keeps context range', () => {
    const fallbackFrom = new Date(2026, 4, 1)
    const fallbackTo = new Date(2026, 5, 3)

    expect(
      resolveAnalyticsChartRange('month', ['2026-03-15T10:00:00'], fallbackFrom, fallbackTo)
    ).toEqual({
      chartFrom: fallbackFrom,
      chartTo: fallbackTo,
    })
  })
})
