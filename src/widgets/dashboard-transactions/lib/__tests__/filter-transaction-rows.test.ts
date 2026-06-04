import { describe, expect, it } from 'vitest'

import type { EarningMockRow, SpendMockRow } from '../../model/types'

import { filterTransactionRows } from '../filter-transaction-rows'

const earnings: EarningMockRow[] = [
  { id: '1', amount: '+10,000.00 ₽', label: 'Salary' },
  { id: '2', amount: '+140.13 $', label: 'Bonus' },
]

const spends: SpendMockRow[] = [
  {
    id: '3',
    amount: '−87.30 $',
    label: 'Shop',
    icon: null,
    category: 'shopping',
  },
]

describe('filterTransactionRows', () => {
  it('matches amount query without thousand separators', () => {
    const result = filterTransactionRows(earnings, spends, { amountQuery: '10000' })

    expect(result.earnings).toHaveLength(1)
    expect(result.earnings[0]?.id).toBe('1')
  })

  it('matches amount query with separators like displayed text', () => {
    const result = filterTransactionRows(earnings, spends, { amountQuery: '10,000' })

    expect(result.earnings).toHaveLength(1)
  })

  it('filters spends by category and normalized amount', () => {
    const result = filterTransactionRows(earnings, spends, {
      amountQuery: '87.30',
      spendCategory: 'shopping',
    })

    expect(result.spends).toHaveLength(1)
    expect(result.spends[0]?.id).toBe('3')
  })
})
