import type { ManualRow } from '../model/types'

export function isManualRowFilled(row: ManualRow): boolean {
  return (
    row.name.trim().length > 0 || row.category.length > 0 || row.amount.trim().length > 0
  )
}
