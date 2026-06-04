import type { GoalContributionItemResponse } from '@/entities/goal'

import { dashboardChartXAxisTick, dashboardChartYAxisTick } from '@/shared/lib/dashboard-chart-axes'

export const TOTAL_SAVED_Y_TICK = {
  ...dashboardChartYAxisTick,
  fill: 'color-mix(in srgb, var(--brand-purple) 33%, transparent)',
  fontSize: 11,
  fontWeight: 400 as const,
}

export const TOTAL_SAVED_X_TICK = {
  ...dashboardChartXAxisTick,
  fontSize: 11,
}

export const CHART_INITIAL_DIMENSION = { width: 160, height: 100 } as const
export const EMPTY_LABEL = '—'
export const EMPTY_CONTRIBUTIONS: GoalContributionItemResponse[] = []
