import { useTranslation } from 'react-i18next'

import { ArrowUpRight } from 'lucide-react'

import { analyticsAverageComparison } from '../model/analytics-mock'

const AverageComparisonIllustration = () => (
  <div
    className={
      'relative mx-auto w-full max-w-60 shrink-0 overflow-hidden rounded-2xl bg-card p-5 md:mx-0 md:max-w-100'
    }
    aria-hidden
  >
    <div
      className={
        'absolute bottom-5 left-5 flex size-12 items-center justify-center rounded-full bg-amber-400 shadow-md ring-2 ring-amber-500/35'
      }
    >
      <span className={'font-display text-lg font-bold leading-none text-amber-950'}>$</span>
    </div>

    <ArrowUpRight
      className={'absolute bottom-18 left-13 size-14 text-brand-blue sm:size-16'}
      strokeWidth={2.4}
      aria-hidden
    />

    <div className={'absolute bottom-5 right-5 flex h-[85%] items-end gap-2.5 sm:gap-3'}>
      <div className={'h-[55%] min-h-16 w-9 rounded-t-2xl bg-dashboard-expense-pill sm:w-10'} />
      <div className={'h-full min-h-24 w-9 rounded-t-2xl bg-dashboard-income-pill sm:w-10'} />
    </div>
  </div>
)

export const AnalyticsAverageComparisonCard = () => {
  const { t } = useTranslation('home')

  return (
    <section
      className={
        'overflow-hidden rounded-2xl bg-dashboard-card px-4 py-5 shadow-sm sm:rounded-4xl sm:px-6 sm:py-6 md:px-8 md:py-8'
      }
    >
      <div className={'flex flex-col items-stretch gap-8 lg:flex-row'}>
        <AverageComparisonIllustration />

        <div className={'flex min-w-0 flex-1 flex-col gap-6 text-left'}>
          <h2
            className={
              'font-display-alternates text-xl font-bold leading-tight text-foreground sm:text-2xl md:text-3xl'
            }
          >
            {t('analyticsPage.avgCompareTitle')}
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
              {analyticsAverageComparison.dailySpending}
            </span>
            {t('analyticsPage.avgCompareStatsMiddle')}
            <span
              className={
                'inline-block rounded-lg bg-dashboard-income-pill px-2 font-bold sm:px-2.5'
              }
            >
              {analyticsAverageComparison.dailyIncome}
            </span>
          </p>

          <p className={'font-display-alternates text-base font-bold text-foreground sm:text-lg'}>
            {t('analyticsPage.keepGoing')}
          </p>

          <div
            className={
              'rounded-3xl bg-card px-4 py-4 text-center font-display-alternates text-lg font-bold text-foreground sm:py-5 sm:text-xl md:text-2xl'
            }
          >
            {t('analyticsPage.netProfit', {
              percent: analyticsAverageComparison.netProfitPercent,
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
