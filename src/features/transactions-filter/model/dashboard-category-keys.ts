/** Mirrors `home.dashboard.categories` keys in locales — keeps i18n `t()` typings strict */
export type DashboardCategoryNameKey =
  | 'catFoodDeliveries'
  | 'catCafesRestaurants'
  | 'catPharmacies'
  | 'catShopping'
  | 'catOther'
  | 'catGames'

export type DashboardCategoryLabelKey = `dashboard.categories.${DashboardCategoryNameKey}`

export const toDashboardCategoryLabelKey = (
  key: DashboardCategoryNameKey
): DashboardCategoryLabelKey => `dashboard.categories.${key}`
