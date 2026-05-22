import { useTranslation } from 'react-i18next'

import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui'
import { cn } from '@/shared/ui/utils'

import type { ManualRow } from '../model'

import { MANUAL_FORM_CATEGORY_KEYS } from '../config/manual-form'
import { sanitizeAmountInput } from '../lib/sanitize-amount-input'
import {
  manualFormInputInRowClass,
  manualFormRowFieldClass,
} from '../model/manual-data-form-styles'

export interface ManualDataFormRowProps {
  row: ManualRow
  onChange: (patch: Partial<Omit<ManualRow, 'id'>>) => void
  className?: string
}

export const ManualDataFormRow = ({ row, onChange, className }: ManualDataFormRowProps) => {
  const { t } = useTranslation('home')

  return (
    <div className={cn('flex flex-col gap-2.5 sm:gap-3', className)}>
      <div className={cn(manualFormRowFieldClass, 'flex items-center')}>
        <Input
          value={row.name}
          onChange={e => onChange({ name: e.target.value })}
          placeholder={t('addData.manualForm.name')}
          className={manualFormInputInRowClass}
        />
      </div>
      <div
        className={'grid grid-cols-1 gap-2.5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] sm:gap-3'}
      >
        <div className={cn(manualFormRowFieldClass, 'py-2')}>
          <Select value={row.category} onValueChange={v => onChange({ category: v })}>
            <SelectTrigger
              className={cn(
                'h-auto min-h-0 w-full max-w-none border-0 bg-transparent py-1 pr-1 pl-0 font-display text-sm text-brand-purple shadow-none focus-visible:ring-0 data-[size=default]:h-auto md:text-base [&_svg]:text-brand-purple'
              )}
            >
              <SelectValue placeholder={t('addData.manualForm.category')} />
            </SelectTrigger>
            <SelectContent>
              {MANUAL_FORM_CATEGORY_KEYS.map(key => (
                <SelectItem key={key} value={key}>
                  {t(`addData.manualForm.categories.${key}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className={cn(manualFormRowFieldClass, 'flex items-center')}>
          <Input
            value={row.amount}
            onChange={e => onChange({ amount: sanitizeAmountInput(e.target.value) })}
            placeholder={t('addData.manualForm.amount')}
            inputMode={'decimal'}
            className={manualFormInputInRowClass}
          />
        </div>
      </div>
    </div>
  )
}
