export type SavingsTitleKey =
  | 'savingsWorldTrip'
  | 'savingsEmergency'
  | 'savingsCarPurchase'
  | 'savingsHomeFund'
  | 'savingsGadgetFund'

export type SavingsReplenishment = {
  date: string
  /** Сумма в валюте slide.currency */
  amount: number
  isWithdrawal?: boolean
}

export type SavingsProgressPoint = {
  month: string
  value: number
}

export type SavingsSlide = {
  id: string
  /** Заголовок с API */
  title?: string
  /** Ключ i18n для моков на главной */
  titleKey?: SavingsTitleKey
  /** Валюта отображения (после конвертации из валюты цели) */
  currency: string
  goal: number
  total: number
  replenishments: SavingsReplenishment[]
  progressChart: SavingsProgressPoint[]
}
