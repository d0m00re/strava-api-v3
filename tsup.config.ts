import { defineConfig } from 'tsup';
 
export default defineConfig({
    format: ['esm'],
    entry: ['./src/index.ts'],
    dts: true,
    shims: true,
    skipNodeModulesBundle: true,
    clean: true,
    target: 'esnext', // Ensure the target is set to a modern version of ECMAScript
});