import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { settingsReducer } from "@/entities/settings";

import { settingsListenerMiddleware } from "./middlewares/settings-listener";

const rootReducer = combineReducers({
  settings: settingsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(settingsListenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
