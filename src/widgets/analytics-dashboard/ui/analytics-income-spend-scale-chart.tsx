import { useId } from 'react'
import { useTranslation } from 'react-i18next'

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

import { getIncomeSpendYAxisConfig } from '../lib/get-income-spend-y-axis-config'
import { IncomeSpendScaleTooltipContent } from '../lib/income-spend-scale-chart-tooltip'
import { analyticsIncomeSpendScaleSeries } from '../model/analytics-mock'

const SPEND_STROKE = 'oklch(0.58 0.22 25)'

export const AnalyticsIncomeSpendScaleChart = () => {
  const { t } = useTranslation('home')
  const gid = useId().replace(/:/g, '')
  const data = [...analyticsIncomeSpendScaleSeries]
  const yAxis = getIncomeSpendYAxisConfig(data)

  return (
    <section className={'overflow-hidden rounded-4xl bg-dashboard-card px-4 py-5 shadow-sm sm:px-6 sm:py-6'}>
      <h2 className={'mb-4 text-center font-display-alternates text-lg font-bold text-foreground sm:mb-5 sm:text-xl md:text-2xl'}>
        {t('analyticsPage.incomeSpendScaleTitle')}
      </h2>

      <div className={'h-52 w-full min-w-0 sm:h-64 md:h-72'}>
        <ResponsiveContainer width={'100%'} height={'100%'} initialDimension={INITIAL_CHART_DIMENSION}>
          <AreaChart data={data} margin={{ top: 8, right: 12, left: 4, bottom: 8 }}>
            <defs>
              <linearGradient id={`income-scale-${gid}`} x1={'0'} y1={'0'} x2={'0'} y2={'1'}>
                <stop offset={'0%'} stopColor={'var(--brand-blue)'} stopOpacity={0.35} />
                <stop offset={'100%'} stopColor={'var(--brand-blue)'} stopOpacity={0} />
              </linearGradient>
              <linearGradient id={`spend-scale-${gid}`} x1={'0'} y1={'0'} x2={'0'} y2={'1'}>
                <stop offset={'0%'} stopColor={SPEND_STROKE} stopOpacity={0.32} />
                <stop offset={'100%'} stopColor={SPEND_STROKE} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray={'3 6'}
              stroke={'var(--dashboard-chart-grid-soft)'}
              vertical={false}
            />
            <XAxis
              dataKey={'month'}
              tick={dashboardChartXAxisTick}
              tickLine={false}
              axisLine={false}
              padding={{ left: 8, right: 8 }}
            />
            <YAxis
              domain={yAxis.domain}
              ticks={yAxis.ticks}
              tick={dashboardChartYAxisTick}
              tickLine={false}
              axisLine={false}
              width={44}
            />
            <Tooltip
              content={({ active, payload }) => (
                <IncomeSpendScaleTooltipContent
                  active={active}
                  payload={payload}
                  incomeLegend={t('analyticsPage.legendIncome')}
                  expenseLegend={t('analyticsPage.legendExpense')}
                />
              )}
              cursor={{
                stroke: 'var(--dashboard-chart-sky)',
                strokeWidth: 1,
                strokeDasharray: '4 4',
              }}
            />
            <Area
              type={'monotone'}
              dataKey={'spend'}
              name={'spend'}
              stroke={SPEND_STROKE}
              strokeWidth={2}
              fill={`url(#spend-scale-${gid})`}
              activeDot={{ r: 5, strokeWidth: 0 }}
              isAnimationActive={false}
            />
            <Area
              type={'monotone'}
              dataKey={'income'}
              name={'income'}
              stroke={'var(--brand-blue)'}
              strokeWidth={2}
              fill={`url(#income-scale-${gid})`}
              activeDot={{ r: 5, strokeWidth: 0 }}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
