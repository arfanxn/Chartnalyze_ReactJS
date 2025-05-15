import axiosInstance from '@/lib/axios'
import { AxiosResponse } from 'axios'
import { ResponseBody, ResponseBodyData } from '@/types/responseTypes'
import { User } from '@/types/userTypes'
import {
    LoginForm,
    OtpCodeForm,
    RegisterForm,
    UpdateSelfEmailForm,
    UpdateSelfForm,
    UpdateSelfPasswordForm,
} from '@/types/formTypes'

// TODO: Save user data into local storage or other solution is to fetch user data from backend on every page reload

export const register = async (
    form: RegisterForm,
): Promise<AxiosResponse<ResponseBodyData<{ user: User }>>> => {
    const response = await axiosInstance.post(`/api/users/register`, form)
    return response
}

export const login = async (
    form: LoginForm,
): Promise<AxiosResponse<ResponseBodyData<{ accessToken: string }>>> => {
    const response = await axiosInstance.post(`/api/users/login`, form)
    return response
}

export const logout = async (): Promise<AxiosResponse<ResponseBody>> => {
    const response = await axiosInstance.delete(`/api/users/self/logout`)
    return response
}

export const verifySelfEmail = async (
    form: OtpCodeForm,
): Promise<AxiosResponse<ResponseBody>> => {
    const response = await axiosInstance.post(
        `/api/users/self/email/verify`,
        form,
    )
    return response
}

export const showSelf = async (): Promise<
    AxiosResponse<ResponseBodyData<{ user: User }>>
> => {
    const response = await axiosInstance.get(`/api/users/self`)
    return response
}

export const updateSelf = async (
    form: UpdateSelfForm,
): Promise<AxiosResponse<ResponseBodyData<{ user: User }>>> => {
    const response = await axiosInstance.put(`/api/users/self`, form)
    return response
}

export const updateSelfEmail = async (
    form: UpdateSelfEmailForm,
): Promise<AxiosResponse<ResponseBodyData<{ user: User }>>> => {
    const response = await axiosInstance.patch(`/api/users/self/email`, form)
    return response
}

export const updateSelfPassword = async (
    form: UpdateSelfPasswordForm,
): Promise<AxiosResponse<ResponseBody>> => {
    const response = await axiosInstance.put(`/api/users/self/email`, form)
    return response
}
