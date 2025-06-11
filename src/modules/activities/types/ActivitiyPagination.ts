import { PaginationMeta } from '@/shared/types/paginations'
import { Activity } from '@/modules/Activity'

export type ActivityPagination = PaginationMeta & {
    activities: Activity[]
}
