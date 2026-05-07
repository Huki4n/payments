import "i18next";

import en from "./locales/en.json";

type OnboardingResources = (typeof en)["onboarding"];

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "onboarding";
    resources: {
      onboarding: OnboardingResources;
    };
  }
}
