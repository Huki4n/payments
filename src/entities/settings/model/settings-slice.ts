import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import {
  readAppSettings,
  type AppSettingsColorScheme,
  type AppSettingsCurrency,
  type AppSettingsLanguage,
} from '@/shared/lib/app-settings-storage'

export interface SettingsState {
  currency: AppSettingsCurrency
  language: AppSettingsLanguage
  colorScheme: AppSettingsColorScheme
  name: string
  surname: string
  country: string
  phone: string
  email: string
}

const initialState: SettingsState = readAppSettings()

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
    setCountry(state, action: PayloadAction<string>) {
      state.country = action.payload
    },
    setPhone(state, action: PayloadAction<string>) {
      state.phone = action.payload
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload
    },
  },
})

export const {
  setCurrency,
  setLanguage,
  setColorScheme,
  setName,
  setSurname,
  setCountry,
  setPhone,
  setEmail,
} = settingsSlice.actions
export const settingsReducer = settingsSlice.reducer

export const selectSettings = (state: { settings: SettingsState }) => state.settings
