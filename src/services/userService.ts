import Cookies from 'js-cookie'
import { User } from '@/types/userTypes'
import * as userRepository from '@/repositories/userRepository'
import {
    LoginForm,
    OtpCodeForm,
    RegisterForm,
    UpdateSelfEmailForm,
    UpdateSelfForm,
    UpdateSelfPasswordForm,
} from '@/types/formTypes'

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
