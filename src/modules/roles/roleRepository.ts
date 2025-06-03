import axiosInstance from '@/core/config/axios'
import { AssignUserRoleForm } from '@/features/usersIndex/types/AssignUserRoleForm'
import { ResponseBody } from '@/shared/types/responses'
import { AxiosResponse } from 'axios'

export const assignToUser = async (
    form: AssignUserRoleForm,
): Promise<AxiosResponse<ResponseBody>> => {
    const response = await axiosInstance.put(
        `/api/users/${form.userId}/roles`,
        form,
    )
    return response
}
