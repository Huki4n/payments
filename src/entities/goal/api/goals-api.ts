import { baseApi } from "@/shared/api";

import { mapGoalToSavingsSlide } from "../lib/map-goal-to-savings-slide";
import type {
  ContributionsPage,
  GoalDetails,
  GoalListItem,
} from "../model/types";
import type { SavingsSlide } from "../model/savings-slide";

export const goalsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getGoals: build.query<GoalListItem[], void>({
      query: () => "/goals",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Goal" as const, id })),
              { type: "Goal", id: "LIST" },
            ]
          : [{ type: "Goal", id: "LIST" }],
    }),
    getGoalById: build.query<GoalDetails, number>({
      query: (goalId) => `/goals/${goalId}`,
      providesTags: (_result, _error, goalId) => [{ type: "Goal", id: goalId }],
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
        { type: "Goal", id: goalId },
        { type: "Goal", id: `${goalId}-contributions` },
      ],
    }),
    getSavingsSlides: build.query<SavingsSlide[], void>({
      async queryFn(_arg, _api, _extraOptions, baseQuery) {
        const listResult = await baseQuery("/goals");
        if (listResult.error) {
          return { error: listResult.error };
        }

        const goals = listResult.data as GoalListItem[];
        const slides: SavingsSlide[] = [];

        for (const goal of goals) {
          const [detailResult, contributionsResult] = await Promise.all([
            baseQuery(`/goals/${goal.id}`),
            baseQuery({
              url: `/goals/${goal.id}/contributions`,
              params: { page: 0, size: 20 },
            }),
          ]);

          if (detailResult.error) {
            return { error: detailResult.error };
          }
          if (contributionsResult.error) {
            return { error: contributionsResult.error };
          }

          slides.push(
            mapGoalToSavingsSlide(
              detailResult.data as GoalDetails,
              (contributionsResult.data as ContributionsPage).content,
            ),
          );
        }

        return { data: slides };
      },
      providesTags: [{ type: "Goal", id: "LIST" }],
    }),
  }),
});

export const {
  useGetGoalsQuery,
  useGetGoalByIdQuery,
  useGetGoalContributionsQuery,
  useGetSavingsSlidesQuery,
} = goalsApi;
