import Cookies from 'js-cookie'
import { User } from '@/types/userTypes'
import * as userRepository from '@/repositories/userRepository'

export const register = async (form: {
    username: string
    email: string
    password: string
    confirmPassword: string
}): Promise<{ message: string; user: User }> => {
    const response = await userRepository.register(form)
    return {
        message: response.data.message,
        user: response.data.data.user,
    }
}

export const login = async (form: {
    identifier: string // username or email
    password: string
}): Promise<{ message: string }> => {
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

export const verify = async (form: {
    code: string
}): Promise<{ message: string }> => {
    const response = await userRepository.verify(form)
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
