import type { ManualRow } from './types'

import { MANUAL_FORM_INITIAL_ROW_COUNT } from '../config/manual-form'

export function createEmptyRow(): ManualRow {
  return {
    id: crypto.randomUUID(),
    name: '',
    category: '',
    amount: '',
  }
}

export function createInitialRows(): ManualRow[] {
  return Array.from({ length: MANUAL_FORM_INITIAL_ROW_COUNT }, () => createEmptyRow())
}
