import type { SpendCategoryId } from '@/shared/config/spend-categories'

/** Цвета сегментов pie (Figma spends chart). */
export const SPEND_CHART_COLORS: Record<SpendCategoryId, string> = {
  catSupermarkets: '#48abe0',
  catTransport: '#08246e',
  catTaxi: '#1e5a8a',
  catRestaurants: '#6140c9',
  catEntertainment: '#b336c1',
  catClothing: '#0f0533',
  catPharmacy: '#e07a48',
  catSubscriptions: '#9b59b6',
  catTelecom: '#42d1b5',
  catUtilities: '#2d8f4e',
  catMarketplaces: '#f39c12',
  catOther: '#94a3b8',
}
