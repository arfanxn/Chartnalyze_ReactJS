import { Country } from '@/modules/country/Country'
import { Role } from '@/modules/roles/Role'

export type User = {
    id: string
    name?: string
    birthDate?: string
    username: string
    email: string
    emailVerifiedAt: string | null
    createdAt: string
    updatedAt: string | null

    avatarUrl: string | null
    role: Role | null
    country: Country | null
}
