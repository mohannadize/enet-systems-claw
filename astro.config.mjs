// @ts-check
import { defineConfig } from 'astro/config';
import { business } from './src/data/business.ts';

import tailwindcss from '@tailwindcss/vite';

import node from '@astrojs/node';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: business.publicSiteUrl,
  base: '/',

  i18n: {
    locales: ['en', 'ar'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true,
    },
  },

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      dedupe: ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime'],
    },
  },

  server: {
    host: true,
  },

  adapter: node({
    mode: 'standalone'
  }),

  integrations: [react(), sitemap(), mdx()]
});