import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '@/app/store'
import { selectIsCurrencyConfigured } from '@/entities/settings'

import { showCurrencyRequiredToast } from './show-currency-required-toast'

export function useCurrencySettingsGate() {
  const navigate = useNavigate()
  const isCurrencyConfigured = useAppSelector(selectIsCurrencyConfigured)
  const { t } = useTranslation('settings')
  const notifiedRef = useRef(false)

  useEffect(() => {
    if (isCurrencyConfigured || notifiedRef.current) {
      return
    }

    notifiedRef.current = true
    showCurrencyRequiredToast(
      t('requireCurrency.title'),
      t('requireCurrency.description'),
      t('requireCurrency.action'),
      () => navigate('/settings')
    )
  }, [isCurrencyConfigured, navigate, t])

  return { isCurrencyConfigured }
}
