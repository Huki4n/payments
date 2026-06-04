import { useTranslation } from 'react-i18next'

import { Loader2Icon } from 'lucide-react'

import { Button } from '@/shared/ui'
import { cn } from '@/shared/ui/utils'

export interface TransactionsLoadingOverlayProps {
  className?: string
  /** Upload flow copy (Figma 127:3); default — manual / generic saving */
  variant?: 'manual' | 'upload'
}

export const TransactionsLoadingOverlay = ({
  className,
  variant = 'manual',
}: TransactionsLoadingOverlayProps) => {
  const { t } = useTranslation('home')
  const titleKey =
    variant === 'upload'
      ? 'addData.processing.uploadLoadingTitle'
      : 'addData.processing.loadingTitle'
  const subtitleKey =
    variant === 'upload'
      ? 'addData.processing.uploadLoadingSubtitle'
      : 'addData.processing.loadingSubtitle'

  return (
    <div
      role={'status'}
      aria-live={'polite'}
      aria-busy={'true'}
      className={cn(
        'flex min-h-0 flex-1 flex-col items-center justify-center gap-8 px-6 py-10 text-center sm:gap-10 sm:px-10 sm:py-14',
        className
      )}
    >
      <Loader2Icon
        className={'size-14 shrink-0 animate-spin text-brand-blue sm:size-16 md:size-20'}
        aria-hidden
      />
      <div className={'flex max-w-3xl flex-col gap-4 sm:gap-5'}>
        <p
          className={
            'font-display text-2xl font-bold leading-none text-brand-purple sm:text-3xl md:text-4xl'
          }
        >
          {t(titleKey)}
        </p>
        <p
          className={
            'font-display text-lg font-bold leading-snug text-brand-purple sm:text-xl md:text-2xl'
          }
        >
          {t(subtitleKey)}
        </p>
      </div>
    </div>
  )
}

export interface TransactionsCompletePanelProps {
  className?: string
  onDone: () => void
  onUploadMore?: () => void
}

export const TransactionsCompletePanel = ({
  className,
  onDone,
  onUploadMore,
}: TransactionsCompletePanelProps) => {
  const { t } = useTranslation('home')

  return (
    <div
      role={'status'}
      aria-live={'polite'}
      className={cn(
        'relative mx-4 mb-4 flex min-h-0 flex-1 flex-col overflow-clip rounded-4xl  sm:mx-8 sm:mb-6',
        className
      )}
    >
      <div
        className={
          'flex min-h-96 flex-1 flex-col items-center justify-center gap-8 px-6 py-10 text-center sm:gap-10 sm:px-10 sm:py-14'
        }
      >
        <p
          className={
            'max-w-3xl font-display text-2xl font-bold leading-none text-brand-purple sm:text-3xl md:text-4xl'
          }
        >
          {t('addData.processing.completeTitle')}
        </p>
        <div className={'flex flex-col items-center gap-3 sm:flex-row sm:gap-4'}>
          {onUploadMore ? (
            <Button
              type={'button'}
              variant={'outline'}
              className={
                'rounded-xl border-brand-purple/30 bg-card px-8 py-3 font-display text-sm font-bold text-brand-purple shadow-sm hover:bg-card/90 sm:text-base md:py-3.5'
              }
              onClick={onUploadMore}
            >
              {t('addData.processing.completeUploadMore')}
            </Button>
          ) : null}
          <Button
            type={'button'}
            className={
              'rounded-xl bg-brand-purple-bg px-8 py-3 font-display text-sm font-bold text-white shadow-sm transition-all hover:bg-brand-purple-bg/90 hover:shadow-md sm:text-base md:py-3.5'
            }
            onClick={onDone}
          >
            {t('addData.processing.completeButton')}
          </Button>
        </div>
      </div>
    </div>
  )
}
