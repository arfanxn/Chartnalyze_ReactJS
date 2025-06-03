import { NotificationPaginateParams } from '@/modules/notifications/types/NotificationPaginateParams'
import * as notificationRepository from '@/modules/notifications/notificationRepository'

export const paginate = async (params: NotificationPaginateParams) => {
    const response = await notificationRepository.paginate(params)
    return {
        message: response.data.message,
        pagination: response.data.data,
    }
}

export const toggleRead = async (notificationId: string) => {
    const response = await notificationRepository.toggleRead(notificationId)
    return {
        message: response.data.message,
        notification: response.data.data.notification,
    }
}
