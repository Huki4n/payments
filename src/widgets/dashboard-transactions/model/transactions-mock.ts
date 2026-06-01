export const earningsMock = [
  { id: '1', amount: '+1890,23 $', label: 'Alpha bank recruiting' },
  { id: '2', amount: '+140,13 $', label: 'Alpha bank recruiting' },
] as const

export const spendsMock = [
  {
    id: '1',
    amount: '-18,32 $',
    label: 'Yandex Food Delivery',
    icon: 'utensils' as const,
    category: 'catFoodDeliveries' as const,
  },
  {
    id: '2',
    amount: '-87,30$',
    label: 'Vita Pharmacy',
    icon: 'cross' as const,
    category: 'catPharmacies' as const,
  },
  {
    id: '3',
    amount: '-42,79$',
    label: 'Steam Gaming',
    icon: 'gamepad' as const,
    category: 'catGames' as const,
  },
  {
    id: '4',
    amount: '-03,45$',
    label: 'Magnet Supermarket',
    icon: 'shopping' as const,
    category: 'catShopping' as const,
  },
  {
    id: '5',
    amount: '-63,21$',
    label: 'Shawarma Leonstreet',
    icon: 'utensils' as const,
    category: 'catCafesRestaurants' as const,
  },
] as const

export type EarningMockRow = (typeof earningsMock)[number]
export type SpendMockRow = (typeof spendsMock)[number]
