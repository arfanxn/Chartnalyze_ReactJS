import { NotificationPaginateParams } from '@/modules/notifications/types/NotificationPaginateParams'
import { Notification } from '@/modules/notifications/Notification'
import axiosInstance from '@/core/config/axios'
import { ResponseBodyData } from '@/shared/types/responses'
import { AxiosResponse } from 'axios'
import { NotificationPagination } from '@/modules/notifications/types/NotificationPagination'

export const paginate = async (
    params: NotificationPaginateParams,
): Promise<AxiosResponse<ResponseBodyData<NotificationPagination>>> => {
    const response = await axiosInstance.get(`/api/users/self/notifications`, {
        params: {
            join: params.join,
            sort: params.sort ?? '-created_at',
            page: params.page ?? 1,
            per_page: params.perPage ?? 10,
            'filter[message]': params.filterMessage ?? undefined,
        },
    })
    return response
}

export const toggleRead = async (
    notificationId: string,
): Promise<AxiosResponse<ResponseBodyData<{ notification: Notification }>>> => {
    const response = await axiosInstance.get(
        `/api/users/self/notifications/${notificationId}/toggle-read`,
    )
    return response
}
