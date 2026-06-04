import { useMemo } from 'react'

import { Loader2Icon } from 'lucide-react'

import { useAppSelector } from '@/app/store'
import { selectDisplayGoalCurrency } from '@/entities/settings'
import { useGetTransactionsQuery } from '@/entities/transaction'
import { getCurrentMonthRange } from '@/shared/lib/date-utils'
import { formatMoneyAmountParts } from '@/shared/lib/money-format'

const EMPTY_PARTS = { integerPart: '—', fractionPart: '' }

interface SummaryTileProps {
  integerPart: string
  fractionPart: string
  label: string
  variant: 'income' | 'expense'
  isLoading?: boolean
}

const SummaryTile = ({
  integerPart,
  fractionPart,
  label,
  variant,
  isLoading,
}: SummaryTileProps) => {
  const pillClass =
    variant === 'income'
      ? 'rounded-4xl bg-dashboard-income-pill px-5 py-8 text-center shadow-sm sm:rounded-[34px] sm:px-6 sm:py-10'
      : 'rounded-4xl bg-dashboard-expense-pill px-5 py-8 text-center shadow-sm sm:rounded-[34px] sm:px-6 sm:py-10'

  return (
    <div className={pillClass}>
      {isLoading ? (
        <div className={'flex min-h-16 items-center justify-center sm:min-h-20'}>
          <Loader2Icon className={'size-8 animate-spin text-brand-blue'} aria-hidden />
        </div>
      ) : (
        <p
          className={
            'font-display text-4xl font-bold leading-none text-brand-purple sm:text-5xl md:text-6xl'
          }
        >
          <span>{integerPart}</span>
          {fractionPart ? <span className={'text-brand-purple/50'}>{fractionPart}</span> : null}
        </p>
      )}
      <p
        className={
          'mt-3 font-display text-sm font-normal text-brand-purple sm:text-base md:text-lg'
        }
      >
        {label}
      </p>
    </div>
  )
}

export interface MonthSummaryTilesProps {
  earningsLabel: string
  spendsLabel: string
}

export const MonthSummaryTiles = ({ earningsLabel, spendsLabel }: MonthSummaryTilesProps) => {
  const displayCurrency = useAppSelector(selectDisplayGoalCurrency)
  const periodRange = useMemo(() => getCurrentMonthRange(), [])

  const { data, isLoading, isError } = useGetTransactionsQuery(
    { displayCurrency: displayCurrency!, params: periodRange },
    { skip: !displayCurrency }
  )

  const currency = displayCurrency ?? 'USD'

  const earningsParts = useMemo(() => {
    if (isError || !displayCurrency) {
      return EMPTY_PARTS
    }

    return formatMoneyAmountParts(data?.totalIncome ?? 0, currency)
  }, [currency, data?.totalIncome, displayCurrency, isError])

  const spendsParts = useMemo(() => {
    if (isError || !displayCurrency) {
      return EMPTY_PARTS
    }

    return formatMoneyAmountParts(data?.totalExpenses ?? 0, currency)
  }, [currency, data?.totalExpenses, displayCurrency, isError])

  return (
    <div className={'grid gap-4 sm:grid-cols-2 sm:gap-5'}>
      <SummaryTile
        variant={'income'}
        label={earningsLabel}
        integerPart={earningsParts.integerPart}
        fractionPart={earningsParts.fractionPart}
        isLoading={isLoading}
      />
      <SummaryTile
        variant={'expense'}
        label={spendsLabel}
        integerPart={spendsParts.integerPart}
        fractionPart={spendsParts.fractionPart}
        isLoading={isLoading}
      />
    </div>
  )
}
