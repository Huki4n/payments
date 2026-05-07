import type { ReactElement } from "react";
import { Navigate } from "react-router-dom";

import { getOnboardingCompleted } from "@/entities/onboarding-status";

interface RequireOnboardingProps {
  children: ReactElement;
}

export const RequireOnboarding = ({ children }: RequireOnboardingProps) => {
  if (!getOnboardingCompleted()) {
    return <Navigate to="/onboarding/welcome" replace />;
  }

  return children;
};
