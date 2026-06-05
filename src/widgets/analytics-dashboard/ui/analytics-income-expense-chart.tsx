import { useMemo, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { Loader2Icon } from 'lucide-react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

import { useAppSelector } from '@/app/store'
import { selectDisplayGoalCurrency } from '@/entities/settings'
import { useGetTransactionsQuery } from '@/entities/transaction'
import { formatGoalMoney } from '@/shared/lib/money-format'
import { INITIAL_CHART_DIMENSION } from '@/shared/ui/chart-constants'
import { DashboardSpendCategoryIcon } from '@/shared/ui/icons/category-icons'
import { Progress } from '@/shared/ui/progress'
import { ScrollArea } from '@/shared/ui/scroll-area'
import { cn } from '@/shared/ui/utils'
import {
  buildSpendsChartData,
  formatSpendsPieTooltip,
  SPENDS_PIE_TOOLTIP_CONTENT_STYLE,
} from '@/widgets/spends-chart'

import { getCategorySpendingExtremes } from '../lib/get-category-spending-extremes'
import { renderSpendsPieLabel } from '../lib/render-spends-pie-label'
import { useAnalyticsPeriod } from '../model/use-analytics-period'

const CATEGORY_SWATCH_CLASS =
  'flex h-13 w-14 shrink-0 items-center justify-center rounded-xl sm:h-14 sm:w-14'

function renderCategorySwatches(rows: ReturnType<typeof buildSpendsChartData>): ReactNode {
  return rows.map(row => (
    <span
      key={row.categoryId}
      className={CATEGORY_SWATCH_CLASS}
      style={{ backgroundColor: row.color }}
      title={row.name}
    >
      <DashboardSpendCategoryIcon
        name={row.icon}
        className={'size-7 text-dashboard-on-chart-swatch'}
      />
    </span>
  ))
}

export const AnalyticsIncomeExpenseChart = () => {
  const { t } = useTranslation('home')
  const displayCurrency = useAppSelector(selectDisplayGoalCurrency)
  const { apiRange } = useAnalyticsPeriod()

  const { data, isLoading, isError } = useGetTransactionsQuery(
    {
      displayCurrency: displayCurrency!,
      params: { type: 'EXPENSE', ...apiRange },
    },
    { skip: !displayCurrency }
  )

  const chartRows = useMemo(() => {
    if (!displayCurrency) {
      return []
    }

    return buildSpendsChartData(data?.transactions, displayCurrency, t)
  }, [data?.transactions, displayCurrency, t])

  const pieData = useMemo(() => chartRows.map(row => ({ ...row })), [chartRows])

  const extremes = useMemo(() => getCategorySpendingExtremes(chartRows), [chartRows])

  const currency = displayCurrency ?? 'USD'

  const topCaption =
    extremes.most &&
    t('analyticsPage.topCategoryCaption', {
      category: extremes.most.name,
      amount: formatGoalMoney(extremes.most.value, currency),
    })

  const lowestCaption =
    extremes.least &&
    t('analyticsPage.lowestCategoryCaption', {
      category: extremes.least.name,
      amount: formatGoalMoney(extremes.least.value, currency),
    })

  return (
    <section
      className={
        'overflow-hidden rounded-[17px] bg-dashboard-card px-3 py-4 shadow-sm sm:rounded-[20px] sm:px-5 sm:py-5 md:px-6 md:py-6'
      }
    >
      <h2
        className={
          'mb-3 font-display text-sm font-bold text-brand-purple sm:mb-4 sm:text-base md:text-lg'
        }
      >
        {t('analyticsPage.categorySpendsWheelTitle')}
      </h2>

      {isError ? (
        <p
          className={
            'rounded-2xl bg-card/60 px-4 py-10 text-center font-display text-sm text-brand-purple/70 sm:text-base'
          }
        >
          {t('analyticsPage.loadError')}
        </p>
      ) : isLoading ? (
        <div
          className={'flex min-h-90 items-center justify-center'}
          role={'status'}
          aria-live={'polite'}
          aria-busy={'true'}
        >
          <Loader2Icon className={'size-10 animate-spin text-brand-blue sm:size-12'} aria-hidden />
        </div>
      ) : chartRows.length === 0 ? (
        <p
          className={
            'rounded-2xl bg-card/60 px-4 py-10 text-center font-display text-sm text-muted-foreground sm:text-base'
          }
        >
          {t('dashboard.spendsChartEmpty')}
        </p>
      ) : (
        <div className={'flex flex-col items-stretch gap-4 lg:flex-row lg:gap-5 xl:gap-6'}>
          <div
            className={
              'mx-auto my-auto h-90 w-full max-w-90 min-h-0 min-w-0 shrink-0 sm:h-90 sm:max-w-90 md:h-90 md:max-w-90'
            }
          >
            <ResponsiveContainer
              width={'100%'}
              height={'100%'}
              initialDimension={INITIAL_CHART_DIMENSION}
            >
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey={'value'}
                  nameKey={'name'}
                  cx={'50%'}
                  cy={'50%'}
                  innerRadius={0}
                  outerRadius={'98%'}
                  paddingAngle={0}
                  strokeWidth={0}
                  label={renderSpendsPieLabel}
                  labelLine={false}
                  isAnimationActive={false}
                >
                  {pieData.map(entry => (
                    <Cell key={entry.categoryId} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name, item) =>
                    formatSpendsPieTooltip(value, name, item, currency)
                  }
                  contentStyle={SPENDS_PIE_TOOLTIP_CONTENT_STYLE}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div
            className={cn(
              'w-full min-w-0 shrink-0 overflow-x-auto overscroll-x-contain touch-pan-x lg:hidden',
              '[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden'
            )}
          >
            <div className={'flex w-max flex-row gap-2.5'}>
              {renderCategorySwatches(chartRows)}
            </div>
          </div>

          <ScrollArea
            hideScrollbar
            className={cn(
              'hidden min-h-0 shrink-0 lg:block lg:w-14',
              'lg:max-h-[calc(6*3.5rem+5*0.625rem)]'
            )}
          >
            <div className={'flex flex-col gap-2.5'}>{renderCategorySwatches(chartRows)}</div>
          </ScrollArea>

          <div
            className={
              'flex min-h-0 min-w-0 flex-1 flex-col justify-around gap-4 rounded-2xl bg-card px-3 py-4 shadow-sm sm:gap-5 sm:px-4 sm:py-5 md:rounded-3xl lg:self-stretch font-display-alternates'
            }
          >
            <h3
              className={
                'w-full text-center font-display-alternates text-base font-bold leading-none text-foreground sm:text-lg'
              }
            >
              {t('analyticsPage.mostLowestCategoriesTitle')}
            </h3>

            <div className={'w-full min-w-0'}>
              <div className={'flex flex-col gap-2.5 sm:gap-3'}>
                <div className={'flex items-center gap-2.5'}>
                  {extremes.most ? (
                    <DashboardSpendCategoryIcon
                      name={extremes.most.icon}
                      className={'size-15 shrink-0 text-brand-purple sm:size-16'}
                    />
                  ) : null}
                  <Progress
                    value={extremes.mostPercent}
                    className={
                      'h-6 w-full rounded-full border border-brand-purple/30 bg-white **:data-[slot=progress-indicator]:bg-dashboard-chart-teal dark:bg-card'
                    }
                  />
                </div>

                <p
                  className={
                    'text-left text-md font-normal leading-snug text-foreground sm:text-lg'
                  }
                >
                  {topCaption}
                </p>
              </div>
            </div>

            <div className={'w-full min-w-0'}>
              <div className={'flex flex-col gap-2.5 sm:gap-3'}>
                <div className={'flex items-center gap-2.5'}>
                  {extremes.least ? (
                    <DashboardSpendCategoryIcon
                      name={extremes.least.icon}
                      className={'size-15 shrink-0 text-brand-purple sm:size-16'}
                    />
                  ) : null}
                  <Progress
                    value={extremes.leastPercent}
                    className={
                      'h-6 w-full rounded-full border border-brand-purple/30 bg-white **:data-[slot=progress-indicator]:bg-brand-blue dark:bg-card'
                    }
                  />
                </div>
                <p
                  className={
                    'text-left text-md font-normal leading-snug text-foreground sm:text-lg'
                  }
                >
                  {lowestCaption}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
