import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { toast } from '@/shared/lib/toast'
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  ScrollArea,
  Separator,
} from '@/shared/ui'

import { useSubmitManualRowsMutation } from '../api/add-data-api'
import { createEmptyRow, createInitialRows, type ManualRow } from '../model'
import { AddDataCompletePanel, AddDataLoadingOverlay } from './add-data-processing-overlay'
import { ManualDataFormRow } from './manual-data-form-row'

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
        <div className={'flex flex-col gap-5 pr-2'}>
          {rows.map((row, index) => (
            <>
              {index > 0 && <Separator className={'bg-brand-purple/80'} />}
              <ManualDataFormRow
                key={row.id}
                row={row}
                onChange={patch => updateRow(row.id, patch)}
              />
            </>
          ))}
        </div>
      </ScrollArea>

      <div className={'flex shrink-0 flex-col gap-4 px-4 pb-6 pt-4 sm:px-8 sm:pb-8'}>
        <div className={'flex justify-end'}>
          <Button
            type={'button'}
            className={
              'rounded-xl bg-brand-blue px-6 py-3 font-display text-sm font-bold text-white shadow-sm transition-all hover:bg-brand-blue/90 hover:shadow-md sm:rounded-[11px] sm:px-8 sm:text-base'
            }
            onClick={addRow}
          >
            {t('addData.manualForm.addNew')}
          </Button>
        </div>
        <div className={'flex justify-center'}>
          <Button
            type={'button'}
            className={
              'w-full max-w-md rounded-xl bg-brand-purple-bg px-8 py-3 font-display text-sm font-bold text-white shadow-sm transition-all hover:bg-brand-purple-bg/90 hover:shadow-md sm:rounded-[11px] sm:text-base md:py-3.5'
            }
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
      toast.error(t('addData.errors.submitFailed'))
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton
        className={
          'flex max-h-[90dvh] w-full max-w-4xl flex-col gap-0 overflow-hidden rounded-3xl border-0 bg-add-data-panel p-0 shadow-xl sm:max-w-5xl'
        }
      >
        <DialogHeader className={'shrink-0 px-4 py-6 sm:px-8 sm:py-8'}>
          <DialogTitle
            className={
              'text-center font-display text-2xl font-bold text-brand-purple sm:text-3xl md:text-4xl'
            }
          >
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
