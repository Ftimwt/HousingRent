import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';

export default defineConfig({
    plugins: [react(), tsconfigPaths(), svgrPlugin()],
    // /* If proxy is needed
    server: {
        proxy: {
            "/test": "localhost:8000/api"
        },
        host: '0.0.0.0'
    },
    // */
    build: {
        sourcemap: true,
    },
});