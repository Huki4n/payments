import { useTranslation } from "react-i18next";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { DashboardSpendCategoryIcon } from "@/shared/ui/icons/category-icons";
import { Progress } from "@/shared/ui/progress";
import { INITIAL_CHART_DIMENSION } from "@/shared/ui/chart-constants";
import { spendsChartPie } from "@/widgets/spends-chart";

import { renderSpendsPieLabel } from "../lib/render-spends-pie-label";
import {
  analyticsCategoryExtremes,
  analyticsCategoryNarrativeAmounts,
} from "../model/analytics-mock";

export const AnalyticsIncomeExpenseChart = () => {
  const { t } = useTranslation("home");

  const pieData = spendsChartPie.map((row) => ({
    ...row,
    name: t(`dashboard.categories.${row.nameKey}`),
  }));

  const mostMeta = spendsChartPie.find(
    (r) => r.nameKey === analyticsCategoryExtremes.mostKey,
  );
  const leastMeta = spendsChartPie.find(
    (r) => r.nameKey === analyticsCategoryExtremes.leastKey,
  );

  return (
    <section className="overflow-hidden rounded-[17px] bg-dashboard-card px-3 py-4 shadow-sm sm:rounded-[20px] sm:px-5 sm:py-5 md:px-6 md:py-6">
      <h2 className="mb-3 font-display text-sm font-bold text-brand-purple sm:mb-4 sm:text-base md:text-lg">
        {t("analyticsPage.categorySpendsWheelTitle")}
      </h2>

      <div className="flex flex-col items-stretch gap-4 lg:flex-row lg:gap-5 xl:gap-6">
        <div className="mx-auto my-auto h-90 w-full max-w-90 min-h-0 min-w-0 shrink-0 sm:h-90 sm:max-w-90 md:h-90 md:max-w-90">
          <ResponsiveContainer
            width="100%"
            height="100%"
            initialDimension={INITIAL_CHART_DIMENSION}
          >
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={0}
                outerRadius="98%"
                paddingAngle={0}
                strokeWidth={0}
                label={renderSpendsPieLabel}
                labelLine={false}
                isAnimationActive={false}
              >
                {pieData.map((entry) => (
                  <Cell key={entry.nameKey} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => {
                  const num =
                    typeof value === "number" ? value : Number(value ?? 0);
                  return [`-${num.toFixed(2)} $`, t("dashboard.spendAmount")];
                }}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid var(--dashboard-tooltip-border)",
                  fontFamily: "var(--font-display)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex shrink-0 flex-row flex-wrap justify-center gap-2 lg:flex-col lg:justify-center lg:gap-2.5">
          {spendsChartPie.map((row) => (
            <span
              key={row.nameKey}
              className="flex h-13 w-14 shrink-0 items-center justify-center rounded-xl sm:h-14 sm:w-14"
              style={{ backgroundColor: row.color }}
              title={t(`dashboard.categories.${row.nameKey}`)}
            >
              <DashboardSpendCategoryIcon
                name={row.icon}
                className="size-7 text-dashboard-on-chart-swatch"
              />
            </span>
          ))}
        </div>

        <div className="flex min-h-0 min-w-0 flex-1 justify-around flex-col gap-4 rounded-2xl bg-card px-3 py-4 shadow-sm sm:gap-5 sm:px-4 sm:py-5 md:rounded-3xl lg:self-stretch font-display-alternates">
          <h3 className="w-full text-center font-display-alternates text-base font-bold leading-none text-foreground sm:text-lg">
            {t("analyticsPage.mostLowestCategoriesTitle")}
          </h3>

          <div className="w-full min-w-0">
            <div className="flex flex-col gap-2.5 sm:gap-3">
              <div className="flex items-center gap-2.5">
                {mostMeta ? (
                  <DashboardSpendCategoryIcon
                    name={mostMeta.icon}
                    className="size-15 shrink-0 text-brand-purple sm:size-16"
                  />
                ) : null}
                <Progress
                  value={analyticsCategoryExtremes.mostPercent}
                  className="h-6 w-full rounded-full border border-brand-purple/30 bg-white **:data-[slot=progress-indicator]:bg-dashboard-chart-teal dark:bg-card"
                />
              </div>

              <p className="text-left text-md font-normal leading-snug text-foreground sm:text-lg">
                {mostMeta
                  ? t("analyticsPage.topCategoryCaption", {
                      category: t(`dashboard.categories.${mostMeta.nameKey}`),
                      amount: analyticsCategoryNarrativeAmounts.most,
                    })
                  : null}
              </p>
            </div>
          </div>

          <div className="w-full min-w-0">
            <div className="flex flex-col gap-2.5 sm:gap-3">
              <div className="flex items-center gap-2.5">
                {leastMeta ? (
                  <DashboardSpendCategoryIcon
                    name={leastMeta.icon}
                    className="size-15 shrink-0 text-brand-purple sm:size-16"
                  />
                ) : null}
                <Progress
                  value={analyticsCategoryExtremes.leastPercent}
                  className="h-6 w-full rounded-full border border-brand-purple/30 bg-white **:data-[slot=progress-indicator]:bg-brand-blue dark:bg-card"
                />
              </div>
              <p className="text-left text-md font-normal leading-snug text-foreground sm:text-lg">
                {leastMeta
                  ? t("analyticsPage.lowestCategoryCaption", {
                      category: t(`dashboard.categories.${leastMeta.nameKey}`),
                      amount: analyticsCategoryNarrativeAmounts.least,
                    })
                  : null}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
