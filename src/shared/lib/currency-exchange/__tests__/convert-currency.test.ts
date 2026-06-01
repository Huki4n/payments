import { describe, expect, it } from 'vitest'

import type { ExchangeRates } from '../types'

import { convertCurrency } from '../convert-currency'

const rates: ExchangeRates = {
  base: 'USD',
  date: '2026-01-01',
  rates: {
    EUR: 0.8,
    RUB: 80,
  },
}

describe('convertCurrency', () => {
  it('returns the same amount for identical currencies', () => {
    expect(convertCurrency(100, 'USD', 'USD', rates)).toBe(100)
    expect(convertCurrency(100, 'usd', 'USD', rates)).toBe(100)
  })

  it('converts from base currency to target currency', () => {
    expect(convertCurrency(100, 'USD', 'EUR', rates)).toBe(80)
    expect(convertCurrency(100, 'USD', 'RUB', rates)).toBe(8000)
  })

  it('converts from target currency to base currency', () => {
    expect(convertCurrency(80, 'EUR', 'USD', rates)).toBe(100)
  })

  it('converts between non-base currencies', () => {
    expect(convertCurrency(80, 'EUR', 'RUB', rates)).toBe(8000)
  })

  it('throws for unsupported currency', () => {
    expect(() => convertCurrency(10, 'GBP', 'USD', rates)).toThrow('Unsupported currency')
  })
})
