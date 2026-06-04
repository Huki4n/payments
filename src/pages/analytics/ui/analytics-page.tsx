import { AppLayout } from '@/app/layouts'
import { AccountBalance, useAccountHeader } from '@/widgets/account-balance'
import {
  AnalyticsAverageComparisonCard,
  AnalyticsDayHighlightCards,
  AnalyticsIncomeExpenseChart,
  AnalyticsIncomeSpendScaleChart,
  AnalyticsPeriodProvider,
  AnalyticsPeriodSavingsCard,
  AnalyticsPeriodSelector,
} from '@/widgets/analytics-dashboard'
import { HomeNavigation } from '@/widgets/home-navigation'

export const AnalyticsPage = () => {
  const accountHeader = useAccountHeader()

  return (
    <AppLayout
      header={
        <>
          <HomeNavigation />
          <AccountBalance {...accountHeader} />
        </>
      }
    >
      <div className={'-mx-3 -mt-4 rounded-t-4xl px-3 pb-12 pt-6 sm:-mx-4 sm:px-4 md:pt-8'}>
        <AnalyticsPeriodProvider>
          <div className={'mx-auto flex max-w-5xl flex-col gap-6 md:gap-8'}>
            <AnalyticsPeriodSelector />
            <AnalyticsIncomeSpendScaleChart />
            <AnalyticsDayHighlightCards />
            <AnalyticsIncomeExpenseChart />
            <AnalyticsAverageComparisonCard />
            <AnalyticsPeriodSavingsCard />
          </div>
        </AnalyticsPeriodProvider>
      </div>
    </AppLayout>
  )
}
