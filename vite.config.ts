import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [react(), tailwindcss()],
    define: {
      __APP_VERSION__: JSON.stringify(env.APP_VERSION),
      __PORT__: JSON.stringify(env.PORT),
    },
    server: {
      port: Number(env.PORT) || 5173,
      open: true,
    },
    build: {
      outDir: 'dist',
      rollupOptions: {
        input: {
        // Your frontend entry point
        main: resolve(import.meta.dirname, 'index.html'), 
        // Your backend server entry point
        server: resolve(import.meta.dirname, 'server.ts'), 
      },
      output: {
        // This forces the server file to name itself server.cjs
        entryFileNames: (chunkInfo) => {
          return chunkInfo.name === 'server' ? '[name].cjs' : 'assets/[name]-[hash].js';
        },
      },
    },
  },
}});  
