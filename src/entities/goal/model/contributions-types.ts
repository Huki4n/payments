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
