import type { ReactElement } from 'react'

import { RequireAuth } from './require-auth'
import { RequireOnboarding } from './require-onboarding'

interface ProtectedRouteProps {
  children: ReactElement
}

/** Доступ только с accessToken и завершённым онбордингом. */
export const ProtectedRoute = ({ children }: ProtectedRouteProps) => (
  <RequireOnboarding>
    <RequireAuth>{children}</RequireAuth>
  </RequireOnboarding>
)
