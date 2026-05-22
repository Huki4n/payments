import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { AppLayout } from '@/app/layouts'
import { useGetSavingsSlidesQuery } from '@/entities/goal'
import { EditGoalDialog } from '@/features/edit-goal'
import { AccountBalance } from '@/widgets/account-balance'
import { SavingsSwiper } from '@/widgets/dashboard-savings'
import { DashboardTransactionsCard } from '@/widgets/dashboard-transactions'
import { FinanceChartCard } from '@/widgets/finance-chart'
import { HomeNavigation } from '@/widgets/home-navigation'
import { SpendsChartCard } from '@/widgets/spends-chart'

export const HomePage = () => {
  const { t } = useTranslation('home')
  const [editGoalId, setEditGoalId] = useState<number | null>(null)
  const { data: slides = [], isLoading, isError } = useGetSavingsSlidesQuery()

  const editGoalHandler = (open: boolean) => {
    if (!open) setEditGoalId(null)
  }

  return (
    <AppLayout
      header={
        <>
          <HomeNavigation />
          <AccountBalance integerPart={'$1650'} fractionPart={'.40'} />
        </>
      }
    >
      <div className={'-mx-3 -mt-4 rounded-t-4xl px-3 pb-12 pt-6 sm:-mx-4 sm:px-4 md:pt-8'}>
        <div className={'mx-auto flex max-w-5xl flex-col gap-6 md:gap-8'}>
          <FinanceChartCard />
          <DashboardTransactionsCard />
          <SpendsChartCard />

          {isError ? (
            <p
              className={
                'rounded-4xl bg-dashboard-card px-6 py-10 text-center font-display text-lg text-destructive'
              }
            >
              {t('savingsPage.loadError')}
            </p>
          ) : (
            <SavingsSwiper
              showConfigureSavingsLink={false}
              showEditMenu
              onEditGoal={setEditGoalId}
              slides={slides}
              isLoading={isLoading}
              loadingMessage={t('savingsPage.loading')}
              emptyMessage={t('savingsPage.empty')}
            />
          )}
        </div>
      </div>

      <EditGoalDialog goalId={editGoalId} open={!!editGoalId} onOpenChange={editGoalHandler} />
    </AppLayout>
  )
}
