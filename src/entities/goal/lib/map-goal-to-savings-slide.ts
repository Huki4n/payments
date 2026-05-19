import {
  eachMonthOfInterval,
  endOfMonth,
  format,
  startOfMonth,
  startOfYear,
} from "date-fns";

import type { SavingsSlide } from "../model/savings-slide";

import type { Contribution } from "../model/contributions-types";
import type { GoalDetails } from "../model/goals-types";
import { formatContributionAmount } from "./format-goal-money";

function buildProgressChart(
  contributions: Contribution[],
  currentAmount: number,
): SavingsSlide["progressChart"] {
  const sorted = [...contributions].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );

  const now = new Date();
  const rangeEnd = startOfMonth(now);
  const rangeStart = startOfMonth(
    sorted.length > 0
      ? startOfYear(new Date(sorted[0].createdAt))
      : startOfYear(now),
  );

  const months = eachMonthOfInterval({ start: rangeStart, end: rangeEnd });

  let cumulative = 0;
  let contributionIndex = 0;

  const points = months.map((monthDate, index) => {
    const monthEnd = endOfMonth(monthDate);

    while (contributionIndex < sorted.length) {
      const createdAt = new Date(sorted[contributionIndex].createdAt);
      if (createdAt <= monthEnd) {
        cumulative = Math.max(
          0,
          cumulative + sorted[contributionIndex].amount,
        );
        contributionIndex += 1;
      } else {
        break;
      }
    }

    const isLast = index === months.length - 1;

    return {
      month: format(monthDate, "MMM"),
      value: isLast ? currentAmount : cumulative,
    };
  });

  if (points.length >= 2) {
    return points;
  }

  return [
    { month: format(rangeStart, "MMM"), value: 0 },
    {
      month: format(rangeEnd, "MMM"),
      value: currentAmount,
    },
  ];
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
      isWithdrawal: item.amount < 0,
    })),
    progressChart: buildProgressChart(contributions, currentAmount),
  };
}
