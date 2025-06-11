import * as activityRepository from '@/modules/activities/activityRepository'

export const paginate = async () => {
    const response = await activityRepository.paginate()
    return {
        message: response.data.message,
        pagination: response.data.data,
    }
}
