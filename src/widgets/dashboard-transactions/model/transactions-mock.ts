export const earningsMock = [
  { id: '1', amount: '+1890,23 $', labelKey: 'alphaBankRecruiting' as const },
  { id: '2', amount: '+140,13 $', labelKey: 'alphaBankRecruiting' as const },
] as const

export const spendsMock = [
  {
    id: '1',
    amount: '-18,32 $',
    labelKey: 'yandexFood' as const,
    icon: 'utensils' as const,
    categoryKey: 'catFoodDeliveries' as const,
  },
  {
    id: '2',
    amount: '-87,30$',
    labelKey: 'vitaPharmacy' as const,
    icon: 'cross' as const,
    categoryKey: 'catPharmacies' as const,
  },
  {
    id: '3',
    amount: '-42,79$',
    labelKey: 'steamGaming' as const,
    icon: 'gamepad' as const,
    categoryKey: 'catGames' as const,
  },
  {
    id: '4',
    amount: '-03,45$',
    labelKey: 'magnetSupermarket' as const,
    icon: 'shopping' as const,
    categoryKey: 'catShopping' as const,
  },
  {
    id: '5',
    amount: '-63,21$',
    labelKey: 'shawarmaLeonstreet' as const,
    icon: 'utensils' as const,
    categoryKey: 'catCafesRestaurants' as const,
  },
] as const

export type EarningMockRow = (typeof earningsMock)[number]
export type SpendMockRow = (typeof spendsMock)[number]
