import type { GoalCurrency } from '@/shared/config/currencies'

export type CreateGoalFormValues = {
  title: string
  targetAmount: string
  currency: GoalCurrency
  deadline: string
}
