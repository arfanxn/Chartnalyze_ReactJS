import { PaginationMeta } from '@/shared/types/paginations'
import { Notification } from '@/modules/notifications/Notification'

export type NotificationPagination = PaginationMeta & {
    notifications: Notification[]
}
