import * as React from 'react'

const EDGE_FADE_EPS = 2

interface UseScrollAreaViewportSyncArgs {
  overflowFade: boolean
  persistentScrollbarWhenOverflow: boolean
}

export function useScrollAreaViewportSync({
  overflowFade,
  persistentScrollbarWhenOverflow,
}: UseScrollAreaViewportSyncArgs) {
  const viewportRef = React.useRef<HTMLDivElement | null>(null)
  const [showTopFade, setShowTopFade] = React.useState(false)
  const [showBottomFade, setShowBottomFade] = React.useState(false)
  const [hasVerticalOverflow, setHasVerticalOverflow] = React.useState(false)

  const needsViewportSync = overflowFade || persistentScrollbarWhenOverflow

  const syncViewport = React.useCallback(() => {
    const el = viewportRef.current

    if (!el) return

    const { scrollTop, scrollHeight, clientHeight } = el
    const overflow = scrollHeight - clientHeight > EDGE_FADE_EPS

    if (persistentScrollbarWhenOverflow || overflowFade) {
      setHasVerticalOverflow(overflow)
    }

    if (!overflowFade) return

    if (!overflow) {
      setShowTopFade(false)
      setShowBottomFade(false)

      return
    }

    setShowTopFade(scrollTop > EDGE_FADE_EPS)
    setShowBottomFade(scrollTop < scrollHeight - clientHeight - EDGE_FADE_EPS)
  }, [overflowFade, persistentScrollbarWhenOverflow])

  React.useLayoutEffect(() => {
    if (!needsViewportSync) return
    const el = viewportRef.current

    if (!el) return

    const run = () => {
      requestAnimationFrame(() => {
        syncViewport()
      })
    }

    run()

    el.addEventListener('scroll', syncViewport, { passive: true })

    const ro = new ResizeObserver(run)

    ro.observe(el)

    const mo = new MutationObserver(run)

    mo.observe(el, { subtree: true, childList: true })

    return () => {
      el.removeEventListener('scroll', syncViewport)
      ro.disconnect()
      mo.disconnect()
    }
  }, [needsViewportSync, syncViewport])

  return {
    viewportRef,
    showTopFade,
    showBottomFade,
    hasVerticalOverflow,
  }
}
