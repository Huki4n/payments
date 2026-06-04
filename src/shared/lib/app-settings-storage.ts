import { detectAppLanguage } from './detect-app-language'

const APP_SETTINGS_KEY = 'app_settings'
const LEGACY_LANGUAGE_KEY = 'language'

export const APP_SETTINGS_CURRENCY_UNSET = 'none' as const
export const APP_SETTINGS_CURRENCIES = ['usd', 'eur', 'rub'] as const
export type AppSettingsCurrency =
  | typeof APP_SETTINGS_CURRENCY_UNSET
  | (typeof APP_SETTINGS_CURRENCIES)[number]

export function isAppSettingsCurrencyConfigured(
  currency: AppSettingsCurrency
): currency is (typeof APP_SETTINGS_CURRENCIES)[number] {
  return currency !== APP_SETTINGS_CURRENCY_UNSET
}

export const APP_SETTINGS_LANGUAGES = ['en', 'ru'] as const
export type AppSettingsLanguage = (typeof APP_SETTINGS_LANGUAGES)[number]

export const APP_SETTINGS_COLOR_SCHEMES = ['light', 'dark'] as const
export type AppSettingsColorScheme = (typeof APP_SETTINGS_COLOR_SCHEMES)[number]

const profileDefaults = {
  name: '',
  surname: '',
  phone: '',
} as const

export interface AppSettingsPersisted {
  currency: AppSettingsCurrency
  language: AppSettingsLanguage
  colorScheme: AppSettingsColorScheme
  name: string
  surname: string
  phone: string
}

function createDefaultAppSettings(): AppSettingsPersisted {
  return {
    ...profileDefaults,
    currency: APP_SETTINGS_CURRENCY_UNSET,
    language: detectAppLanguage(),
    colorScheme: 'light',
  }
}

function parseString(value: unknown, fallback: string): string {
  return typeof value === 'string' ? value : fallback
}

function parseCurrency(value: unknown): AppSettingsCurrency {
  if (value === APP_SETTINGS_CURRENCY_UNSET) {
    return APP_SETTINGS_CURRENCY_UNSET
  }

  if (typeof value === 'string' && (APP_SETTINGS_CURRENCIES as readonly string[]).includes(value)) {
    return value as AppSettingsCurrency
  }

  return APP_SETTINGS_CURRENCY_UNSET
}

function parseLanguage(value: unknown): AppSettingsLanguage {
  if (typeof value === 'string' && (APP_SETTINGS_LANGUAGES as readonly string[]).includes(value)) {
    return value as AppSettingsLanguage
  }

  return detectAppLanguage()
}

function parseColorScheme(value: unknown): AppSettingsColorScheme {
  if (
    typeof value === 'string' &&
    (APP_SETTINGS_COLOR_SCHEMES as readonly string[]).includes(value)
  ) {
    return value as AppSettingsColorScheme
  }

  return createDefaultAppSettings().colorScheme
}

export function hasPersistedAppSettings(): boolean {
  try {
    return localStorage.getItem(APP_SETTINGS_KEY) !== null
  } catch {
    return false
  }
}

export function readAppSettings(): AppSettingsPersisted {
  try {
    const raw = localStorage.getItem(APP_SETTINGS_KEY)

    if (raw) {
      const parsed = JSON.parse(raw) as Record<string, unknown>

      return {
        currency: parseCurrency(parsed.currency),
        language: parseLanguage(parsed.language),
        colorScheme: parseColorScheme(parsed.colorScheme),
        name: parseString(parsed.name, profileDefaults.name),
        surname: parseString(parsed.surname, profileDefaults.surname),
        phone: parseString(parsed.phone, profileDefaults.phone),
      }
    }
  } catch {
    /* ignore */
  }

  try {
    const legacy = localStorage.getItem(LEGACY_LANGUAGE_KEY)

    if (legacy === 'en' || legacy === 'ru') {
      return { ...createDefaultAppSettings(), language: legacy }
    }
  } catch {
    /* ignore */
  }

  return createDefaultAppSettings()
}

export function writeAppSettings(settings: AppSettingsPersisted): void {
  try {
    localStorage.setItem(APP_SETTINGS_KEY, JSON.stringify(settings))
  } catch {
    /* ignore */
  }
}
