import { useTranslation } from 'react-i18next'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'

import { markOnboardingCompleted } from '@/entities/onboarding-status'
import {
  getApiErrorMessage,
  pinToPassword,
  useRegisterMutation,
  type AuthFlowState,
} from '@/entities/session'
import {
  AUTH_PIN_CONFIRM_FORM_ID,
  AuthPinForm,
  type AuthPinFormSubmitResult,
} from '@/features/auth-pin'
import { Button, Progress } from '@/shared/ui'

interface PinConfirmLocationState extends AuthFlowState {
  pin?: string
}

export const PinConfirmPage = () => {
  const { t } = useTranslation('onboarding')
  const navigate = useNavigate()
  const location = useLocation()

  const [register, { isLoading: isSubmitting }] = useRegisterMutation()

  const flow = location.state as PinConfirmLocationState | null

  const expectedPin = flow?.pin
  const phone = flow?.phone

  if (!expectedPin || !phone) {
    return <Navigate to={'/auth'} replace />
  }

  if (flow.isExistingUser) {
    return <Navigate to={'/auth/pin'} replace state={{ phone, isExistingUser: true }} />
  }

  const handleValidSubmit = async (pin: string): Promise<AuthPinFormSubmitResult | void> => {
    if (pin !== expectedPin) {
      return {
        fieldError: {
          field: 'pin',
          message: t('auth.pinConfirm.errors.mismatch'),
        },
      }
    }

    const password = pinToPassword(pin)

    try {
      await register({
        firstName: 'User',
        lastName: 'User',
        phoneNumber: phone,
        password,
        repeatPassword: password,
      }).unwrap()

      markOnboardingCompleted()
      navigate('/auth/congratulations')
    } catch (error) {
      return { rootError: getApiErrorMessage(error, t('auth.errors.requestFailed')) }
    }
  }

  return (
    <div className={'relative flex min-h-svh flex-col bg-white text-brand-purple'}>
      <main className={'flex flex-1 flex-col items-center px-6 pt-12 pb-10 sm:pt-16 lg:pt-20'}>
        <div className={'flex w-full max-w-xl flex-1 flex-col items-center gap-12'}>
          <div className={'flex flex-col items-center gap-8'}>
            <h1
              className={
                'text-center font-display text-4xl font-bold leading-none sm:text-5xl lg:text-6xl'
              }
            >
              {t('auth.pinConfirm.title')}
            </h1>
            <Progress
              value={90}
              className={
                'h-4 w-72 max-w-full bg-brand-blue/30 *:data-[slot=progress-indicator]:bg-brand-blue'
              }
            />
          </div>
          <div className={'flex w-full flex-col items-center gap-8'}>
            <p className={'min-h-14 text-center font-display text-xl leading-snug'}>
              {t('auth.pinConfirm.description')}
            </p>
            <AuthPinForm
              id={AUTH_PIN_CONFIRM_FORM_ID}
              disabled={isSubmitting}
              incompleteErrorKey={'auth.pinConfirm.errors.incomplete'}
              onValidSubmit={handleValidSubmit}
            />
          </div>
          <div className={'mt-auto flex flex-col items-center gap-4'}>
            <Button
              form={AUTH_PIN_CONFIRM_FORM_ID}
              type={'submit'}
              disabled={isSubmitting}
              className={
                'h-16 w-72 max-w-full rounded-control bg-brand-purple-bg font-display text-xl font-bold text-white hover:bg-brand-purple-bg/90'
              }
            >
              {t('auth.pinConfirm.submit')}
            </Button>
            <Link
              to={'/auth/pin'}
              state={{ phone, isExistingUser: false }}
              className={'font-display text-xl text-brand-purple hover:underline'}
            >
              {t('auth.pinConfirm.back')}
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
