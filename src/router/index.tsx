import CSuspense from '@/components/CSuspense'
import { lazy } from 'react'
import { createBrowserRouter } from 'react-router'

// Lazy-loaded components
const Landing = lazy(() => import('@/pages/Landing'))
const Register = lazy(() => import('@/pages/users/Register'))
const Verify = lazy(() => import('@/pages/users/Verify'))

export const router = createBrowserRouter([
    {
        path: '/',
        element: <CSuspense children={<Landing />} />,
    },
    {
        path: '/register',
        element: <CSuspense children={<Register />} />,
    },
    {
        path: '/verify',
        element: <CSuspense children={<Verify />} />,
    },
])
