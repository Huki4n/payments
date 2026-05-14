interface SavingReplenishmentRowProps {
  date: string;
  amount: string;
}

export const SavingReplenishmentRow = ({
  date,
  amount,
}: SavingReplenishmentRowProps) => {
  return (
    <li className="flex items-center justify-between gap-2 rounded-xl bg-card/95 px-3 py-2 shadow-sm">
      <span className="font-display text-xs text-brand-purple sm:text-sm">
        {date}
      </span>
      <span className="min-w-26 rounded-lg bg-dashboard-income-pill px-2 py-1 text-center font-display text-xs font-bold text-brand-purple sm:text-sm">
        {amount}
      </span>
    </li>
  );
};
