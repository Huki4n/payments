export {
  settingsReducer,
  settingsSlice,
  setCurrency,
  setLanguage,
  setColorScheme,
  setName,
  setSurname,
  setCountry,
  setPhone,
  setEmail,
  selectSettings,
  selectIsCurrencyConfigured,
  selectDisplayGoalCurrencySelector as selectDisplayGoalCurrency,
  type SettingsState,
} from './model/settings-slice'
export { persistSettingsRequested } from './model/persist-settings-requested'
