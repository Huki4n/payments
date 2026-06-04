import type { EarningMockRow, SpendMockRow, TransactionsCardFilter } from '../model/types'

export function filterTransactionRows(
  earnings: readonly EarningMockRow[],
  spends: readonly SpendMockRow[],
  filter?: TransactionsCardFilter
): { earnings: EarningMockRow[]; spends: SpendMockRow[] } {
  if (!filter) {
    return { earnings: [...earnings], spends: [...spends] }
  }

  const nameQuery = filter.nameQuery?.trim().toLowerCase() ?? ''
  const amountQuery = filter.amountQuery?.trim().toLowerCase() ?? ''
  const spendCategory = filter.spendCategory ?? 'all'

  const matchesNameAndAmount = (row: { label: string; amount: string }) => {
    if (nameQuery && !row.label.toLowerCase().includes(nameQuery)) {
      return false
    }

    if (amountQuery && !row.amount.toLowerCase().includes(amountQuery)) {
      return false
    }

    return true
  }

  return {
    earnings: earnings.filter(matchesNameAndAmount),
    spends: spends.filter(row => {
      if (spendCategory !== 'all' && row.category !== spendCategory) {
        return false
      }

      return matchesNameAndAmount(row)
    }),
  }
}
