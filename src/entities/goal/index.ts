export { getDefaultGoalDeadline, getMinGoalDeadline } from './lib/goal-deadline'
export { formatContributionAmount, formatGoalMoney } from '@/shared/lib/money-format'
export { mapGoalToSavingsSlide } from './lib/map-goal-to-savings-slide'

export type {
  AddContributionRequest,
  Contribution,
  ContributionsPage,
  ContributionType,
  CreateGoalRequest,
  GetGoalContributionsPeriodParams,
  GetGoalContributionsPeriodQueryArg,
  GoalContributionItemResponse,
  GoalContributionsPeriodResponse,
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
  useGetGoalContributionsForPeriodQuery,
  useGetSavingsSlidesQuery,
} from './api/goals-api'
