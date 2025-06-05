import { AxiosResponse } from 'axios'

import axiosInstance from '@/core/config/axios'
import { LoginForm } from '@/features/login/types/LoginForm'
import { OtpCodeForm } from '@/features/otpVerification/types/OtpCodeForm'
import { RegisterForm } from '@/features/register/types/RegisterForm'
import { ResetPasswordForm } from '@/features/resetPassword/types/ResetPasswordForm'
import { UpdateSelfEmailForm } from '@/features/selfEdit/types/UpdateSelfEmailForm'
import { UpdateSelfForm } from '@/features/selfEdit/types/UpdateSelfForm'
import { UpdateSelfPasswordForm } from '@/features/selfSettingsEdit/types/UpdateSelfPasswordForm'
import { User } from '@/modules/users/User'
import { UserPagination } from '@/modules/users/types/UserPagination'
import { ResponseBody, ResponseBodyData } from '@/shared/types/responses'

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

export const loginGoogleAuthorized = async (
    params: URLSearchParams,
): Promise<AxiosResponse<ResponseBodyData<{ accessToken: string }>>> => {
    const response = await axiosInstance.post(
        `/api/users/login/google/authorized`,
        {},
        {
            params,
        },
    )
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

export const paginate = async (
    params?: URLSearchParams,
): Promise<AxiosResponse<ResponseBodyData<UserPagination>>> => {
    params = params ?? new URLSearchParams(window.location.search)

    if (!params.has('sort')) params.set('sort', '-created_at')
    if (!params.has('join')) params.set('join', 'role,country')

    const response = await axiosInstance.get(`/api/users`, {
        params,
    })

    return response
}
