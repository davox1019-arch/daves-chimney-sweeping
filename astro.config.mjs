import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://daveschimneysweeping.com.au',
  trailingSlash: 'never',
  integrations: [sitemap()],
  adapter: cloudflare()
});