import { useTranslation } from "react-i18next";

import { cn } from "@/shared/ui/utils";

import {
  earningsMock,
  spendsMock,
  type EarningMockRow,
  type SpendMockRow,
} from "../model/transactions-mock";
import { RecentEarningsColumn } from "./recent-earnings-column";
import { RecentSpendsColumn } from "./recent-spends-column";

export interface DashboardTransactionsCardProps {
  showSectionTitle?: boolean;
  className?: string;
  earningsRows?: readonly EarningMockRow[];
  spendsRows?: readonly SpendMockRow[];
}

export const DashboardTransactionsCard = ({
  showSectionTitle = true,
  className,
  earningsRows = earningsMock,
  spendsRows = spendsMock,
}: DashboardTransactionsCardProps) => {
  const { t } = useTranslation("home");

  return (
    <section className={cn(className)}>
      {showSectionTitle ? (
        <h2 className="mb-4 text-center font-display text-base font-bold text-brand-purple sm:text-lg md:text-xl">
          {t("dashboard.transactionsTitle")}
        </h2>
      ) : null}

      <div className="grid gap-4 rounded-4xl bg-dashboard-card px-4 py-5 shadow-sm sm:grid-cols-2 sm:gap-5 sm:px-6 sm:py-6 pr-3 sm:pr-4">
        <RecentEarningsColumn
          title={t("dashboard.recentEarnings")}
          rows={earningsRows}
        />
        <RecentSpendsColumn
          title={t("dashboard.recentSpends")}
          rows={spendsRows}
        />
      </div>
    </section>
  );
};
