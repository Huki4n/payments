export type {
  Contribution,
  ContributionsPage,
  ContributionType,
  GoalDetails,
  GoalListItem,
  GoalProgressInfo,
  GoalStatus,
} from "./model/types";

export type {
  SavingsSlide,
  SavingsReplenishment,
  SavingsProgressPoint,
} from "./model/savings-slide";

export {
  goalsApi,
  useGetGoalsQuery,
  useGetGoalByIdQuery,
  useGetGoalContributionsQuery,
  useGetSavingsSlidesQuery,
} from "./api/goals-api";

export { useSavingsSlides } from "./lib/use-savings-slides";
