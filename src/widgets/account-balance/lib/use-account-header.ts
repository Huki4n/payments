import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { useAppSelector } from '@/app/store'
import { selectDisplayGoalCurrency, selectSettings } from '@/entities/settings'
import { useGetTransactionsQuery } from '@/entities/transaction'
import { formatMoneyAmountParts } from '@/shared/lib/money-format'

const EMPTY_BALANCE = { integerPart: '—', fractionPart: '' }

export function useAccountHeader() {
  const { t } = useTranslation('home')
  const { name } = useAppSelector(selectSettings)
  const displayCurrency = useAppSelector(selectDisplayGoalCurrency)

  const { data, isLoading, isError } = useGetTransactionsQuery(
    { displayCurrency: displayCurrency! },
    { skip: !displayCurrency }
  )

  const balance = data?.balance

  const balanceParts = useMemo(() => {
    if (isError || !displayCurrency || balance == null) {
      return EMPTY_BALANCE
    }

    return formatMoneyAmountParts(balance, displayCurrency)
  }, [balance, displayCurrency, isError])

  const displayName = name.trim() || t('profile.fallbackName')

  return {
    welcomeText: t('welcome', { name: displayName }),
    balanceLabel: t('balanceLabel'),
    integerPart: balanceParts.integerPart,
    fractionPart: balanceParts.fractionPart,
    isBalanceLoading: isLoading,
  }
}
