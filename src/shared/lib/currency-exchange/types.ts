import type { GoalCurrency } from '@/shared/config/currencies'

export type ExchangeCurrencyCode = GoalCurrency

export interface ExchangeRates {
  base: ExchangeCurrencyCode
  date: string
  /** Сколько единиц валюты `code` за 1 `base`. */
  rates: Partial<Record<ExchangeCurrencyCode, number>>
}

export interface FetchExchangeRatesOptions {
  base?: ExchangeCurrencyCode
  targets?: ExchangeCurrencyCode[]
  signal?: AbortSignal
  /** Пропустить in-memory кэш. */
  forceRefresh?: boolean
}

export interface ConvertCurrencyOptions {
  rates?: ExchangeRates
  signal?: AbortSignal
}
