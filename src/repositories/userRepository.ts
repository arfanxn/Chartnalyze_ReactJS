import axiosInstance from '@/lib/axios'
import { ResponseBody } from '@/types/responseTypes'
import { User } from '@/types/userTypes'
import { AxiosResponse } from 'axios'

export const register = async (form: {
    username: string
    email: string
    password: string
    confirmPassword: string
}): Promise<AxiosResponse<ResponseBody<{ user: User }>>> => {
    const response = await axiosInstance.post(`/api/users/register`, form)
    return response
}

export const login = async (form: {
    identifier: string // username or email
    password: string
}): Promise<AxiosResponse<ResponseBody<{ accessToken: string }>>> => {
    const response = await axiosInstance.post(`/api/users/login`, form)
    return response
}
