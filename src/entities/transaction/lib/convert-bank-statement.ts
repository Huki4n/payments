import type { GoalCurrency } from '@/shared/config/currencies'
import type { ExchangeRates } from '@/shared/lib/currency-exchange'

import { convertCurrency } from '@/shared/lib/currency-exchange'

import type {
  BankStatementResponse,
  TransactionExtremeResponse,
  TransactionResponse,
} from '../model/types'

function convertAmount(
  amount: number,
  fromCurrency: string,
  displayCurrency: GoalCurrency,
  rates: ExchangeRates
): number {
  return convertCurrency(amount, fromCurrency, displayCurrency, rates)
}

function convertOptionalAmount(
  amount: number | undefined,
  fromCurrency: string,
  displayCurrency: GoalCurrency,
  rates: ExchangeRates
): number | undefined {
  if (amount == null || !Number.isFinite(amount)) {
    return undefined
  }

  return convertAmount(amount, fromCurrency, displayCurrency, rates)
}

function convertTransaction(
  tx: TransactionResponse,
  displayCurrency: GoalCurrency,
  rates: ExchangeRates
): TransactionResponse {
  return {
    ...tx,
    amount: convertAmount(tx.amount, tx.currency, displayCurrency, rates),
    currency: displayCurrency,
  }
}

function convertExtreme(
  extreme: TransactionExtremeResponse | undefined,
  sourceCurrencyById: Map<number, string>,
  displayCurrency: GoalCurrency,
  rates: ExchangeRates
): TransactionExtremeResponse | undefined {
  if (!extreme) {
    return undefined
  }

  const from = sourceCurrencyById.get(extreme.id) ?? displayCurrency

  return {
    ...extreme,
    amount: convertAmount(extreme.amount, from, displayCurrency, rates),
  }
}

/** Приводит выписку и агрегаты к валюте отображения (как в savings slides). */
export function convertBankStatementToDisplayCurrency(
  statement: BankStatementResponse,
  displayCurrency: GoalCurrency,
  rates: ExchangeRates
): BankStatementResponse {
  const sourceCurrencyById = new Map(
    statement.transactions.map(tx => [tx.id, tx.currency] as const)
  )
  const aggregateSource = statement.transactions[0]?.currency ?? displayCurrency

  const transactions = statement.transactions.map(tx =>
    convertTransaction(tx, displayCurrency, rates)
  )

  const totalIncomeFromTx = transactions
    .filter(tx => tx.type === 'INCOME')
    .reduce((sum, tx) => sum + tx.amount, 0)

  const totalExpensesFromTx = transactions
    .filter(tx => tx.type === 'EXPENSE')
    .reduce((sum, tx) => sum + tx.amount, 0)

  const incomeCount =
    statement.incomeCount ?? transactions.filter(tx => tx.type === 'INCOME').length
  const expenseCount =
    statement.expenseCount ?? transactions.filter(tx => tx.type === 'EXPENSE').length

  const totalIncome =
    transactions.length > 0
      ? totalIncomeFromTx
      : convertOptionalAmount(statement.totalIncome, aggregateSource, displayCurrency, rates)

  const totalExpenses =
    transactions.length > 0
      ? totalExpensesFromTx
      : convertOptionalAmount(statement.totalExpenses, aggregateSource, displayCurrency, rates)

  const averageIncome =
    transactions.length > 0 && incomeCount > 0
      ? Number((totalIncomeFromTx / incomeCount).toFixed(2))
      : convertOptionalAmount(statement.averageIncome, aggregateSource, displayCurrency, rates)

  const averageExpense =
    transactions.length > 0 && expenseCount > 0
      ? Number((totalExpensesFromTx / expenseCount).toFixed(2))
      : convertOptionalAmount(statement.averageExpense, aggregateSource, displayCurrency, rates)

  const averageNetProfit =
    averageIncome != null && averageExpense != null
      ? Number((averageIncome - averageExpense).toFixed(2))
      : convertOptionalAmount(statement.averageNetProfit, aggregateSource, displayCurrency, rates)

  return {
    ...statement,
    transactions,
    totalIncome,
    totalExpenses,
    balance: convertOptionalAmount(statement.balance, aggregateSource, displayCurrency, rates),
    maxIncome: convertExtreme(statement.maxIncome, sourceCurrencyById, displayCurrency, rates),
    maxExpense: convertExtreme(statement.maxExpense, sourceCurrencyById, displayCurrency, rates),
    averageIncome,
    averageExpense,
    averageNetProfit,
  }
}
