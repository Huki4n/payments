import { MoreVertical } from "lucide-react";
import { useTranslation } from "react-i18next";

import type { SavingsSlide } from "@/entities/goal";
import { Button } from "@/shared/ui";

import { SavingGoalHeader } from "./saving-goal-header";
import { SavingGoalStats } from "./saving-goal-stats";
import { SavingProgressChart } from "./saving-progress-chart";
import { SavingProgressSection } from "./saving-progress-section";
import { SavingReplenishmentsList } from "./saving-replenishments-list";

interface SavingGoalDetailCardProps {
  slide: SavingsSlide;
  showConfigureSavingsLink?: boolean;
  showEditMenu?: boolean;
  onEditGoal?: (goalId: number) => void;
}

export const SavingGoalDetailCard = ({
  slide,
  showConfigureSavingsLink = false,
  showEditMenu = false,
  onEditGoal,
}: SavingGoalDetailCardProps) => {
  const { t } = useTranslation("home");
  const progressPercent = Math.min(100, (slide.total / slide.goal) * 100);
  const title =
    slide.title ?? (slide.titleKey ? t(`dashboard.${slide.titleKey}`) : "");

  return (
    <div className="savings-slide-card relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-4xl bg-dashboard-card px-4 py-5 shadow-sm sm:px-6 sm:py-6">
      {showEditMenu && onEditGoal ? (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute top-1/2 -translate-y-1/2 right-0 z-10 size-6 text-brand-purple hover:bg-brand-purple/10"
          onClick={() => onEditGoal(Number(slide.id))}
          aria-label={t("savingsPage.editGoal.menuAria")}
        >
          <MoreVertical className="size-5" />
        </Button>
      ) : null}
      <div className="grid min-h-0 flex-1 gap-6 lg:grid-cols-[0.85fr_1fr] lg:items-stretch lg:gap-8">
        <div className="flex min-h-0 flex-col gap-6 text-left">
          <SavingGoalHeader title={title} />
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
