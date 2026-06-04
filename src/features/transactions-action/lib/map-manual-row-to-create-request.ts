import type { CreateTransactionRequest } from '@/entities/transaction'
import type { GoalCurrency } from '@/shared/config/currencies'

import {
  getTransactionTypeForCategory,
  isCategoryValidForAmount,
  type TransactionCategoryId,
} from '@/shared/config/transaction-categories'

import type { ManualRow } from '../model/types'

import { isManualRowFilled } from './is-manual-row-filled'

export function mapManualRowToCreateRequest(
  row: ManualRow,
  currency: GoalCurrency
): CreateTransactionRequest | null {
  if (!isManualRowFilled(row)) {
    return null
  }

  const parsed = Number.parseFloat(row.amount)
  const absoluteAmount = Math.abs(parsed)

  if (
    !Number.isFinite(parsed) ||
    parsed === 0 ||
    absoluteAmount < 0.01 ||
    !row.category ||
    !isCategoryValidForAmount(row.category)
  ) {
    return null
  }

  const type = getTransactionTypeForCategory(row.category as TransactionCategoryId)

  return {
    operationDate: new Date().toISOString(),
    amount: absoluteAmount,
    currency,
    type,
    category: row.category,
    description: row.name.trim() || undefined,
  }
}
