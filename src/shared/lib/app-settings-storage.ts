const APP_SETTINGS_KEY = "app_settings";
const LEGACY_LANGUAGE_KEY = "language";

export const APP_SETTINGS_CURRENCIES = ["usd", "eur", "rub"] as const;
export type AppSettingsCurrency = (typeof APP_SETTINGS_CURRENCIES)[number];

export const APP_SETTINGS_LANGUAGES = ["en", "ru"] as const;
export type AppSettingsLanguage = (typeof APP_SETTINGS_LANGUAGES)[number];

export const APP_SETTINGS_COLOR_SCHEMES = ["light", "dark"] as const;
export type AppSettingsColorScheme =
  (typeof APP_SETTINGS_COLOR_SCHEMES)[number];

const profileDefaults = {
  name: "Rodion",
  surname: "Rodion",
  country: "Russian Federation",
  phone: "+7 245 856 245 525",
  email: "Rodionsemail@gmail.com",
} as const;

export interface AppSettingsPersisted {
  currency: AppSettingsCurrency;
  language: AppSettingsLanguage;
  colorScheme: AppSettingsColorScheme;
  name: string;
  surname: string;
  country: string;
  phone: string;
  email: string;
}

const defaults: AppSettingsPersisted = {
  ...profileDefaults,
  currency: "usd",
  language: "ru",
  colorScheme: "light",
};

function parseString(value: unknown, fallback: string): string {
  return typeof value === "string" ? value : fallback;
}

function parseCurrency(value: unknown): AppSettingsCurrency {
  if (
    typeof value === "string" &&
    (APP_SETTINGS_CURRENCIES as readonly string[]).includes(value)
  ) {
    return value as AppSettingsCurrency;
  }
  return defaults.currency;
}

function parseLanguage(value: unknown): AppSettingsLanguage {
  if (
    typeof value === "string" &&
    (APP_SETTINGS_LANGUAGES as readonly string[]).includes(value)
  ) {
    return value as AppSettingsLanguage;
  }
  return defaults.language;
}

function parseColorScheme(value: unknown): AppSettingsColorScheme {
  if (
    typeof value === "string" &&
    (APP_SETTINGS_COLOR_SCHEMES as readonly string[]).includes(value)
  ) {
    return value as AppSettingsColorScheme;
  }
  return defaults.colorScheme;
}

export function readAppSettings(): AppSettingsPersisted {
  try {
    const raw = localStorage.getItem(APP_SETTINGS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Record<string, unknown>;
      return {
        currency: parseCurrency(parsed.currency),
        language: parseLanguage(parsed.language),
        colorScheme: parseColorScheme(parsed.colorScheme),
        name: parseString(parsed.name, profileDefaults.name),
        surname: parseString(parsed.surname, profileDefaults.surname),
        country: parseString(parsed.country, profileDefaults.country),
        phone: parseString(parsed.phone, profileDefaults.phone),
        email: parseString(parsed.email, profileDefaults.email),
      };
    }
  } catch {
    /* ignore */
  }

  try {
    const legacy = localStorage.getItem(LEGACY_LANGUAGE_KEY);
    if (legacy === "en" || legacy === "ru") {
      return { ...defaults, language: legacy };
    }
  } catch {
    /* ignore */
  }

  return { ...defaults };
}

export function writeAppSettings(settings: AppSettingsPersisted): void {
  try {
    localStorage.setItem(APP_SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    /* ignore */
  }
}
