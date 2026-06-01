import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { AppLayout } from '@/app/layouts'
import { useAppSelector } from '@/app/store'
import { useGetSavingsSlidesQuery } from '@/entities/goal'
import { selectDisplayGoalCurrency } from '@/entities/settings'
import { CreateGoalDialog } from '@/features/create-goal'
import { EditGoalDialog } from '@/features/edit-goal'
import {
  CurrencySettingsRequiredNotice,
  useCurrencySettingsGate,
} from '@/features/require-settings-currency'
import { Button } from '@/shared/ui'
import { AccountBalance } from '@/widgets/account-balance'
import { SavingsSwiper } from '@/widgets/dashboard-savings'
import { HomeNavigation } from '@/widgets/home-navigation'

export const SavesPage = () => {
  const { t } = useTranslation('home')
  const { isCurrencyConfigured } = useCurrencySettingsGate()
  const displayCurrency = useAppSelector(selectDisplayGoalCurrency)
  const { data: slides = [], isLoading, isError } = useGetSavingsSlidesQuery(displayCurrency!, {
    skip: !displayCurrency,
  })
  const [createGoalOpen, setCreateGoalOpen] = useState(false)
  const [editGoalId, setEditGoalId] = useState<number | null>(null)

  const editGoalHandler = (open: boolean) => {
    if (!open) setEditGoalId(null)
  }

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
      <div className={'rounded-t-4xl px-3 pb-12 sm:px-4'}>
        <div className={'mx-auto flex max-w-5xl flex-col gap-2'}>
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
          <div className={'flex justify-end'}>
            <Button
              type={'button'}
              disabled={!isCurrencyConfigured}
              onClick={() => setCreateGoalOpen(true)}
              className={
                'h-10 rounded-xl bg-brand-purple-bg px-5 font-display text-xs font-bold text-white hover:bg-brand-purple-bg/90 sm:text-sm'
              }
            >
              {t('savingsPage.addNewSaving')}
            </Button>
          </div>
        </div>
      </div>

      <CreateGoalDialog open={createGoalOpen} onOpenChange={setCreateGoalOpen} />
      <EditGoalDialog goalId={editGoalId} open={!!editGoalId} onOpenChange={editGoalHandler} />
    </AppLayout>
  )
}
