import { createListenerMiddleware } from '@reduxjs/toolkit'

import { persistSettingsRequested, settingsSlice, type SettingsState } from '@/entities/settings'
import { i18n } from '@/shared/i18n'
import { writeAppSettings } from '@/shared/lib/app-settings-storage'
import { applyColorScheme } from '@/shared/lib/apply-color-scheme'
import { toast } from '@/shared/lib/toast'

type ListenerState = { settings: SettingsState }

export const settingsListenerMiddleware = createListenerMiddleware()

settingsListenerMiddleware.startListening({
  matcher: settingsSlice.actions.setColorScheme.match,
  effect: (_action, listenerApi) => {
    const settings = (listenerApi.getState() as ListenerState).settings

    applyColorScheme(settings.colorScheme)
    writeAppSettings(settings)
  },
})

settingsListenerMiddleware.startListening({
  actionCreator: persistSettingsRequested,
  effect: async (_action, listenerApi) => {
    const settings = (listenerApi.getState() as ListenerState).settings

    applyColorScheme(settings.colorScheme)
    writeAppSettings(settings)
    await i18n.changeLanguage(settings.language)
    toast.success(i18n.t('settings:toast.saved'))
  },
})
