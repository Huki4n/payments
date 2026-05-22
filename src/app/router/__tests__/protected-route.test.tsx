import { beforeEach, describe, expect, it } from 'vitest'

import {
  markOnboardingCompleted,
  resetOnboardingCompleted,
} from '@/entities/onboarding-status/model/storage'
import { tokenStorage } from '@/shared/lib/token-storage'
import { renderWithRouter } from '@/shared/test'

import { ProtectedRoute } from '../protected-route'

describe('ProtectedRoute', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('redirects to auth without token', () => {
    markOnboardingCompleted()

    const { getByText, queryByText } = renderWithRouter(
      <ProtectedRoute>
        <div>Dashboard</div>
      </ProtectedRoute>,
      {
        routerProps: {
          initialEntries: ['/'],
        },
      }
    )

    expect(getByText('auth page')).toBeInTheDocument()
    expect(queryByText('Dashboard')).not.toBeInTheDocument()
  })

  it('redirects to onboarding when token exists but onboarding is incomplete', () => {
    tokenStorage.setTokens('access-token')
    resetOnboardingCompleted()

    const { getByText, queryByText } = renderWithRouter(
      <ProtectedRoute>
        <div>Dashboard</div>
      </ProtectedRoute>,
      {
        routerProps: {
          initialEntries: ['/'],
        },
      }
    )

    expect(getByText('onboarding page')).toBeInTheDocument()
    expect(queryByText('Dashboard')).not.toBeInTheDocument()
  })

  it('renders children when auth and onboarding are completed', () => {
    tokenStorage.setTokens('access-token')
    markOnboardingCompleted()

    const { getByText } = renderWithRouter(
      <ProtectedRoute>
        <div>Dashboard</div>
      </ProtectedRoute>,
      {
        routerProps: {
          initialEntries: ['/'],
        },
      }
    )

    expect(getByText('Dashboard')).toBeInTheDocument()
  })
})
