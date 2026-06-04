import type { DashboardSpendCategoryIcon } from '@/shared/ui/icons/category-icons'

export const SPEND_CATEGORIES = [
  { id: 'catSupermarkets', icon: 'shopping' },
  { id: 'catTransport', icon: 'bus' },
  { id: 'catTaxi', icon: 'car-taxi-front' },
  { id: 'catRestaurants', icon: 'coffee' },
  { id: 'catEntertainment', icon: 'gamepad' },
  { id: 'catClothing', icon: 'shirt' },
  { id: 'catPharmacy', icon: 'cross' },
  { id: 'catSubscriptions', icon: 'credit-card' },
  { id: 'catTelecom', icon: 'cable' },
  { id: 'catUtilities', icon: 'storefront' },
  { id: 'catMarketplaces', icon: 'shopping' },
  { id: 'catOther', icon: 'more' },
] as const satisfies ReadonlyArray<{ id: string; icon: DashboardSpendCategoryIcon }>

export type SpendCategoryId = (typeof SPEND_CATEGORIES)[number]['id']

export const SPEND_CATEGORY_IDS: SpendCategoryId[] = SPEND_CATEGORIES.map(category => category.id)

const iconByCategoryId = Object.fromEntries(
  SPEND_CATEGORIES.map(category => [category.id, category.icon])
) as Record<SpendCategoryId, DashboardSpendCategoryIcon>

/** Старые id категорий → актуальные (данные API / импорт). */
export const LEGACY_SPEND_CATEGORY_IDS: Record<string, SpendCategoryId> = {
  catFoodDeliveries: 'catSupermarkets',
  catCafesRestaurants: 'catRestaurants',
  catPharmacies: 'catPharmacy',
  catHealth: 'catPharmacy',
  catShopping: 'catMarketplaces',
  catGames: 'catEntertainment',
  catHome: 'catUtilities',
}

/**
 * Человекочитаемые названия из API / i18n (`home.dashboard.categories`).
 * Должны совпадать с `ru.json` и `en.json`.
 */
const SPEND_CATEGORY_DISPLAY_NAMES: Record<SpendCategoryId, { ru: string; en: string }> = {
  catSupermarkets: { ru: 'Супермаркеты', en: 'Supermarkets' },
  catTransport: { ru: 'Транспорт', en: 'Transport' },
  catTaxi: { ru: 'Такси', en: 'Taxi' },
  catRestaurants: { ru: 'Кафе и рестораны', en: 'Cafes & restaurants' },
  catEntertainment: { ru: 'Развлечения', en: 'Entertainment' },
  catClothing: { ru: 'Одежда', en: 'Clothing' },
  catPharmacy: { ru: 'Аптека', en: 'Pharmacy' },
  catSubscriptions: { ru: 'Подписки', en: 'Subscriptions' },
  catTelecom: { ru: 'Связь', en: 'Telecom' },
  catUtilities: { ru: 'Коммунальные услуги', en: 'Utilities' },
  catMarketplaces: { ru: 'Маркетплейсы', en: 'Marketplaces' },
  catOther: { ru: 'Другое', en: 'Other' },
}

const spendCategoryIdByDisplayName = Object.fromEntries(
  Object.entries(SPEND_CATEGORY_DISPLAY_NAMES).flatMap(([id, labels]) => [
    [labels.ru, id],
    [labels.en, id],
  ])
) as Record<string, SpendCategoryId>

export function resolveSpendCategoryId(category?: string): SpendCategoryId {
  const normalized = category?.trim()

  if (!normalized) {
    return 'catOther'
  }

  if (normalized in iconByCategoryId) {
    return normalized as SpendCategoryId
  }

  const legacy = LEGACY_SPEND_CATEGORY_IDS[normalized]

  if (legacy) {
    return legacy
  }

  return spendCategoryIdByDisplayName[normalized] ?? 'catOther'
}

export function getSpendCategoryIcon(categoryId?: string): DashboardSpendCategoryIcon {
  return iconByCategoryId[resolveSpendCategoryId(categoryId)]
}
