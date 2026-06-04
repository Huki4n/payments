import type { TransactionResponse } from '@/entities/transaction'
import type { GoalCurrency } from '@/shared/config/currencies'

import { formatContributionAmount } from '@/entities/goal'
import { getSpendCategoryIcon } from '@/shared/config/spend-categories'

import type { EarningMockRow, SpendMockRow } from '../model/types'

function sortByOperationDateDesc(a: TransactionResponse, b: TransactionResponse): number {
  const byDate = b.operationDate.localeCompare(a.operationDate)

  if (byDate !== 0) {
    return byDate
  }

  return b.id - a.id
}

function mapTransactionToEarning(tx: TransactionResponse, displayCurrency: GoalCurrency): EarningMockRow {
  return {
    id: String(tx.id),
    amount: formatContributionAmount(tx.amount, displayCurrency),
    label: tx.description?.trim() || tx.category?.trim() || '—',
  }
}

function mapTransactionToSpend(tx: TransactionResponse, displayCurrency: GoalCurrency): SpendMockRow {
  return {
    id: String(tx.id),
    amount: formatContributionAmount(-tx.amount, displayCurrency),
    label: tx.description?.trim() || tx.category?.trim() || '—',
    icon: getSpendCategoryIcon(tx.category),
    category: tx.category,
  }
}

export function mapTransactionsToRows(
  transactions: TransactionResponse[] | undefined,
  displayCurrency: GoalCurrency
): {
  earnings: EarningMockRow[]
  spends: SpendMockRow[]
} {
  if (!transactions?.length) {
    return { earnings: [], spends: [] }
  }

  const sorted = [...transactions].sort(sortByOperationDateDesc)

  return {
    earnings: sorted
      .filter(tx => tx.type === 'INCOME')
      .map(tx => mapTransactionToEarning(tx, displayCurrency)),
    spends: sorted
      .filter(tx => tx.type === 'EXPENSE')
      .map(tx => mapTransactionToSpend(tx, displayCurrency)),
  }
}
