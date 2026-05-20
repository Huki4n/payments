const Y_TICK_COUNT = 5

export function getIncomeSpendYAxisConfig(
  series: ReadonlyArray<{ income: number; spend: number }>
): { domain: [number, number]; ticks: number[] } {
  const vals = series.flatMap(r => [r.income, r.spend])
  const dataMin = Math.min(...vals)
  const dataMax = Math.max(...vals)

  if (!Number.isFinite(dataMin) || !Number.isFinite(dataMax)) {
    return {
      domain: [100, 1000],
      ticks: [200, 400, 600, 800, 1000],
    }
  }

  const paddedLow = dataMin * 0.94
  const paddedHigh = dataMax * 1.06
  const span = Math.max(paddedHigh - paddedLow, 1)
  const stepGuess = span / (Y_TICK_COUNT - 1)
  const step = Math.max(50, Math.ceil(stepGuess / 100) * 100)

  let upper = Math.ceil((dataMax * 1.04) / step) * step
  let lower = upper - step * (Y_TICK_COUNT - 1)

  while (upper < paddedHigh) {
    upper += step
    lower += step
  }
  while (lower > paddedLow && lower - step > 0) {
    lower -= step
    upper -= step
  }

  let ticks = Array.from({ length: Y_TICK_COUNT }, (_, i) => lower + i * step)

  if (ticks[0]! <= 0) {
    ticks = ticks.filter(v => v > 0)
    while (ticks.length < Y_TICK_COUNT) {
      const last = ticks.at(-1)!

      ticks.push(last + step)
    }
  }

  const lastTick = ticks.at(-1)!
  const domainLow = Math.min(paddedLow, ticks[0]!)
  const domainHigh = Math.max(paddedHigh, lastTick)

  return {
    domain: [domainLow, domainHigh],
    ticks,
  }
}
