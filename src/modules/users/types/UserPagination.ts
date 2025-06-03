import { PaginationMeta } from '@/shared/types/paginations'
import { User } from '@/modules/users/User'

export type UserPagination = PaginationMeta & {
    users: User[]
}
