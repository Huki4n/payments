import type { ExchangeCurrencyCode, ExchangeRates } from './types'

import { normalizeCurrencyCode } from './normalize-currency-code'

function getRate(rates: ExchangeRates, code: ExchangeCurrencyCode): number {
  if (code === rates.base) {
    return 1
  }

  const rate = rates.rates[code]

  if (rate === undefined || rate <= 0) {
    throw new Error(`Missing exchange rate for ${code}`)
  }

  return rate
}

/** Конвертирует сумму между валютами по уже загруженным курсам. */
export function convertCurrency(
  amount: number,
  from: string,
  to: string,
  rates: ExchangeRates
): number {
  const fromCode = normalizeCurrencyCode(from)
  const toCode = normalizeCurrencyCode(to)

  if (fromCode === toCode) {
    return amount
  }

  if (!Number.isFinite(amount)) {
    throw new Error('Amount must be a finite number')
  }

  const fromRate = getRate(rates, fromCode)
  const toRate = getRate(rates, toCode)
  const amountInBase = fromCode === rates.base ? amount : amount / fromRate
  const converted = toCode === rates.base ? amountInBase : amountInBase * toRate

  return Number(converted.toFixed(2))
}
