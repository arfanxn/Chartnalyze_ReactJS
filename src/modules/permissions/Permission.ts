import { Role } from '@/modules/roles/Role'

export type Permission = {
    id: string
    name: string
    createdAt: string
    updatedAt: string

    roles: Role[] | null | undefined
}
