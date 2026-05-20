import type { PieLabelRenderProps } from 'recharts'

export function renderSpendsPieLabel(props: PieLabelRenderProps) {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props

  if (
    cx == null ||
    cy == null ||
    midAngle == null ||
    innerRadius == null ||
    outerRadius == null ||
    percent == null ||
    percent < 0.04
  ) {
    return null
  }
  const RADIAN = Math.PI / 180
  const radius = innerRadius + (outerRadius - innerRadius) * 0.55
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill={'var(--dashboard-on-chart-swatch)'}
      textAnchor={'middle'}
      dominantBaseline={'central'}
      className={'font-display'}
      style={{ fontSize: 13, fontWeight: 700 }}
    >
      {`${Math.round(percent * 100)}%`}
    </text>
  )
}
