import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { AppLayout } from "@/app/layouts";
import { TransactionsFilterBar } from "@/features/transactions-filter";
import { AccountBalance } from "@/widgets/account-balance";
import {
  DashboardTransactionsCard,
  MonthSummaryTiles,
  earningsMock,
  spendsMock,
} from "@/widgets/dashboard-transactions";
import { SpendsChartCard, spendsChartPie } from "@/widgets/spends-chart";
import { HomeNavigation } from "@/widgets/home-navigation";

export const TransactionsPage = () => {
  const { t } = useTranslation("home");
  const [nameQuery, setNameQuery] = useState("");
  const [amountQuery, setAmountQuery] = useState("");
  const [category, setCategory] = useState("all");

  const filteredEarnings = useMemo(() => {
    const n = nameQuery.trim().toLowerCase();
    const a = amountQuery.trim().toLowerCase();
    return earningsMock.filter((row) => {
      const label = t(`dashboard.merchants.${row.labelKey}`).toLowerCase();
      if (n && !label.includes(n)) {
        return false;
      }
      if (a && !row.amount.toLowerCase().includes(a)) {
        return false;
      }
      return true;
    });
  }, [amountQuery, nameQuery, t]);

  const filteredSpends = useMemo(() => {
    const n = nameQuery.trim().toLowerCase();
    const a = amountQuery.trim().toLowerCase();
    return spendsMock.filter((row) => {
      if (category !== "all" && row.categoryKey !== category) {
        return false;
      }
      const label = t(`dashboard.merchants.${row.labelKey}`).toLowerCase();
      if (n && !label.includes(n)) {
        return false;
      }
      if (a && !row.amount.toLowerCase().includes(a)) {
        return false;
      }
      return true;
    });
  }, [amountQuery, category, nameQuery, t]);

  return (
    <AppLayout
      header={
        <>
          <HomeNavigation />
          <AccountBalance integerPart="$1650" fractionPart=".40" />
        </>
      }
    >
      <div className="rounded-t-4xl pb-12">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 md:gap-8">
          <MonthSummaryTiles
            integerPart="$1650"
            fractionPart=".40"
            earningsLabel={t("transactionsPage.totalMonthEarnings")}
            spendsLabel={t("transactionsPage.totalMonthSpends")}
          />
          <TransactionsFilterBar
            nameQuery={nameQuery}
            amountQuery={amountQuery}
            category={category}
            categoryKeys={spendsChartPie.map((row) => row.nameKey)}
            onNameChange={setNameQuery}
            onAmountChange={setAmountQuery}
            onCategoryChange={setCategory}
          />
          <DashboardTransactionsCard
            showSectionTitle={false}
            earningsRows={filteredEarnings}
            spendsRows={filteredSpends}
          />
          <SpendsChartCard />
        </div>
      </div>
    </AppLayout>
  );
};
