const TICK_COUNT = 5

export function getPeriodSavingsYAxisConfig(values: number[]): {
  domain: [number, number]
  ticks: number[]
} {
  const maxVal = Math.max(...values, 0)
  const top = Math.max(Math.ceil((maxVal * 1.08) / 1000) * 1000, 1000)
  const step = top / TICK_COUNT

  return {
    domain: [0, top],
    ticks: Array.from({ length: TICK_COUNT }, (_, i) => (i + 1) * step),
  }
}
