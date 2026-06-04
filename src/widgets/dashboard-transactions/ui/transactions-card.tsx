import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Loader2Icon } from 'lucide-react'

import { useAppSelector } from '@/app/store'
import { selectDisplayGoalCurrency } from '@/entities/settings'
import { useGetTransactionsQuery, type GetTransactionsParams } from '@/entities/transaction'
import { getCurrentMonthRange } from '@/shared/lib/date-utils'
import { cn } from '@/shared/ui/utils'

import type { EarningMockRow, SpendMockRow, TransactionsCardFilter } from '../model/types'

import { filterTransactionRows } from '../lib/filter-transaction-rows'
import { mapTransactionsToRows } from '../lib/map-transactions-to-rows'
import { RecentEarningsColumn } from './recent-earnings-column'
import { RecentSpendsColumn } from './recent-spends-column'

export interface DashboardTransactionsCardProps {
  showSectionTitle?: boolean
  className?: string
  queryParams?: GetTransactionsParams
  /** Не запрашивать API (например, пока не выбрана валюта). */
  skipApi?: boolean
  filter?: TransactionsCardFilter
  /** Полная подмена данных (без запроса к API). */
  earningsRows?: readonly EarningMockRow[]
  spendsRows?: readonly SpendMockRow[]
  sectionTitle?: string
  earningsTitle?: string
  spendsTitle?: string
  addNewLabel?: string
}

export const DashboardTransactionsCard = ({
  showSectionTitle = true,
  className,
  queryParams,
  skipApi = false,
  filter,
  earningsRows: earningsRowsOverride,
  spendsRows: spendsRowsOverride,
  sectionTitle,
  earningsTitle,
  spendsTitle,
  addNewLabel,
}: DashboardTransactionsCardProps) => {
  const { t } = useTranslation('home')
  const displayCurrency = useAppSelector(selectDisplayGoalCurrency)
  const useApiData = earningsRowsOverride === undefined && spendsRowsOverride === undefined
  const defaultPeriodRange = useMemo(() => getCurrentMonthRange(), [])
  const resolvedQueryParams = queryParams ?? defaultPeriodRange

  const { data, isLoading, isError } = useGetTransactionsQuery(
    {
      displayCurrency: displayCurrency!,
      params: resolvedQueryParams,
    },
    { skip: !useApiData || skipApi || !displayCurrency }
  )

  const { earnings: apiEarnings, spends: apiSpends } = useMemo(
    () => mapTransactionsToRows(data?.transactions, displayCurrency ?? 'USD'),
    [data?.transactions, displayCurrency]
  )

  const { earnings, spends } = useMemo(() => {
    const sourceEarnings = earningsRowsOverride ?? apiEarnings
    const sourceSpends = spendsRowsOverride ?? apiSpends

    return filterTransactionRows(sourceEarnings, sourceSpends, filter)
  }, [apiEarnings, apiSpends, earningsRowsOverride, filter, spendsRowsOverride])

  const resolvedSectionTitle = sectionTitle ?? t('dashboard.transactionsTitle')
  const resolvedEarningsTitle = earningsTitle ?? t('dashboard.recentEarnings')
  const resolvedSpendsTitle = spendsTitle ?? t('dashboard.recentSpends')
  const resolvedAddNewLabel = addNewLabel ?? t('addData.manualForm.addNew')

  return (
    <section className={cn(className)}>
      {showSectionTitle ? (
        <h2
          className={
            'mb-4 text-center font-display text-base font-bold text-brand-purple sm:text-lg md:text-xl'
          }
        >
          {resolvedSectionTitle}
        </h2>
      ) : null}

      {useApiData && isError ? (
        <p
          className={
            'rounded-4xl bg-dashboard-card px-6 py-10 text-center font-display text-sm text-destructive sm:text-base'
          }
        >
          {t('transactionsPage.loadError')}
        </p>
      ) : (
        <div
          className={
            'relative grid gap-4 rounded-4xl bg-dashboard-card px-4 py-5 shadow-sm sm:grid-cols-2 sm:gap-5 sm:px-6 sm:py-6 pr-3 sm:pr-4'
          }
        >
          {useApiData && isLoading ? (
            <div
              className={
                'col-span-full flex min-h-52 items-center justify-center sm:min-h-60 md:min-h-72'
              }
              role={'status'}
              aria-live={'polite'}
              aria-busy={'true'}
            >
              <Loader2Icon
                className={'size-10 animate-spin text-brand-blue sm:size-12'}
                aria-hidden
              />
            </div>
          ) : (
            <>
              <RecentEarningsColumn
                title={resolvedEarningsTitle}
                rows={earnings}
                addNewLabel={resolvedAddNewLabel}
              />
              <RecentSpendsColumn
                title={resolvedSpendsTitle}
                rows={spends}
                addNewLabel={resolvedAddNewLabel}
              />
            </>
          )}
        </div>
      )}
    </section>
  )
}
