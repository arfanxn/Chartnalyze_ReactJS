import { ResponseBodyData } from '@/shared/types/responses'
import { AxiosResponse } from 'axios'
import { ActivityPagination } from '@/modules/activities/types/ActivitiyPagination'
import axiosInstance from '@/core/config/axios'

export const paginate = async (
    params?: URLSearchParams,
): Promise<AxiosResponse<ResponseBodyData<ActivityPagination>>> => {
    params = params ?? new URLSearchParams(window.location.search)

    if (!params.has('sort')) params.set('sort', '-created_at')
    if (!params.has('join')) params.set('join', 'user,subject')

    const response = await axiosInstance.get(`/api/activities`, {
        params,
    })

    return response
}
