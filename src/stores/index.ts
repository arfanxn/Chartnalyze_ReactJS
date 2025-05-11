import { configureStore } from '@reduxjs/toolkit'
import appReducer from '@/stores/appSlice'
import userReducer from '@/stores/userSlice'

const store = configureStore({
    reducer: {
        app: appReducer,
        user: userReducer,
    },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store
