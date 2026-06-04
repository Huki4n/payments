import { useId, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

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
import {
  formatIsoDateDisplay,
  getCurrentMonthRange,
  parseIsoDateLocal,
} from '@/shared/lib/date-utils'
import { IncomeSpendChartTooltip } from '@/shared/lib/income-spend-chart-tooltip'
import { formatCompactAmount } from '@/shared/lib/money-format'
import { INITIAL_CHART_DIMENSION } from '@/shared/ui/chart-constants'

import { getFinanceChartYAxisConfig } from '../lib/get-finance-chart-y-axis-config'

const SPEND_STROKE = 'oklch(0.58 0.22 25)'

export const FinanceChartCard = () => {
  const { t } = useTranslation('home')
  const gid = useId().replace(/:/g, '')

  const displayCurrency = useAppSelector(selectDisplayGoalCurrency)
  const periodRange = useMemo(() => getCurrentMonthRange(), [])

  const { fromDate } = periodRange

  const monthRangeLabel = t('dashboard.monthRange', {
    from: formatIsoDateDisplay(fromDate),
  })
  const { data, isLoading, isError } = useGetTransactionsQuery(
    { displayCurrency: displayCurrency!, params: periodRange },
    { skip: !displayCurrency }
  )

  const chartFrom = useMemo(() => parseIsoDateLocal(periodRange.fromDate), [periodRange.fromDate])
  const chartTo = useMemo(() => parseIsoDateLocal(periodRange.toDate), [periodRange.toDate])
  const chartData = useMemo(
    () => buildIncomeSpendDaySeries(data?.transactions, chartFrom, chartTo),
    [chartFrom, chartTo, data?.transactions]
  )

  const yAxis = useMemo(() => getFinanceChartYAxisConfig(chartData), [chartData])

  return (
    <section className={'overflow-hidden rounded-4xl bg-dashboard-card py-5 shadow-sm sm:py-6'}>
      <div
        className={'flex flex-col gap-2 px-4 sm:flex-row sm:items-start sm:justify-between sm:px-6'}
      >
        <h2
          className={
            'text-left font-display text-base font-bold text-brand-purple sm:text-lg md:text-xl'
          }
        >
          {t('dashboard.monthFinance')}
        </h2>

        <p className={'font-display text-xs text-brand-purple/70 sm:text-sm md:text-base'}>
          {monthRangeLabel}
        </p>
      </div>

      <div className={'relative mt-4 h-56 min-h-0 w-full min-w-0 sm:h-64 md:h-72'}>
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
            <AreaChart data={chartData} margin={{ top: 8, right: 12, left: 12, bottom: 8 }}>
              <defs>
                <linearGradient id={`finance-income-${gid}`} x1={'0'} y1={'0'} x2={'0'} y2={'1'}>
                  <stop offset={'0%'} stopColor={'var(--brand-blue)'} stopOpacity={0.35} />

                  <stop offset={'100%'} stopColor={'var(--brand-blue)'} stopOpacity={0} />
                </linearGradient>

                <linearGradient id={`finance-spend-${gid}`} x1={'0'} y1={'0'} x2={'0'} y2={'1'}>
                  <stop offset={'0%'} stopColor={SPEND_STROKE} stopOpacity={0.32} />

                  <stop offset={'100%'} stopColor={SPEND_STROKE} stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray={'3 6'}
                stroke={'var(--dashboard-chart-grid)'}
                vertical={false}
              />

              <XAxis
                dataKey={'dayLabel'}
                minTickGap={24}
                tick={dashboardChartXAxisTick}
                tickLine={false}
                axisLine={false}
                padding={{ right: 12, left: 12 }}
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
                  <IncomeSpendChartTooltip
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
                fill={`url(#finance-spend-${gid})`}
                activeDot={{ r: 5, strokeWidth: 0 }}
                isAnimationActive={false}
              />

              <Area
                type={'monotone'}
                dataKey={'income'}
                name={'income'}
                stroke={'var(--brand-blue)'}
                strokeWidth={2}
                fill={`url(#finance-income-${gid})`}
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

      <div className={'mt-5 flex justify-center px-4 sm:px-6'}>
        <Link
          to={'/analytics'}
          className={
            'inline-flex min-h-11 w-full max-w-md items-center justify-center rounded-xl bg-brand-purple-bg px-6 font-display text-sm font-bold text-white transition-colors hover:bg-brand-purple-bg/90 sm:text-base'
          }
        >
          {t('dashboard.exploreMonth')}
        </Link>
      </div>
    </section>
  )
}
