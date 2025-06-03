import axiosInstance from '@/core/config/axios'
import { ResponseBodyData } from '@/shared/types/responses'
import { AxiosResponse } from 'axios'
import { PermissionPagination } from '@/modules/permissions/types/PermissionPagination'

export const paginate = async (
    params?: URLSearchParams,
): Promise<AxiosResponse<ResponseBodyData<PermissionPagination>>> => {
    params = params ?? new URLSearchParams(window.location.search)

    if (!params.has('sort')) params.set('sort', 'name')
    if (!params.has('join')) params.set('join', 'roles')

    const response = await axiosInstance.get(`/api/permissions`, {
        params,
    })

    return response
}
