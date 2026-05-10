import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import ru from "./locales/ru.json";
import { readAppSettings } from "@/shared/lib/app-settings-storage";

export const SUPPORTED_LANGUAGES = ["ru", "en"] as const;
export const DEFAULT_LANGUAGE = "ru";
export const DEFAULT_NS = "onboarding";

const persisted = readAppSettings();

void i18n.use(initReactI18next).init({
  resources: {
    en,
    ru,
  },
  lng: persisted.language,
  fallbackLng: DEFAULT_LANGUAGE,
  supportedLngs: [...SUPPORTED_LANGUAGES],
  nonExplicitSupportedLngs: true,
  ns: ["onboarding", "home", "settings"],
  defaultNS: DEFAULT_NS,
  interpolation: {
    escapeValue: false,
  },
  returnNull: false,
});

export { i18n };
