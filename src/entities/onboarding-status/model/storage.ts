const STORAGE_KEY = 'onboarding-completed'

export const getOnboardingCompleted = (): boolean => {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'true'
  } catch {
    return false
  }
}

export const markOnboardingCompleted = (): void => {
  try {
    localStorage.setItem(STORAGE_KEY, 'true')
  } catch {
    // ignore: storage unavailable (private mode, quota, etc.)
  }
}

export const resetOnboardingCompleted = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore
  }
}
