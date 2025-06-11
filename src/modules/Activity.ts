import { User } from '@/modules//users/User'

export type Activity<T = unknown> = {
    id: string
    userId: string
    userIpAddress: string
    userAgent: string
    type: string
    description: string
    subjectId: string | null
    subjectType: string | null
    properties: string | null
    createdAt: string
    updatedAt: string | null

    user?: User | null
    subject?: T | null
}
