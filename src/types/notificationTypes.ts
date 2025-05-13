import { User } from '@/types/userTypes'

export type Notification<T = string | null> = {
    id: string // Unique identifier for the notification
    notifiedId: string // The ID of the user or entity that was notified
    notifiedType: number // The type of the entity that received the notification (e.g., 'User', etc.)
    notifierId: string | null // The ID of the user or entity that triggered the notification (could be null if not applicable)
    notifierType: number // The type of the entity that triggered the notification (e.g., 'User', 'System', etc.)
    type: number // Type or category of the notification (e.g., 1 for message, 2 for alert, etc.)
    title: string // The title or subject of the notification (e.g., "New Message Received")
    message: string // The message or content of the notification (e.g., "You have a new message from John.")
    data: T // Additional data attached to the notification (could be in JSON format, could be null)
    readAt: string | null // Timestamp when the notification was read (null if not read yet)
    createdAt: string // Timestamp when the notification was created
    updatedAt: string | null // Timestamp when the notification was last updated

    notifier: User | null
}
