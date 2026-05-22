import type { ReactElement } from 'react'
import {
  createMemoryRouter,
  RouterProvider,
  type RouteObject,
  type MemoryRouterProps,
} from 'react-router-dom'

import { render, type RenderOptions } from '@testing-library/react'

type RouterRenderOptions = Omit<RenderOptions, 'wrapper'> & {
  routerProps?: Pick<MemoryRouterProps, 'initialEntries' | 'initialIndex'>
  routes?: RouteObject[]
}

const defaultRoutes: RouteObject[] = [
  { path: '/auth', element: <div>auth page</div> },
  { path: '/onboarding/welcome', element: <div>onboarding page</div> },
]

export function renderWithRouter(ui: ReactElement, options: RouterRenderOptions = {}) {
  const { routerProps, routes = defaultRoutes, ...renderOptions } = options

  const router = createMemoryRouter([{ path: '/', element: ui }, ...routes], {
    initialEntries: routerProps?.initialEntries ?? ['/'],
    initialIndex: routerProps?.initialIndex,
  })

  return render(<RouterProvider router={router} />, renderOptions)
}
