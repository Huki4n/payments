import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { AppLayout } from '@/app/layouts'
import { TransactionsFilterBar } from '@/features/transactions-filter'
import { AccountBalance } from '@/widgets/account-balance'
import {
  DashboardTransactionsCard,
  MonthSummaryTiles,
  earningsMock,
  spendsMock,
} from '@/widgets/dashboard-transactions'
import { HomeNavigation } from '@/widgets/home-navigation'
import { SpendsChartCard, spendsChartPie } from '@/widgets/spends-chart'

export const TransactionsPage = () => {
  const { t } = useTranslation('home')
  const [nameQuery, setNameQuery] = useState('')
  const [amountQuery, setAmountQuery] = useState('')
  const [category, setCategory] = useState('all')

  const categoryOptions = useMemo(
    () => spendsChartPie.map(row => ({ value: row.categoryId, label: row.name })),
    []
  )

  const filteredEarnings = useMemo(() => {
    const n = nameQuery.trim().toLowerCase()
    const a = amountQuery.trim().toLowerCase()

    return earningsMock.filter(row => {
      if (n && !row.label.toLowerCase().includes(n)) {
        return false
      }
      if (a && !row.amount.toLowerCase().includes(a)) {
        return false
      }

      return true
    })
  }, [amountQuery, nameQuery])

  const filteredSpends = useMemo(() => {
    const n = nameQuery.trim().toLowerCase()
    const a = amountQuery.trim().toLowerCase()

    return spendsMock.filter(row => {
      if (category !== 'all' && row.category !== category) {
        return false
      }
      if (n && !row.label.toLowerCase().includes(n)) {
        return false
      }
      if (a && !row.amount.toLowerCase().includes(a)) {
        return false
      }

      return true
    })
  }, [amountQuery, category, nameQuery])

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
      <div className={'rounded-t-4xl pb-12'}>
        <div className={'mx-auto flex max-w-5xl flex-col gap-6 md:gap-8'}>
          <MonthSummaryTiles
            integerPart={'$1650'}
            fractionPart={'.40'}
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
            earningsRows={filteredEarnings}
            spendsRows={filteredSpends}
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
