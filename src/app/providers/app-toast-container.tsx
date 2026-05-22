import { ToastContainer } from 'react-toastify'

import { useAppSelector } from '@/app/store'
import { selectSettings } from '@/entities/settings'

export const AppToastContainer = () => {
  const { colorScheme } = useAppSelector(selectSettings)

  return (
    <ToastContainer
      position={'top-right'}
      theme={colorScheme === 'dark' ? 'dark' : 'light'}
      newestOnTop
      closeOnClick
      pauseOnHover
      draggable
    />
  )
}
