import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://daveschimneysweeping.com.au',
  integrations: [sitemap()]
});