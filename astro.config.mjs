import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://daveschimneysweeping.com.au',
  trailingSlash: 'never',
  integrations: [sitemap()],
  adapter: cloudflare(),

  security: {
    // Astro blocks form POSTs whose Origin header doesn't match the site. The
    // only on-demand route here is /api/enquiry, which starts no session and
    // performs no privileged action — it writes a lead — so there is nothing
    // for a cross-site request to abuse. What the check does risk is dropping a
    // real enquiry from anything that strips the header, and a lost lead costs
    // Dave a job. Abuse is handled where it actually bites instead: a honeypot
    // field, five submissions per IP per ten minutes, and duplicate collapsing.
    checkOrigin: false,
  },
});
