import { useTranslation } from 'react-i18next'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'

import { markOnboardingCompleted } from '@/entities/onboarding-status'
import {
  getApiErrorMessage,
  pinToPassword,
  useLoginMutation,
  type AuthFlowState,
} from '@/entities/session'
import { AUTH_PIN_FORM_ID, AuthPinForm, type AuthPinFormSubmitResult } from '@/features/auth-pin'
import { AUTH_PAGE_SHELL_CLASSNAME } from '@/pages/auth/lib/auth-page-shell'
import { Button, Progress } from '@/shared/ui'

export const PinPage = () => {
  const { t } = useTranslation('onboarding')
  const navigate = useNavigate()
  const location = useLocation()
  const authFlow = location.state as AuthFlowState | null

  const [login, { isLoading: isLoggingIn }] = useLoginMutation()

  if (!authFlow?.phone) {
    return <Navigate to={'/auth'} replace />
  }

  const isLogin = authFlow.isExistingUser
  const titleKey = isLogin ? 'auth.pin.login.title' : 'auth.pin.title'
  const descriptionKey = isLogin ? 'auth.pin.login.description' : 'auth.pin.description'
  const submitKey = isLogin ? 'auth.pin.login.submit' : 'auth.pin.submit'

  const handleValidSubmit = async (pin: string): Promise<AuthPinFormSubmitResult | void> => {
    if (isLogin) {
      try {
        await login({
          phoneNumber: authFlow.phone,
          password: pinToPassword(pin),
        }).unwrap()
        markOnboardingCompleted()
        navigate('/')
      } catch (error) {
        return { rootError: getApiErrorMessage(error, t('auth.errors.requestFailed')) }
      }

      return
    }

    navigate('/auth/pin/confirm', {
      state: { pin, ...authFlow },
    })
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
              {t(titleKey)}
            </h1>
            <Progress
              value={60}
              className={
                'h-4 w-72 max-w-full bg-brand-blue/30 *:data-[slot=progress-indicator]:bg-brand-blue'
              }
            />
          </div>
          <div className={'flex w-full flex-col items-center gap-8'}>
            <p className={'min-h-14 text-center font-display text-xl leading-snug'}>
              {t(descriptionKey)}
            </p>
            <AuthPinForm
              id={AUTH_PIN_FORM_ID}
              disabled={isLoggingIn}
              incompleteErrorKey={'auth.pin.errors.incomplete'}
              onValidSubmit={handleValidSubmit}
            />
          </div>
          <div className={'mt-auto flex flex-col items-center gap-4'}>
            <Button
              form={AUTH_PIN_FORM_ID}
              type={'submit'}
              disabled={isLoggingIn}
              className={
                'h-16 w-72 max-w-full rounded-control bg-brand-purple-bg font-display text-xl font-bold text-white hover:bg-brand-purple-bg/90'
              }
            >
              {t(submitKey)}
            </Button>
            <Link to={'/auth'} className={'font-display text-xl text-brand-purple hover:underline'}>
              {t('auth.pin.back')}
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
