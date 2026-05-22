import { beforeEach, describe, expect, it } from 'vitest'

import { tokenStorage } from '@/shared/lib/token-storage'
import { renderWithRouter } from '@/shared/test'

import { RequireAuth } from '../require-auth'

describe('RequireAuth', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('redirects to auth when access token is missing', () => {
    const { getByText, queryByText } = renderWithRouter(
      <RequireAuth>
        <div>Protected content</div>
      </RequireAuth>,
      {
        routerProps: {
          initialEntries: ['/'],
        },
      }
    )

    expect(getByText('auth page')).toBeInTheDocument()
    expect(queryByText('Protected content')).not.toBeInTheDocument()
  })

  it('renders children when access token exists', () => {
    tokenStorage.setTokens('access-token')

    const { getByText } = renderWithRouter(
      <RequireAuth>
        <div>Protected content</div>
      </RequireAuth>,
      {
        routerProps: {
          initialEntries: ['/'],
        },
      }
    )

    expect(getByText('Protected content')).toBeInTheDocument()
  })
})
