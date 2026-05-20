export const MANUAL_FORM_INITIAL_ROW_COUNT = 5

export const MANUAL_FORM_CATEGORY_KEYS = [
  'groceries',
  'transport',
  'bills',
  'entertainment',
  'health',
  'other',
] as const

export type ManualFormCategoryKey = (typeof MANUAL_FORM_CATEGORY_KEYS)[number]
