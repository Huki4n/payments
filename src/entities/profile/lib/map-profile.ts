import type { SettingsState } from '@/entities/settings'
import type { AppSettingsLanguage } from '@/shared/lib/app-settings-storage'

import { detectAppLanguage } from '@/shared/lib/detect-app-language'

import type {
  ProfileSettingsFields,
  UpdateUserProfileRequest,
  UserProfileResponse,
} from '../model/types'

/** Нормализация телефона для API профиля: только цифры, без «+» (`7XXXXXXXXXX`). */
export function formatPhoneForProfileApi(raw: string): string {
  const digits = raw.replace(/\D/g, '')

  if (digits.length === 0) {
    return ''
  }

  if (digits.length === 11 && digits.startsWith('8')) {
    return `7${digits.slice(1)}`
  }

  if (digits.length === 10) {
    return `7${digits}`
  }

  return digits
}

function parseProfileLanguage(language?: string): AppSettingsLanguage {
  if (language === 'en' || language === 'ru') {
    return language
  }

  return detectAppLanguage()
}

export function mapProfileToSettingsFields(profile: UserProfileResponse): ProfileSettingsFields {
  return {
    name: profile.firstName?.trim() ?? '',
    surname: profile.lastName?.trim() ?? '',
    phone: profile.phoneNumber?.trim() ?? '',
    language: parseProfileLanguage(profile.language),
  }
}

export function mapSettingsToUpdateProfileRequest(
  settings: Pick<SettingsState, 'name' | 'surname' | 'phone' | 'language'>
): UpdateUserProfileRequest {
  return {
    firstName: settings.name.trim(),
    lastName: settings.surname.trim(),
    phoneNumber: formatPhoneForProfileApi(settings.phone),
    language: settings.language,
  }
}
