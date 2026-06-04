import { initReactI18next } from 'react-i18next'

import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import { readAppSettings } from '@/shared/lib/app-settings-storage'
import {
  APP_LANGUAGE_DETECTION_ORDER,
  APP_LANGUAGE_FALLBACK,
  APP_SUPPORTED_LANGUAGES,
} from '@/shared/lib/detect-app-language'

import en from './locales/en.json'
import ru from './locales/ru.json'

export const SUPPORTED_LANGUAGES = APP_SUPPORTED_LANGUAGES
export const DEFAULT_LANGUAGE = APP_LANGUAGE_FALLBACK
export const DEFAULT_NS = 'onboarding'

const persisted = readAppSettings()
const hasStoredSettings = (() => {
  try {
    return localStorage.getItem('app_settings') !== null
  } catch {
    return false
  }
})()

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en,
      ru,
    },
    ...(hasStoredSettings ? { lng: persisted.language } : {}),
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: [...SUPPORTED_LANGUAGES],
    nonExplicitSupportedLngs: true,
    detection: {
      order: [...APP_LANGUAGE_DETECTION_ORDER],
      caches: [],
    },
    ns: ['onboarding', 'home', 'settings'],
    defaultNS: DEFAULT_NS,
    interpolation: {
      escapeValue: false,
    },
    returnNull: false,
  })

export { i18n }
