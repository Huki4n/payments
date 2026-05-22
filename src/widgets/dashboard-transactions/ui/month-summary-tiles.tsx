export interface MonthSummaryTilesProps {
  integerPart: string
  fractionPart: string
  earningsLabel: string
  spendsLabel: string
}

export const MonthSummaryTiles = ({
  integerPart,
  fractionPart,
  earningsLabel,
  spendsLabel,
}: MonthSummaryTilesProps) => {
  return (
    <div className={'grid gap-4 sm:grid-cols-2 sm:gap-5'}>
      <div
        className={
          'rounded-4xl bg-dashboard-income-pill px-5 py-8 text-center shadow-sm sm:rounded-[34px] sm:px-6 sm:py-10'
        }
      >
        <p
          className={
            'font-display text-4xl font-bold leading-none text-brand-purple sm:text-5xl md:text-6xl'
          }
        >
          <span>{integerPart}</span>
          <span className={'text-brand-purple/50'}>{fractionPart}</span>
        </p>
        <p
          className={
            'mt-3 font-display text-sm font-normal text-brand-purple sm:text-base md:text-lg'
          }
        >
          {earningsLabel}
        </p>
      </div>
      <div
        className={
          'rounded-4xl bg-dashboard-expense-pill px-5 py-8 text-center shadow-sm sm:rounded-[34px] sm:px-6 sm:py-10'
        }
      >
        <p
          className={
            'font-display text-4xl font-bold leading-none text-brand-purple sm:text-5xl md:text-6xl'
          }
        >
          <span>{integerPart}</span>
          <span className={'text-brand-purple/50'}>{fractionPart}</span>
        </p>
        <p
          className={
            'mt-3 font-display text-sm font-normal text-brand-purple sm:text-base md:text-lg'
          }
        >
          {spendsLabel}
        </p>
      </div>
    </div>
  )
}
