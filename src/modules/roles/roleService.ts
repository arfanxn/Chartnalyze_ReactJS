import * as roleRepository from '@/modules/roles/roleRepository'
import { AssignUserRoleForm } from '@/features/usersIndex/types/AssignUserRoleForm'

export const assignToUser = async (form: AssignUserRoleForm) => {
    const response = await roleRepository.assignToUser(form)
    return {
        message: response.data.message,
    }
}
