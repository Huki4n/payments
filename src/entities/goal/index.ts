export { getDefaultGoalDeadline, getMinGoalDeadline } from "./lib/goal-deadline";

export type {
  AddContributionRequest,
  Contribution,
  ContributionsPage,
  ContributionType,
  CreateGoalRequest,
  GoalDetails,
  GoalListItem,
  GoalProgressInfo,
  GoalStatus,
  SavingsProgressPoint,
  SavingsReplenishment,
  SavingsSlide,
  UpdateGoalRequest,
} from "./model";

export {
  goalsApi,
  useCreateGoalMutation,
  useUpdateGoalMutation,
  useDeleteGoalMutation,
  useAddContributionMutation,
  useGetGoalsQuery,
  useGetGoalByIdQuery,
  useGetGoalContributionsQuery,
  useGetSavingsSlidesQuery,
} from "./api/goals-api";
