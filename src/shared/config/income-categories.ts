export const INCOME_CATEGORIES = [
  { id: 'catSalary' },
  { id: 'catTransfer' },
  { id: 'catFreelance' },
  { id: 'catCashback' },
  { id: 'catInterest' },
  { id: 'catRefund' },
  { id: 'catGift' },
] as const satisfies ReadonlyArray<{ id: string }>

export type IncomeCategoryId = (typeof INCOME_CATEGORIES)[number]['id']

export const INCOME_CATEGORY_IDS: IncomeCategoryId[] = INCOME_CATEGORIES.map(category => category.id)

const incomeCategoryIdSet = new Set<string>(INCOME_CATEGORY_IDS)

export function resolveIncomeCategoryId(category?: string): IncomeCategoryId {
  if (category && incomeCategoryIdSet.has(category)) {
    return category as IncomeCategoryId
  }

  return 'catTransfer'
}
