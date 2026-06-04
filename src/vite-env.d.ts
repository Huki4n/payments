/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_EXCHANGE_RATES_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
