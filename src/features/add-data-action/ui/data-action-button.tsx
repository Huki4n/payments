import { ArrowRight } from 'lucide-react'

import { Button } from '@/shared/ui'

export interface DataActionButtonProps {
  label: string
  onClick?: () => void
}

export const DataActionButton = ({ label, onClick }: DataActionButtonProps) => {
  return (
    <Button
      type={'button'}
      variant={'outline'}
      onClick={onClick}
      className={
        'group flex h-20 w-full items-center justify-between gap-3 rounded-xl border-0 bg-data-action-bg px-6 py-2.5 text-left font-display text-sm font-bold text-data-action-fg shadow-sm transition-all duration-200 hover:scale-[1.02] cursor-pointer hover:bg-data-action-bg/95 hover:shadow-md active:scale-[0.98] sm:rounded-2xl sm:text-base md:text-lg'
      }
    >
      <span className={'text-pretty'}>{label}</span>
      <ArrowRight
        className={
          'size-5 shrink-0 text-data-action-fg transition-transform duration-200 group-hover:translate-x-1 sm:size-6'
        }
        strokeWidth={1.25}
        aria-hidden
      />
    </Button>
  )
}
