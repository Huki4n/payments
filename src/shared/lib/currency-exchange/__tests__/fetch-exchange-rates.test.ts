import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { fetchExchangeRates, resetExchangeRatesCache } from '../fetch-exchange-rates'

const v2RatesResponse = [
  { date: '2026-06-01', base: 'USD', quote: 'EUR', rate: 0.92 },
  { date: '2026-06-01', base: 'USD', quote: 'RUB', rate: 90 },
]

describe('fetchExchangeRates', () => {
  beforeEach(() => {
    resetExchangeRatesCache()
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => v2RatesResponse,
      })
    )
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    resetExchangeRatesCache()
  })

  it('fetches and parses exchange rates', async () => {
    const result = await fetchExchangeRates({ base: 'USD', targets: ['EUR', 'RUB'] })

    expect(result).toEqual({
      base: 'USD',
      date: '2026-06-01',
      rates: { EUR: 0.92, RUB: 90 },
    })
    expect(fetch).toHaveBeenCalledWith(
      '/exchange-rates/v2/rates?base=USD&quotes=EUR,RUB',
      expect.any(Object)
    )
  })

  it('uses in-memory cache for repeated requests', async () => {
    await fetchExchangeRates({ base: 'USD', targets: ['EUR'] })
    await fetchExchangeRates({ base: 'USD', targets: ['EUR'] })

    expect(fetch).toHaveBeenCalledTimes(1)
  })

  it('fetches missing rates individually', async () => {
    vi.mocked(fetch).mockImplementation((async (input: RequestInfo | URL) => {
      const url = String(input)

      if (url.includes('/v2/rates')) {
        return {
          ok: true,
          json: async () => [{ date: '2026-06-01', base: 'USD', quote: 'EUR', rate: 0.92 }],
        } as Response
      }

      if (url.includes('/v2/rate/USD/RUB')) {
        return {
          ok: true,
          json: async () => ({
            date: '2026-06-01',
            base: 'USD',
            quote: 'RUB',
            rate: 90,
          }),
        } as Response
      }

      throw new Error(`Unexpected fetch: ${url}`)
    }) as typeof fetch)

    const result = await fetchExchangeRates({ base: 'USD', targets: ['EUR', 'RUB'] })

    expect(result.rates).toEqual({ EUR: 0.92, RUB: 90 })
    expect(fetch).toHaveBeenCalledTimes(2)
  })
})
