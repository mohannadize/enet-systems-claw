// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import node from '@astrojs/node';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://enet.systems',
  base: '/',

  vite: {
    plugins: [tailwindcss()]
  },

  server: {
    host: true,
  },

  adapter: node({
    mode: 'standalone'
  }),

  integrations: [react(), sitemap()]
});