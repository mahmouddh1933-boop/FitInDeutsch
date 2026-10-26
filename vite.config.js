import {defineConfig} from 'vite';
// One inline chunk keeps the downloadable HTML usable directly from disk.
export default defineConfig({build:{rollupOptions:{output:{inlineDynamicImports:true}},chunkSizeWarningLimit:2250}});
