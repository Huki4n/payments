import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { X } from 'lucide-react'

import { getApiErrorMessage } from '@/entities/session'
import { useParseStatementsMutation } from '@/entities/transaction'
import { toast } from '@/shared/lib/toast'
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  ScrollArea,
} from '@/shared/ui'
import { cn } from '@/shared/ui/utils'

import {
  TransactionsCompletePanel,
  TransactionsLoadingOverlay,
} from './transactions-processing-overlay'

export interface UploadBankStatementsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type UploadEntry = { id: string; file: File }

export const UploadBankStatementsDialog = ({
  open,
  onOpenChange,
}: UploadBankStatementsDialogProps) => {
  const { t } = useTranslation('home')
  const inputId = useId()
  const [entries, setEntries] = useState<UploadEntry[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [showComplete, setShowComplete] = useState(false)
  const dragDepthRef = useRef(0)
  const [parseStatements, { isLoading, reset }] = useParseStatementsMutation()

  const resetFormState = useCallback(() => {
    setEntries([])
    setIsDragging(false)
    setShowComplete(false)
    dragDepthRef.current = 0
  }, [])

  useEffect(() => {
    if (!open) {
      reset()
    }
  }, [open, reset])

  const handleOpenChange = (next: boolean) => {
    if (next) {
      resetFormState()
    }

    onOpenChange(next)
  }

  const addFiles = useCallback(
    (list: FileList | File[]) => {
      const incoming = Array.from(list)
      const csvFiles = incoming.filter(
        file =>
          file.name.toLowerCase().endsWith('.csv') ||
          file.type === 'text/csv' ||
          file.type === 'application/vnd.ms-excel'
      )

      if (csvFiles.length < incoming.length) {
        toast.error(t('addData.errors.invalidFileType'))
      }

      if (csvFiles.length === 0) {
        return
      }

      const next = csvFiles.map(file => ({
        id: crypto.randomUUID(),
        file,
      }))

      setEntries(prev => [...prev, ...next])
    },
    [t]
  )

  const removeEntry = useCallback((id: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== id))
  }, [])

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      addFiles(e.target.files)
      e.target.value = ''
    }
  }

  const onDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    dragDepthRef.current += 1
    setIsDragging(true)
  }

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    dragDepthRef.current -= 1
    if (dragDepthRef.current <= 0) {
      dragDepthRef.current = 0
      setIsDragging(false)
    }
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    dragDepthRef.current = 0
    setIsDragging(false)
    if (e.dataTransfer.files?.length) {
      addFiles(e.dataTransfer.files)
    }
  }

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
  }

  const handleSaveProceed = async () => {
    if (entries.length === 0) {
      toast.error(t('addData.errors.noFiles'))

      return
    }

    try {
      await parseStatements(entries.map(e => e.file)).unwrap()
      setShowComplete(true)
    } catch (error) {
      toast.error(getApiErrorMessage(error, t('addData.errors.submitFailed')))
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
            {t('addData.uploadForm.title')}
          </DialogTitle>
          <DialogDescription className={'sr-only'}>
            {t('addData.uploadForm.description')}
          </DialogDescription>
        </DialogHeader>

        {showComplete ? (
          <TransactionsCompletePanel
            onDone={() => onOpenChange(false)}
            onUploadMore={() => {
              reset()
              resetFormState()
            }}
          />
        ) : isLoading ? (
          <TransactionsLoadingOverlay variant={'upload'} className={'min-h-96'} />
        ) : (
          <>
            <div
              className={
                'grid min-h-0 flex-1 grid-cols-1 gap-5 px-4 pb-4 md:grid-cols-2 md:gap-6 md:px-8 md:pb-6 lg:gap-8'
              }
            >
              <div className={'flex min-h-0 flex-col gap-3'}>
                <input
                  id={inputId}
                  type={'file'}
                  className={'sr-only'}
                  multiple
                  accept={'.csv,text/csv'}
                  onChange={onInputChange}
                />
                <div
                  aria-label={t('addData.uploadForm.dropzoneAria')}
                  onDragEnter={onDragEnter}
                  onDragLeave={onDragLeave}
                  onDragOver={onDragOver}
                  onDrop={onDrop}
                  className={cn(
                    'flex min-h-48 flex-1 cursor-default flex-col items-center justify-center gap-1 rounded-2xl border border-dashed border-foreground/25 bg-card px-4 py-8 text-center transition-colors md:min-h-72',
                    isDragging && 'border-brand-blue bg-brand-blue/5'
                  )}
                >
                  <label
                    htmlFor={inputId}
                    className={
                      'cursor-pointer font-display text-lg font-normal text-brand-blue underline-offset-2 hover:underline sm:text-xl'
                    }
                  >
                    {t('addData.uploadForm.chooseFile')}
                  </label>
                  <span className={'font-display text-lg font-normal text-brand-purple sm:text-xl'}>
                    {t('addData.or')}
                  </span>
                  <span className={'font-display text-lg font-normal text-brand-purple sm:text-xl'}>
                    {t('addData.uploadForm.dragHere')}
                  </span>
                </div>
              </div>

              <div className={'flex min-h-0 min-w-0 flex-col gap-3'}>
                <h3 className={'font-display text-lg font-normal text-brand-purple sm:text-xl'}>
                  {t('addData.uploadForm.yourUploads')}
                </h3>
                <ScrollArea
                  overflowFade
                  overflowFadeFrom={'from-popover'}
                  className={'h-full max-h-80 min-h-32 w-full pr-2 md:max-h-96'}
                >
                  <ul className={'flex flex-col gap-3 pb-2'}>
                    {entries.length === 0 ? (
                      <li
                        className={
                          'rounded-2xl border border-dashed border-border bg-card/60 px-4 py-8 text-center font-display text-sm text-muted-foreground sm:text-base'
                        }
                      >
                        {t('addData.uploadForm.empty')}
                      </li>
                    ) : (
                      entries.map(({ id, file }) => (
                        <li
                          key={id}
                          className={
                            'flex min-h-20 items-center gap-3 rounded-2xl bg-card px-5 py-4 shadow-sm md:min-h-24 md:px-6'
                          }
                        >
                          <span
                            className={
                              'min-w-0 flex-1 truncate font-display text-base font-normal text-brand-purple md:text-lg'
                            }
                          >
                            {file.name}
                          </span>
                          <Button
                            type={'button'}
                            variant={'ghost'}
                            size={'icon-sm'}
                            className={
                              'shrink-0 text-brand-purple/70 hover:bg-brand-purple/10 hover:text-brand-purple'
                            }
                            aria-label={`${t('addData.uploadForm.removeFile')}: ${file.name}`}
                            onClick={() => removeEntry(id)}
                          >
                            <X className={'size-5'} strokeWidth={1.75} />
                          </Button>
                        </li>
                      ))
                    )}
                  </ul>
                </ScrollArea>
              </div>
            </div>

            <div className={'flex shrink-0 justify-center px-4 pb-6 pt-2 sm:px-8 sm:pb-8'}>
              <Button
                type={'button'}
                disabled={entries.length === 0}
                className={
                  'w-full max-w-md rounded-xl bg-brand-purple-bg px-8 py-3 font-display text-sm font-bold text-white shadow-sm transition-all hover:bg-brand-purple-bg/90 hover:shadow-md sm:text-base md:py-3.5'
                }
                onClick={() => void handleSaveProceed()}
              >
                {t('addData.manualForm.saveProceed')}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
