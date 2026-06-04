export { getDefaultGoalDeadline, getMinGoalDeadline } from './lib/goal-deadline'
export { formatContributionAmount, formatGoalMoney } from './lib/format-goal-money'
export { mapGoalToSavingsSlide } from './lib/map-goal-to-savings-slide'

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
} from './model'

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
} from './api/goals-api'
