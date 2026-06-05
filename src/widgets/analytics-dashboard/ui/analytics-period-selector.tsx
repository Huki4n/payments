import { useMemo, useSyncExternalStore } from 'react'
import { useTranslation } from 'react-i18next'

import { useAppSelector } from '@/app/store'
import { selectDisplayGoalCurrency } from '@/entities/settings'
import { useGetTransactionsQuery } from '@/entities/transaction'
import { formatDateRangeLabel } from '@/shared/lib/date-utils'
import { Button } from '@/shared/ui/button'
import { Calendar } from '@/shared/ui/calendar'
import { DashboardCalendarIcon } from '@/shared/ui/icons/category-icons'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover'
import { cn } from '@/shared/ui/utils'

import type { AnalyticsPeriodPreset } from '../lib/get-analytics-period-range'

import { resolveAnalyticsChartRange } from '../lib/resolve-analytics-chart-range'
import { useAnalyticsPeriod } from '../model/use-analytics-period'

type PresetId = Exclude<AnalyticsPeriodPreset, 'custom'>

const PRESETS: PresetId[] = ['week', 'month', '3m', '6m', 'year', 'all']

const SM_MEDIA_QUERY = '(min-width: 640px)'

function subscribeMediaQuery(query: string, onChange: () => void) {
  const media = window.matchMedia(query)

  media.addEventListener('change', onChange)

  return () => media.removeEventListener('change', onChange)
}

function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    onChange => subscribeMediaQuery(query, onChange),
    () => window.matchMedia(query).matches,
    () => false
  )
}

export const AnalyticsPeriodSelector = () => {
  const { t } = useTranslation('home')
  const { preset, range, chartFrom, chartTo, setPreset, setRange, applyPreset } =
    useAnalyticsPeriod()
  const displayCurrency = useAppSelector(selectDisplayGoalCurrency)
  const isSmUp = useMediaQuery(SM_MEDIA_QUERY)
  const { data: transactionsData } = useGetTransactionsQuery(
    { displayCurrency: displayCurrency!, params: undefined },
    { skip: !displayCurrency || preset !== 'all' }
  )

  const rangeLabel = useMemo(() => {
    if (preset === 'all') {
      const isoDates = (transactionsData?.transactions ?? []).map(tx => tx.operationDate)
      const { chartFrom: from, chartTo: to } = resolveAnalyticsChartRange(
        'all',
        isoDates,
        chartFrom,
        chartTo
      )

      return formatDateRangeLabel({ from, to }, t('analyticsPage.periodRangePlaceholder'))
    }

    return formatDateRangeLabel(range, t('analyticsPage.periodRangePlaceholder'))
  }, [chartFrom, chartTo, preset, range, t, transactionsData?.transactions])

  const chipClass =
    'h-9 w-full rounded-lg border border-[rgba(167,191,255,0.8)] px-2 font-display text-[11px] font-bold text-brand-purple transition-colors sm:h-10 sm:px-3 sm:text-xs md:text-sm lg:w-auto lg:px-4'

  return (
    <section
      className={
        'flex flex-col gap-4 rounded-4xl bg-dashboard-card px-4 py-4 shadow-sm sm:gap-5 sm:px-6 sm:py-5 lg:flex-row lg:items-start lg:gap-6'
      }
    >
      <h2
        className={
          'shrink-0 font-display text-lg font-bold text-brand-purple sm:text-xl lg:max-w-40 lg:text-2xl'
        }
      >
        {t('analyticsPage.selectPeriod')}
      </h2>

      <div className={'flex min-w-0 flex-1 flex-col gap-3 lg:flex-row sm:gap-4 lg:gap-5'}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={
                'h-auto min-h-10 w-full justify-between gap-2 rounded-2xl border-0 bg-white px-3 py-2.5 font-display text-xs font-medium text-brand-purple/80 shadow-sm hover:bg-white/95 sm:min-h-11 sm:gap-4 sm:px-5 sm:py-3 sm:text-sm md:text-base lg:max-w-75'
              }
            >
              <span className={'min-w-0 truncate text-left'}>{rangeLabel}</span>
              <DashboardCalendarIcon className={'size-6 shrink-0 text-[#0147FFCC] sm:size-8'} />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className={'w-[min(100vw-2rem,auto)] p-0 sm:w-auto'}
            align={'center'}
            sideOffset={8}
          >
            <Calendar
              mode={'range'}
              selected={range}
              onSelect={next => {
                setRange(next)
                setPreset('custom')
              }}
              numberOfMonths={isSmUp ? 2 : 1}
              className={'rounded-lg'}
            />
          </PopoverContent>
        </Popover>

        <div
          className={
            'grid grid-cols-2 gap-1.5 min-[400px]:grid-cols-3 sm:gap-2 lg:flex lg:flex-wrap lg:justify-start'
          }
        >
          {PRESETS.map(id => (
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
    </section>
  )
}
