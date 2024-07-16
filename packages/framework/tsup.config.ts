import { defineConfig } from 'tsup';
import { type SupportedFrameworkName } from './src';

const frameworks: SupportedFrameworkName[] = ['h3', 'express', 'next', 'nuxt', 'sveltekit', 'remix', 'lambda'];

export default defineConfig({
  entry: ['src/index.ts', ...frameworks.map((framework) => `src/servers/${framework}.ts`)],
  sourcemap: false,
  clean: true,
  treeshake: true,
  dts: true,
  format: ['cjs'],
  minify: true,
  minifyWhitespace: true,
  minifyIdentifiers: true,
  minifySyntax: true,
});
