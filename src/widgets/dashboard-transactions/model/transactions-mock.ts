import type { EarningMockRow, SpendMockRow } from './types'

export const earningsMock: EarningMockRow[] = [
  { id: '1', amount: '+1890,23 $', label: 'Alpha bank recruiting' },
  { id: '2', amount: '+140,13 $', label: 'Alpha bank recruiting' },
]

export const spendsMock: SpendMockRow[] = [
  {
    id: '1',
    amount: '-18,32 $',
    label: 'Yandex Food Delivery',
    icon: 'shopping',
    category: 'catSupermarkets',
  },
  {
    id: '2',
    amount: '-87,30$',
    label: 'Vita Pharmacy',
    icon: 'cross',
    category: 'catPharmacy',
  },
  {
    id: '3',
    amount: '-42,79$',
    label: 'Steam Gaming',
    icon: 'gamepad',
    category: 'catEntertainment',
  },
  {
    id: '4',
    amount: '-03,45$',
    label: 'Magnet Supermarket',
    icon: 'shopping',
    category: 'catSupermarkets',
  },
  {
    id: '5',
    amount: '-63,21$',
    label: 'Shawarma Leonstreet',
    icon: 'coffee',
    category: 'catRestaurants',
  },
]
