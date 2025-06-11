import * as activityService from '@/modules/activities/activityService'
import { create } from 'zustand'
import { combine } from 'zustand/middleware'
import { useLoadingsStore } from '@/core/stores/useLoadingsStore'
import { ActivityPagination } from '@/modules/activities/types/ActivitiyPagination'

export const useActivityPaginationStore = create(
    combine(
        {
            pagination: null as ActivityPagination | null,
        },
        (set) => {
            return {
                paginate: async () => {
                    const loadingKey = 'activities.index'
                    useLoadingsStore.getState().startLoading(loadingKey)
                    const { pagination, message } =
                        await activityService.paginate()
                    useLoadingsStore.getState().stopLoading(loadingKey)

                    set({ pagination })

                    return { message }
                },
            }
        },
    ),
)

export type UserPaginationStore = ReturnType<
    typeof useActivityPaginationStore.getState
>
