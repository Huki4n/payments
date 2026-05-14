import { useTranslation } from "react-i18next";

import type { SavingsSlide } from "../model/savings-mock";

import { SavingGoalHeader } from "./saving-goal-header";
import { SavingGoalStats } from "./saving-goal-stats";
import { SavingProgressChart } from "./saving-progress-chart";
import { SavingProgressSection } from "./saving-progress-section";
import { SavingReplenishmentsList } from "./saving-replenishments-list";

interface SavingGoalDetailCardProps {
  slide: SavingsSlide;
  showConfigureSavingsLink?: boolean;
}

export const SavingGoalDetailCard = ({
  slide,
  showConfigureSavingsLink = false,
}: SavingGoalDetailCardProps) => {
  const { t } = useTranslation("home");
  const progressPercent = Math.min(100, (slide.total / slide.goal) * 100);

  return (
    <div className="savings-slide-card flex min-h-0 flex-1 flex-col overflow-hidden rounded-4xl bg-dashboard-card px-4 py-5 shadow-sm sm:px-6 sm:py-6">
      <div className="grid min-h-0 flex-1 gap-6 lg:grid-cols-[0.85fr_1fr] lg:items-stretch lg:gap-8">
        <div className="flex min-h-0 flex-col gap-6 text-left">
          <SavingGoalHeader title={t(`dashboard.${slide.titleKey}`)} />
          <SavingGoalStats goal={slide.goal} total={slide.total} />
          <SavingReplenishmentsList
            slideId={slide.id}
            replenishments={slide.replenishments}
          />
        </div>

        <div className="flex h-52 w-full min-w-0 flex-col lg:h-full lg:min-h-0">
          <div className="min-h-0 w-full flex-1">
            <SavingProgressChart
              slideId={slide.id}
              progressChart={slide.progressChart}
            />
          </div>
        </div>
      </div>

      <SavingProgressSection
        progressPercent={progressPercent}
        showConfigureSavingsLink={showConfigureSavingsLink}
      />
    </div>
  );
};
