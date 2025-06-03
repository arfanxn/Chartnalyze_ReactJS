import * as notificationService from '@/modules/notifications/notificationService'
import { create } from 'zustand'
import { combine } from 'zustand/middleware'
import { useLoadingsStore } from '@/core/stores/useLoadingsStore'
import { NotificationPaginateParams } from '@/modules/notifications/types/NotificationPaginateParams'
import { NotificationPagination } from '@/modules/notifications/types/NotificationPagination'

export const useNotificationPaginationStore = create(
    combine(
        {
            pagination: null as NotificationPagination | null,
        },
        (set) => {
            return {
                paginate: async (params: NotificationPaginateParams) => {
                    const loadingKey = 'notifications.index'
                    useLoadingsStore.getState().startLoading(loadingKey)
                    const { pagination, message } =
                        await notificationService.paginate(params)
                    useLoadingsStore.getState().stopLoading(loadingKey)

                    set({ pagination })

                    return { message }
                },

                toggleRead: async (notificationId: string) => {
                    const loadingKey = 'notifications.toggleRead'
                    useLoadingsStore.getState().startLoading(loadingKey)

                    const { message, notification } =
                        await notificationService.toggleRead(notificationId)

                    set((state) => {
                        if (!state.pagination) return {}

                        const notifications =
                            state.pagination.notifications.map((n) =>
                                n.id === notification.id ? notification : n,
                            )

                        return {
                            pagination: { ...state.pagination, notifications },
                        }
                    })

                    useLoadingsStore.getState().stopLoading(loadingKey)
                    return { message }
                },
            }
        },
    ),
)

export type SelfStore = ReturnType<
    typeof useNotificationPaginationStore.getState
>
