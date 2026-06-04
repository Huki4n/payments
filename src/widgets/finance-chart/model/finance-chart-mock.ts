export const FINANCE_CHART_MONTH_KEYS = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec',
] as const

export type FinanceChartMonthKey = (typeof FINANCE_CHART_MONTH_KEYS)[number]

export const financeChartData: { monthKey: FinanceChartMonthKey; value: number }[] = [
  { monthKey: 'jan', value: 420 },
  { monthKey: 'feb', value: 580 },
  { monthKey: 'mar', value: 910 },
  { monthKey: 'apr', value: 720 },
  { monthKey: 'may', value: 1100 },
  { monthKey: 'jun', value: 980 },
  { monthKey: 'jul', value: 1500 },
  { monthKey: 'aug', value: 2343 },
  { monthKey: 'sep', value: 1850 },
  { monthKey: 'oct', value: 1600 },
  { monthKey: 'nov', value: 1420 },
  { monthKey: 'dec', value: 1280 },
]
