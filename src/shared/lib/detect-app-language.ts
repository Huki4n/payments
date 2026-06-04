import LanguageDetector from 'i18next-browser-languagedetector'

export const APP_LANGUAGE_DETECTION_ORDER = ['navigator'] as const
export const APP_LANGUAGE_FALLBACK = 'en' as const
export const APP_SUPPORTED_LANGUAGES = ['en', 'ru'] as const

export type AppDetectedLanguage = (typeof APP_SUPPORTED_LANGUAGES)[number]

function normalizeDetectedLanguage(value: string | undefined): AppDetectedLanguage {
  const code = value?.split('-')[0]?.toLowerCase()

  if (code === 'en' || code === 'ru') {
    return code
  }

  return APP_LANGUAGE_FALLBACK
}

export function detectAppLanguage(): AppDetectedLanguage {
  const detector = new LanguageDetector()

  detector.init({
    order: [...APP_LANGUAGE_DETECTION_ORDER],
    caches: [],
  })

  const detected = detector.detect()
  const raw = Array.isArray(detected) ? detected[0] : detected

  return normalizeDetectedLanguage(typeof raw === 'string' ? raw : undefined)
}
