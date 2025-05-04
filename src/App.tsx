// App.tsx
import { RouterProvider } from 'react-router'
import '@/assets/styles/main.css'
import { router } from '@/router'
import CToastContainer from '@/components/CToastContainer'

const App = () => {
    return (
        <>
            <RouterProvider router={router} />
            <CToastContainer />
        </>
    )
}

export default App
