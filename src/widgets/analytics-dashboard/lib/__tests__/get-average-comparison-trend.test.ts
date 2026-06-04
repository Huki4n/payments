import { describe, expect, it } from 'vitest'

import { getAverageComparisonTrend } from '../get-average-comparison-trend'

describe('getAverageComparisonTrend', () => {
  it('returns positive when average income exceeds expense', () => {
    expect(getAverageComparisonTrend(100, 50)).toBe('positive')
  })

  it('returns negative when expense is greater or equal', () => {
    expect(getAverageComparisonTrend(50, 100)).toBe('negative')
    expect(getAverageComparisonTrend(50, 50)).toBe('negative')
  })
})
