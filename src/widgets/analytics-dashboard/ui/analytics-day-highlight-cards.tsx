import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Loader2Icon } from 'lucide-react'

import { useAppSelector } from '@/app/store'
import { selectDisplayGoalCurrency } from '@/entities/settings'
import { useGetTransactionsQuery } from '@/entities/transaction'
import { formatIsoDateDayMonthLabel, getMonthKeyFromIso } from '@/shared/lib/date-utils'
import { formatGoalMoney } from '@/shared/lib/money-format'

import { useAnalyticsPeriod } from '../model/analytics-period-context'

const EMPTY_LABEL = '—'

type DayHighlightCardProps = {
  frameClassName: string
  title: string
  dateLabel: string
  hint: string
  isLoading?: boolean
}

const DayHighlightCard = ({
  frameClassName,
  title,
  dateLabel,
  hint,
  isLoading,
}: DayHighlightCardProps) => (
  <article className={`rounded-xl p-5 shadow-sm ${frameClassName}`}>
    <div
      className={
        'flex flex-col items-center justify-center gap-6 rounded-xl bg-card px-5 py-6 text-center sm:gap-8 sm:px-8 sm:py-8 h-full'
      }
    >
      <p className={'text-lg font-bold leading-none text-brand-purple sm:text-2xl'}>{title}</p>
      {isLoading ? (
        <Loader2Icon className={'size-8 animate-spin text-brand-blue'} aria-hidden />
      ) : (
        <>
          <p className={'text-xl font-bold leading-none text-brand-purple md:text-3xl'}>
            {dateLabel}
          </p>
          <p className={'text-lg font-bold leading-none text-brand-purple sm:text-2xl'}>{hint}</p>
        </>
      )}
    </div>
  </article>
)

export const AnalyticsDayHighlightCards = () => {
  const { t } = useTranslation('home')
  const displayCurrency = useAppSelector(selectDisplayGoalCurrency)
  const { apiRange } = useAnalyticsPeriod()

  const { data, isLoading, isError } = useGetTransactionsQuery(
    { displayCurrency: displayCurrency!, params: apiRange },
    { skip: !displayCurrency }
  )

  const currency = displayCurrency ?? 'USD'

  const formatHighlightDate = useCallback(
    (iso: string) =>
      formatIsoDateDayMonthLabel(iso, t(`dashboard.months.${getMonthKeyFromIso(iso)}`)),
    [t]
  )

  const bestDay = useMemo(() => {
    const extreme = data?.maxIncome

    if (!extreme) {
      return { dateLabel: EMPTY_LABEL, amount: EMPTY_LABEL }
    }

    return {
      dateLabel: formatHighlightDate(extreme.operationDate),
      amount: formatGoalMoney(extreme.amount, currency),
    }
  }, [currency, data?.maxIncome, formatHighlightDate])

  const worstDay = useMemo(() => {
    const extreme = data?.maxExpense

    if (!extreme) {
      return { dateLabel: EMPTY_LABEL, amount: EMPTY_LABEL }
    }

    return {
      dateLabel: formatHighlightDate(extreme.operationDate),
      amount: formatGoalMoney(extreme.amount, currency),
    }
  }, [currency, data?.maxExpense, formatHighlightDate])

  const bestDateLabel = isError ? EMPTY_LABEL : bestDay.dateLabel
  const bestAmount = isError ? EMPTY_LABEL : bestDay.amount
  const worstDateLabel = isError ? EMPTY_LABEL : worstDay.dateLabel
  const worstAmount = isError ? EMPTY_LABEL : worstDay.amount

  return (
    <div className={'grid gap-4 font-display-alternates sm:grid-cols-2 sm:gap-5'}>
      <DayHighlightCard
        frameClassName={'bg-dashboard-income-pill'}
        title={t('analyticsPage.mostProfitableDay')}
        dateLabel={bestDateLabel}
        hint={t('analyticsPage.mostProfitableHint', { amount: bestAmount })}
        isLoading={isLoading}
      />
      <DayHighlightCard
        frameClassName={'bg-dashboard-expense-pill'}
        title={t('analyticsPage.highestSpendingDay')}
        dateLabel={worstDateLabel}
        hint={t('analyticsPage.highestSpendingHint', { amount: worstAmount })}
        isLoading={isLoading}
      />
    </div>
  )
}
