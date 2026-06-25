import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://azizantravel.com',
  publicDir: 'public',
  srcDir: 'src',
  outDir: 'dist',
  build: {
    format: 'directory',
  },
  server: {
    port: 4321,
  },
});
