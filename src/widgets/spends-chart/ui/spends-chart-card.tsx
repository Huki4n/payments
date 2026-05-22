import { useTranslation } from 'react-i18next'

import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

import { INITIAL_CHART_DIMENSION } from '@/shared/ui/chart-constants'
import { DashboardSpendCategoryIcon } from '@/shared/ui/icons/category-icons'
import { ScrollArea } from '@/shared/ui/scroll-area'
import { cn } from '@/shared/ui/utils'

import { spendsChartPie } from '../model/spends-chart-mock'

export const SpendsChartCard = () => {
  const { t } = useTranslation('home')

  const data = spendsChartPie.map(row => ({
    ...row,
    name: t(`dashboard.categories.${row.nameKey}`),
    fill: row.color,
  }))

  return (
    <section
      className={
        'overflow-hidden rounded-4xl bg-dashboard-card shadow-sm px-4 py-5 sm:px-6 sm:py-6 pr-3 sm:pr-4'
      }
    >
      <h2
        className={'mb-4 font-display text-base font-bold text-brand-purple sm:text-lg md:text-xl'}
      >
        {t('dashboard.monthlySpendsWheel')}
      </h2>

      <div className={'flex flex-col items-stretch gap-6 md:flex-row md:items-stretch'}>
        <div className={'mx-auto h-80 w-full max-w-80 min-h-0 min-w-0 shrink-0 md:w-80'}>
          <ResponsiveContainer
            width={'100%'}
            height={'100%'}
            initialDimension={INITIAL_CHART_DIMENSION}
          >
            <PieChart>
              <Pie
                data={data}
                dataKey={'value'}
                nameKey={'name'}
                cx={'50%'}
                cy={'50%'}
                outerRadius={'88%'}
                paddingAngle={0}
                strokeWidth={0}
              />
              <Tooltip
                formatter={value => {
                  const num = typeof value === 'number' ? value : Number(value ?? 0)

                  return [`-${num.toFixed(2)} $`, t('dashboard.spendAmount')]
                }}
                contentStyle={{
                  borderRadius: 12,
                  border: '1px solid var(--dashboard-tooltip-border)',
                  fontFamily: 'var(--font-display)',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <ScrollArea
          overflowFade
          overflowFadeFrom={'from-dashboard-card'}
          persistentScrollbarWhenOverflow
          className={'h-72 min-h-0 w-full flex-1 md:h-80 pr-2'}
        >
          <ul className={'flex flex-col gap-2 pr-2'}>
            {spendsChartPie.map(row => {
              return (
                <li
                  key={row.nameKey}
                  className={'flex items-center gap-3 rounded-2xl bg-card/95 shadow-sm pr-3.5'}
                >
                  <span
                    className={'flex size-14 shrink-0 items-center justify-center rounded-xl'}
                    style={{ backgroundColor: row.color }}
                  >
                    <DashboardSpendCategoryIcon
                      name={row.icon}
                      className={'size-7 text-dashboard-on-chart-swatch'}
                    />
                  </span>
                  <span
                    className={cn(
                      'flex-1 text-left font-display text-xs text-brand-purple sm:text-sm'
                    )}
                  >
                    {t(`dashboard.categories.${row.nameKey}`)}
                  </span>
                  <span
                    className={
                      'min-w-26 shrink-0 rounded-lg bg-dashboard-expense-pill px-2.5 py-1.5 text-center font-display text-xs font-bold text-brand-purple sm:text-sm'
                    }
                  >
                    -{row.value.toFixed(2).replace('.', ',')} $
                  </span>
                </li>
              )
            })}
          </ul>
        </ScrollArea>
      </div>
    </section>
  )
}
