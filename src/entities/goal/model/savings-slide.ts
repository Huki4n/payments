export type SavingsTitleKey =
  | "savingsWorldTrip"
  | "savingsEmergency"
  | "savingsCarPurchase"
  | "savingsHomeFund"
  | "savingsGadgetFund";

export type SavingsReplenishment = {
  date: string;
  amount: string;
};

export type SavingsProgressPoint = {
  month: string;
  value: number;
};

export type SavingsSlide = {
  id: string;
  /** Заголовок с API */
  title?: string;
  /** Ключ i18n для моков на главной */
  titleKey?: SavingsTitleKey;
  goal: number;
  total: number;
  replenishments: SavingsReplenishment[];
  progressChart: SavingsProgressPoint[];
};
