import { beforeEach, describe, expect, it } from 'vitest'

import {
  getOnboardingCompleted,
  markOnboardingCompleted,
  resetOnboardingCompleted,
} from '../storage'

describe('onboarding storage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns false when onboarding is not completed', () => {
    expect(getOnboardingCompleted()).toBe(false)
  })

  it('marks onboarding as completed', () => {
    markOnboardingCompleted()

    expect(getOnboardingCompleted()).toBe(true)
  })

  it('resets onboarding completion flag', () => {
    markOnboardingCompleted()

    resetOnboardingCompleted()

    expect(getOnboardingCompleted()).toBe(false)
  })
})
