import type { ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from './button'
import { cn } from './utils'

interface PageFrameProps {
  background?: string
  title: string
  illustration: ReactNode
  description?: string
  step?: 0 | 1 | 2
  primaryLabel: string
  primaryTo: string
  onPrimary?: () => void
  secondaryLabel?: string
  secondaryTo?: string
}

const TOTAL_STEPS = 3

export const PageFrame = ({
  background,
  title,
  illustration,
  description,
  step,
  primaryLabel,
  primaryTo,
  onPrimary,
  secondaryLabel,
  secondaryTo,
}: PageFrameProps) => {
  const navigate = useNavigate()

  const handlePrimary = () => {
    onPrimary?.()
    navigate(primaryTo)
  }

  return (
    <div className={'relative flex min-h-svh flex-col overflow-hidden text-white'}>
      {background && (
        <img
          src={background}
          alt={''}
          aria-hidden
          className={
            'pointer-events-none fixed left-1/2 top-0 h-screen w-auto max-w-none -translate-x-1/2'
          }
        />
      )}

      <header className={'relative z-10 px-6 pt-12 sm:pt-16 lg:pt-20'}>
        <h1
          className={
            'text-center font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl'
          }
        >
          {title}
        </h1>
      </header>

      <main
        className={
          'relative z-10 flex flex-1 flex-col items-center justify-center gap-6 px-4 py-4 sm:gap-8 sm:py-8'
        }
      >
        <div
          className={
            'relative flex items-center justify-center w-full max-w-70 sm:max-w-80 md:max-w-90 lg:max-w-200 min-h-80'
          }
        >
          {illustration}
        </div>

        <div className={'flex flex-col items-center gap-16 max-h-40'}>
          {description && (
            <p
              className={
                'max-w-xl text-center font-display text-lg leading-snug text-white/90 sm:text-xl md:text-2xl'
              }
            >
              {description}
            </p>
          )}

          {step !== undefined && (
            <div className={'flex items-center gap-2.5'}>
              {Array.from({ length: TOTAL_STEPS }).map((_, index) => (
                <span
                  key={index}
                  className={cn(
                    'size-2.5 rounded-full transition-colors',
                    index === step ? 'bg-white' : 'bg-brand-blue/80'
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <footer
        className={'relative z-10 flex flex-col items-center gap-4 px-6 pb-12 sm:gap-9 sm:pb-14'}
      >
        <Button
          type={'button'}
          onClick={handlePrimary}
          size={'lg'}
          className={
            'flex items-center max-w-xs w-full justify-center rounded-control bg-brand-blue font-display text-lg font-bold text-white transition-colors hover:bg-brand-blue/90 active:translate-y-px sm:h-16 sm:text-2xl'
          }
        >
          {primaryLabel}
        </Button>
        {secondaryLabel && secondaryTo && (
          <Link
            to={secondaryTo}
            className={
              'font-display text-lg text-white/90 transition-colors hover:text-white sm:text-2xl'
            }
          >
            {secondaryLabel}
          </Link>
        )}
      </footer>
    </div>
  )
}
