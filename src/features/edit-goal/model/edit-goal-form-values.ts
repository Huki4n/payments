import type { GoalCurrency } from '@/shared/config/currencies'

export type EditGoalFormValues = {
  title: string
  targetAmount: string
  currency: GoalCurrency
  deadline: string
}
