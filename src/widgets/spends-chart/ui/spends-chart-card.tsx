import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Loader2Icon } from 'lucide-react'
import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

import { useAppSelector } from '@/app/store'
import { selectDisplayGoalCurrency } from '@/entities/settings'
import { useGetTransactionsQuery } from '@/entities/transaction'
import { getCurrentMonthRange } from '@/shared/lib/date-utils'
import { INITIAL_CHART_DIMENSION } from '@/shared/ui/chart-constants'
import { DashboardSpendCategoryIcon } from '@/shared/ui/icons/category-icons'
import { ScrollArea } from '@/shared/ui/scroll-area'
import { cn } from '@/shared/ui/utils'

import { buildSpendsChartData } from '../lib/build-spends-chart-data'
import {
  formatSpendsPieTooltip,
  SPENDS_PIE_TOOLTIP_CONTENT_STYLE,
} from '../lib/format-spends-pie-tooltip'

export const SpendsChartCard = () => {
  const { t } = useTranslation('home')
  const displayCurrency = useAppSelector(selectDisplayGoalCurrency)
  const periodRange = useMemo(() => getCurrentMonthRange(), [])

  const { data, isLoading, isError } = useGetTransactionsQuery(
    {
      displayCurrency: displayCurrency!,
      params: { type: 'EXPENSE', ...periodRange },
    },
    { skip: !displayCurrency }
  )

  const chartRows = useMemo(() => {
    if (!displayCurrency) {
      return []
    }

    return buildSpendsChartData(data?.transactions, displayCurrency, t)
  }, [data?.transactions, displayCurrency, t])

  const pieData = useMemo(
    () =>
      chartRows.map(row => ({
        ...row,
        fill: row.color,
      })),
    [chartRows]
  )

  const currency = displayCurrency ?? 'USD'

  return (
    <section
      className={
        'overflow-hidden rounded-4xl bg-dashboard-card shadow-sm px-4 py-5 sm:px-6 sm:py-6 pr-3 sm:pr-4'
      }
    >
      <h2
        className={'mb-4 font-display text-base font-bold text-brand-purple sm:text-lg md:text-xl'}
      >
        {t('dashboard.monthlySpendsWheel')}
      </h2>

      {isError ? (
        <p
          className={
            'rounded-2xl bg-card/60 px-4 py-10 text-center font-display text-sm text-destructive sm:text-base'
          }
        >
          {t('transactionsPage.loadError')}
        </p>
      ) : isLoading ? (
        <div
          className={'flex min-h-80 items-center justify-center'}
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
        <div className={'flex flex-col items-stretch gap-6 md:flex-row md:items-stretch'}>
          <div className={'mx-auto h-80 w-full max-w-80 min-h-0 min-w-0 shrink-0 md:w-80'}>
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
                  outerRadius={'88%'}
                  paddingAngle={0}
                  strokeWidth={0}
                />
                <Tooltip
                  formatter={(value, name, item) =>
                    formatSpendsPieTooltip(value, name, item, currency)
                  }
                  contentStyle={SPENDS_PIE_TOOLTIP_CONTENT_STYLE}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <ScrollArea
            overflowFade
            overflowFadeFrom={'from-dashboard-card'}
            persistentScrollbarWhenOverflow
            className={'h-72 min-h-0 w-full flex-1 md:h-80 pr-2'}
          >
            <ul className={'flex flex-col gap-2 pr-2'}>
              {chartRows.map(row => (
                <li
                  key={row.categoryId}
                  className={'flex items-center gap-3 rounded-2xl bg-card/95 shadow-sm pr-3.5'}
                >
                  <span
                    className={'flex size-14 shrink-0 items-center justify-center rounded-xl'}
                    style={{ backgroundColor: row.color }}
                  >
                    <DashboardSpendCategoryIcon
                      name={row.icon}
                      className={'size-7 text-dashboard-on-chart-swatch'}
                    />
                  </span>
                  <span
                    className={cn(
                      'flex-1 text-left font-display text-xs text-brand-purple sm:text-sm'
                    )}
                  >
                    {row.name}
                  </span>
                  <span
                    className={
                      'min-w-26 shrink-0 rounded-lg bg-dashboard-expense-pill px-2.5 py-1.5 text-center font-display text-xs font-bold text-brand-purple sm:text-sm'
                    }
                  >
                    {row.formattedAmount}
                  </span>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </div>
      )}
    </section>
  )
}
