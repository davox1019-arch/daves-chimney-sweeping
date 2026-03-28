import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://daveschimneysweeping.com.au',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  adapter: cloudflare()
});