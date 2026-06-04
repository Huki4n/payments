const CURRENCY_SYMBOL: Record<string, string> = {
  USD: '$',
  EUR: '€',
  RUB: '₽',
}

export type MoneyAmountParts = {
  integerPart: string
  fractionPart: string
}

function resolveCurrencyCode(currency: string): string {
  return currency.trim().toUpperCase()
}

export function getCurrencySymbol(currency: string): string {
  const code = resolveCurrencyCode(currency)

  return CURRENCY_SYMBOL[code] ?? code
}

function parseMoneyAmount(amount: number): { negative: boolean; whole: string; frac: string } {
  const value = Number.isFinite(amount) ? amount : 0
  const negative = value < 0
  const [whole, frac = '00'] = Math.abs(value).toFixed(2).split('.')

  return {
    negative,
    whole: Number(whole).toLocaleString('en-US'),
    frac,
  }
}

/** Сумма в двух частях для крупного UI: целая часть и дробная с символом валюты. */
export function formatMoneyAmountParts(amount: number, currency: string): MoneyAmountParts {
  const symbol = getCurrencySymbol(currency)
  const { negative, whole, frac } = parseMoneyAmount(amount)
  const sign = negative ? '-' : ''

  return {
    integerPart: `${sign}${whole}`,
    fractionPart: `.${frac}${symbol}`,
  }
}

/** Полная сумма с двумя знаками после запятой и символом валюты. */
export function formatGoalMoney(amount: number, currency: string): string {
  const symbol = getCurrencySymbol(currency)
  const formatted = amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return `${formatted} ${symbol}`
}

/** Сумма взноса/транзакции со знаком «+» или «−». */
export function formatContributionAmount(amount: number, currency: string): string {
  const sign = amount < 0 ? '−' : '+'
  const abs = Math.abs(amount)

  return `${sign}${formatGoalMoney(abs, currency)}`
}

/** Цифры, опциональный минус в начале, одна точка (до 5 знаков после неё). */
export function sanitizeAmountInput(raw: string): string {
  let normalized = raw.replace(/[^\d.-]/g, '')
  const isNegative = normalized.startsWith('-')

  normalized = normalized.replace(/-/g, '')
  if (isNegative) {
    normalized = `-${normalized}`
  }

  return (normalized.match(/^-?\d*(?:\.\d{0,5})?/) ?? [''])[0]
}

function formatCompactAmountUnit(unit: number): string {
  if (unit >= 100) {
    return String(Math.round(unit))
  }

  const oneDecimal = Math.round(unit * 10) / 10

  return Number.isInteger(oneDecimal) ? String(oneDecimal) : oneDecimal.toFixed(1)
}

/** Короткая запись суммы (k / M) без символа валюты. */
export function formatCompactAmount(value: number): string {
  if (!Number.isFinite(value)) {
    return '0'
  }

  const rounded = Math.round(value)
  const abs = Math.abs(rounded)
  const sign = rounded < 0 ? '-' : ''

  if (abs >= 1_000_000) {
    return `${sign}${formatCompactAmountUnit(abs / 1_000_000)}M`
  }

  if (abs >= 1000) {
    return `${sign}${formatCompactAmountUnit(abs / 1000)}k`
  }

  return String(rounded)
}

/** Короткая сумма с символом валюты (например `49.1k ₽`). */
export function formatCompactGoalMoney(amount: number, currency: string): string {
  const symbol = getCurrencySymbol(currency)

  return `${formatCompactAmount(amount)} ${symbol}`
}
