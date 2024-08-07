import { defineConfig } from 'tsup';
 
export default defineConfig({
    format: [ "cjs", "esm"],
    entry: ['./src/index.ts'],
    dts: true,
    shims: true,
    sourcemap : true,
    skipNodeModulesBundle: true,
    clean: true,
    target: 'esnext', // Ensure the target is set to a modern version of ECMAScript
});