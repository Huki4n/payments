import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

import { getApiErrorMessage, useLazyCheckUserExistsQuery } from '@/entities/session'
import { AuthPhoneForm, type AuthPhoneFormSubmitResult } from '@/features/auth-phone'
import { AUTH_PAGE_SHELL_CLASSNAME } from '@/pages/auth/lib/auth-page-shell'
import { Progress } from '@/shared/ui'

export const AuthPage = () => {
  const { t } = useTranslation('onboarding')
  const navigate = useNavigate()
  const [checkUser, { isFetching }] = useLazyCheckUserExistsQuery()

  const handleValidSubmit = async (phone: string): Promise<AuthPhoneFormSubmitResult | void> => {
    try {
      const { exists } = await checkUser({ phone }).unwrap()

      navigate('/auth/pin', { state: { phone, isExistingUser: exists } })
    } catch (error) {
      return { rootError: getApiErrorMessage(error, t('auth.errors.requestFailed')) }
    }
  }

  return (
    <div className={AUTH_PAGE_SHELL_CLASSNAME}>
      <main className={'flex flex-1 flex-col items-center px-6 pt-12 pb-10 sm:pt-16 lg:pt-20'}>
        <div className={'flex w-full max-w-xl flex-1 flex-col items-center gap-12'}>
          <div className={'flex flex-col items-center gap-8'}>
            <h1
              className={
                'text-center font-display text-4xl font-bold leading-none sm:text-5xl lg:text-6xl'
              }
            >
              {t('auth.title')}
            </h1>
            <Progress
              value={9}
              className={
                'h-4 w-72 max-w-full bg-brand-blue/30 *:data-[slot=progress-indicator]:bg-brand-blue'
              }
            />
          </div>
          <div className={'flex w-full flex-col items-center gap-8'}>
            <p className={'min-h-14 text-center font-display text-xl leading-snug'}>
              {t('auth.description')}
            </p>
            <AuthPhoneForm isSubmitting={isFetching} onValidSubmit={handleValidSubmit} />
          </div>
          <div className={'mt-auto flex flex-col items-center gap-4'}>
            <p className={'text-center font-display text-xl'}>
              <span>{t('auth.haveAccount')} </span>
              <Link
                to={'/onboarding/welcome'}
                className={'font-medium text-brand-blue hover:underline'}
              >
                {t('auth.signUp')}
              </Link>
            </p>
          </div>
        </div>
      </main>
      <footer className={'px-6 pb-10'}>
        <p className={'text-center font-display text-base sm:text-xl'}>
          <span>{t('auth.terms.prefix')} </span>
          <span className={'font-bold'}>{t('auth.terms.link')}</span>
        </p>
      </footer>
    </div>
  )
}
