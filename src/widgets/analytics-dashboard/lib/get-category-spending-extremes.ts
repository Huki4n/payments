import type { SpendsChartRow } from '@/widgets/spends-chart/lib/build-spends-chart-data'

export type CategorySpendingExtremes = {
  most: SpendsChartRow | null
  least: SpendsChartRow | null
  mostPercent: number
  leastPercent: number
}

export function getCategorySpendingExtremes(rows: SpendsChartRow[]): CategorySpendingExtremes {
  if (rows.length === 0) {
    return { most: null, least: null, mostPercent: 0, leastPercent: 0 }
  }

  const total = rows.reduce((sum, row) => sum + row.value, 0)
  const sorted = [...rows].sort((a, b) => b.value - a.value)
  const most = sorted[0]!
  const least = sorted[sorted.length - 1]!

  if (total <= 0) {
    return { most, least, mostPercent: 0, leastPercent: 0 }
  }

  return {
    most,
    least,
    mostPercent: Math.round((most.value / total) * 100),
    leastPercent: Math.round((least.value / total) * 100),
  }
}
