import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { renderWithRouter } from '@/shared/test'

import { HomeNavigation } from '../home-navigation'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const labels: Record<string, string> = {
        'nav.home': 'Home',
        'nav.transactions': 'Transactions',
        'nav.savings': 'Savings',
        'nav.analytics': 'Analytics',
        settingsAria: 'Settings',
        profileAria: 'Profile',
        menuAria: 'Navigation menu',
      }

      return labels[key] ?? key
    },
  }),
}))

describe('HomeNavigation', () => {
  it('renders mobile burger menu and settings button', () => {
    const { getByRole, getAllByLabelText } = renderWithRouter(<HomeNavigation />)

    expect(getByRole('button', { name: 'Navigation menu' })).toBeInTheDocument()
    expect(getAllByLabelText('Settings').length).toBeGreaterThan(0)
  })

  it('opens navigation sheet from burger menu', async () => {
    const user = userEvent.setup()

    const { getByRole, getAllByRole } = renderWithRouter(<HomeNavigation />)

    await user.click(getByRole('button', { name: 'Navigation menu' }))

    expect(getAllByRole('link', { name: 'Home' }).length).toBeGreaterThan(0)
    expect(getAllByRole('link', { name: 'Transactions' }).length).toBeGreaterThan(0)
    expect(getAllByRole('link', { name: 'Savings' }).length).toBeGreaterThan(0)
    expect(getAllByRole('link', { name: 'Analytics' }).length).toBeGreaterThan(0)
    expect(getAllByRole('link', { name: 'Profile' }).length).toBeGreaterThan(0)
  })

  it('renders desktop navigation links', () => {
    const { getAllByRole } = renderWithRouter(<HomeNavigation />)

    expect(getAllByRole('link', { name: 'Home' }).length).toBeGreaterThan(0)
    expect(getAllByRole('link', { name: 'Transactions' }).length).toBeGreaterThan(0)
    expect(getAllByRole('link', { name: 'Savings' }).length).toBeGreaterThan(0)
    expect(getAllByRole('link', { name: 'Analytics' }).length).toBeGreaterThan(0)
  })
})
