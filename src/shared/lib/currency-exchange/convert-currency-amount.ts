import type { ConvertCurrencyOptions } from './types'

import { convertCurrency } from './convert-currency'
import { fetchExchangeRates } from './fetch-exchange-rates'
import { normalizeCurrencyCode } from './normalize-currency-code'

/** Загружает курсы (если не переданы) и конвертирует сумму. */
export async function convertCurrencyAmount(
  amount: number,
  from: string,
  to: string,
  options: ConvertCurrencyOptions = {}
): Promise<number> {
  const fromCode = normalizeCurrencyCode(from)
  const toCode = normalizeCurrencyCode(to)

  if (fromCode === toCode) {
    return amount
  }

  const rates =
    options.rates ??
    (await fetchExchangeRates({
      base: fromCode,
      targets: [toCode],
      signal: options.signal,
    }))

  return convertCurrency(amount, fromCode, toCode, rates)
}
