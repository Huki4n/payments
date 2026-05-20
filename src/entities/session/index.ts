export type {
  ApiErrorResponse,
  JwtTokenPairDto,
  LoginRequest,
  RegisterRequest,
  UserExistsResponse,
} from './model/types'
export type { AuthFlowState } from './model/auth-flow-state'

export { pinToPassword } from './lib/pin-to-password'
export { normalizePhone } from './lib/normalize-phone'
export { getApiErrorMessage } from './lib/get-api-error-message'

export {
  sessionApi,
  useLazyCheckUserExistsQuery,
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
} from './api/session-api'
