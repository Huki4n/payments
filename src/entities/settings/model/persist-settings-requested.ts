import { createAction } from '@reduxjs/toolkit'

/** Запись настроек в localStorage и синхронизация i18n — только по этому экшену (кнопка Save). */
export const persistSettingsRequested = createAction('settings/persistRequested')
