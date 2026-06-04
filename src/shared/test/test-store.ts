import { combineReducers, configureStore } from '@reduxjs/toolkit'

import '@/entities/profile/api/profile-api'

import { settingsReducer } from '@/entities/settings'
import { baseApi } from '@/shared/api'

const rootReducer = combineReducers({
  settings: settingsReducer,
  [baseApi.reducerPath]: baseApi.reducer,
})

export const testStore = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
})
