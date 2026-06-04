import { cn } from '@/shared/ui/utils'

export const currencyRequiredToastClassName = cn(
  '!rounded-2xl !border !border-brand-purple/10 !bg-dashboard-card !p-4 !shadow-lg',
  '[&_.Toastify__close-button]:!text-brand-purple/50 [&_.Toastify__close-button]:!opacity-100',
  '[&_.Toastify__toast-icon]:!hidden',
  '[&_.Toastify__toast-body]:!m-0 [&_.Toastify__toast-body]:!p-0'
)
