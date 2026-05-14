import { FileText } from "lucide-react";

export interface RecentEarningRowProps {
  amount: string;
  label: string;
}

export const RecentEarningRow = ({
  amount,
  label,
}: RecentEarningRowProps) => {
  return (
    <li className="flex items-center gap-3 rounded-xl bg-card/95 px-3 py-2.5 shadow-sm">
      <span className="min-w-26 shrink-0 rounded-lg bg-dashboard-income-pill px-2.5 py-1.5 text-center font-display text-xs font-bold text-brand-purple sm:text-sm">
        {amount}
      </span>
      <FileText
        className="size-5 shrink-0 text-brand-purple/40"
        strokeWidth={1.5}
      />
      <span className="min-w-0 flex-1 text-left font-display text-xs text-brand-purple sm:text-sm">
        {label}
      </span>
    </li>
  );
};
