import { lazy } from 'react'
import { createBrowserRouter } from 'react-router'
import MiddlewareBoundary from '@/middlewares/MiddlewareBoundary'
import Guest from '@/middlewares/Guest'
import Authenticated from '@/middlewares/Authenticated'
import EmailVerified from '@/middlewares/EmailVerified'
// import EmailNotVerified from '@/middlewares/EmailNotVerified'

// Lazy-loaded components
const Landing = lazy(() => import('@/pages/Landing'))
const OtpVerification = lazy(() => import('@/pages/otps/OtpVerification'))
const Register = lazy(() => import('@/pages/users/Register'))
const Login = lazy(() => import('@/pages/users/Login'))
const ForgotPassword = lazy(() => import('@/pages/users/ForgotPassword'))
const ResetPassword = lazy(() => import('@/pages/users/ResetPassword'))
const Dashboard = lazy(() => import('@/pages/Dashboard'))
const NotificationsIndex = lazy(
    () => import('@/pages/notifications/NotificationsIndex'),
)
const UsersIndex = lazy(() => import('@/pages/users/UsersIndex'))
const SelfAccountEdit = lazy(() => import('@/pages/users/SelfAccountEdit'))
const SelfSettingsEdit = lazy(() => import('@/pages/users/SelfSettingsEdit'))

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Landing />,
    },
    {
        path: '/otps/verify',
        element: <OtpVerification />,
    },
    {
        path: '/users',
        children: [
            {
                element: <MiddlewareBoundary middlewares={[Guest]} />,
                children: [
                    { path: 'register', element: <Register /> },
                    { path: 'login', element: <Login /> },
                    {
                        path: 'forgot-password',
                        element: <ForgotPassword />,
                    },
                    {
                        path: 'reset-password',
                        element: <ResetPassword />,
                    },
                ],
            },
            {
                element: <MiddlewareBoundary middlewares={[Authenticated]} />,
                children: [
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
