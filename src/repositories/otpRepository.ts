import axiosInstance from '@/lib/axios'
import { ResponseBody } from '@/types/responseTypes'
import { AxiosResponse } from 'axios'

export const send = async (form: {
    email: string
}): Promise<AxiosResponse<ResponseBody>> => {
    const response = await axiosInstance.post(`/api/otps/send`, form)
    return response
}
