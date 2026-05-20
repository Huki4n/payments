import { useTranslation } from 'react-i18next'

import { Search } from 'lucide-react'

import { InputGroup, InputGroupAddon, InputGroupInput } from '@/shared/ui/input-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'

import {
  type DashboardCategoryNameKey,
  toDashboardCategoryLabelKey,
} from '../model/dashboard-category-keys'

export interface TransactionsFilterBarProps {
  nameQuery: string
  amountQuery: string
  category: string
  categoryKeys: readonly DashboardCategoryNameKey[]
  onNameChange: (value: string) => void
  onAmountChange: (value: string) => void
  onCategoryChange: (value: string) => void
}

export const TransactionsFilterBar = ({
  nameQuery,
  amountQuery,
  category,
  categoryKeys,
  onNameChange,
  onAmountChange,
  onCategoryChange,
}: TransactionsFilterBarProps) => {
  const { t } = useTranslation('home')

  return (
    <div className={'flex flex-col gap-3 rounded-4xl bg-dashboard-card/80 p-3 shadow-sm sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 sm:rounded-[34px] sm:p-4'}>
      <InputGroup className={'h-12 min-w-48 flex-1 rounded-[48px] border-0 bg-card px-1 shadow-sm md:min-w-0'}>
        <InputGroupAddon align={'inline-start'} className={'pl-3'}>
          <Search className={'size-5 text-brand-purple/45'} strokeWidth={1.5} />
        </InputGroupAddon>
        <InputGroupInput
          value={nameQuery}
          onChange={e => onNameChange(e.target.value)}
          placeholder={t('transactionsPage.searchByName')}
          aria-label={t('transactionsPage.searchByName')}
          className={'h-full font-display text-sm text-brand-purple placeholder:text-brand-purple/50 md:text-base'}
        />
      </InputGroup>

      <InputGroup className={'h-12 min-w-48 flex-1 rounded-[48px] border-0 bg-card px-1 shadow-sm md:min-w-0'}>
        <InputGroupAddon align={'inline-start'} className={'pl-3'}>
          <Search className={'size-5 text-brand-purple/45'} strokeWidth={1.5} />
        </InputGroupAddon>
        <InputGroupInput
          value={amountQuery}
          onChange={e => onAmountChange(e.target.value)}
          placeholder={t('transactionsPage.searchByAmount')}
          aria-label={t('transactionsPage.searchByAmount')}
          className={'h-full font-display text-sm text-brand-purple placeholder:text-brand-purple/50 md:text-base'}
        />
      </InputGroup>

      <Select value={category} onValueChange={onCategoryChange}>
        <SelectTrigger
          aria-label={t('transactionsPage.category')}
          className={'h-12 w-full min-w-40 shrink-0 rounded-[48px] border-0 bg-card px-4 font-display text-sm text-brand-purple shadow-sm ring-offset-0! focus-visible:ring-2 focus-visible:ring-brand-blue/30 dark:bg-card sm:w-54 md:text-base [&_svg]:text-brand-purple/45'}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent
          position={'popper'}
          sideOffset={6}
          align={'start'}
          className={'min-w-(--radix-select-trigger-width) rounded-2xl border border-border/80 bg-card font-display text-brand-purple shadow-lg'}
        >
          <SelectItem
            value={'all'}
            className={'rounded-xl py-2.5 pr-8 pl-3 font-display text-sm text-brand-purple data-highlighted:bg-dashboard-card data-highlighted:text-brand-purple'}
          >
            {t('transactionsPage.categoryAll')}
          </SelectItem>
          {categoryKeys.map(key => (
            <SelectItem
              key={key}
              value={key}
              className={'rounded-xl py-2.5 pr-8 pl-3 font-display text-sm text-brand-purple data-highlighted:bg-dashboard-card data-highlighted:text-brand-purple'}
            >
              {t(toDashboardCategoryLabelKey(key))}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
