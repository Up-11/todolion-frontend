import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src')
		}
	},
	preview: {
		allowedHosts: ['todolion-frontend-xan2yg-ac4212-185-177-219-168.traefik.me']
	}
})
