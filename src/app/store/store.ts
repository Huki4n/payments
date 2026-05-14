import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { addDataApi } from "@/features/add-data-action/api/add-data-api";
import { settingsReducer } from "@/entities/settings";

import { settingsListenerMiddleware } from "./middlewares/settings-listener";

const rootReducer = combineReducers({
  settings: settingsReducer,
  [addDataApi.reducerPath]: addDataApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(settingsListenerMiddleware.middleware)
      .concat(addDataApi.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
