import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: { core: 'src/core/index.ts' },
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: true,
    clean: true,
    external: ['react', 'react-dom', 'vue', 'svelte'],
    outExtension({ format }) {
      return { js: format === 'esm' ? '.esm.js' : '.cjs.js' }
    },
  },
  {
    entry: { react: 'src/react/index.tsx' },
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: true,
    external: ['react', 'react-dom', 'vue', 'svelte'],
    outExtension({ format }) {
      return { js: format === 'esm' ? '.esm.js' : '.cjs.js' }
    },
  },
  {
    entry: { vue: 'src/vue/index.ts' },
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: true,
    external: ['react', 'react-dom', 'vue', 'svelte'],
    outExtension({ format }) {
      return { js: format === 'esm' ? '.esm.js' : '.cjs.js' }
    },
  },
  {
    entry: { svelte: 'src/svelte/index.ts' },
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: true,
    external: ['react', 'react-dom', 'vue', 'svelte'],
    outExtension({ format }) {
      return { js: format === 'esm' ? '.esm.js' : '.cjs.js' }
    },
  },
])
