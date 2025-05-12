import { User } from '@/types/userTypes'
import { create } from 'zustand'
import * as userService from '@/services/userService'

type SelfStore = {
    self: User | null
    setSelf: (user: User | null) => void
}

/**
 * useSelfStore is a Zustand store that manages the state of the current user.
 * It provides the `self` state and a method `setSelf` to update the user.
 */
export const useSelfStore = create<SelfStore>((set) => {
    userService
        .showSelf()
        .then(({ user }) => set({ self: user }))
        .catch(() => set({ self: null }))

    return {
        self: null,
        setSelf: (user: User | null) => set({ self: user }),
    }
})
