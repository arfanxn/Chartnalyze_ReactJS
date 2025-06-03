import * as roleService from '@/modules/roles/roleService'
import { create } from 'zustand'
import { combine } from 'zustand/middleware'
import { useLoadingsStore } from '@/core/stores/useLoadingsStore'
import { RolePagination } from '@/modules/roles/types/RolePagination'

export const useRolePaginationStore = create(
    combine(
        {
            pagination: null as RolePagination | null,
        },
        (set) => {
            return {
                paginate: async () => {
                    const loadingKey = 'roles.index'
                    useLoadingsStore.getState().startLoading(loadingKey)
                    const { pagination, message } = await roleService.paginate()
                    useLoadingsStore.getState().stopLoading(loadingKey)

                    set({ pagination })

                    return { message }
                },
            }
        },
    ),
)

export type RolePaginationStore = ReturnType<
    typeof useRolePaginationStore.getState
>
