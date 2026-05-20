/** Базовый URL API (вид `/api/v1` или абсолютный). */
export function normalizeApiBase(raw?: string): string {
  const v = raw?.trim() || ''
  const base = v.length > 0 ? v : '/api/v1'

  return base.endsWith('/') ? base.slice(0, -1) : base
}

export const apiConfig = {
  baseUrl: normalizeApiBase(import.meta.env.VITE_API_BASE_URL),
} as const
