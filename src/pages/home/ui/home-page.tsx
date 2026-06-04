import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { AppLayout } from '@/app/layouts'
import { useAppSelector } from '@/app/store'
import { useGetSavingsSlidesQuery } from '@/entities/goal'
import { selectDisplayGoalCurrency } from '@/entities/settings'
import { EditGoalDialog } from '@/features/edit-goal'
import {
  CurrencySettingsRequiredNotice,
  useCurrencySettingsGate,
} from '@/features/require-settings-currency'
import { AccountBalance, useAccountHeader } from '@/widgets/account-balance'
import { SavingsSwiper } from '@/widgets/dashboard-savings'
import { DashboardTransactionsCard } from '@/widgets/dashboard-transactions'
import { FinanceChartCard } from '@/widgets/finance-chart'
import { HomeNavigation } from '@/widgets/home-navigation'
import { SpendsChartCard } from '@/widgets/spends-chart'

export const HomePage = () => {
  const { t } = useTranslation('home')
  const accountHeader = useAccountHeader()
  const { isCurrencyConfigured } = useCurrencySettingsGate()
  const displayCurrency = useAppSelector(selectDisplayGoalCurrency)
  const [editGoalId, setEditGoalId] = useState<number | null>(null)
  const {
    data: slides = [],
    isLoading,
    isError,
  } = useGetSavingsSlidesQuery(displayCurrency!, {
    skip: !displayCurrency,
  })

  const editGoalHandler = (open: boolean) => {
    if (!open) setEditGoalId(null)
  }

  return (
    <AppLayout
      header={
        <>
          <HomeNavigation />
          <AccountBalance {...accountHeader} />
        </>
      }
    >
      <div className={'rounded-t-4xl px-3 pb-12 pt-6 sm:px-4 md:pt-8'}>
        <div className={'mx-auto flex max-w-5xl flex-col gap-6 md:gap-8'}>
          <FinanceChartCard />
          <DashboardTransactionsCard
            skipApi={!displayCurrency}
            sectionTitle={t('dashboard.transactionsTitle')}
            earningsTitle={t('dashboard.recentEarnings')}
            spendsTitle={t('dashboard.recentSpends')}
            addNewLabel={t('addData.manualForm.addNew')}
          />
          <SpendsChartCard />

          {!isCurrencyConfigured ? (
            <CurrencySettingsRequiredNotice />
          ) : isError ? (
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
              editMenuAria={t('savingsPage.editGoal.menuAria')}
            />
          )}
        </div>
      </div>

      <EditGoalDialog goalId={editGoalId} open={!!editGoalId} onOpenChange={editGoalHandler} />
    </AppLayout>
  )
}
