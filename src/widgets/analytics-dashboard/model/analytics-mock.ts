/** Доход и расход по месяцам (аналитика). */
export const analyticsIncomeExpenseSeries = [
  { month: 'Jan', income: 1200, expense: 980 },
  { month: 'Feb', income: 1400, expense: 1100 },
  { month: 'Mar', income: 1350, expense: 1250 },
  { month: 'Apr', income: 1600, expense: 1180 },
  { month: 'May', income: 1750, expense: 1320 },
  { month: 'Jun', income: 1580, expense: 1290 },
  { month: 'Jul', income: 1820, expense: 1400 },
  { month: 'Aug', income: 1900, expense: 1350 },
  { month: 'Sep', income: 1650, expense: 1210 },
  { month: 'Oct', income: 1700, expense: 1380 },
  { month: 'Nov', income: 1850, expense: 1420 },
  { month: 'Dec', income: 1950, expense: 1510 },
] as const

/** Двойной area-chart «Income & Spend scale» (макет Figma 8:1672). */
export const analyticsIncomeSpendScaleSeries = [
  { month: 'Jan', income: 1180, spend: 240, periodDate: '01.01.2026' },
  { month: 'Feb', income: 1380, spend: 1890, periodDate: '01.02.2026' },
  { month: 'Mar', income: 1280, spend: 780, periodDate: '01.03.2026' },
  { month: 'Apr', income: 1520, spend: 1080, periodDate: '01.04.2026' },
  { month: 'May', income: 1920, spend: 1280, periodDate: '01.05.2026' },
  { month: 'Jun', income: 1620, spend: 920, periodDate: '01.06.2026' },
  { month: 'Jul', income: 1480, spend: 1120, periodDate: '01.07.2026' },
  { month: 'Aug', income: 2343, spend: 1180, periodDate: '01.08.2025' },
  { month: 'Sep', income: 1560, spend: 980, periodDate: '01.09.2026' },
  { month: 'Oct', income: 1720, spend: 1420, periodDate: '01.10.2026' },
  { month: 'Nov', income: 1620, spend: 1760, periodDate: '01.11.2026' },
  { month: 'Dec', income: 1480, spend: 2180, periodDate: '01.12.2026' },
] as const

export const analyticsDayHighlights = {
  bestDayLabel: '13. Aug',
  bestDayAmount: '2343$',
  worstDayLabel: '11. Dec',
  worstDayAmount: '2343$',
} as const

export const analyticsCategoryExtremes = {
  mostKey: 'catShopping' as const,
  mostPercent: 88,
  leastKey: 'catOther' as const,
  leastPercent: 12,
} as const

/** Тексты карточки справа (аналитика), не из API */
export const analyticsCategoryNarrativeAmounts = {
  most: '1528$',
  least: '0,28$',
} as const

export const analyticsSavingsList = [
  { date: '03.04.2026', amount: '+140,13 $' },
  { date: '03.04.2026', amount: '+500,00 $' },
  { date: '15.03.2026', amount: '+200,00 $' },
] as const

export const analyticsTotalSavedSeries = [
  { month: 'Jan', value: 3200 },
  { month: 'Feb', value: 5100 },
  { month: 'Mar', value: 7800 },
  { month: 'Apr', value: 10200 },
  { month: 'May', value: 12600 },
  { month: 'Jun', value: 14100 },
] as const

export const analyticsNetProfitPercent = 72

export const analyticsAverageComparison = {
  dailySpending: '23$',
  dailyIncome: '79$',
} as const

export const analyticsTotalSavedAmount = '+15000$'
