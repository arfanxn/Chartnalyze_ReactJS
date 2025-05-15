import { create } from 'zustand'
import { combine } from 'zustand/middleware'

type LoadingKeys = 'self' // there could be more

export const useLoadingsStore = create(
    combine({ loadings: {} as Record<string, boolean> }, (set, get) => {
        return {
            setLoading: async (key: LoadingKeys, value: boolean) => {
                set((state) => ({
                    loadings: {
                        ...state.loadings,
                        [key]: value,
                    },
                }))
            },
            startLoading: (key: LoadingKeys) => {
                set((state) => ({
                    loadings: {
                        ...state.loadings,
                        [key]: true,
                    },
                }))
            },
            stopLoading: (key: LoadingKeys) => {
                set((state) => ({
                    loadings: {
                        ...state.loadings,
                        [key]: false,
                    },
                }))
            },
            isLoading: (key: LoadingKeys) => {
                return get().loadings[key]
            },
        }
    }),
)
