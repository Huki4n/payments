import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { formatDateRangeLabel } from '@/shared/lib/date-utils'
import { Button } from '@/shared/ui/button'
import { Calendar } from '@/shared/ui/calendar'
import { DashboardCalendarIcon } from '@/shared/ui/icons/category-icons'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover'
import { cn } from '@/shared/ui/utils'

import type { AnalyticsPeriodPreset } from '../lib/get-analytics-period-range'

import { useAnalyticsPeriod } from '../model/analytics-period-context'

type PresetId = Exclude<AnalyticsPeriodPreset, 'custom'>

const PRESETS: { id: PresetId; row: 1 | 2 }[] = [
  { id: 'week', row: 1 },
  { id: 'month', row: 1 },
  { id: '3m', row: 1 },
  { id: '6m', row: 2 },
  { id: 'year', row: 2 },
  { id: 'all', row: 2 },
]

export const AnalyticsPeriodSelector = () => {
  const { t } = useTranslation('home')
  const { preset, range, setPreset, setRange, applyPreset } = useAnalyticsPeriod()

  const rangeLabel = useMemo(
    () => formatDateRangeLabel(range, t('analyticsPage.periodRangePlaceholder')),
    [range, t]
  )

  const chipClass =
    'inline-flex shrink-0 items-center justify-center rounded-lg border border-[rgba(167,191,255,0.8)] px-3 font-display text-xs font-bold text-brand-purple transition-colors sm:px-4 sm:text-sm'

  return (
    <section
      className={'flex gap-4 rounded-4xl bg-dashboard-card px-4 py-5 shadow-sm sm:px-6 sm:py-4'}
    >
      <h2
        className={
          'max-w-40 font-display text-lg font-bold text-brand-purple sm:text-xl md:text-2xl'
        }
      >
        {t('analyticsPage.selectPeriod')}
      </h2>

      <div className={'flex flex-1 flex-row gap-4 lg:items-start lg:justify-between lg:gap-6'}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={
                'h-full min-h-6 w-full max-w-75 justify-center gap-4 rounded-2xl border-0 bg-white px-5 py-3 font-display text-sm font-medium text-brand-purple/80 shadow-sm hover:bg-white/95 sm:text-base'
              }
            >
              <span>{rangeLabel}</span>
              <DashboardCalendarIcon className={'size-8 shrink-0 text-[#0147FFCC]'} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className={'w-auto p-0'} align={'start'}>
            <Calendar
              mode={'range'}
              selected={range}
              onSelect={next => {
                setRange(next)
                setPreset('custom')
              }}
              numberOfMonths={2}
              className={'rounded-lg'}
            />
          </PopoverContent>
        </Popover>

        <div className={'flex min-w-0 flex-1 flex-col gap-1'}>
          <div className={'flex flex-wrap gap-1 sm:gap-1.5'}>
            {PRESETS.map(({ id }) => (
              <Button
                key={id}
                variant={'ghost'}
                type={'button'}
                onClick={() => {
                  if (id === 'all') {
                    setPreset('all')
                    setRange(undefined)
                  } else {
                    applyPreset(id)
                  }
                }}
                className={cn(
                  chipClass,
                  preset === id && 'border-transparent bg-brand-blue text-white'
                )}
              >
                {t(`analyticsPage.preset.${id}`)}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
