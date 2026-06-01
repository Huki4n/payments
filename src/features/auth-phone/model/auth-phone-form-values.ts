export interface AuthPhoneFormValues {
  phone: string
}

export type AuthPhoneFormSubmitResult = void | { rootError: string }
