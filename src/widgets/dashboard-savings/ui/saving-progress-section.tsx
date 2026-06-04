import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

interface SavingProgressSectionProps {
  progressPercent: number
  showConfigureSavingsLink?: boolean
}

export const SavingProgressSection = ({
  progressPercent,
  showConfigureSavingsLink = false,
}: SavingProgressSectionProps) => {
  const { t } = useTranslation('home')

  return (
    <div className={'mt-6 space-y-3'}>
      <p className={'text-left font-display text-sm font-bold text-brand-purple'}>
        {t('dashboard.savingProgress')}
      </p>
      <div className={'h-3 w-full overflow-hidden rounded-full bg-card/90 shadow-inner'}>
        <div
          className={'h-full rounded-full bg-linear-to-r transition-[width] duration-500'}
          style={{
            width: `${progressPercent}%`,
            background:
              'linear-gradient(to right, var(--dashboard-progress-start), var(--dashboard-progress-end))',
          }}
        />
      </div>
      {showConfigureSavingsLink ? (
        <div className={'flex justify-end pt-1'}>
          <Link
            to={'/saves'}
            className={
              'inline-flex min-h-10 items-center justify-center rounded-xl bg-brand-purple-bg px-5 font-display text-xs font-bold text-white transition-colors hover:bg-brand-purple-bg/90 sm:text-sm'
            }
          >
            {t('dashboard.configureSavings')}
          </Link>
        </div>
      ) : null}
    </div>
  )
}
