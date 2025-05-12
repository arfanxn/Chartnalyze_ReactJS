import { User } from '@/types/userTypes'
import { create } from 'zustand'

type UsersStore = {
    users: User[]
    selectedUser: User | null
}

export const useUsersStore = create<UsersStore>(() => ({
    users: [],
    selectedUser: null,
}))
