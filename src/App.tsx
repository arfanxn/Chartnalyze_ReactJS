// App.tsx
import '@/core/assets/styles/index.css'
import { RouterProvider } from 'react-router'
import { Suspense } from 'react'
import CToastContainer from '@/shared/components/CToastContainer'
import { router } from '@/core/router'

const App = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <RouterProvider router={router} />
            <CToastContainer />
        </Suspense>
    )
}

export default App
