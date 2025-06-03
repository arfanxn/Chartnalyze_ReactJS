import * as userService from '@/modules/users/userService'
import { create } from 'zustand'
import { combine } from 'zustand/middleware'
import { useLoadingsStore } from '@/core/stores/useLoadingsStore'
import { UserPagination } from '@/modules/users/types/UserPagination'

export const useUserPaginationStore = create(
    combine(
        {
            pagination: null as UserPagination | null,
        },
        (set) => {
            return {
                paginate: async () => {
                    const loadingKey = 'users.index'
                    useLoadingsStore.getState().startLoading(loadingKey)
                    const { pagination, message } = await userService.paginate()
                    useLoadingsStore.getState().stopLoading(loadingKey)

                    set({ pagination })

                    return { message }
                },
            }
        },
    ),
)

export type UserPaginationStore = ReturnType<
    typeof useUserPaginationStore.getState
>
