export type GoalStatus = 'ACTIVE' | 'COMPLETED' | 'CANCELLED'

export type GoalProgressInfo = {
  currentAmount: number
  remainingAmount: number
  daysRemaining: number
  monthlyPayment: number
  progressPercentage: number
}

/** GET /goals */
export type GoalListItem = {
  id: number
  title: string
  targetAmount: number
  currency: string
  deadline: string
  status: GoalStatus
  progressPercentage: number
}

/** GET /goals/{id} */
export type GoalDetails = {
  id: number
  title: string
  targetAmount: number
  currency: string
  deadline: string
  status: GoalStatus
  progressInfo: GoalProgressInfo
}

/** POST /goals */
export type CreateGoalRequest = {
  title: string
  targetAmount: number
  currency: string
  deadline: string
}

/** PATCH /goals/{id} */
export type UpdateGoalRequest = {
  title?: string
  targetAmount?: number
  currency?: string
  deadline?: string
}
