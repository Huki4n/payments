import { SPEND_CATEGORIES } from '@/shared/config/spend-categories'

import { SPEND_CHART_COLORS } from './spend-chart-colors'

/** Pie segments mock (Figma reference) — для аналитики и сторибуков. */
const spendsChartMeta: Record<
  (typeof SPEND_CATEGORIES)[number]['id'],
  { name: string; value: number }
> = {
  catSupermarkets: { name: 'Supermarkets', value: 72.32 },
  catTransport: { name: 'Transport', value: 41.2 },
  catTaxi: { name: 'Taxi', value: 18.5 },
  catRestaurants: { name: 'Restaurants', value: 54.1 },
  catEntertainment: { name: 'Entertainment', value: 42.79 },
  catClothing: { name: 'Clothing', value: 88.2 },
  catPharmacy: { name: 'Pharmacy', value: 87.3 },
  catSubscriptions: { name: 'Subscriptions', value: 24.99 },
  catTelecom: { name: 'Telecom', value: 28.5 },
  catUtilities: { name: 'Utilities', value: 63.15 },
  catMarketplaces: { name: 'Marketplaces', value: 123.45 },
  catOther: { name: 'Other', value: 3.45 },
}

export const spendsChartPie = SPEND_CATEGORIES.map(category => ({
  categoryId: category.id,
  icon: category.icon,
  color: SPEND_CHART_COLORS[category.id],
  ...spendsChartMeta[category.id],
}))
