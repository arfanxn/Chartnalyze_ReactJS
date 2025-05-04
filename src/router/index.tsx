import Middleware from '@/middlewares/Middleware'
import Authenticate from '@/middlewares/Authenticate'
import { lazy } from 'react'
import { createBrowserRouter } from 'react-router'

// Lazy-loaded components
const Landing = lazy(() => import('@/pages/Landing'))
const Register = lazy(() => import('@/pages/users/Register'))
const Verify = lazy(() => import('@/pages/users/Verify'))
const Login = lazy(() => import('@/pages/users/Login'))
const Dashboard = lazy(() => import('@/pages/Dashboard'))

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Landing />,
    },
    {
        path: '/register',
        element: <Register />,
    },
    {
        path: '/verify',
        element: <Verify />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '',
        element: <Middleware middlewares={[Authenticate]} />,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />,
            },
        ],
    },
])
