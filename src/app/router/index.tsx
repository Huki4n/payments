import { createBrowserRouter, Navigate } from "react-router-dom";

import { AnalyticsPage } from "@/pages/analytics/ui/analytics-page";
import { AuthPage } from "@/pages/auth/ui/auth-page";
import { CongratulationsPage } from "@/pages/auth/congratulations";
import { PinConfirmPage } from "@/pages/auth/pin-confirm";
import { PinPage } from "@/pages/auth/pin";
import { HomePage } from "@/pages/home/ui/home-page";
import { ProtectionPage } from "@/pages/onboarding/protection";
import { SavingsPage } from "@/pages/onboarding/savings";
import { TradingPage } from "@/pages/onboarding/trading";
import { WelcomePage } from "@/pages/onboarding/welcome";
import { ProfilePage } from "@/pages/profile/ui/profile-page";
import { SavesPage } from "@/pages/saves/ui/saves-page";
import { SettingsPage } from "@/pages/settings/ui/settings-page";
import { TransactionsPage } from "@/pages/transactions/ui/transactions-page";

import { RequireOnboarding } from "./require-onboarding";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireOnboarding>
        <HomePage />
      </RequireOnboarding>
    ),
  },
  { path: "/auth", element: <AuthPage /> },
  { path: "/auth/pin", element: <PinPage /> },
  { path: "/auth/pin/confirm", element: <PinConfirmPage /> },
  { path: "/auth/congratulations", element: <CongratulationsPage /> },
  {
    path: "/onboarding",
    element: <Navigate to="/onboarding/welcome" replace />,
  },
  { path: "/onboarding/welcome", element: <WelcomePage /> },
  { path: "/onboarding/trading", element: <TradingPage /> },
  { path: "/onboarding/savings", element: <SavingsPage /> },
  { path: "/onboarding/protection", element: <ProtectionPage /> },
  {
    path: "/transactions",
    element: (
      <RequireOnboarding>
        <TransactionsPage />
      </RequireOnboarding>
    ),
  },
  {
    path: "/analytics",
    element: (
      <RequireOnboarding>
        <AnalyticsPage />
      </RequireOnboarding>
    ),
  },
  {
    path: "/saves",
    element: (
      <RequireOnboarding>
        <SavesPage />
      </RequireOnboarding>
    ),
  },
  {
    path: "/profile",
    element: (
      <RequireOnboarding>
        <ProfilePage />
      </RequireOnboarding>
    ),
  },
  {
    path: "/settings",
    element: (
      <RequireOnboarding>
        <SettingsPage />
      </RequireOnboarding>
    ),
  },
  { path: "*", element: <Navigate to="/" replace /> },
]);
