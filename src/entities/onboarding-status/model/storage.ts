export const ONBOARDING_COMPLETED_STORAGE_KEY = 'onboarding-completed'

/** `true`, только если в localStorage записан флаг завершения онбординга. */
export const hasOnboardingCompleted = (): boolean => {
  try {
    return localStorage.getItem(ONBOARDING_COMPLETED_STORAGE_KEY) === 'true'
  } catch {
    return false
  }
}

/** @deprecated Используйте {@link hasOnboardingCompleted}. */
export const getOnboardingCompleted = hasOnboardingCompleted

export const markOnboardingCompleted = (): void => {
  try {
    localStorage.setItem(ONBOARDING_COMPLETED_STORAGE_KEY, 'true')
  } catch {
    // ignore: storage unavailable (private mode, quota, etc.)
  }
}

export const resetOnboardingCompleted = (): void => {
  try {
    localStorage.removeItem(ONBOARDING_COMPLETED_STORAGE_KEY)
  } catch {
    // ignore
  }
}
