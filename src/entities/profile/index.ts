export type { UpdateUserProfileRequest, UserProfileResponse } from './model/types'

export { profileApi, useGetProfileQuery, useUpdateProfileMutation } from './api/profile-api'

export {
  formatPhoneForProfileApi,
  mapProfileToSettingsFields,
  mapSettingsToUpdateProfileRequest,
} from './lib/map-profile'
