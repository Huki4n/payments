import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Input,
  ScrollArea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui'
import { cn } from '@/shared/ui/utils'

import { useSubmitManualRowsMutation } from '../api/add-data-api'
import { MANUAL_FORM_CATEGORY_KEYS } from '../config/manual-form'
import { sanitizeAmountInput } from '../lib/sanitize-amount-input'
import { createEmptyRow, createInitialRows, type ManualRow } from '../model'
import {
  manualFormInputInRowClass,
  manualFormRowFieldClass,
} from '../model/manual-data-form-styles'
import { AddDataCompletePanel, AddDataLoadingOverlay } from './add-data-processing-overlay'

interface ManualDataFormBodyProps {
  onSaveProceed: (rows: ManualRow[]) => void | Promise<void>
}

const ManualDataFormBody = ({ onSaveProceed }: ManualDataFormBodyProps) => {
  const { t } = useTranslation('home')
  const [rows, setRows] = useState<ManualRow[]>(createInitialRows)

  const updateRow = useCallback((id: string, patch: Partial<Omit<ManualRow, 'id'>>) => {
    setRows(prev => prev.map(row => (row.id === id ? { ...row, ...patch } : row)))
  }, [])

  const addRow = useCallback(() => {
    setRows(prev => [...prev, createEmptyRow()])
  }, [])

  return (
    <>
      <ScrollArea
        overflowFade
        overflowFadeFrom={'from-popover'}
        className={'h-[min(45vh,350px)] max-w-240 w-full min-h-0 mx-4 sm:mx-8 px-2'}
      >
        <div className={'flex flex-col gap-3 pr-2'}>
          {rows.map(row => (
            <div
              key={row.id}
              className={'grid grid-cols-1 gap-2.5 md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)_minmax(0,1fr)] md:gap-3'}
            >
              <div className={cn(manualFormRowFieldClass, 'flex items-center')}>
                <Input
                  value={row.name}
                  onChange={e => updateRow(row.id, { name: e.target.value })}
                  placeholder={t('addData.manualForm.name')}
                  className={manualFormInputInRowClass}
                />
              </div>
              <div className={cn(manualFormRowFieldClass, 'py-2')}>
                <Select
                  value={row.category}
                  onValueChange={v => updateRow(row.id, { category: v })}
                >
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
                  onChange={e =>
                    updateRow(row.id, {
                      amount: sanitizeAmountInput(e.target.value),
                    })
                  }
                  placeholder={t('addData.manualForm.amount')}
                  inputMode={'decimal'}
                  className={manualFormInputInRowClass}
                />
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className={'flex shrink-0 flex-col gap-4 px-4 pb-6 pt-4 sm:px-8 sm:pb-8'}>
        <div className={'flex justify-end'}>
          <Button
            type={'button'}
            className={'rounded-xl bg-brand-blue px-6 py-3 font-display text-sm font-bold text-white shadow-sm transition-all hover:bg-brand-blue/90 hover:shadow-md sm:rounded-[11px] sm:px-8 sm:text-base'}
            onClick={addRow}
          >
            {t('addData.manualForm.addNew')}
          </Button>
        </div>
        <div className={'flex justify-center'}>
          <Button
            type={'button'}
            className={'w-full max-w-md rounded-xl bg-brand-purple-bg px-8 py-3 font-display text-sm font-bold text-white shadow-sm transition-all hover:bg-brand-purple-bg/90 hover:shadow-md sm:rounded-[11px] sm:text-base md:py-3.5'}
            onClick={() => void onSaveProceed(rows)}
          >
            {t('addData.manualForm.saveProceed')}
          </Button>
        </div>
      </div>
    </>
  )
}

export interface ManualDataFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const ManualDataFormDialog = ({ open, onOpenChange }: ManualDataFormDialogProps) => {
  const { t } = useTranslation('home')
  const [formVersion, setFormVersion] = useState(0)
  const [showComplete, setShowComplete] = useState(false)
  const [submitManual, { isLoading, reset }] = useSubmitManualRowsMutation()

  useEffect(() => {
    if (!open) {
      reset()
    }
  }, [open, reset])

  const handleOpenChange = (next: boolean) => {
    if (next) {
      setFormVersion(v => v + 1)
      setShowComplete(false)
    }
    onOpenChange(next)
  }

  const handleSaveProceed = async (rows: ManualRow[]) => {
    try {
      await submitManual({ rows }).unwrap()
      setShowComplete(true)
    } catch {
      /* backend stub */
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton
        className={'flex max-h-[90dvh] w-full max-w-4xl flex-col gap-0 overflow-hidden rounded-3xl border-0 bg-add-data-panel p-0 shadow-xl sm:max-w-5xl'}
      >
        <DialogHeader className={'shrink-0 px-4 py-6 sm:px-8 sm:py-8'}>
          <DialogTitle className={'text-center font-display text-2xl font-bold text-brand-purple sm:text-3xl md:text-4xl'}>
            {t('addData.manualForm.title')}
          </DialogTitle>
          <DialogDescription className={'sr-only'}>
            {t('addData.manualForm.description')}
          </DialogDescription>
        </DialogHeader>

        {showComplete ? (
          <AddDataCompletePanel onDone={() => onOpenChange(false)} />
        ) : isLoading ? (
          <AddDataLoadingOverlay className={'min-h-96'} />
        ) : (
          <ManualDataFormBody key={formVersion} onSaveProceed={handleSaveProceed} />
        )}
      </DialogContent>
    </Dialog>
  )
}
