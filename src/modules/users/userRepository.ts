import axiosInstance from '@/core/config/axios'
import { AxiosResponse } from 'axios'
import { ResponseBody, ResponseBodyData } from '@/shared/types/responses'
import { User } from '@/modules/users/User'
import { LoginForm } from '@/features/login/types/LoginForm'
import { OtpCodeForm } from '@/features/otpVerification/types/OtpCodeForm'
import { RegisterForm } from '@/features/register/types/RegisterForm'
import { ResetPasswordForm } from '@/features/resetPassword/types/ResetPasswordForm'
import { UpdateSelfForm } from '@/features/selfEdit/types/UpdateSelfForm'
import { UpdateSelfEmailForm } from '@/features/selfEdit/types/UpdateSelfEmailForm'
import { UpdateSelfPasswordForm } from '@/features/selfSettingsEdit/types/UpdateSelfPasswordForm'

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

export const resetPassword = async (
    form: ResetPasswordForm,
): Promise<AxiosResponse<ResponseBody>> => {
    const response = await axiosInstance.patch(
        `/api/users/reset-password`,
        form,
    )
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
    const response = await axiosInstance.patch(`/api/users/self/password`, form)
    return response
}
