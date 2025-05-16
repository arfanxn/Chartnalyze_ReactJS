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
const SelfEmailVerify = lazy(() => import('@/pages/users/SelfEmailVerify'))
const Login = lazy(() => import('@/pages/users/Login'))
const Dashboard = lazy(() => import('@/pages/Dashboard'))
const NotificationsIndex = lazy(
    () => import('@/pages/notifications/NotificationsIndex'),
)
const UsersIndex = lazy(() => import('@/pages/users/UsersIndex'))
const SelfAccountEdit = lazy(() => import('@/pages/users/SelfAccountEdit'))
const SelfEmailEdit = lazy(() => import('@/pages/users/SelfEmailEdit'))
const SelfSettingsEdit = lazy(() => import('@/pages/users/SelfSettingsEdit'))

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
                        children: [
                            {
                                path: 'self/email/verify',
                                element: <SelfEmailVerify />,
                            },
                        ],
                    },
                    {
                        element: (
                            <MiddlewareBoundary middlewares={[EmailVerified]} />
                        ),
                        children: [
                            { index: true, element: <UsersIndex /> },
                            {
                                path: 'self',
                                children: [
                                    {
                                        path: 'account/edit',
                                        element: <SelfAccountEdit />,
                                    },
                                    {
                                        path: 'email/edit',
                                        element: <SelfEmailEdit />,
                                    },
                                    {
                                        path: 'settings/edit',
                                        element: <SelfSettingsEdit />,
                                    },
                                ],
                            },
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
        children: [
            { path: '/dashboard', element: <Dashboard /> },
            {
                path: '/notifications',
                children: [
                    { index: true, element: <NotificationsIndex /> },
                    //
                ],
            },
        ],
    },
])
