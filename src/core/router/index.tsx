import { lazy } from 'react'
import { createBrowserRouter } from 'react-router'
import MiddlewareBoundary from '@/core/middlewares/MiddlewareBoundary'
import Guest from '@/core/middlewares/Guest'
import Authenticated from '@/core/middlewares/Authenticated'
import EmailVerified from '@/core/middlewares/EmailVerified'
// import EmailNotVerified from '@/middlewares/EmailNotVerified'

// Lazy-loaded components
const Landing = lazy(() => import('@/features/landing/Landing'))
const OtpVerification = lazy(
    () => import('@/features/otpVerification/OtpVerification'),
)
const Register = lazy(() => import('@/features/register/Register'))
const Login = lazy(() => import('@/features/login/Login'))
const ForgotPassword = lazy(
    () => import('@/features/forgotPassword/ForgotPassword'),
)
const ResetPassword = lazy(
    () => import('@/features/resetPassword/ResetPassword'),
)
const Dashboard = lazy(() => import('@/features/dashboard/Dashboard'))
const NotificationsIndex = lazy(
    () => import('@/features/notificationsIndex/NotificationsIndex'),
)
const UsersIndex = lazy(() => import('@/features/usersIndex/UsersIndex'))
const SelfAccountEdit = lazy(
    () => import('@/features/selfEdit/SelfAccountEdit'),
)
const SelfSettingsEdit = lazy(
    () => import('@/features/selfSettingsEdit/SelfSettingsEdit'),
)

const RolesIndex = lazy(() => import('@/features/rolesIndex/RolesIndex'))
const PermissionsIndex = lazy(
    () => import('@/features/permissionsIndex/PermissionsIndex'),
)
const ActivitiesIndex = lazy(
    () => import('@/features/activitiesIndex/ActivitiesIndex'),
)

const NotFound = lazy(() => import('@/features/notFound/NotFound'))

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
        path: '/roles',
        element: (
            <MiddlewareBoundary middlewares={[Authenticated, EmailVerified]} />
        ),
        children: [
            {
                index: true,
                element: <RolesIndex />,
            },
        ],
    },
    {
        path: '/permissions',
        element: (
            <MiddlewareBoundary middlewares={[Authenticated, EmailVerified]} />
        ),
        children: [
            {
                index: true,
                element: <PermissionsIndex />,
            },
        ],
    },
    {
        path: '/activities',
        element: (
            <MiddlewareBoundary middlewares={[Authenticated, EmailVerified]} />
        ),
        children: [
            {
                index: true,
                element: <ActivitiesIndex />,
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
    {
        path: '*',
        element: <NotFound />,
    },
])
