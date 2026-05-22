import { beforeEach, describe, expect, it } from 'vitest'

import { markOnboardingCompleted } from '@/entities/onboarding-status/model/storage'
import { renderWithRouter } from '@/shared/test'

import { RequireOnboarding } from '../require-onboarding'

describe('RequireOnboarding', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('redirects to onboarding when it is not completed', () => {
    const { getByText, queryByText } = renderWithRouter(
      <RequireOnboarding>
        <div>App content</div>
      </RequireOnboarding>,
      {
        routerProps: {
          initialEntries: ['/'],
        },
      }
    )

    expect(getByText('onboarding page')).toBeInTheDocument()
    expect(queryByText('App content')).not.toBeInTheDocument()
  })

  it('renders children when onboarding is completed', () => {
    markOnboardingCompleted()

    const { getByText } = renderWithRouter(
      <RequireOnboarding>
        <div>App content</div>
      </RequireOnboarding>,
      {
        routerProps: {
          initialEntries: ['/'],
        },
      }
    )

    expect(getByText('App content')).toBeInTheDocument()
  })
})
