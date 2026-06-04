import { useEffect, type ReactNode } from 'react'

import { useAppDispatch } from '@/app/store'
import { mapProfileToSettingsFields, useGetProfileQuery } from '@/entities/profile'
import { hydrateFromProfile } from '@/entities/settings'
import { i18n } from '@/shared/i18n'

interface ProfileBootstrapProps {
  children: ReactNode
}

/** Загружает профиль с API и синхронизирует имя, телефон и язык в settings. */
export const ProfileBootstrap = ({ children }: ProfileBootstrapProps) => {
  const dispatch = useAppDispatch()
  const { data } = useGetProfileQuery()

  useEffect(() => {
    if (!data) {
      return
    }

    const fields = mapProfileToSettingsFields(data)

    dispatch(hydrateFromProfile(fields))
    void i18n.changeLanguage(fields.language)
  }, [data, dispatch])

  return children
}
