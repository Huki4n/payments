import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { AppLayout } from '@/app/layouts'
import {
  ManualDataFormDialog,
  TransactionsActionButton,
  UploadBankStatementsDialog,
} from '@/features/transactions-action'
import { AccountBalance, useAccountHeader } from '@/widgets/account-balance'
import { HomeNavigation } from '@/widgets/home-navigation'

import { HomeCardsIllustration } from './profile-cards-illustration'

export const ProfilePage = () => {
  const { t } = useTranslation('home')
  const accountHeader = useAccountHeader()
  const [manualFormOpen, setManualFormOpen] = useState(false)
  const [uploadFormOpen, setUploadFormOpen] = useState(false)

  return (
    <AppLayout
      header={
        <>
          <HomeNavigation />
          <AccountBalance {...accountHeader} />
        </>
      }
    >
      <div
        className={
          'mx-auto max-w-3xl rounded-2xl bg-add-data-panel px-4 py-5 shadow-lg sm:rounded-3xl sm:px-6 sm:py-6 md:max-w-4xl md:px-8 md:py-8'
        }
      >
        <div className={'grid items-center gap-4 md:grid-cols-[0.9fr_1fr] md:gap-6 lg:gap-8'}>
          <HomeCardsIllustration className={'h-auto w-full max-w-full'} />

          <div className={'flex h-full flex-col gap-4 md:gap-5'}>
            <h2
              className={
                'font-display text-lg font-bold leading-tight text-text-brand-purple sm:text-xl md:text-2xl'
              }
            >
              {t('addData.title')}
            </h2>

            <div className={'flex flex-col gap-2.5'}>
              <TransactionsActionButton
                label={t('addData.manual')}
                onClick={() => setManualFormOpen(true)}
              />
              <p className={'text-center font-display text-xs text-brand-purple/70 sm:text-sm'}>
                {t('addData.or')}
              </p>
              <TransactionsActionButton
                label={t('addData.upload')}
                onClick={() => setUploadFormOpen(true)}
              />
            </div>
          </div>
        </div>
      </div>
      <ManualDataFormDialog open={manualFormOpen} onOpenChange={setManualFormOpen} />
      <UploadBankStatementsDialog open={uploadFormOpen} onOpenChange={setUploadFormOpen} />
    </AppLayout>
  )
}
