import { describe, expect, it } from 'vitest'

import {
  formatCompactAmount,
  formatCompactGoalMoney,
  formatContributionAmount,
  formatGoalMoney,
  formatMoneyAmountParts,
  sanitizeAmountInput,
} from '../money-format'

describe('formatMoneyAmountParts', () => {
  it('formats positive amount with symbol in fraction part', () => {
    expect(formatMoneyAmountParts(1650.4, 'RUB')).toEqual({
      integerPart: '1,650',
      fractionPart: '.40₽',
    })
  })

  it('formats negative balance', () => {
    expect(formatMoneyAmountParts(-490, 'RUB')).toEqual({
      integerPart: '-490',
      fractionPart: '.00₽',
    })
  })
})

describe('formatGoalMoney', () => {
  it('formats with thousands separator and currency symbol', () => {
    expect(formatGoalMoney(1234.5, 'USD')).toBe('1,234.50 $')
  })
})

describe('formatContributionAmount', () => {
  it('prefixes positive and negative amounts', () => {
    expect(formatContributionAmount(100, 'EUR')).toBe('+100.00 €')
    expect(formatContributionAmount(-50, 'EUR')).toBe('−50.00 €')
  })
})

describe('sanitizeAmountInput', () => {
  it('keeps digits, single leading minus and decimal fraction', () => {
    expect(sanitizeAmountInput('abc-12.34567')).toBe('-12.34567')
    expect(sanitizeAmountInput('1.2.3')).toBe('1.2')
  })
})

describe('formatCompactGoalMoney', () => {
  it('combines compact amount with currency symbol', () => {
    expect(formatCompactGoalMoney(49_099.75, 'RUB')).toBe('49.1k ₽')
    expect(formatCompactGoalMoney(500, 'USD')).toBe('500 $')
  })
})

describe('formatCompactAmount', () => {
  it('formats values below 1000 as integers', () => {
    expect(formatCompactAmount(0)).toBe('0')
    expect(formatCompactAmount(500)).toBe('500')
    expect(formatCompactAmount(999)).toBe('999')
  })

  it('formats thousands with k suffix', () => {
    expect(formatCompactAmount(1000)).toBe('1k')
    expect(formatCompactAmount(3300)).toBe('3.3k')
    expect(formatCompactAmount(13200)).toBe('13.2k')
    expect(formatCompactAmount(16500)).toBe('16.5k')
  })

  it('formats millions with M suffix', () => {
    expect(formatCompactAmount(1_200_000)).toBe('1.2M')
    expect(formatCompactAmount(15_000_000)).toBe('15M')
  })

  it('preserves sign', () => {
    expect(formatCompactAmount(-4500)).toBe('-4.5k')
  })
})
