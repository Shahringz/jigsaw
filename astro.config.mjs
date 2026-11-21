import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://shahringz.github.io',
  base: '/jigsaw',
  integrations: [react()],
});
