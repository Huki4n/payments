import { useId, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { format } from 'date-fns'
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
import { formatContributionAmount, useGetGoalContributionsForPeriodQuery } from '@/entities/goal'
import { selectDisplayGoalCurrency } from '@/entities/settings'
import { formatCompactAmount, formatGoalMoney } from '@/shared/lib/money-format'
import { ScrollArea } from '@/shared/ui/scroll-area'

import {
  CHART_INITIAL_DIMENSION,
  EMPTY_CONTRIBUTIONS,
  EMPTY_LABEL,
  TOTAL_SAVED_X_TICK,
  TOTAL_SAVED_Y_TICK,
} from '../config/analytics-period-savings-chart'
import { buildPeriodSavingsChart } from '../lib/build-period-savings-chart'
import { formatAnalyticsChartMonthLabel } from '../lib/format-analytics-chart-month-label'
import { getPeriodSavingsYAxisConfig } from '../lib/get-period-savings-y-axis-config'
import {
  chartRangeSpansMultipleYears,
  resolveAnalyticsChartRange,
} from '../lib/resolve-analytics-chart-range'
import { useAnalyticsPeriod } from '../model/analytics-period-context'

export const AnalyticsPeriodSavingsCard = () => {
  const { t } = useTranslation('home')
  const gid = useId().replace(/:/g, '')
  const displayCurrency = useAppSelector(selectDisplayGoalCurrency)
  const { apiRange, chartFrom, chartTo, preset } = useAnalyticsPeriod()

  const { data, isLoading, isError } = useGetGoalContributionsForPeriodQuery(apiRange, {
    skip: !displayCurrency,
  })

  const currency = displayCurrency ?? 'USD'
  const contributions = useMemo(
    () => data?.contributions ?? EMPTY_CONTRIBUTIONS,
    [data?.contributions]
  )

  const periodTotal =
    data?.totalAmount == null || !Number.isFinite(data.totalAmount)
      ? EMPTY_LABEL
      : formatContributionAmount(data.totalAmount, currency)

  const replenishmentRows = [...contributions]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .map(item => ({
      id: item.id,
      date: format(new Date(item.createdAt), 'dd.MM.yyyy'),
      amount: formatContributionAmount(item.amount, currency),
    }))

  const chartSeries = useMemo(() => {
    const isoDates = contributions.map(item => item.createdAt)
    const { chartFrom: effectiveFrom, chartTo: effectiveTo } = resolveAnalyticsChartRange(
      preset,
      isoDates,
      chartFrom,
      chartTo
    )
    const spansMultipleYears = chartRangeSpansMultipleYears(effectiveFrom, effectiveTo)

    return buildPeriodSavingsChart(contributions, effectiveFrom, effectiveTo).map(row => ({
      ...row,
      month: formatAnalyticsChartMonthLabel(
        row.monthId,
        t(`dashboard.months.${row.monthKey}`),
        spansMultipleYears
      ),
    }))
  }, [chartFrom, chartTo, contributions, preset, t])

  const yAxis = getPeriodSavingsYAxisConfig(chartSeries.map(row => row.value))

  return (
    <section
      className={
        'flex min-h-100 flex-col overflow-hidden rounded-2xl bg-dashboard-card px-3 py-6 shadow-sm sm:px-5 sm:py-7 md:px-6 md:py-8'
      }
    >
      {isError ? (
        <p
          className={
            'flex flex-1 items-center justify-center rounded-2xl bg-card/60 px-4 py-10 text-center font-display text-sm text-brand-purple/70 sm:text-base'
          }
        >
          {t('analyticsPage.loadError')}
        </p>
      ) : (
        <div
          className={
            'flex min-h-0 flex-1 flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-6 xl:gap-8'
          }
        >
          <div className={'flex min-h-0 w-full min-w-0 flex-1 flex-col lg:max-w-md xl:max-w-lg'}>
            <h2
              className={
                'font-display-alternates text-xl font-bold leading-[1.05] text-brand-purple sm:text-2xl md:text-3xl'
              }
            >
              {t('analyticsPage.periodSavedTitle')}
            </h2>

            <div
              className={
                'mt-2 w-fit max-w-full rounded-md bg-dashboard-income-pill px-2 py-1 sm:px-2.5 sm:py-1.5 md:rounded-lg md:px-2.5 md:py-2'
              }
            >
              {isLoading ? (
                <div className={'flex min-h-12 items-center justify-center sm:min-h-16'}>
                  <Loader2Icon className={'size-8 animate-spin text-brand-blue'} aria-hidden />
                </div>
              ) : (
                <p
                  className={
                    'font-display text-4xl font-bold leading-none tracking-tight text-brand-purple sm:text-5xl md:text-6xl'
                  }
                >
                  {periodTotal}
                </p>
              )}
            </div>

            <div className={'mt-4 flex min-h-0 flex-1 flex-col'}>
              <p
                className={
                  'shrink-0 font-display-alternates text-sm font-normal text-brand-purple md:text-base'
                }
              >
                {t('dashboard.savingsReplenishments')}
              </p>

              {isLoading ? (
                <div className={'flex flex-1 items-center justify-center py-6'}>
                  <Loader2Icon className={'size-8 animate-spin text-brand-blue'} aria-hidden />
                </div>
              ) : replenishmentRows.length === 0 ? (
                <p
                  className={
                    'mt-2 flex flex-1 items-center justify-center rounded-[10px] bg-card px-3 py-4 text-center font-display-alternates text-sm text-brand-purple/70'
                  }
                >
                  {t('dashboard.spendsChartEmpty')}
                </p>
              ) : (
                <ScrollArea
                  persistentScrollbarWhenOverflow
                  className={'mt-2 min-h-0 flex-1 w-full pr-1'}
                >
                  <ul className={'flex flex-col gap-2 pr-2'}>
                    {replenishmentRows.map(row => (
                      <li
                        key={row.id}
                        className={
                          'flex min-h-11 items-center justify-between gap-2 rounded-[10px] bg-card px-2.5 py-2 sm:min-h-12 sm:px-3'
                        }
                      >
                        <span
                          className={
                            'font-display-alternates text-xs font-normal text-brand-purple sm:text-sm md:text-base'
                          }
                        >
                          {row.date}
                        </span>
                        <span
                          className={
                            'min-w-0 shrink-0 rounded-md bg-dashboard-income-pill px-2 py-1 text-center font-display-alternates text-xs font-bold text-brand-purple sm:min-w-32 sm:px-2.5 sm:py-1.5 sm:text-sm md:text-base'
                          }
                        >
                          {row.amount}
                        </span>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              )}
            </div>
          </div>

          <div
            className={'flex min-h-0 min-w-0 flex-1 flex-col rounded-[10px] bg-card py-2.5 sm:py-3'}
          >
            <h3
              className={
                'mb-1.5 px-2.5 font-display-alternates text-base font-bold text-brand-purple sm:px-3 sm:text-lg md:text-xl lg:mb-2'
              }
            >
              {t('analyticsPage.totalSavedChartTitle')}
            </h3>

            <div className={'relative min-h-0 w-full min-w-0 flex-1'}>
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
                      <linearGradient
                        id={`analytics-saved-${gid}`}
                        x1={'0'}
                        y1={'0'}
                        x2={'0'}
                        y2={'1'}
                      >
                        <stop
                          offset={'0%'}
                          stopColor={'var(--dashboard-chart-violet)'}
                          stopOpacity={0.55}
                        />
                        <stop
                          offset={'100%'}
                          stopColor={'var(--dashboard-chart-violet)'}
                          stopOpacity={0}
                        />
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
                            style={{
                              borderColor: 'var(--dashboard-tooltip-border)',
                            }}
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
          </div>
        </div>
      )}
    </section>
  )
}
