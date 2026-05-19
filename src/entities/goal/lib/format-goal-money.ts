const CURRENCY_SYMBOL: Record<string, string> = {
  USD: "$",
  EUR: "€",
  RUB: "₽",
};

export function formatGoalMoney(amount: number, currency: string): string {
  const symbol = CURRENCY_SYMBOL[currency] ?? currency;
  const formatted = amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${formatted} ${symbol}`;
}

export function formatContributionAmount(amount: number, currency: string): string {
  return `+${formatGoalMoney(amount, currency)}`;
}
