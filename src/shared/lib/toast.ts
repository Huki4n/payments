import { toast as toastify, type ToastOptions } from 'react-toastify'

const defaultOptions = {
  autoClose: 4000,
  hideProgressBar: true,
} satisfies ToastOptions

export const toast = {
  success(message: string, options?: ToastOptions) {
    toastify.success(message, { ...defaultOptions, ...options })
  },
  error(message: string, options?: ToastOptions) {
    toastify.error(message, { ...defaultOptions, ...options })
  },
}
