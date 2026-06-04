import { useTranslation } from 'react-i18next'

import { Loader2Icon } from 'lucide-react'

import { useAppSelector } from '@/app/store'
import { selectDisplayGoalCurrency } from '@/entities/settings'
import { useGetTransactionsQuery } from '@/entities/transaction'
import { formatCompactGoalMoney, formatGoalMoney } from '@/shared/lib/money-format'

import chartGreen from '../assets/chart_green.png'
import chartRed from '../assets/chart_red.png'
import { getAverageComparisonTrend } from '../lib/get-average-comparison-trend'
import { useAnalyticsPeriod } from '../model/analytics-period-context'

const TREND_CHART_IMAGE = {
  positive: chartGreen,
  negative: chartRed,
} as const

const EMPTY_LABEL = '—'

type AverageComparisonIllustrationProps = {
  trend: keyof typeof TREND_CHART_IMAGE
}

const AverageComparisonIllustration = ({ trend }: AverageComparisonIllustrationProps) => (
  <div
    className={
      'relative mx-auto w-full max-w-60 shrink-0 overflow-hidden rounded-2xl bg-card md:mx-0 md:max-w-100'
    }
  >
    <img src={TREND_CHART_IMAGE[trend]} alt={''} className={'h-auto w-full object-contain'} />
  </div>
)

export const AnalyticsAverageComparisonCard = () => {
  const { t } = useTranslation('home')
  const displayCurrency = useAppSelector(selectDisplayGoalCurrency)
  const { apiRange } = useAnalyticsPeriod()

  const { data, isLoading, isError } = useGetTransactionsQuery(
    { displayCurrency: displayCurrency!, params: apiRange },
    { skip: !displayCurrency }
  )

  const currency = displayCurrency ?? 'USD'
  const { averageIncome, averageExpense, averageNetProfit } = data ?? {}

  const trend = getAverageComparisonTrend(averageIncome, averageExpense)

  const dailySpending =
    averageExpense == null || !Number.isFinite(averageExpense)
      ? EMPTY_LABEL
      : formatGoalMoney(averageExpense, currency)

  const dailyIncome =
    averageIncome == null || !Number.isFinite(averageIncome)
      ? EMPTY_LABEL
      : formatGoalMoney(averageIncome, currency)

  const netProfitAmount =
    averageNetProfit == null || !Number.isFinite(averageNetProfit)
      ? EMPTY_LABEL
      : formatCompactGoalMoney(averageNetProfit, currency)

  const titleKey =
    trend === 'positive' ? 'analyticsPage.avgCompareTitle' : 'analyticsPage.avgCompareTitleNegative'

  const encouragementKey =
    trend === 'positive' ? 'analyticsPage.keepGoing' : 'analyticsPage.avgCompareKeepGoingNegative'

  return (
    <section
      className={
        'overflow-hidden rounded-2xl bg-dashboard-card px-3 py-4 shadow-sm sm:rounded-4xl sm:px-5 sm:py-5 md:px-6 md:py-6'
      }
    >
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
          className={'flex min-h-48 items-center justify-center'}
          role={'status'}
          aria-live={'polite'}
          aria-busy={'true'}
        >
          <Loader2Icon className={'size-10 animate-spin text-brand-blue sm:size-12'} aria-hidden />
        </div>
      ) : (
        <div className={'flex flex-col items-stretch gap-8 lg:flex-row'}>
          <AverageComparisonIllustration trend={trend} />

          <div className={'flex min-w-0 flex-1 flex-col gap-6 text-left'}>
            <h2
              className={
                'font-display-alternates text-xl font-bold leading-tight text-foreground sm:text-2xl md:text-3xl'
              }
            >
              {t(titleKey)}
            </h2>

            <p
              className={
                'font-display-alternates text-md font-normal leading-snug text-foreground md:text-lg'
              }
            >
              {t('analyticsPage.avgCompareStatsLead')}
              <span
                className={
                  'inline-block rounded-lg bg-dashboard-expense-pill px-2 font-bold sm:px-2.5'
                }
              >
                {dailySpending}
              </span>
              {t('analyticsPage.avgCompareStatsMiddle')}
              <span
                className={
                  'inline-block rounded-lg bg-dashboard-income-pill px-2 font-bold sm:px-2.5'
                }
              >
                {dailyIncome}
              </span>
            </p>

            <p className={'font-display-alternates text-base font-bold text-foreground sm:text-lg'}>
              {t(encouragementKey)}
            </p>

            <div
              className={
                'rounded-3xl bg-card px-4 py-4 text-center font-display-alternates text-lg font-bold text-foreground sm:py-5 sm:text-xl md:text-2xl'
              }
            >
              {t('analyticsPage.netProfit', {
                amount: netProfitAmount,
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
