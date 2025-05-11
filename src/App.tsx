// App.tsx
import '@/assets/styles/index.css'
import { useEffectMounted } from './hooks/useEffectMounted'
import { RouterProvider } from 'react-router'
import { setSelf } from './stores/userSlice'
import { showSelf } from '@/services/userService'
import { Suspense, useCallback } from 'react'
import CToastContainer from '@/components/CToastContainer'
import { router } from '@/router'
import { useAppDispatch } from './hooks/useAppDispatch'

const App = () => {
    const dispatch = useAppDispatch()

    const loadSelf = useCallback(async () => {
        try {
            const { user } = await showSelf()
            dispatch(setSelf(user))
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            //
        }
    }, [dispatch])

    useEffectMounted(() => {
        loadSelf()
    })

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <RouterProvider router={router} />
            <CToastContainer />
        </Suspense>
    )
}

export default App
