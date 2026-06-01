import { GOAL_CURRENCIES } from '@/shared/config/currencies'

import type { ExchangeCurrencyCode, ExchangeRates, FetchExchangeRatesOptions } from './types'

import { normalizeCurrencyCode } from './normalize-currency-code'

function getExchangeRatesBaseUrl(): string {
  const raw = import.meta.env.VITE_EXCHANGE_RATES_BASE_URL?.trim()

  if (raw) {
    return raw.replace(/\/$/, '')
  }

  return '/exchange-rates'
}

const CACHE_TTL_MS = 60 * 60 * 1000

interface FrankfurterV2RateRow {
  date: string
  base: string
  quote: string
  rate: number
}

let cachedRates: { key: string; expiresAt: number; data: ExchangeRates } | null = null

function buildCacheKey(base: ExchangeCurrencyCode, targets: ExchangeCurrencyCode[]): string {
  return `${base}:${targets.sort().join(',')}`
}

function parseFrankfurterV2Rows(
  rows: FrankfurterV2RateRow[],
  base: ExchangeCurrencyCode
): ExchangeRates {
  const rates: Partial<Record<ExchangeCurrencyCode, number>> = {}
  let date = new Date().toISOString().slice(0, 10)

  for (const row of rows) {
    rates[normalizeCurrencyCode(row.quote)] = row.rate
    date = row.date
  }

  return {
    base,
    date,
    rates,
  }
}

async function fetchFrankfurterJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(url, { signal })

  if (!response.ok) {
    throw new Error(`Failed to fetch exchange rates: ${response.status}`)
  }

  return (await response.json()) as T
}

async function fetchSingleRate(
  base: ExchangeCurrencyCode,
  quote: ExchangeCurrencyCode,
  signal?: AbortSignal
): Promise<FrankfurterV2RateRow> {
  return fetchFrankfurterJson<FrankfurterV2RateRow>(
    `${getExchangeRatesBaseUrl()}/v2/rate/${base}/${quote}`,
    signal
  )
}

async function fetchMissingRates(
  base: ExchangeCurrencyCode,
  targets: ExchangeCurrencyCode[],
  data: ExchangeRates,
  signal?: AbortSignal
): Promise<ExchangeRates> {
  const rates = { ...data.rates }

  for (const target of targets) {
    if (rates[target] !== undefined) {
      continue
    }

    const row = await fetchSingleRate(base, target, signal)

    rates[target] = row.rate
  }

  return {
    ...data,
    rates,
  }
}

function assertAllRatesPresent(
  base: ExchangeCurrencyCode,
  targets: ExchangeCurrencyCode[],
  data: ExchangeRates
): ExchangeRates {
  const missing = targets.filter(target => data.rates[target] === undefined)

  if (missing.length > 0) {
    throw new Error(`Missing exchange rate for ${missing.join(', ')} (base: ${base})`)
  }

  return data
}

/** Загружает актуальные курсы валют (Frankfurter v2). */
export async function fetchExchangeRates(
  options: FetchExchangeRatesOptions = {}
): Promise<ExchangeRates> {
  const base = normalizeCurrencyCode(options.base ?? 'USD')
  const targets = (options.targets ?? [...GOAL_CURRENCIES])
    .map(code => normalizeCurrencyCode(code))
    .filter(code => code !== base)

  const cacheKey = buildCacheKey(base, targets)
  const now = Date.now()

  if (
    !options.forceRefresh &&
    cachedRates &&
    cachedRates.key === cacheKey &&
    cachedRates.expiresAt > now
  ) {
    return cachedRates.data
  }

  let data: ExchangeRates

  if (targets.length === 0) {
    data = {
      base,
      date: new Date().toISOString().slice(0, 10),
      rates: {},
    }
  } else {
    const rows = await fetchFrankfurterJson<FrankfurterV2RateRow[]>(
      `${getExchangeRatesBaseUrl()}/v2/rates?base=${base}&quotes=${targets.join(',')}`,
      options.signal
    )

    data = assertAllRatesPresent(
      base,
      targets,
      await fetchMissingRates(base, targets, parseFrankfurterV2Rows(rows, base), options.signal)
    )
  }

  cachedRates = {
    key: cacheKey,
    expiresAt: now + CACHE_TTL_MS,
    data,
  }

  return data
}

/** Сбрасывает in-memory кэш (удобно для тестов). */
export function resetExchangeRatesCache(): void {
  cachedRates = null
}
