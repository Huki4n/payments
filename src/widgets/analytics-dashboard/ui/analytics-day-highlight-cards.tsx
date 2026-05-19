import { useTranslation } from "react-i18next";

import { analyticsDayHighlights } from "../model/analytics-mock";

type DayHighlightCardProps = {
  frameClassName: string;
  title: string;
  dateLabel: string;
  hint: string;
};

const DayHighlightCard = ({
  frameClassName,
  title,
  dateLabel,
  hint,
}: DayHighlightCardProps) => (
  <article className={`rounded-xl p-5 shadow-sm ${frameClassName}`}>
    <div className="flex flex-col items-center justify-center gap-6 rounded-xl bg-card px-5 py-6 text-center sm:gap-8 sm:px-8 sm:py-8">
      <p className="text-lg font-bold leading-none text-brand-purple sm:text-2xl">
        {title}
      </p>
      <p className="text-xl font-bold leading-none text-brand-purple md:text-3xl">
        {dateLabel}
      </p>
      <p className="text-lg font-bold leading-none text-brand-purple sm:text-2xl">
        {hint}
      </p>
    </div>
  </article>
);

export const AnalyticsDayHighlightCards = () => {
  const { t } = useTranslation("home");

  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 font-display-alternates">
      <DayHighlightCard
        frameClassName="bg-dashboard-income-pill"
        title={t("analyticsPage.mostProfitableDay")}
        dateLabel={analyticsDayHighlights.bestDayLabel}
        hint={t("analyticsPage.mostProfitableHint", {
          amount: analyticsDayHighlights.bestDayAmount,
        })}
      />
      <DayHighlightCard
        frameClassName="bg-dashboard-expense-pill"
        title={t("analyticsPage.highestSpendingDay")}
        dateLabel={analyticsDayHighlights.worstDayLabel}
        hint={t("analyticsPage.highestSpendingHint", {
          amount: analyticsDayHighlights.worstDayAmount,
        })}
      />
    </div>
  );
};
