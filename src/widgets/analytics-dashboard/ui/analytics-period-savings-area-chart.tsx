import { Loader2Icon } from 'lucide-react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import type { GoalCurrency } from '@/shared/config/currencies'

import { formatCompactAmount, formatGoalMoney } from '@/shared/lib/money-format'

import type { PeriodSavingsChartPoint } from '../lib/build-period-savings-chart'

import {
  CHART_INITIAL_DIMENSION,
  TOTAL_SAVED_X_TICK,
  TOTAL_SAVED_Y_TICK,
} from '../config/analytics-period-savings-chart'

type AnalyticsPeriodSavingsAreaChartProps = {
  gid: string
  isLoading: boolean
  chartSeries: (PeriodSavingsChartPoint & { month: string })[]
  yAxis: { domain: [number, number]; ticks: number[] }
  currency: GoalCurrency
}

export const AnalyticsPeriodSavingsAreaChart = ({
  gid,
  isLoading,
  chartSeries,
  yAxis,
  currency,
}: AnalyticsPeriodSavingsAreaChartProps) => (
  <div className={'relative h-52 w-full min-w-0 sm:h-60 md:h-64 lg:min-h-0 lg:h-auto lg:flex-1'}>
    {isLoading ? (
      <div className={'flex h-full items-center justify-center'}>
        <Loader2Icon className={'size-8 animate-spin text-brand-blue'} aria-hidden />
      </div>
    ) : (
      <ResponsiveContainer
        width={'100%'}
        height={'100%'}
        initialDimension={CHART_INITIAL_DIMENSION}
      >
        <AreaChart data={chartSeries} margin={{ top: 4, right: 6, left: 2, bottom: 6 }}>
          <defs>
            <linearGradient id={`analytics-saved-${gid}`} x1={'0'} y1={'0'} x2={'0'} y2={'1'}>
              <stop offset={'0%'} stopColor={'var(--dashboard-chart-violet)'} stopOpacity={0.55} />
              <stop offset={'100%'} stopColor={'var(--dashboard-chart-violet)'} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray={'3 6'}
            stroke={'var(--dashboard-chart-grid-soft)'}
            vertical={false}
          />
          <XAxis
            dataKey={'month'}
            tick={TOTAL_SAVED_X_TICK}
            tickLine={false}
            axisLine={false}
            padding={{ right: 3, left: 3 }}
          />
          <YAxis
            domain={yAxis.domain}
            ticks={yAxis.ticks}
            tick={TOTAL_SAVED_Y_TICK}
            tickFormatter={formatCompactAmount}
            tickLine={false}
            axisLine={false}
            width={40}
          />
          <Tooltip
            content={({ active, payload }) =>
              active && payload?.length ? (
                <div
                  className={'rounded-lg border bg-card px-2 py-1.5 shadow-md'}
                  style={{ borderColor: 'var(--dashboard-tooltip-border)' }}
                >
                  <p
                    className={
                      'font-display-alternates text-xs font-semibold text-brand-purple sm:text-sm'
                    }
                  >
                    {formatGoalMoney(Number(payload[0]?.value ?? 0), currency)}
                  </p>
                </div>
              ) : null
            }
          />
          <Area
            type={'monotone'}
            dataKey={'value'}
            stroke={'var(--dashboard-chart-violet)'}
            strokeWidth={1.15}
            fill={`url(#analytics-saved-${gid})`}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    )}
  </div>
)
