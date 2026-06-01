const CURRENCY_SYMBOL: Record<string, string> = {
  USD: '$',
  EUR: '€',
  RUB: '₽',
}

function resolveCurrencyCode(currency: string): string {
  return currency.trim().toUpperCase()
}

export function formatGoalMoney(amount: number, currency: string): string {
  const code = resolveCurrencyCode(currency)
  const symbol = CURRENCY_SYMBOL[code] ?? code

  const formatted = amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return `${formatted} ${symbol}`
}

export function formatContributionAmount(amount: number, currency: string): string {
  const sign = amount < 0 ? '−' : '+'
  const abs = Math.abs(amount)

  return `${sign}${formatGoalMoney(abs, currency)}`
}
