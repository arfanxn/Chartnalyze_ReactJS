import { PaginationMeta } from '@/shared/types/paginations'
import { Permission } from '@/modules/permissions/Permission'

export type PermissionPagination = PaginationMeta & {
    permissions: Permission[]
}
