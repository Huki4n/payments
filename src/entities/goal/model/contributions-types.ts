export type ContributionType = 'MANUAL' | 'AUTO'

export type Contribution = {
  id: number
  amount: number
  type: ContributionType
  createdAt: string
}

/** POST /goals/{id}/contributions */
export type AddContributionRequest = {
  amount: number
  type: ContributionType
}

/** GET /goals/{id}/contributions */
export type ContributionsPage = {
  content: Contribution[]
  pageNumber: number
  pageSize: number
  totalElements: number
  totalPages: number
  first: boolean
  last: boolean
}

/** Элемент списка GET /goals/contributions */
export type GoalContributionItemResponse = {
  id: number
  goalId: number
  goalTitle: string
  amount: number
  type: ContributionType
  createdAt: string
}

/** GET /goals/contributions */
export type GoalContributionsPeriodResponse = {
  totalAmount: number
  count: number
  contributions: GoalContributionItemResponse[]
}

export type GetGoalContributionsPeriodParams = {
  fromDate?: string
  toDate?: string
}
