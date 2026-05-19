import { format } from "date-fns";

import type { SavingsSlide } from "../model/savings-slide";

import type { Contribution, GoalDetails } from "../model/types";
import { formatContributionAmount } from "./format-goal-money";

function buildProgressChart(
  contributions: Contribution[],
  currentAmount: number,
): SavingsSlide["progressChart"] {
  const sorted = [...contributions].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );

  if (sorted.length === 0) {
    return [
      { month: "Start", value: 0 },
      { month: "Now", value: currentAmount },
    ];
  }

  const byMonth = new Map<string, number>();
  let cumulative = 0;

  for (const item of sorted) {
    cumulative += item.amount;
    const key = format(new Date(item.createdAt), "MMM");
    byMonth.set(key, cumulative);
  }

  return Array.from(byMonth.entries()).map(([month, value]) => ({
    month,
    value,
  }));
}

export function mapGoalToSavingsSlide(
  goal: GoalDetails,
  contributions: Contribution[],
): SavingsSlide {
  const currentAmount = goal.progressInfo.currentAmount;

  return {
    id: String(goal.id),
    title: goal.title,
    goal: goal.targetAmount,
    total: currentAmount,
    replenishments: contributions.map((item) => ({
      date: format(new Date(item.createdAt), "dd.MM.yyyy"),
      amount: formatContributionAmount(item.amount, goal.currency),
    })),
    progressChart: buildProgressChart(contributions, currentAmount),
  };
}
