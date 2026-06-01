import type { GoalCurrency } from '@/shared/config/currencies'

import {
  isAppSettingsCurrencyConfigured,
  type AppSettingsCurrency,
} from '@/shared/lib/app-settings-storage'

import { normalizeCurrencyCode } from './normalize-currency-code'

export function mapAppSettingsCurrencyToGoalCurrency(currency: AppSettingsCurrency): GoalCurrency {
  if (!isAppSettingsCurrencyConfigured(currency)) {
    throw new Error('App settings currency is not configured')
  }

  return normalizeCurrencyCode(currency)
}
