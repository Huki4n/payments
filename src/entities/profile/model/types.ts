import type { AppSettingsLanguage } from '@/shared/lib/app-settings-storage'

export type UserProfileResponse = {
  id: number
  firstName: string
  lastName: string
  phoneNumber: string
  language?: string
}

export type UpdateUserProfileRequest = {
  firstName: string
  lastName: string
  phoneNumber: string
  language?: string
}

export type ProfileSettingsFields = {
  name: string
  surname: string
  phone: string
  language: AppSettingsLanguage
}
