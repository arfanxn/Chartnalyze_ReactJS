import axiosInstance from '@/lib/axios'
import { AxiosResponse } from 'axios'
import { ResponseBody, ResponseBodyData } from '@/types/responseTypes'
import { User } from '@/types/userTypes'

// TODO: Save user data into local storage or other solution is to fetch user data from backend on every page reload

export const register = async (form: {
    username: string
    email: string
    password: string
    confirmPassword: string
}): Promise<AxiosResponse<ResponseBodyData<{ user: User }>>> => {
    const response = await axiosInstance.post(`/api/users/register`, form)
    return response
}

export const login = async (form: {
    identifier: string // username or email
    password: string
}): Promise<AxiosResponse<ResponseBodyData<{ accessToken: string }>>> => {
    const response = await axiosInstance.post(`/api/users/login`, form)
    return response
}

export const logout = async (): Promise<AxiosResponse<ResponseBody>> => {
    const response = await axiosInstance.delete(`/api/users/logout`)
    return response
}

export const verify = async (form: {
    code: string
}): Promise<AxiosResponse<ResponseBody>> => {
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
