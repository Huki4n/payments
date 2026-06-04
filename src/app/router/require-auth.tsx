import type { ReactElement } from 'react'
import { Navigate } from 'react-router-dom'

import { ProfileBootstrap } from '@/app/providers/profile-bootstrap'
import { tokenStorage } from '@/shared/lib/token-storage'

interface RequireAuthProps {
  children: ReactElement
}

export const RequireAuth = ({ children }: RequireAuthProps) => {
  if (!tokenStorage.getAccessToken()) {
    return <Navigate to={'/auth'} replace />
  }

  return <ProfileBootstrap>{children}</ProfileBootstrap>
}
