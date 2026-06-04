import { useForm, type ControllerRenderProps } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { normalizePhone } from '@/entities/session'
import { Button, Form, FormControl, FormField, FormItem, FormMessage, Input } from '@/shared/ui'

import type {
  AuthPhoneFormSubmitResult,
  AuthPhoneFormValues,
} from '../model/auth-phone-form-values'

import { AUTH_PHONE_FORM_ID, PHONE_INPUT_CLASSNAME } from '../config/constants'
import { isValidPhone } from '../lib/is-valid-phone'

export interface AuthPhoneFormProps {
  isSubmitting?: boolean
  onValidSubmit: (phone: string) => Promise<AuthPhoneFormSubmitResult | void>
}

export const AuthPhoneForm = ({ isSubmitting = false, onValidSubmit }: AuthPhoneFormProps) => {
  const { t } = useTranslation('onboarding')

  const form = useForm<AuthPhoneFormValues>({
    defaultValues: { phone: '' },
    mode: 'onSubmit',
  })

  const rootError = form.formState.errors.root?.message

  const onSubmit = form.handleSubmit(async ({ phone: rawPhone }) => {
    const phone = normalizePhone(rawPhone)

    const result = await onValidSubmit(phone)

    if (result && 'rootError' in result) {
      form.setError('root', { message: result.rootError })
    }
  })

  const renderPhoneField = ({
    field,
  }: {
    field: ControllerRenderProps<AuthPhoneFormValues, 'phone'>
  }) => {
    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (form.formState.errors.root || form.formState.errors.phone) {
        form.clearErrors()
      }
      field.onChange(event)
    }

    return (
      <FormItem className={'w-full gap-2'}>
        <FormControl>
          <Input
            {...field}
            onChange={handlePhoneChange}
            type={'tel'}
            autoComplete={'tel'}
            inputMode={'tel'}
            placeholder={t('auth.phonePlaceholder')}
            className={PHONE_INPUT_CLASSNAME}
          />
        </FormControl>
        <FormMessage className={'text-center'} />
      </FormItem>
    )
  }

  return (
    <Form {...form}>
      <form
        id={AUTH_PHONE_FORM_ID}
        noValidate
        onSubmit={onSubmit}
        className={'flex w-full flex-col items-center gap-6'}
      >
        <FormField
          control={form.control}
          name={'phone'}
          rules={{
            required: t('auth.errors.required'),
            validate: value => isValidPhone(value) || t('auth.errors.invalidPhone'),
          }}
          render={renderPhoneField}
        />
        {rootError ? <p className={'text-center text-sm text-destructive'}>{rootError}</p> : null}
        <Button
          type={'submit'}
          disabled={isSubmitting}
          className={
            'h-16 w-72 max-w-full rounded-control bg-brand-purple-bg font-display text-xl font-bold text-white hover:bg-brand-purple-bg/90'
          }
        >
          {t('auth.submit')}
        </Button>
      </form>
    </Form>
  )
}
