import { createBrowserRouter, Navigate } from 'react-router-dom'

import { AnalyticsPage } from '@/pages/analytics/ui/analytics-page'
import { CongratulationsPage } from '@/pages/auth/congratulations'
import { PinPage } from '@/pages/auth/pin'
import { PinConfirmPage } from '@/pages/auth/pin-confirm'
import { AuthPage } from '@/pages/auth/ui/auth-page'
import { HomePage } from '@/pages/home/ui/home-page'
import { ProtectionPage } from '@/pages/onboarding/protection'
import { SavingsPage } from '@/pages/onboarding/savings'
import { TradingPage } from '@/pages/onboarding/trading'
import { WelcomePage } from '@/pages/onboarding/welcome'
import { ProfilePage } from '@/pages/profile/ui/profile-page'
import { SavesPage } from '@/pages/saves/ui/saves-page'
import { SettingsPage } from '@/pages/settings/ui/settings-page'
import { TransactionsPage } from '@/pages/transactions/ui/transactions-page'

import { ProtectedRoute } from './protected-route'
import { RequireAuth } from './require-auth'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  { path: '/auth', element: <AuthPage /> },
  { path: '/auth/pin', element: <PinPage /> },
  { path: '/auth/pin/confirm', element: <PinConfirmPage /> },
  { path: '/auth/congratulations', element: <CongratulationsPage /> },
  {
    path: '/onboarding',
    element: <Navigate to={'/onboarding/welcome'} replace />,
  },
  { path: '/onboarding/welcome', element: <WelcomePage /> },
  { path: '/onboarding/trading', element: <TradingPage /> },
  { path: '/onboarding/savings', element: <SavingsPage /> },
  { path: '/onboarding/protection', element: <ProtectionPage /> },
  {
    path: '/transactions',
    element: (
      <ProtectedRoute>
        <TransactionsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/analytics',
    element: (
      <ProtectedRoute>
        <AnalyticsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/saves',
    element: (
      <ProtectedRoute>
        <SavesPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/settings',
    element: (
      <ProtectedRoute>
        <SettingsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: (
      <RequireAuth>
        <Navigate to={'/'} replace />
      </RequireAuth>
    ),
  },
])
