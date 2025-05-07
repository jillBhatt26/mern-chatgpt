import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const NODE_ENV = process.env.VITE_NODE_ENV ?? 'development';
const PORT = process.env.VITE_PORT ?? 3000;
const SERVER_URL = process.env.VITE_SERVER_URL ?? 'http://localhost:5000/api';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: PORT,
        proxy: {
            '/api': SERVER_URL
        }
    },
    build: {
        outDir: 'dist',
        sourcemap: false
    }
});
