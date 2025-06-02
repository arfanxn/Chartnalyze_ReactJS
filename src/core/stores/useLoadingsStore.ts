import { create } from 'zustand'
import { combine } from 'zustand/middleware'
import { LoadingKeys } from '@/core/types/loadingKeys'

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
            /**
             * Call a function and manage the loading state of the given key.
             *
             * This function will set the `loadings[key]` to `true` at the beginning,
             * call the given function `fn` and wait for its result. If the result is a promise,
             * wait for its resolution. After the call, set `loadings[key]` to `false`.
             *
             * If the function throws an error, the error will be re-thrown after stopping
             * the loading.
             *
             * @param key The key of the loading state to manage.
             * @param fn The function to call.
             * @returns The result of the function.
             */
            withLoading: async <T>(
                key: LoadingKeys,
                fn: () => Promise<T> | T,
            ): Promise<T> => {
                const stopLoading = () =>
                    set((state) => ({
                        loadings: {
                            ...state.loadings,
                            [key]: false,
                        },
                    }))

                try {
                    set((state) => ({
                        loadings: {
                            ...state.loadings,
                            [key]: true,
                        },
                    }))

                    let result = fn()
                    if (result instanceof Promise) result = await result
                    stopLoading()
                    return result
                } finally {
                    stopLoading()
                }
            },
            isLoading: (key: LoadingKeys) => {
                return get().loadings[key]
            },
        }
    }),
)
