import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'url'
import UnpluginIcons from 'unplugin-icons/vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss(), UnpluginIcons({ compiler: 'jsx' })],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
})
