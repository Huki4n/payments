import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

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

import { useSubmitBankStatementsMutation } from '../api/add-data-api'
import { AddDataCompletePanel, AddDataLoadingOverlay } from './add-data-processing-overlay'

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
  const [submitUpload, { isLoading, reset }] = useSubmitBankStatementsMutation()

  useEffect(() => {
    if (!open) {
      reset()
    }
  }, [open, reset])

  const handleOpenChange = (next: boolean) => {
    if (next) {
      setEntries([])
      setIsDragging(false)
      setShowComplete(false)
      dragDepthRef.current = 0
    }
    onOpenChange(next)
  }

  const addFiles = useCallback((list: FileList | File[]) => {
    const next = Array.from(list).map(file => ({
      id: crypto.randomUUID(),
      file,
    }))

    setEntries(prev => [...prev, ...next])
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
    try {
      await submitUpload({
        files: entries.map(e => ({
          name: e.file.name,
          size: e.file.size,
        })),
      }).unwrap()
      onOpenChange(false)
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
            {t('addData.uploadForm.title')}
          </DialogTitle>
          <DialogDescription className={'sr-only'}>
            {t('addData.uploadForm.description')}
          </DialogDescription>
        </DialogHeader>

        {showComplete ? (
          <AddDataCompletePanel onDone={() => onOpenChange(false)} />
        ) : isLoading ? (
          <AddDataLoadingOverlay variant={'upload'} className={'min-h-96'} />
        ) : (
          <>
            <div className={'grid min-h-0 flex-1 grid-cols-1 gap-5 px-4 pb-4 md:grid-cols-2 md:gap-6 md:px-8 md:pb-6 lg:gap-8'}>
              <div className={'flex min-h-0 flex-col gap-3'}>
                <input
                  id={inputId}
                  type={'file'}
                  className={'sr-only'}
                  multiple
                  accept={'.pdf,application/pdf'}
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
                    className={'cursor-pointer font-display text-lg font-normal text-brand-blue underline-offset-2 hover:underline sm:text-xl'}
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
                      <li className={'rounded-2xl border border-dashed border-border bg-card/60 px-4 py-8 text-center font-display text-sm text-muted-foreground sm:text-base'}>
                        {t('addData.uploadForm.empty')}
                      </li>
                    ) : (
                      entries.map(({ id, file }) => (
                        <li
                          key={id}
                          className={'flex min-h-20 items-center rounded-2xl bg-card px-5 py-4 shadow-sm md:min-h-24 md:px-8'}
                        >
                          <span className={'truncate font-display text-base font-normal text-brand-purple md:text-lg'}>
                            {file.name}
                          </span>
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
                className={'w-full max-w-md rounded-xl bg-brand-purple-bg px-8 py-3 font-display text-sm font-bold text-white shadow-sm transition-all hover:bg-brand-purple-bg/90 hover:shadow-md sm:text-base md:py-3.5'}
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
