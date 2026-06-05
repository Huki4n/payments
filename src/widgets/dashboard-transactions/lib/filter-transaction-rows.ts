import type { EarningMockRow, SpendMockRow, TransactionsCardFilter } from '../model/types'

/** Только цифры — чтобы «10000» находило отформатированное «10,000.00». */
function toAmountSearchDigits(value: string): string {
  return value.replace(/\D/g, '')
}

function amountMatchesQuery(formattedAmount: string, query: string): boolean {
  const queryDigits = toAmountSearchDigits(query)

  if (!queryDigits) {
    return true
  }

  return toAmountSearchDigits(formattedAmount).includes(queryDigits)
}

export function filterTransactionRows(
  earnings: readonly EarningMockRow[],
  spends: readonly SpendMockRow[],
  filter?: TransactionsCardFilter
): { earnings: EarningMockRow[]; spends: SpendMockRow[] } {
  if (!filter) {
    return { earnings: [...earnings], spends: [...spends] }
  }

  const nameQuery = filter.nameQuery?.trim().toLowerCase() ?? ''
  const amountQuery = filter.amountQuery?.trim() ?? ''
  const spendCategory = filter.spendCategory ?? 'all'

  const matchesNameAndAmount = (row: { label: string; amount: string }) => {
    if (nameQuery && !row.label.toLowerCase().includes(nameQuery)) {
      return false
    }

    if (amountQuery && !amountMatchesQuery(row.amount, amountQuery)) {
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
