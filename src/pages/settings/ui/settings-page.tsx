import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ChevronRight } from 'lucide-react'

import type { AppSettingsCurrency, AppSettingsLanguage } from '@/shared/lib/app-settings-storage'

import { AppLayout } from '@/app/layouts'
import { useAppDispatch, useAppSelector } from '@/app/store'
import {
  persistSettingsRequested,
  selectSettings,
  setColorScheme,
  setCountry,
  setCurrency,
  setEmail,
  setLanguage,
  setName,
  setPhone,
  setSurname,
} from '@/entities/settings'
import { Button } from '@/shared/ui'
import { HomeNavigation } from '@/widgets/home-navigation'

import { SettingsSelectField, SettingsTextField, SettingsThemeToggle } from './settings-field'

const CURRENCY_OPTIONS = [
  { value: 'usd', label: 'USD $' },
  { value: 'eur', label: 'EUR €' },
  { value: 'rub', label: 'RUB ₽' },
]

const LANGUAGE_OPTIONS = [
  { value: 'en', label: 'ENG' },
  { value: 'ru', label: 'RUS' },
]

export const SettingsPage = () => {
  const { t } = useTranslation('settings')
  const dispatch = useAppDispatch()
  const settings = useAppSelector(selectSettings)
  const { currency, language, colorScheme, name, surname, country, phone, email } = settings

  const [savedJson, setSavedJson] = useState(() => JSON.stringify(settings))
  const isDirty = JSON.stringify(settings) !== savedJson

  const handleSave = () => {
    dispatch(persistSettingsRequested())
    setSavedJson(JSON.stringify(settings))
  }

  return (
    <AppLayout header={<HomeNavigation />}>
      <div
        className={
          'mx-auto max-w-4xl rounded-2xl bg-add-data-panel px-4 py-5 shadow-lg sm:rounded-3xl sm:px-6 sm:py-6 md:max-w-5xl md:px-8 md:py-8'
        }
      >
        <div className={'grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5'}>
          <SettingsTextField
            label={t('fields.name')}
            value={name}
            onChange={v => dispatch(setName(v))}
          />
          <SettingsTextField
            label={t('fields.surname')}
            value={surname}
            onChange={v => dispatch(setSurname(v))}
          />

          <SettingsTextField
            label={t('fields.country')}
            value={country}
            onChange={v => dispatch(setCountry(v))}
          />
          <SettingsTextField
            label={t('fields.phoneNumber')}
            value={phone}
            onChange={v => dispatch(setPhone(v))}
            inputType={'tel'}
          />

          <SettingsTextField
            label={t('fields.email')}
            value={email}
            onChange={v => dispatch(setEmail(v))}
            inputType={'email'}
          />
          <SettingsSelectField
            label={t('fields.currency')}
            value={currency}
            onValueChange={v => dispatch(setCurrency(v as AppSettingsCurrency))}
            options={CURRENCY_OPTIONS}
          />

          <SettingsTextField
            label={t('fields.pinCode')}
            value={t('actions.resetPin')}
            readOnly
            dimValue
            trailing={
              <ChevronRight
                className={'size-5 shrink-0 text-brand-purple/50 sm:size-6'}
                strokeWidth={1.5}
                aria-hidden
              />
            }
          />
          <SettingsSelectField
            label={t('fields.language')}
            value={language}
            onValueChange={v => dispatch(setLanguage(v as AppSettingsLanguage))}
            options={LANGUAGE_OPTIONS}
          />
          <SettingsThemeToggle
            label={t('fields.darkTheme')}
            modeLabel={colorScheme === 'dark' ? t('fields.themeDark') : t('fields.themeLight')}
            checked={colorScheme === 'dark'}
            onCheckedChange={on => dispatch(setColorScheme(on ? 'dark' : 'light'))}
          />
        </div>

        <div className={'mt-5 flex justify-end sm:mt-6'}>
          <Button
            type={'button'}
            disabled={!isDirty}
            onClick={handleSave}
            className={
              'rounded-xl bg-brand-purple-bg px-6 py-5 font-display text-sm font-bold text-white transition-all duration-200 hover:bg-brand-purple-bg/90 hover:shadow-md active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 sm:px-8 sm:text-base'
            }
          >
            {t('actions.save')}
          </Button>
        </div>
      </div>
    </AppLayout>
  )
}
