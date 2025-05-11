import { createSlice } from '@reduxjs/toolkit'

type State = object

const initialState: State = {}

const reducers = {}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers,
})

// export const {} = appSlice.actions
export default appSlice.reducer
