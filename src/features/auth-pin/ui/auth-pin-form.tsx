import { Controller, useForm, type ControllerRenderProps } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/shared/ui'

import type { AuthPinFormSubmitResult, AuthPinFormValues } from '../model/auth-pin-form-values'

import { PIN_LENGTH, PIN_SLOT_CLASSNAME } from '../config/constants'

type AuthPinIncompleteErrorKey = 'auth.pin.errors.incomplete' | 'auth.pinConfirm.errors.incomplete'

export interface AuthPinFormProps {
  id: string
  disabled?: boolean
  incompleteErrorKey: AuthPinIncompleteErrorKey
  onValidSubmit: (pin: string) => Promise<AuthPinFormSubmitResult | void>
}

export const AuthPinForm = ({
  id,
  disabled = false,
  incompleteErrorKey,
  onValidSubmit,
}: AuthPinFormProps) => {
  const { t } = useTranslation('onboarding')

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<AuthPinFormValues>({
    defaultValues: { pin: '' },
    mode: 'onSubmit',
  })

  const rootError = errors.root?.message

  const validatePin = (value: string) => value.length === PIN_LENGTH || t(incompleteErrorKey)

  const onSubmit = handleSubmit(async values => {
    const result = await onValidSubmit(values.pin)

    if (!result) {
      return
    }

    if ('rootError' in result) {
      setError('root', { message: result.rootError })

      return
    }

    if ('fieldError' in result) {
      setError(result.fieldError.field, {
        type: 'custom',
        message: result.fieldError.message,
      })
    }
  })

  const renderPinField = ({
    field,
  }: {
    field: ControllerRenderProps<AuthPinFormValues, 'pin'>
  }) => {
    const handlePinChange = (value: string) => {
      if (errors.root || errors.pin) {
        clearErrors()
      }
      field.onChange(value)
    }

    return (
      <InputOTP
        {...field}
        onChange={handlePinChange}
        maxLength={PIN_LENGTH}
        aria-invalid={!!errors.pin}
        disabled={disabled}
      >
        <InputOTPGroup className={'gap-4'}>
          {Array.from({ length: PIN_LENGTH }).map((_, index) => (
            <InputOTPSlot key={index} index={index} className={PIN_SLOT_CLASSNAME} />
          ))}
        </InputOTPGroup>
      </InputOTP>
    )
  }

  return (
    <form
      id={id}
      noValidate
      onSubmit={onSubmit}
      className={'flex w-full flex-col items-center gap-2'}
    >
      <Controller
        control={control}
        name={'pin'}
        rules={{ validate: validatePin }}
        render={renderPinField}
      />
      {errors.pin ? (
        <p className={'text-center text-sm text-destructive'}>{errors.pin.message}</p>
      ) : null}
      {rootError ? <p className={'text-center text-sm text-destructive'}>{rootError}</p> : null}
    </form>
  )
}
