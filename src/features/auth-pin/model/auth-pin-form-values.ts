export interface AuthPinFormValues {
  pin: string
}

export type AuthPinFieldError = {
  field: 'pin'
  message: string
}

export type AuthPinFormSubmitResult =
  | void
  | { rootError: string }
  | { fieldError: AuthPinFieldError }
