// App.tsx
import '@/assets/styles/index.css'
import { RouterProvider } from 'react-router'
import { Suspense, useEffect } from 'react'
import CToastContainer from '@/components/CToastContainer'
import { router } from '@/router'

const App = () => {
    useEffect(() => {}, [])

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <RouterProvider router={router} />
            <CToastContainer />
        </Suspense>
    )
}

export default App
