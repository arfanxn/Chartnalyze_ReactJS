import axiosInstance from '@/core/config/axios'
import { AssignUserRoleForm } from '@/features/usersIndex/types/AssignUserRoleForm'
import { ResponseBody, ResponseBodyData } from '@/shared/types/responses'
import { AxiosResponse } from 'axios'
import { RolePagination } from '@/modules/roles/types/RolePagination'

export const paginate = async (
    params?: URLSearchParams,
): Promise<AxiosResponse<ResponseBodyData<RolePagination>>> => {
    params = params ?? new URLSearchParams(window.location.search)

    if (!params.has('sort')) params.set('sort', 'name')

    const response = await axiosInstance.get(`/api/roles`, {
        params,
    })

    return response
}

export const assignToUser = async (
    form: AssignUserRoleForm,
): Promise<AxiosResponse<ResponseBody>> => {
    const response = await axiosInstance.put(
        `/api/users/${form.userId}/roles`,
        form,
    )
    return response
}
