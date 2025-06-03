import { PaginationMeta } from '@/shared/types/paginations'
import { Role } from '@/modules/roles/Role'

export type RolePagination = PaginationMeta & {
    roles: Role[]
}
