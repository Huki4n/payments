import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { settingsReducer } from '@/entities/settings'
import { baseApi } from '@/shared/api'

import '@/entities/goal/api/goals-api'
import '@/entities/session/api/session-api'
import '@/features/add-data-action/api/add-data-api'

import { settingsListenerMiddleware } from './middlewares/settings-listener'

const rootReducer = combineReducers({
  settings: settingsReducer,
  [baseApi.reducerPath]: baseApi.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .prepend(settingsListenerMiddleware.middleware)
      .concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
