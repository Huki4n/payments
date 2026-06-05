import { useId, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

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

import { useAppSelector } from '@/app/store'
import { selectDisplayGoalCurrency } from '@/entities/settings'
import { useGetTransactionsQuery } from '@/entities/transaction'
import { buildIncomeSpendDaySeries } from '@/shared/lib/build-income-spend-month-series'
import { dashboardChartXAxisTick, dashboardChartYAxisTick } from '@/shared/lib/dashboard-chart-axes'
import { formatCompactAmount } from '@/shared/lib/money-format'
import { INITIAL_CHART_DIMENSION } from '@/shared/ui/chart-constants'

import type { IncomeSpendScalePoint } from '../lib/build-income-spend-scale-series'

import { buildIncomeSpendScaleSeries } from '../lib/build-income-spend-scale-series'
import { formatAnalyticsChartMonthLabel } from '../lib/format-analytics-chart-month-label'
import { getIncomeSpendYAxisConfig } from '../lib/get-income-spend-y-axis-config'
import { IncomeSpendScaleTooltipContent } from '../lib/income-spend-scale-chart-tooltip'
import {
  chartRangeSpansMultipleYears,
  resolveAnalyticsChartRange,
  shouldUseIncomeSpendDayScale,
} from '../lib/resolve-analytics-chart-range'
import { useAnalyticsPeriod } from '../model/use-analytics-period'

const SPEND_STROKE = 'oklch(0.58 0.22 25)'

type IncomeSpendScaleChartRow = {
  month: string
  income: number
  spend: number
  periodDate: string
}

export const AnalyticsIncomeSpendScaleChart = () => {
  const { t } = useTranslation('home')
  const gid = useId().replace(/:/g, '')
  const displayCurrency = useAppSelector(selectDisplayGoalCurrency)
  const { apiRange, chartFrom, chartTo, preset } = useAnalyticsPeriod()

  const { data, isLoading, isError } = useGetTransactionsQuery(
    { displayCurrency: displayCurrency!, params: apiRange },
    { skip: !displayCurrency }
  )

  const chartData = useMemo((): IncomeSpendScaleChartRow[] => {
    const isoDates = (data?.transactions ?? []).map(tx => tx.operationDate)
    const { chartFrom: effectiveFrom, chartTo: effectiveTo } = resolveAnalyticsChartRange(
      preset,
      isoDates,
      chartFrom,
      chartTo
    )
    const useDayScale = shouldUseIncomeSpendDayScale(effectiveFrom, effectiveTo)

    if (useDayScale) {
      return buildIncomeSpendDaySeries(data?.transactions, effectiveFrom, effectiveTo).map(row => ({
        month: row.dayLabel,
        income: row.income,
        spend: row.spend,
        periodDate: row.periodDate,
      }))
    }

    const spansMultipleYears = chartRangeSpansMultipleYears(effectiveFrom, effectiveTo)
    const series: IncomeSpendScalePoint[] = buildIncomeSpendScaleSeries(
      data?.transactions,
      effectiveFrom,
      effectiveTo
    )

    return series.map(row => ({
      month: formatAnalyticsChartMonthLabel(
        row.monthId,
        t(`dashboard.months.${row.monthKey}`),
        spansMultipleYears
      ),
      income: row.income,
      spend: row.spend,
      periodDate: row.periodDate,
    }))
  }, [chartFrom, chartTo, data?.transactions, preset, t])

  const yAxis = useMemo(() => getIncomeSpendYAxisConfig(chartData), [chartData])

  return (
    <section
      className={
        'overflow-hidden rounded-4xl bg-dashboard-card px-4 py-5 shadow-sm sm:px-6 sm:py-6'
      }
    >
      <h2
        className={
          'mb-4 text-center font-display-alternates text-lg font-bold text-foreground sm:mb-5 sm:text-xl md:text-2xl'
        }
      >
        {t('analyticsPage.incomeSpendScaleTitle')}
      </h2>

      <div className={'relative h-52 w-full min-w-0 sm:h-64 md:h-72'}>
        {isLoading ? (
          <div className={'flex h-full items-center justify-center'}>
            <Loader2Icon className={'size-8 animate-spin text-brand-blue'} aria-hidden />
          </div>
        ) : (
          <ResponsiveContainer
            width={'100%'}
            height={'100%'}
            initialDimension={INITIAL_CHART_DIMENSION}
          >
            <AreaChart data={chartData} margin={{ top: 8, right: 12, left: 0, bottom: 8 }}>
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
                tickFormatter={formatCompactAmount}
                tickLine={false}
                axisLine={false}
                width={40}
              />
              <Tooltip
                content={({ active, payload }) => (
                  <IncomeSpendScaleTooltipContent
                    active={active}
                    payload={payload}
                    currency={displayCurrency ?? 'USD'}
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
        )}

        {isError && !isLoading ? (
          <p
            className={
              'pointer-events-none absolute inset-0 flex items-center justify-center text-center font-display text-sm text-brand-purple/70'
            }
          >
            {t('analyticsPage.loadError')}
          </p>
        ) : null}
      </div>
    </section>
  )
}
