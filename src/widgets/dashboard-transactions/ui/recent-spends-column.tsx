import { Link } from 'react-router-dom'

import { Button } from '@/shared/ui/button'
import { ScrollArea } from '@/shared/ui/scroll-area'

import type { SpendMockRow } from '../model/types'

import { RecentSpendRow } from './recent-spend-row'

export interface RecentSpendsColumnProps {
  title: string
  rows: readonly SpendMockRow[]
  addNewLabel: string
  addNewTo?: string
}

export const RecentSpendsColumn = ({
  title,
  rows,
  addNewLabel,
  addNewTo = '/profile',
}: RecentSpendsColumnProps) => {
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
            <RecentSpendRow key={row.id} amount={row.amount} label={row.label} icon={row.icon} />
          ))}
        </ul>
      </ScrollArea>
      <div className={'mt-4 flex justify-end'}>
        <Button
          asChild
          size={'lg'}
          className={
            'h-11 min-w-30 rounded-lg bg-brand-blue px-6 font-display text-sm font-bold text-white hover:bg-brand-blue/90'
          }
        >
          <Link to={addNewTo}>{addNewLabel}</Link>
        </Button>
      </div>
    </div>
  )
}
