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
