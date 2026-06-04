import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'

import { AppToastContainer } from './providers/app-toast-container'
import { router } from './router'
import { store } from './store'

export const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <AppToastContainer />
    </Provider>
  )
}
