import * as permissionRepository from '@/modules/permissions/permissionRepository'

export const paginate = async () => {
    const response = await permissionRepository.paginate()
    return {
        message: response.data.message,
        pagination: response.data.data,
    }
}
