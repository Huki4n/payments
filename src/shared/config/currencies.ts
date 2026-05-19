export const GOAL_CURRENCIES = ["USD", "EUR", "RUB"] as const;

export type GoalCurrency = (typeof GOAL_CURRENCIES)[number];
