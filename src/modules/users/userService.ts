import Cookies from 'js-cookie'
import { User } from '@/modules/users/User'
import * as userRepository from '@/modules/users/userRepository'
import { LoginForm } from '@/features/login/types/LoginForm'
import { OtpCodeForm } from '@/features/otpVerification/types/OtpCodeForm'
import { RegisterForm } from '@/features/register/types/RegisterForm'
import { UpdateSelfForm } from '@/features/selfEdit/types/UpdateSelfForm'
import { UpdateSelfEmailForm } from '@/features/selfEdit/types/UpdateSelfEmailForm'
import { ResetPasswordForm } from '@/features/resetPassword/types/ResetPasswordForm'
import { UpdateSelfPasswordForm } from '@/features/selfSettingsEdit/types/UpdateSelfPasswordForm'

export const register = async (
    form: RegisterForm,
): Promise<{ message: string; user: User }> => {
    const response = await userRepository.register(form)
    return {
        message: response.data.message,
        user: response.data.data.user,
    }
}

export const login = async (form: LoginForm): Promise<{ message: string }> => {
    const response = await userRepository.login(form)
    const { accessToken } = response.data.data
    Cookies.set('access_token', accessToken, {
        secure: true,
        sameSite: 'strict',
    })
    return {
        message: response.data.message,
    }
}

export const logout = async (): Promise<{ message: string }> => {
    const response = await userRepository.logout()
    Cookies.remove('access_token')
    return {
        message: response.data.message,
    }
}

export const resetPassword = async (form: ResetPasswordForm) => {
    const response = await userRepository.resetPassword(form)
    return {
        message: response.data.message,
    }
}

export const verifySelfEmail = async (
    form: OtpCodeForm,
): Promise<{ message: string }> => {
    const response = await userRepository.verifySelfEmail(form)
    return {
        message: response.data.message,
    }
}

export const showSelf = async () => {
    const response = await userRepository.showSelf()
    return {
        message: response.data.message,
        user: response.data.data.user,
    }
}

export const updateSelf = async (form: UpdateSelfForm) => {
    const response = await userRepository.updateSelf(form)
    return {
        message: response.data.message,
        user: response.data.data.user,
    }
}

export const updateSelfEmail = async (form: UpdateSelfEmailForm) => {
    const response = await userRepository.updateSelfEmail(form)
    return {
        message: response.data.message,
        user: response.data.data.user,
    }
}

export const updateSelfPassword = async (form: UpdateSelfPasswordForm) => {
    const response = await userRepository.updateSelfPassword(form)
    return {
        message: response.data.message,
    }
}
