/** Pie segments + category list mock (Figma spends chart reference) */
export const spendsChartPie = [
  {
    categoryId: 'catFoodDeliveries' as const,
    name: 'Food deliveries',
    value: 72.32,
    color: '#48abe0',
    icon: 'utensils' as const,
  },
  {
    categoryId: 'catCafesRestaurants' as const,
    name: 'Cafes & Restaurants',
    value: 54.1,
    color: '#08246e',
    icon: 'coffee' as const,
  },
  {
    categoryId: 'catPharmacies' as const,
    name: 'Pharmacies & hospitals',
    value: 87.3,
    color: '#6140c9',
    icon: 'cross' as const,
  },
  {
    categoryId: 'catShopping' as const,
    name: 'Shopping',
    value: 123.45,
    color: '#0f0533',
    icon: 'shopping' as const,
  },
  {
    categoryId: 'catOther' as const,
    name: 'Other',
    value: 3.45,
    color: '#42d1b5',
    icon: 'more' as const,
  },
  {
    categoryId: 'catGames' as const,
    name: 'Games',
    value: 42.79,
    color: '#b336c1',
    icon: 'gamepad' as const,
  },
] as const
