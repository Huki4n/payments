import { toast as toastify } from 'react-toastify'

import { currencyRequiredToastClassName } from '../ui/currency-required-toast-class-name'
import { CurrencyRequiredToastContent } from '../ui/currency-required-toast-content'

let toastShown = false

export function showCurrencyRequiredToast(
  title: string,
  description: string,
  actionLabel: string,
  onNavigate: () => void
) {
  if (toastShown) {
    return
  }

  toastShown = true

  toastify(
    ({ closeToast }) => (
      <CurrencyRequiredToastContent
        title={title}
        description={description}
        actionLabel={actionLabel}
        closeToast={closeToast}
        onAction={onNavigate}
      />
    ),
    {
      autoClose: false,
      closeOnClick: false,
      draggable: false,
      icon: false,
      hideProgressBar: true,
      className: currencyRequiredToastClassName,
    }
  )
}

export function resetCurrencyRequiredToastForTests() {
  toastShown = false
}
