import { User } from '@/modules/users/User'
import { create } from 'zustand'

type UsersStore = {
    users: User[]
    selectedUser: User | null
}

export const useUsersStore = create<UsersStore>(() => ({
    users: [],
    selectedUser: null,
}))
