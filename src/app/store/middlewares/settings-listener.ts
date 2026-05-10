import { createListenerMiddleware } from "@reduxjs/toolkit";

import { persistSettingsRequested, type SettingsState } from "@/entities/settings";
import { i18n } from "@/shared/i18n";
import { writeAppSettings } from "@/shared/lib/app-settings-storage";

type ListenerState = { settings: SettingsState };

export const settingsListenerMiddleware = createListenerMiddleware();

settingsListenerMiddleware.startListening({
  actionCreator: persistSettingsRequested,
  effect: async (_action, listenerApi) => {
    const settings = (listenerApi.getState() as ListenerState).settings;
    writeAppSettings(settings);
    await i18n.changeLanguage(settings.language);
  },
});
