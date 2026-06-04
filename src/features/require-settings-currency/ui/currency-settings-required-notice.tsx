import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Button } from '@/shared/ui'

export const CurrencySettingsRequiredNotice = () => {
  const { t } = useTranslation('settings')

  return (
    <section
      className={
        'flex flex-col items-center gap-4 rounded-4xl bg-dashboard-card px-6 py-10 text-center shadow-sm'
      }
    >
      <h2 className={'font-display text-lg font-bold text-brand-purple sm:text-xl'}>
        {t('requireCurrency.title')}
      </h2>
      <p className={'max-w-md font-display text-sm text-brand-purple/80 sm:text-base'}>
        {t('requireCurrency.description')}
      </p>
      <Button
        asChild
        className={
          'h-11 rounded-xl bg-brand-purple-bg px-6 font-display text-sm font-bold text-white hover:bg-brand-purple-bg/90'
        }
      >
        <Link to={'/settings'}>{t('requireCurrency.action')}</Link>
      </Button>
    </section>
  )
}
