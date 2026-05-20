import 'i18next';

import en from './locales/en.json';

type AppResources = typeof en;

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'onboarding';
    resources: AppResources;
  }
}
