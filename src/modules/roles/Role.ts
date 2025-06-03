import { Permission } from '@/modules/permissions/Permission'

export type Role = {
    id: string
    name: string
    createdAt: string
    updatedAt: string

    permissions: Permission[] | null | undefined
}
