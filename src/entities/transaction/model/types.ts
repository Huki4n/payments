import type { GoalCurrency } from '@/shared/config/currencies'

export type TransactionType = 'INCOME' | 'EXPENSE'

export type CreateTransactionRequest = {
  operationDate: string
  amount: number
  currency: string
  type: TransactionType
  category?: string
  description?: string
}

export type TransactionResponse = {
  id: number
  operationDate: string
  amount: number
  currency: string
  type: TransactionType
  category?: string
  description?: string
  createdAt?: string
}

export type TransactionExtremeResponse = {
  id: number
  amount: number
  operationDate: string
}

export type BankStatementResponse = {
  transactions: TransactionResponse[]
  totalIncome?: number
  totalExpenses?: number
  balance?: number
  totalCount?: number
  incomeCount?: number
  expenseCount?: number
  maxIncome?: TransactionExtremeResponse
  maxExpense?: TransactionExtremeResponse
  averageIncome?: number
  averageExpense?: number
  averageNetProfit?: number
}

export type GetTransactionsParams = {
  type?: TransactionType
  fromDate?: string
  toDate?: string
}

export type GetTransactionsQueryArg = {
  displayCurrency: GoalCurrency
  params?: GetTransactionsParams
}
