import { formatGoalMoney } from '@/entities/goal'

type TooltipRow = {
  periodDate: string
  income: number
  spend: number
}

export type IncomeSpendChartTooltipProps = {
  active?: boolean
  payload?: readonly { payload?: unknown }[]
  currency: string
  incomeLegend: string
  expenseLegend: string
}

export function IncomeSpendChartTooltip({
  active,
  payload,
  currency,
  incomeLegend,
  expenseLegend,
}: IncomeSpendChartTooltipProps) {
  if (!active || !payload?.length) {
    return null
  }

  const row = payload[0]?.payload as TooltipRow | undefined

  if (!row) {
    return null
  }

  return (
    <div
      className={'min-w-40 rounded-xl border bg-card px-3 py-2 shadow-md'}
      style={{
        borderColor: 'var(--dashboard-tooltip-border)',
      }}
    >
      <p className={'font-display-alternates text-xs text-brand-purple/70'}>{row.periodDate}</p>
      <p className={'mt-1 font-display-alternates text-sm font-bold text-brand-purple'}>
        {incomeLegend}: {formatGoalMoney(row.income, currency)}
      </p>
      <p className={'font-display-alternates text-sm font-bold text-brand-purple'}>
        {expenseLegend}: {formatGoalMoney(row.spend, currency)}
      </p>
    </div>
  )
}
