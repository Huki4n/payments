export type GoalStatus = "ACTIVE" | "COMPLETED" | "CANCELLED";

export type ContributionType = "MANUAL" | "AUTO";

export type GoalListItem = {
  id: number;
  title: string;
  targetAmount: number;
  currency: string;
  deadline: string;
  status: GoalStatus;
  progressPercentage: number;
};

export type GoalProgressInfo = {
  currentAmount: number;
  remainingAmount: number;
  daysRemaining: number;
  monthlyPayment: number;
  progressPercentage: number;
};

export type GoalDetails = {
  id: number;
  title: string;
  targetAmount: number;
  currency: string;
  deadline: string;
  status: GoalStatus;
  progressInfo: GoalProgressInfo;
};

export type Contribution = {
  id: number;
  amount: number;
  type: ContributionType;
  createdAt: string;
};

export type ContributionsPage = {
  content: Contribution[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
};
