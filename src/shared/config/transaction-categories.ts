import type { TFunction } from 'i18next'

import type { TransactionType } from '@/entities/transaction'

import { INCOME_CATEGORY_IDS, type IncomeCategoryId } from './income-categories'
import { SPEND_CATEGORY_IDS, type SpendCategoryId } from './spend-categories'

export type TransactionCategoryId = IncomeCategoryId | SpendCategoryId

type HomeCategoryI18nKey = `dashboard.categories.${TransactionCategoryId}`

export const TRANSACTION_CATEGORY_IDS: readonly TransactionCategoryId[] = [
  ...INCOME_CATEGORY_IDS,
  ...SPEND_CATEGORY_IDS,
]

const transactionCategoryIdSet = new Set<string>(TRANSACTION_CATEGORY_IDS)

export function isTransactionCategoryId(id: string): id is TransactionCategoryId {
  return transactionCategoryIdSet.has(id)
}

export function getTransactionCategoryI18nKey(
  categoryId: TransactionCategoryId
): HomeCategoryI18nKey {
  return `dashboard.categories.${categoryId}`
}

export function translateTransactionCategory(t: TFunction<'home'>, categoryId: string): string {
  if (isTransactionCategoryId(categoryId)) {
    return t(getTransactionCategoryI18nKey(categoryId))
  }

  return categoryId
}

export function getCategoryIdsForTransactionType(
  type: TransactionType
): readonly TransactionCategoryId[] {
  return type === 'INCOME' ? INCOME_CATEGORY_IDS : SPEND_CATEGORY_IDS
}

/** Все ключи категорий для ручной формы (доходы и расходы). */
export function getCategoryIdsForAmount(): readonly TransactionCategoryId[] {
  return TRANSACTION_CATEGORY_IDS
}

export function getTransactionTypeForCategory(category: TransactionCategoryId): TransactionType {
  return (INCOME_CATEGORY_IDS as readonly string[]).includes(category) ? 'INCOME' : 'EXPENSE'
}

export function isCategoryValidForAmount(category: string): boolean {
  return isTransactionCategoryId(category)
}
