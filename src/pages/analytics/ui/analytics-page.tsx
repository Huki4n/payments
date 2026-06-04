import { useTranslation } from 'react-i18next'

import { AppLayout } from '@/app/layouts'
import { AccountBalance } from '@/widgets/account-balance'
import {
  AnalyticsAverageComparisonCard,
  AnalyticsDayHighlightCards,
  AnalyticsIncomeExpenseChart,
  AnalyticsIncomeSpendScaleChart,
  AnalyticsPeriodSavingsCard,
  AnalyticsPeriodSelector,
} from '@/widgets/analytics-dashboard'
import { HomeNavigation } from '@/widgets/home-navigation'

export const AnalyticsPage = () => {
  const { t } = useTranslation('home')

  return (
    <AppLayout
      header={
        <>
          <HomeNavigation />
          <AccountBalance
            welcomeText={t('welcome', { name: 'Rodion' })}
            balanceLabel={t('balanceLabel')}
            integerPart={'$1650'}
            fractionPart={'.40'}
          />
        </>
      }
    >
      <div className={'-mx-3 -mt-4 rounded-t-4xl px-3 pb-12 pt-6 sm:-mx-4 sm:px-4 md:pt-8'}>
        <div className={'mx-auto flex max-w-5xl flex-col gap-6 md:gap-8'}>
          <AnalyticsPeriodSelector />
          <AnalyticsIncomeSpendScaleChart />
          <AnalyticsDayHighlightCards />
          <AnalyticsIncomeExpenseChart />
          <AnalyticsAverageComparisonCard />
          <AnalyticsPeriodSavingsCard />
        </div>
      </div>
    </AppLayout>
  )
}
