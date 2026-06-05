import type { ReactElement } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { hasOnboardingCompleted } from '@/entities/onboarding-status'

interface RequireOnboardingProps {
  children: ReactElement
}

const ONBOARDING_ENTRY_PATH = '/onboarding/welcome'

/** Доступ к приложению только после `onboarding-completed` в localStorage. */
export const RequireOnboarding = ({ children }: RequireOnboardingProps) => {
  const location = useLocation()

  if (!hasOnboardingCompleted()) {
    return <Navigate to={ONBOARDING_ENTRY_PATH} replace state={{ from: location }} />
  }

  return children
}
