import { baseApi } from '@/shared/api'
import { GOAL_CURRENCIES, type GoalCurrency } from '@/shared/config/currencies'
import { fetchExchangeRates } from '@/shared/lib/currency-exchange'

import type {
  AddContributionRequest,
  Contribution,
  ContributionsPage,
  CreateGoalRequest,
  GetGoalContributionsPeriodQueryArg,
  GoalContributionsPeriodResponse,
  GoalDetails,
  GoalListItem,
  SavingsSlide,
  UpdateGoalRequest,
} from '../model'

import { convertGoalContributionsPeriodToDisplayCurrency } from '../lib/convert-goal-contributions-period'
import { mapGoalToSavingsSlide } from '../lib/map-goal-to-savings-slide'

export const goalsApi = baseApi.injectEndpoints({
  endpoints: build => ({
    createGoal: build.mutation<GoalDetails, CreateGoalRequest>({
      query: body => ({
        url: '/goals',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Goal', id: 'LIST' }],
    }),
    getGoals: build.query<GoalListItem[], void>({
      query: () => '/goals',
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Goal' as const, id })),
              { type: 'Goal', id: 'LIST' },
            ]
          : [{ type: 'Goal', id: 'LIST' }],
    }),
    getGoalById: build.query<GoalDetails, number>({
      query: goalId => `/goals/${goalId}`,
      providesTags: (_result, _error, goalId) => [{ type: 'Goal', id: goalId }],
    }),
    getGoalContributionsForPeriod: build.query<
      GoalContributionsPeriodResponse,
      GetGoalContributionsPeriodQueryArg
    >({
      async queryFn({ displayCurrency, params }, _api, _extraOptions, baseQuery) {
        const [contributionsResult, goalsResult] = await Promise.all([
          baseQuery({
            url: '/goals/contributions',
            params: params ?? undefined,
          }),
          baseQuery('/goals'),
        ])

        if (contributionsResult.error) {
          return { error: contributionsResult.error }
        }

        if (goalsResult.error) {
          return { error: goalsResult.error }
        }

        const rates = await fetchExchangeRates({
          base: 'USD',
          targets: GOAL_CURRENCIES.filter(code => code !== 'USD'),
        })

        const goals = goalsResult.data as GoalListItem[]
        const goalCurrencyById = new Map(goals.map(goal => [goal.id, goal.currency]))

        return {
          data: convertGoalContributionsPeriodToDisplayCurrency(
            contributionsResult.data as GoalContributionsPeriodResponse,
            goalCurrencyById,
            displayCurrency,
            rates
          ),
        }
      },
      providesTags: [{ type: 'Goal', id: 'CONTRIBUTIONS_PERIOD' }],
    }),
    getGoalContributions: build.query<
      ContributionsPage,
      { goalId: number; page?: number; size?: number }
    >({
      query: ({ goalId, page = 0, size = 20 }) => ({
        url: `/goals/${goalId}/contributions`,
        params: { page, size },
      }),
      providesTags: (_result, _error, { goalId }) => [
        { type: 'Goal', id: goalId },
        { type: 'Goal', id: `${goalId}-contributions` },
      ],
    }),
    updateGoal: build.mutation<GoalDetails, { goalId: number; body: UpdateGoalRequest }>({
      query: ({ goalId, body }) => ({
        url: `/goals/${goalId}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (_result, _error, { goalId }) => [
        { type: 'Goal', id: goalId },
        { type: 'Goal', id: 'LIST' },
        { type: 'Goal', id: `${goalId}-contributions` },
      ],
    }),
    deleteGoal: build.mutation<void, number>({
      query: goalId => ({
        url: `/goals/${goalId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Goal', id: 'LIST' }],
    }),
    addContribution: build.mutation<Contribution, { goalId: number; body: AddContributionRequest }>(
      {
        query: ({ goalId, body }) => ({
          url: `/goals/${goalId}/contributions`,
          method: 'POST',
          body,
        }),
        invalidatesTags: (_result, _error, { goalId }) => [
          { type: 'Goal', id: goalId },
          { type: 'Goal', id: 'LIST' },
          { type: 'Goal', id: `${goalId}-contributions` },
          { type: 'Goal', id: 'CONTRIBUTIONS_PERIOD' },
        ],
      }
    ),
    getSavingsSlides: build.query<SavingsSlide[], GoalCurrency>({
      async queryFn(displayCurrency, _api, _extraOptions, baseQuery) {
        const listResult = await baseQuery('/goals')

        if (listResult.error) {
          return { error: listResult.error }
        }

        const rates = await fetchExchangeRates({
          base: 'USD',
          targets: GOAL_CURRENCIES.filter(code => code !== 'USD'),
        })

        const goals = listResult.data as GoalListItem[]
        const slides: SavingsSlide[] = []

        for (const goal of goals) {
          const [detailResult, contributionsResult] = await Promise.all([
            baseQuery(`/goals/${goal.id}`),
            baseQuery({
              url: `/goals/${goal.id}/contributions`,
              params: { page: 0, size: 20 },
            }),
          ])

          if (detailResult.error) {
            return { error: detailResult.error }
          }
          if (contributionsResult.error) {
            return { error: contributionsResult.error }
          }

          slides.push(
            mapGoalToSavingsSlide(
              detailResult.data as GoalDetails,
              (contributionsResult.data as ContributionsPage).content,
              { displayCurrency, rates }
            )
          )
        }

        return { data: slides }
      },
      providesTags: [{ type: 'Goal', id: 'LIST' }],
    }),
  }),
})

export const {
  useCreateGoalMutation,
  useUpdateGoalMutation,
  useDeleteGoalMutation,
  useAddContributionMutation,
  useGetGoalsQuery,
  useGetGoalByIdQuery,
  useGetGoalContributionsQuery,
  useGetGoalContributionsForPeriodQuery,
  useGetSavingsSlidesQuery,
} = goalsApi
