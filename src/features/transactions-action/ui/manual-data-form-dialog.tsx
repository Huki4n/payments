import { Fragment, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '@/app/store'
import { getApiErrorMessage } from '@/entities/session'
import { selectDisplayGoalCurrency, selectIsCurrencyConfigured } from '@/entities/settings'
import { useCreateTransactionsMutation } from '@/entities/transaction'
import { showCurrencyRequiredToast } from '@/features/require-settings-currency'
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

import { isManualRowFilled } from '../lib/is-manual-row-filled'
import { mapManualRowToCreateRequest } from '../lib/map-manual-row-to-create-request'
import { createEmptyRow, createInitialRows, type ManualRow } from '../model'
import { ManualDataFormRow } from './manual-data-form-row'
import { TransactionsLoadingOverlay } from './transactions-processing-overlay'

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
        className={
          'h-[min(40dvh,280px)] w-full min-h-0 px-3 sm:h-[min(45vh,350px)] sm:px-6 md:px-8'
        }
      >
        <div className={'flex flex-col gap-4 pr-1 sm:gap-5 sm:pr-2'}>
          {rows.map((row, index) => (
            <Fragment key={row.id}>
              {index > 0 ? <Separator className={'bg-brand-purple/80'} /> : null}
              <ManualDataFormRow row={row} onChange={patch => updateRow(row.id, patch)} />
            </Fragment>
          ))}
        </div>
      </ScrollArea>

      <div
        className={
          'flex shrink-0 flex-col gap-3 border-t border-brand-purple/10 px-3 pb-5 pt-4 sm:gap-4 sm:px-6 sm:pb-6 md:px-8 md:pb-8'
        }
      >
        <Button
          type={'button'}
          className={
            'h-11 w-full rounded-xl bg-brand-blue px-6 font-display text-sm font-bold text-white shadow-sm transition-all hover:bg-brand-blue/90 hover:shadow-md sm:ml-auto sm:h-auto sm:w-auto sm:rounded-[11px] sm:px-8 sm:py-3 sm:text-base'
          }
          onClick={addRow}
        >
          {t('addData.manualForm.addNew')}
        </Button>
        <Button
          type={'button'}
          className={
            'h-11 w-full rounded-xl bg-brand-purple-bg px-6 font-display text-sm font-bold text-white shadow-sm transition-all hover:bg-brand-purple-bg/90 hover:shadow-md sm:rounded-[11px] sm:px-8 sm:py-3 sm:text-base md:py-3.5'
          }
          onClick={() => onSaveProceed(rows)}
        >
          {t('addData.manualForm.saveProceed')}
        </Button>
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
  const { t: tSettings } = useTranslation('settings')
  const navigate = useNavigate()
  const currency = useAppSelector(selectDisplayGoalCurrency)
  const isCurrencyConfigured = useAppSelector(selectIsCurrencyConfigured)
  const [formVersion, setFormVersion] = useState(0)
  const [createTransactions, { isLoading, reset }] = useCreateTransactionsMutation()

  useEffect(() => {
    if (!open) {
      reset()
    }
  }, [open, reset])

  const handleOpenChange = (next: boolean) => {
    if (next) {
      setFormVersion(v => v + 1)
    }
    onOpenChange(next)
  }

  const handleSaveProceed = async (rows: ManualRow[]) => {
    if (!isCurrencyConfigured || !currency) {
      showCurrencyRequiredToast(
        tSettings('requireCurrency.title'),
        tSettings('requireCurrency.description'),
        tSettings('requireCurrency.action'),
        () => navigate('/settings')
      )

      return
    }

    const filledRows = rows.filter(isManualRowFilled)

    if (filledRows.length === 0) {
      toast.error(t('addData.errors.noRows'))

      return
    }

    const payloads = rows
      .map(row => mapManualRowToCreateRequest(row, currency))
      .filter(body => body !== null)

    try {
      await createTransactions(payloads).unwrap()
      toast.success(t('addData.manualForm.saved'))
      onOpenChange(false)
    } catch (error) {
      toast.error(getApiErrorMessage(error, t('addData.errors.submitFailed')))
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton
        className={
          'flex max-h-[min(92dvh,900px)] w-[calc(100%-1rem)] max-w-[calc(100%-1rem)] flex-col gap-0 overflow-hidden rounded-2xl border-0 bg-add-data-panel p-0 shadow-xl sm:max-w-2xl md:max-w-4xl lg:max-w-5xl sm:rounded-3xl'
        }
      >
        <DialogHeader
          className={'shrink-0 space-y-0 px-3 pb-3 pt-5 pr-11 sm:px-6 sm:py-6 sm:pr-12 md:px-8 md:py-8'}
        >
          <DialogTitle
            className={
              'text-center font-display text-xl font-bold leading-snug text-brand-purple sm:text-2xl md:text-3xl lg:text-4xl'
            }
          >
            {t('addData.manualForm.title')}
          </DialogTitle>
          <DialogDescription className={'sr-only'}>
            {t('addData.manualForm.description')}
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <TransactionsLoadingOverlay className={'min-h-64 sm:min-h-96'} />
        ) : (
          <ManualDataFormBody key={formVersion} onSaveProceed={handleSaveProceed} />
        )}
      </DialogContent>
    </Dialog>
  )
}
