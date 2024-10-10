import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import routes from './routes.tsx'
import { Auth0Provider } from '@auth0/auth0-react'
import { UserProvider } from './components/SignedInUser.tsx'

const router = createBrowserRouter(routes)
const queryClient = new QueryClient()

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <QueryClientProvider client={queryClient}>
      <Auth0Provider
        domain="karaka-2024-andrewk.au.auth0.com"
        clientId="vyIjkSXYCl5aHOKpNQSkA8MuC9wCd4PV"
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: 'https://toolr/api',
        }}
      >
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
        <ReactQueryDevtools />
      </Auth0Provider>
    </QueryClientProvider>,
  )
})
