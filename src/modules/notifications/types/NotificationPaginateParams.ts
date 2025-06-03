import { PanginateParams } from '@/shared/types/paginations'

export type NotificationPaginateParams = PanginateParams & {
    filterMessage?: string
}
