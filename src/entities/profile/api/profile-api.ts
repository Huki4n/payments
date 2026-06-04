import { baseApi } from '@/shared/api'

import type { UpdateUserProfileRequest, UserProfileResponse } from '../model/types'

export const profileApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getProfile: build.query<UserProfileResponse, void>({
      query: () => '/profile',
      providesTags: [{ type: 'User', id: 'PROFILE' }],
    }),
    updateProfile: build.mutation<UserProfileResponse, UpdateUserProfileRequest>({
      query: body => ({
        url: '/profile',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [{ type: 'User', id: 'PROFILE' }],
    }),
  }),
})

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi
