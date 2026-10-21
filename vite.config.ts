import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { defineConfig } from 'vite';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(() => ({
plugins: [react(), tailwindcss()],

resolve: {
alias: {
'@': rootDir,
},
},

server: {
// Preserve the existing AI Studio HMR behavior.
hmr: process.env.DISABLE_HMR !== 'true',

// Disable file watching when DISABLE_HMR is enabled.
watch:
  process.env.DISABLE_HMR === 'true'
    ? null
    : {},


},
}));
