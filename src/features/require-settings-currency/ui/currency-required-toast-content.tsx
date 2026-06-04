import { Button } from '@/shared/ui'

export interface CurrencyRequiredToastContentProps {
  title: string
  description: string
  actionLabel: string
  onAction: () => void
  closeToast?: () => void
}

export const CurrencyRequiredToastContent = ({
  title,
  description,
  actionLabel,
  onAction,
  closeToast,
}: CurrencyRequiredToastContentProps) => {
  return (
    <div className={'flex w-[min(calc(100vw-2.5rem),22rem)] flex-col gap-4 font-display'}>
      <div className={'flex flex-col gap-1.5 pr-6'}>
        <p className={'text-base font-bold leading-snug text-brand-purple'}>{title}</p>
        <p className={'text-sm leading-snug text-brand-purple/80'}>{description}</p>
      </div>
      <Button
        type={'button'}
        className={
          'h-10 w-full rounded-xl bg-brand-purple-bg font-display text-sm font-bold text-white hover:bg-brand-purple-bg/90'
        }
        onClick={() => {
          closeToast?.()
          onAction()
        }}
      >
        {actionLabel}
      </Button>
    </div>
  )
}
