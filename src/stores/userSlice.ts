import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '@/types/userTypes'

type State = {
    self: User | null
    users: User[] | null
    selectedUser: User | null
}

const initialState: State = {
    self: null,
    users: null,
    selectedUser: null,
}

const reducers = {
    setSelf: (state: State, action: PayloadAction<User>) => {
        state.self = action.payload
    },
    setUsers: (state: State, action: PayloadAction<User[]>) => {
        state.users = action.payload
    },
    setSelectedUser: (state: State, action: PayloadAction<User>) => {
        state.selectedUser = action.payload
    },
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers,
})

export const { setSelf } = userSlice.actions
export default userSlice.reducer
