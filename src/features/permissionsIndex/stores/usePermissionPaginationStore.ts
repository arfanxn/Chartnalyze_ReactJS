import * as permissionService from '@/modules/permissions/permissionService'
import { create } from 'zustand'
import { combine } from 'zustand/middleware'
import { useLoadingsStore } from '@/core/stores/useLoadingsStore'
import { PermissionPagination } from '@/modules/permissions/types/PermissionPagination'

export const usePermissionPaginationStore = create(
    combine(
        {
            pagination: null as PermissionPagination | null,
        },
        (set) => {
            return {
                paginate: async () => {
                    const loadingKey = 'permissions.index'
                    useLoadingsStore.getState().startLoading(loadingKey)
                    const { pagination, message } =
                        await permissionService.paginate()
                    useLoadingsStore.getState().stopLoading(loadingKey)

                    set({ pagination })

                    return { message }
                },
            }
        },
    ),
)

export type PermissionPaginationStore = ReturnType<
    typeof usePermissionPaginationStore.getState
>
