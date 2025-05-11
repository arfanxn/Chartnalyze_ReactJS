// index.tsx
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
// import { StrictMode } from 'react'
import App from '@/App'
import store from '@/stores'

createRoot(document.getElementById('root')!).render(
    // <StrictMode>
    <Provider store={store}>
        <App></App>
    </Provider>,
    // </StrictMode>,
)
