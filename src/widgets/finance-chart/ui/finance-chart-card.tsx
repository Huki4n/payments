import { useId } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { dashboardChartXAxisTick, dashboardChartYAxisTick } from '@/shared/lib/dashboard-chart-axes'
import { INITIAL_CHART_DIMENSION } from '@/shared/ui/chart-constants'

import { financeChartData } from '../model/finance-chart-mock'

export const FinanceChartCard = () => {
  const { t } = useTranslation('home')
  const gradientId = `dashboard-finance-chart-fill-${useId().replace(/:/g, '')}`

  return (
    <section className={'overflow-hidden rounded-4xl bg-dashboard-card  py-5 shadow-sm  sm:py-6'}>
      <div className={'flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between px-4 sm:px-6'}>
        <h2 className={'text-left font-display text-base font-bold text-brand-purple sm:text-lg md:text-xl'}>
          {t('dashboard.yearlyFinance')}
        </h2>
        <p className={'font-display text-xs text-brand-purple/70 sm:text-sm md:text-base'}>
          {t('dashboard.yearlyRange')}
        </p>
      </div>

      <div className={'mt-4 h-56 min-h-0 w-full min-w-0 sm:h-64 md:h-72'}>
        <ResponsiveContainer width={'100%'} height={'100%'} initialDimension={INITIAL_CHART_DIMENSION}>
          <AreaChart
            data={[...financeChartData]}
            margin={{ top: 8, right: 12, left: 12, bottom: 8 }}
          >
            <defs>
              <linearGradient id={gradientId} x1={'0'} y1={'0'} x2={'0'} y2={'1'}>
                <stop offset={'0%'} stopColor={'var(--brand-blue)'} stopOpacity={0.35} />
                <stop offset={'100%'} stopColor={'var(--brand-blue)'} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray={'3 6'}
              stroke={'var(--dashboard-chart-grid)'}
              vertical={false}
            />
            <XAxis
              dataKey={'month'}
              tick={dashboardChartXAxisTick}
              tickLine={false}
              axisLine={false}
              padding={{ right: 12, left: 12 }}
            />
            <YAxis
              domain={[100, 2500]}
              tick={dashboardChartYAxisTick}
              tickLine={false}
              axisLine={false}
              width={48}
            />
            <Tooltip
              content={({ active, payload, label }) =>
                active && payload?.length ? (
                  <div
                    className={'rounded-xl border bg-card px-3 py-2 shadow-md'}
                    style={{ borderColor: 'var(--dashboard-tooltip-border)' }}
                  >
                    <p className={'font-display text-xs text-brand-purple/80'}>{String(label)}</p>
                    <p className={'font-display text-sm font-semibold text-brand-purple'}>
                      {payload[0]?.value}$
                    </p>
                  </div>
                ) : null
              }
            />
            <Area
              type={'monotone'}
              dataKey={'value'}
              stroke={'var(--brand-blue)'}
              strokeWidth={2}
              fill={`url(#${gradientId})`}
              activeDot={{
                r: 6,
                fill: 'var(--brand-blue)',
                stroke: 'var(--background)',
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className={'mt-5 flex justify-center'}>
        <Link
          to={'/analytics'}
          className={'inline-flex min-h-11 w-full max-w-md items-center justify-center rounded-xl bg-brand-purple-bg px-6 font-display text-sm font-bold text-white transition-colors hover:bg-brand-purple-bg/90 sm:text-base'}
        >
          {t('dashboard.exploreYearly')}
        </Link>
      </div>
    </section>
  )
}
