import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Button } from '@/shared/ui/button'
import { ScrollArea } from '@/shared/ui/scroll-area'

import type { EarningMockRow } from '../model/transactions-mock'

import { RecentEarningRow } from './recent-earning-row'

export interface RecentEarningsColumnProps {
  title: string
  rows: readonly EarningMockRow[]
  addNewTo?: string
}

export const RecentEarningsColumn = ({
  title,
  rows,
  addNewTo = '/profile',
}: RecentEarningsColumnProps) => {
  const { t } = useTranslation('home')

  return (
    <div className={'flex min-h-0 flex-col'}>
      <h3 className={'mb-3 font-display text-sm font-bold text-brand-purple sm:text-base'}>
        {title}
      </h3>
      <ScrollArea
        overflowFade
        overflowFadeFrom={'from-dashboard-card'}
        persistentScrollbarWhenOverflow
        className={'h-52 sm:h-60 md:h-72 pr-2 pb-1'}
      >
        <ul className={'space-y-2.5 pr-2'}>
          {rows.map(row => (
            <RecentEarningRow
              key={row.id}
              amount={row.amount}
              label={t(`dashboard.merchants.${row.labelKey}`)}
            />
          ))}
        </ul>
      </ScrollArea>
      <div className={'mt-4 flex justify-end'}>
        <Button
          asChild
          size={'lg'}
          className={'h-11 min-w-[7.5rem] rounded-[11px] bg-brand-blue px-6 font-display text-sm font-bold text-white hover:bg-brand-blue/90'}
        >
          <Link to={addNewTo}>{t('addData.manualForm.addNew')}</Link>
        </Button>
      </div>
    </div>
  )
}
