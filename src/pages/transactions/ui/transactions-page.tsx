import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { AppLayout } from '@/app/layouts'
import { TransactionsFilterBar } from '@/features/transactions-filter'
import { SPEND_CATEGORY_IDS } from '@/shared/config/spend-categories'
import { translateTransactionCategory } from '@/shared/config/transaction-categories'
import { AccountBalance, useAccountHeader } from '@/widgets/account-balance'
import { DashboardTransactionsCard, MonthSummaryTiles } from '@/widgets/dashboard-transactions'
import { HomeNavigation } from '@/widgets/home-navigation'
import { SpendsChartCard } from '@/widgets/spends-chart'

export const TransactionsPage = () => {
  const { t } = useTranslation('home')
  const accountHeader = useAccountHeader()

  const [nameQuery, setNameQuery] = useState('')
  const [amountQuery, setAmountQuery] = useState('')
  const [category, setCategory] = useState('all')

  const categoryOptions = SPEND_CATEGORY_IDS.map(id => ({
    value: id,
    label: translateTransactionCategory(t, id),
  }))

  return (
    <AppLayout
      header={
        <>
          <HomeNavigation />

          <AccountBalance {...accountHeader} />
        </>
      }
    >
      <div className={'rounded-t-4xl pb-12'}>
        <div className={'mx-auto flex max-w-5xl flex-col gap-6 md:gap-8'}>
          <MonthSummaryTiles
            earningsLabel={t('transactionsPage.totalMonthEarnings')}
            spendsLabel={t('transactionsPage.totalMonthSpends')}
          />

          <TransactionsFilterBar
            nameQuery={nameQuery}
            amountQuery={amountQuery}
            category={category}
            categories={categoryOptions}
            onNameChange={setNameQuery}
            onAmountChange={setAmountQuery}
            onCategoryChange={setCategory}
          />

          <DashboardTransactionsCard
            showSectionTitle={false}
            filter={{
              nameQuery,
              amountQuery,
              spendCategory: category,
            }}
            earningsTitle={t('dashboard.recentEarnings')}
            spendsTitle={t('dashboard.recentSpends')}
            addNewLabel={t('addData.manualForm.addNew')}
          />

          <SpendsChartCard />
        </div>
      </div>
    </AppLayout>
  )
}
