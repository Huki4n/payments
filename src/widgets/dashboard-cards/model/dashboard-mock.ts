export const yearlyFinanceData = [
  { month: "Jan", value: 420 },
  { month: "Feb", value: 580 },
  { month: "Mar", value: 910 },
  { month: "Apr", value: 720 },
  { month: "May", value: 1100 },
  { month: "Jun", value: 980 },
  { month: "Jul", value: 1500 },
  { month: "Aug", value: 2343 },
  { month: "Sep", value: 1850 },
  { month: "Oct", value: 1600 },
  { month: "Nov", value: 1420 },
  { month: "Dec", value: 1280 },
] as const;

export const earningsMock = [
  { id: "1", amount: "+1890,23 $", labelKey: "alphaBankRecruiting" as const },
  { id: "2", amount: "+140,13 $", labelKey: "alphaBankRecruiting" as const },
] as const;

export const spendsMock = [
  {
    id: "1",
    amount: "-18,32 $",
    labelKey: "yandexFood" as const,
    icon: "utensils" as const,
  },
  {
    id: "2",
    amount: "-87,30$",
    labelKey: "vitaPharmacy" as const,
    icon: "cross" as const,
  },
  {
    id: "3",
    amount: "-42,79$",
    labelKey: "steamGaming" as const,
    icon: "gamepad" as const,
  },
  {
    id: "4",
    amount: "-03,45$",
    labelKey: "magnetSupermarket" as const,
    icon: "shopping" as const,
  },
  {
    id: "5",
    amount: "-63,21$",
    labelKey: "shawarmaLeonstreet" as const,
    icon: "utensils" as const,
  },
] as const;

/** Pie wheel colors (Figma monthly spends reference) */
export const monthlySpendsPie = [
  {
    nameKey: "catFoodDeliveries" as const,
    value: 72.32,
    color: "#48abe0",
    icon: "utensils" as const,
  },
  {
    nameKey: "catCafesRestaurants" as const,
    value: 54.1,
    color: "#08246e",
    icon: "coffee" as const,
  },
  {
    nameKey: "catPharmacies" as const,
    value: 87.3,
    color: "#6140c9",
    icon: "cross" as const,
  },
  {
    nameKey: "catShopping" as const,
    value: 123.45,
    color: "#0f0533",
    icon: "shopping" as const,
  },
  {
    nameKey: "catOther" as const,
    value: 3.45,
    color: "#42d1b5",
    icon: "more" as const,
  },
  {
    nameKey: "catGames" as const,
    value: 42.79,
    color: "#b336c1",
    icon: "gamepad" as const,
  },
] as const;

export const savingsSlidesMock = [
  {
    id: "world-trip",
    titleKey: "savingsWorldTrip" as const,
    goal: 15000,
    total: 14100,
    replenishments: [
      { date: "03.04.2026", amount: "+140,13 $" },
      { date: "03.04.2026", amount: "+500,00 $" },
      { date: "15.03.2026", amount: "+200,00 $" },
    ],
    progressChart: [
      { month: "Jan", value: 3200 },
      { month: "Feb", value: 5100 },
      { month: "Mar", value: 7800 },
      { month: "Apr", value: 10200 },
      { month: "May", value: 12600 },
      { month: "Jun", value: 14100 },
    ],
  },
  {
    id: "emergency",
    titleKey: "savingsEmergency" as const,
    goal: 8000,
    total: 6200,
    replenishments: [
      { date: "01.05.2026", amount: "+300,00 $" },
      { date: "12.04.2026", amount: "+150,00 $" },
    ],
    progressChart: [
      { month: "Jan", value: 1200 },
      { month: "Feb", value: 2400 },
      { month: "Mar", value: 3800 },
      { month: "Apr", value: 4900 },
      { month: "May", value: 5600 },
      { month: "Jun", value: 6200 },
    ],
  },
] as const;
