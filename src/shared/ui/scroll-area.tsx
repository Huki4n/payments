import * as React from 'react'

import { ScrollArea as ScrollAreaPrimitive } from 'radix-ui'

import { useScrollAreaViewportSync } from '@/shared/hooks/use-scroll-area-viewport-sync'
import { cn } from '@/shared/ui/utils'

type ScrollAreaProps = React.ComponentProps<typeof ScrollAreaPrimitive.Root> & {
  /** Мягкая маска сверху/снизу, когда контент можно прокрутить — подсказка, что ниже есть ещё строки */
  overflowFade?: boolean
  /** Класс цвета градиента, например `from-dashboard-card` или `from-popover` */
  overflowFadeFrom?: string
  /**
   * При вертикальном переполнении трек остаётся видимым (не только по hover).
   * Без переполнения скроллбар не показывается.
   */
  persistentScrollbarWhenOverflow?: boolean
  /** Прокрутка без видимого скроллбара (колёсико / тач). */
  hideScrollbar?: boolean
}

function ScrollArea({
  className,
  children,
  overflowFade = false,
  overflowFadeFrom = 'from-background',
  persistentScrollbarWhenOverflow = false,
  hideScrollbar = false,
  ...props
}: ScrollAreaProps) {
  const { viewportRef, showTopFade, showBottomFade, hasVerticalOverflow } =
    useScrollAreaViewportSync({
      overflowFade,
      persistentScrollbarWhenOverflow,
    })

  return (
    <ScrollAreaPrimitive.Root
      data-slot={'scroll-area'}
      className={cn('relative', overflowFade && 'overflow-hidden', className)}
      {...props}
      {...(persistentScrollbarWhenOverflow && hasVerticalOverflow
        ? { type: 'always' as const }
        : {})}
    >
      <ScrollAreaPrimitive.Viewport
        ref={viewportRef}
        data-slot={'scroll-area-viewport'}
        className={cn(
          'size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1',
          hideScrollbar && '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
        )}
      >
        {children}
      </ScrollAreaPrimitive.Viewport>

      {overflowFade ? (
        <>
          <div
            aria-hidden
            className={cn(
              'pointer-events-none absolute inset-x-0 top-0 z-2 h-12 bg-linear-to-b to-transparent transition-opacity duration-200 ease-out',
              overflowFadeFrom,
              showTopFade ? 'opacity-100' : 'opacity-0'
            )}
          />
          <div
            aria-hidden
            className={cn(
              'pointer-events-none absolute inset-x-0 bottom-0 z-2 h-14 bg-linear-to-t to-transparent transition-opacity duration-200 ease-out',
              overflowFadeFrom,
              showBottomFade ? 'opacity-100' : 'opacity-0'
            )}
          />
        </>
      ) : null}

      <ScrollBar
        className={cn(
          hideScrollbar &&
            'w-0 flex-none border-0 p-0 opacity-0 pointer-events-none data-vertical:w-0'
        )}
      />
      <ScrollAreaPrimitive.Corner className={cn(hideScrollbar && 'hidden')} />
    </ScrollAreaPrimitive.Root>
  )
}

function ScrollBar({
  className,
  orientation = 'vertical',
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot={'scroll-area-scrollbar'}
      data-orientation={orientation}
      orientation={orientation}
      className={cn(
        'z-3 flex touch-none rounded-full bg-(--scrollbar-track) transition-colors select-none data-horizontal:h-2 data-horizontal:flex-col data-vertical:h-full data-vertical:w-2',
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot={'scroll-area-thumb'}
        className={'relative flex-1 rounded-full bg-scrollbar-thumb'}
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
}

export { ScrollArea, ScrollBar }
