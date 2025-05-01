import CSuspense from '@/components/CSuspense'
import { lazy } from 'react'
import { createBrowserRouter } from 'react-router'

// Lazy-loaded components
const Landing = lazy(() => import('@/pages/Landing'))
const Register = lazy(() => import('@/pages/Register'))

export const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <CSuspense>
                <Landing />
            </CSuspense>
        ),
    },
    {
        path: '/register',
        element: (
            <CSuspense>
                <Register />
            </CSuspense>
        ),
    },
])
