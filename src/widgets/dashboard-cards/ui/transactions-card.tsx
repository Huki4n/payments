import { useTranslation } from "react-i18next";
import { FileText } from "lucide-react";

import { DashboardSpendCategoryIcon } from "@/shared/ui/icons/category-icons";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { cn } from "@/shared/ui/utils";
import {
  earningsMock,
  spendsMock,
} from "@/widgets/dashboard-cards/model/dashboard-mock";

export const DashboardTransactionsCard = () => {
  const { t } = useTranslation("home");

  return (
    <section>
      <h2 className="mb-4 text-center font-display text-base font-bold text-brand-purple sm:text-lg md:text-xl">
        {t("dashboard.transactionsTitle")}
      </h2>

      <div className="grid gap-4 rounded-4xl bg-dashboard-card shadow-sm px-4 py-5 sm:grid-cols-2 sm:gap-5 sm:px-6 sm:py-6 pr-3 sm:pr-4">
        <div className="flex min-h-0 flex-col">
          <h3 className="mb-3 font-display text-sm font-bold text-brand-purple sm:text-base">
            {t("dashboard.recentEarnings")}
          </h3>
          <ScrollArea
            overflowFade
            overflowFadeFrom="from-dashboard-card"
            persistentScrollbarWhenOverflow
            className="h-52 sm:h-60 md:h-72 pr-2 pb-1"
          >
            <ul className="space-y-2.5 pr-2">
              {earningsMock.map((row) => (
                <li
                  key={row.id}
                  className="flex items-center gap-3 rounded-xl bg-card/95 px-3 py-2.5 shadow-sm"
                >
                  <span className="min-w-26 shrink-0 rounded-lg bg-dashboard-income-pill px-2.5 py-1.5 text-center font-display text-xs font-bold text-brand-purple sm:text-sm">
                    {row.amount}
                  </span>
                  <FileText
                    className="size-5 shrink-0 text-brand-purple/40"
                    strokeWidth={1.5}
                  />
                  <span className="min-w-0 flex-1 text-left font-display text-xs text-brand-purple sm:text-sm">
                    {t(`dashboard.merchants.${row.labelKey}`)}
                  </span>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </div>

        <div className="flex min-h-0 flex-col">
          <h3 className="mb-3 font-display text-sm font-bold text-brand-purple sm:text-base">
            {t("dashboard.recentSpends")}
          </h3>
          <ScrollArea
            overflowFade
            overflowFadeFrom="from-dashboard-card"
            persistentScrollbarWhenOverflow
            className="h-52 sm:h-60 md:h-72 pr-2 pb-1"
          >
            <ul className="space-y-2.5 pr-2">
              {spendsMock.map((row) => {
                return (
                  <li
                    key={row.id}
                    className="flex items-center gap-3 rounded-2xl bg-card/95 px-3 py-2.5 shadow-sm"
                  >
                    <span className="min-w-26 shrink-0 rounded-lg bg-dashboard-expense-pill px-2.5 py-1.5 text-center font-display text-xs font-bold text-brand-purple sm:text-sm">
                      {row.amount}
                    </span>
                    <DashboardSpendCategoryIcon
                      name={row.icon}
                      className={cn(
                        "size-5 shrink-0 text-brand-purple/50",
                        row.icon === "gamepad" && "text-brand-purple/60",
                      )}
                    />
                    <span className="min-w-0 flex-1 text-left font-display text-xs text-brand-purple sm:text-sm">
                      {t(`dashboard.merchants.${row.labelKey}`)}
                    </span>
                  </li>
                );
              })}
            </ul>
          </ScrollArea>
        </div>
      </div>
    </section>
  );
};
