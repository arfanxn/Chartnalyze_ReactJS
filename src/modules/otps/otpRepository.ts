import axiosInstance from '@/core/config/axios'
import { ResponseBody } from '@/shared/types/responses'
import { AxiosResponse } from 'axios'

export const send = async (form: {
    email: string
}): Promise<AxiosResponse<ResponseBody>> => {
    const response = await axiosInstance.post(`/api/otps/send`, form)
    return response
}
