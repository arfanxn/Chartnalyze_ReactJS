import { lazy } from 'react'
import { createBrowserRouter } from 'react-router'
import MiddlewareBoundary from '@/middlewares/MiddlewareBoundary'
import Guest from '@/middlewares/Guest'
import Authenticated from '@/middlewares/Authenticated'
import EmailVerified from '@/middlewares/EmailVerified'
import EmailNotVerified from '@/middlewares/EmailNotVerified'

// Lazy-loaded components
const Landing = lazy(() => import('@/pages/Landing'))
const Register = lazy(() => import('@/pages/users/Register'))
const Verify = lazy(() => import('@/pages/users/Verify'))
const Login = lazy(() => import('@/pages/users/Login'))
const Dashboard = lazy(() => import('@/pages/Dashboard'))
const UsersIndex = lazy(() => import('@/pages/UsersIndex'))

export const router = createBrowserRouter([
    { path: '/', element: <Landing /> },
    {
        path: '/users',
        children: [
            {
                element: <MiddlewareBoundary middlewares={[Guest]} />,
                children: [
                    { path: 'register', element: <Register /> },
                    { path: 'login', element: <Login /> },
                ],
            },
            {
                element: <MiddlewareBoundary middlewares={[Authenticated]} />,
                children: [
                    {
                        element: (
                            <MiddlewareBoundary
                                middlewares={[EmailNotVerified]}
                            />
                        ),
                        children: [{ path: 'verify', element: <Verify /> }],
                    },
                    {
                        element: (
                            <MiddlewareBoundary middlewares={[EmailVerified]} />
                        ),
                        children: [
                            { index: true, element: <UsersIndex /> },
                            //
                        ],
                    },
                ],
            },
        ],
    },
    {
        element: (
            <MiddlewareBoundary middlewares={[Authenticated, EmailVerified]} />
        ),
        children: [{ path: 'dashboard', element: <Dashboard /> }],
    },
])
