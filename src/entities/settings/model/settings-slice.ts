import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { GoalCurrency } from '@/shared/config/currencies'

import {
  hasPersistedAppSettings,
  isAppSettingsCurrencyConfigured,
  readAppSettings,
  type AppSettingsColorScheme,
  type AppSettingsCurrency,
  type AppSettingsLanguage,
} from '@/shared/lib/app-settings-storage'
import { mapAppSettingsCurrencyToGoalCurrency } from '@/shared/lib/currency-exchange'

import { persistSettingsRequested } from './persist-settings-requested'

export type ProfileHydrationFields = {
  name: string
  surname: string
  phone: string
  language: AppSettingsLanguage
}

export interface SettingsState {
  currency: AppSettingsCurrency
  language: AppSettingsLanguage
  colorScheme: AppSettingsColorScheme
  name: string
  surname: string
  phone: string
  isPersisted: boolean
}

const initialState: SettingsState = {
  ...readAppSettings(),
  isPersisted: hasPersistedAppSettings(),
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setCurrency(state, action: PayloadAction<AppSettingsCurrency>) {
      state.currency = action.payload
    },
    setLanguage(state, action: PayloadAction<AppSettingsLanguage>) {
      state.language = action.payload
    },
    setColorScheme(state, action: PayloadAction<AppSettingsColorScheme>) {
      state.colorScheme = action.payload
    },
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload
    },
    setSurname(state, action: PayloadAction<string>) {
      state.surname = action.payload
    },
    setPhone(state, action: PayloadAction<string>) {
      state.phone = action.payload
    },
    hydrateFromProfile(state, action: PayloadAction<ProfileHydrationFields>) {
      state.name = action.payload.name
      state.surname = action.payload.surname
      state.phone = action.payload.phone
      state.language = action.payload.language
    },
  },
  extraReducers: builder => {
    builder.addCase(persistSettingsRequested, state => {
      state.isPersisted = true
    })
  },
})

export const {
  setCurrency,
  setLanguage,
  setColorScheme,
  setName,
  setSurname,
  setPhone,
  hydrateFromProfile,
} = settingsSlice.actions
export const settingsReducer = settingsSlice.reducer

export const selectSettings = (state: { settings: SettingsState }) => state.settings

export const selectIsCurrencyConfigured = (state: { settings: SettingsState }) =>
  state.settings.isPersisted && isAppSettingsCurrencyConfigured(state.settings.currency)

export const selectDisplayGoalCurrencySelector = (state: {
  settings: SettingsState
}): GoalCurrency | undefined => {
  if (!selectIsCurrencyConfigured(state)) {
    return undefined
  }

  return mapAppSettingsCurrencyToGoalCurrency(state.settings.currency)
}
