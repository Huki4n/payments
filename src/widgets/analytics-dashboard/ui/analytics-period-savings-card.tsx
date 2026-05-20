import { useId } from 'react'
import { useTranslation } from 'react-i18next'

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { dashboardChartXAxisTick, dashboardChartYAxisTick } from '@/shared/lib/dashboard-chart-axes'

import {
  analyticsSavingsList,
  analyticsTotalSavedAmount,
  analyticsTotalSavedSeries,
} from '../model/analytics-mock'

const TOTAL_SAVED_Y_TICK = {
  ...dashboardChartYAxisTick,
  fill: 'color-mix(in srgb, var(--brand-purple) 33%, transparent)',
  fontSize: 11,
  fontWeight: 400 as const,
}

const TOTAL_SAVED_X_TICK = {
  ...dashboardChartXAxisTick,
  fontSize: 11,
}

const CHART_INITIAL_DIMENSION = { width: 160, height: 100 } as const

export const AnalyticsPeriodSavingsCard = () => {
  const { t } = useTranslation('home')
  const gid = useId().replace(/:/g, '')
  const data = [...analyticsTotalSavedSeries]

  return (
    <section className={'overflow-hidden rounded-2xl bg-dashboard-card px-3 py-4 shadow-sm sm:px-5 sm:py-5 md:px-6 md:py-6'}>
      <div className={'flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-6 xl:gap-8'}>
        <div className={'flex w-full min-w-0 flex-col lg:max-w-md lg:flex-1 xl:max-w-lg '}>
          <h2 className={'font-display-alternates text-xl font-bold leading-[1.05] text-brand-purple sm:text-2xl md:text-3xl'}>
            {t('analyticsPage.periodSavedTitle')}
          </h2>

          <div className={'mt-2 w-fit max-w-full rounded-md bg-dashboard-income-pill px-2 py-1 sm:px-2.5 sm:py-1.5 md:rounded-lg md:px-2.5 md:py-2'}>
            <p className={'font-display text-4xl font-bold leading-none tracking-tight text-brand-purple sm:text-5xl md:text-6xl'}>
              {analyticsTotalSavedAmount}
            </p>
          </div>

          <p className={'mt-4 font-display-alternates text-sm font-normal text-brand-purple md:text-base'}>
            {t('dashboard.savingsReplenishments')}
          </p>

          <ul className={'mt-2 flex flex-col gap-2'}>
            {analyticsSavingsList.map((r, idx) => (
              <li
                key={`${r.date}-${idx}`}
                className={'flex min-h-11 items-center justify-between gap-2 rounded-[10px] bg-card px-2.5 py-2 sm:min-h-12 sm:px-3'}
              >
                <span className={'font-display-alternates text-xs font-normal text-brand-purple sm:text-sm md:text-base'}>
                  {r.date}
                </span>
                <span className={'min-w-0 shrink-0 rounded-md bg-dashboard-income-pill px-2 py-1 text-center font-display-alternates text-xs font-bold text-brand-purple sm:min-w-32 sm:px-2.5 sm:py-1.5 sm:text-sm md:text-base'}>
                  {r.amount}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className={'flex min-h-0 min-w-0 flex-1 flex-col rounded-[10px] bg-card py-2.5 sm:py-3 md:min-h-48 '}>
          <h3 className={'mb-1.5 font-display-alternates text-base font-bold text-brand-purple sm:text-lg md:text-xl lg:mb-2 px-2.5 sm:px-3'}>
            {t('analyticsPage.totalSavedChartTitle')}
          </h3>

          <div className={'min-h-32 w-full min-w-0 flex-1 sm:min-h-36 lg:min-h-0'}>
            <ResponsiveContainer
              width={'100%'}
              height={'100%'}
              initialDimension={CHART_INITIAL_DIMENSION}
            >
              <AreaChart data={data} margin={{ top: 4, right: 6, left: 2, bottom: 6 }}>
                <defs>
                  <linearGradient id={`analytics-saved-${gid}`} x1={'0'} y1={'0'} x2={'0'} y2={'1'}>
                    <stop
                      offset={'0%'}
                      stopColor={'var(--dashboard-chart-violet)'}
                      stopOpacity={0.55}
                    />
                    <stop offset={'100%'} stopColor={'var(--dashboard-chart-violet)'} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray={'3 6'}
                  stroke={'var(--dashboard-chart-grid-soft)'}
                  vertical={false}
                />
                <XAxis
                  dataKey={'month'}
                  tick={TOTAL_SAVED_X_TICK}
                  tickLine={false}
                  axisLine={false}
                  padding={{ right: 3, left: 3 }}
                />
                <YAxis
                  domain={[1000, 20000]}
                  ticks={[1000, 5000, 10000, 15000, 20000]}
                  tick={TOTAL_SAVED_Y_TICK}
                  tickLine={false}
                  axisLine={false}
                  width={48}
                />
                <Tooltip
                  content={({ active, payload }) =>
                    active && payload?.length ? (
                      <div
                        className={'rounded-lg border bg-card px-2 py-1.5 shadow-md'}
                        style={{
                          borderColor: 'var(--dashboard-tooltip-border)',
                        }}
                      >
                        <p className={'font-display-alternates text-xs font-semibold text-brand-purple sm:text-sm'}>
                          {payload[0]?.value}$
                        </p>
                      </div>
                    ) : null
                  }
                />
                <Area
                  type={'monotone'}
                  dataKey={'value'}
                  stroke={'var(--dashboard-chart-violet)'}
                  strokeWidth={1.15}
                  fill={`url(#analytics-saved-${gid})`}
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  )
}
