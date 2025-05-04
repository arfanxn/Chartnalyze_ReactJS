import { configureStore } from '@reduxjs/toolkit'
import userReducer from '@/stores/userSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>

export default store
