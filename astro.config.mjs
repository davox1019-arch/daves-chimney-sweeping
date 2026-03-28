import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://daveschimneysweeping.com.au',
  output: 'static',
  trailingSlash: 'never',
  integrations: [sitemap()],
});