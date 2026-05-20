import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithAuth } from './base-query-auth'
import { apiTags } from './tags'

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithAuth,
  tagTypes: [...apiTags],
  endpoints: () => ({}),
})
