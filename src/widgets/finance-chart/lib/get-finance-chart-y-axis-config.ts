const Y_MIN = 300
const Y_TICK_COUNT = 5

export function getFinanceChartYAxisConfig(
  series: ReadonlyArray<{ income: number; spend: number }>
): { domain: [number, number]; ticks: number[] } {
  const vals = series.flatMap(row => [row.income, row.spend])
  const dataMax = Math.max(...vals, 0)

  if (!Number.isFinite(dataMax) || dataMax === 0) {
    return {
      domain: [0, 1000],
      ticks: [200, 400, 600, 800, 1000],
    }
  }

  if (dataMax <= Y_MIN) {
    const ticks = Array.from({ length: Y_TICK_COUNT }, (_, index) => Y_MIN + index * 200)

    return {
      domain: [Y_MIN, ticks.at(-1)!],
      ticks,
    }
  }

  const paddedHigh = dataMax * 1.06
  const step = Math.max(
    100,
    Math.ceil((paddedHigh - Y_MIN) / (Y_TICK_COUNT - 1) / 100) * 100
  )
  const ticks = Array.from({ length: Y_TICK_COUNT }, (_, index) => Y_MIN + index * step)

  return {
    domain: [Y_MIN, ticks.at(-1)!],
    ticks,
  }
}
