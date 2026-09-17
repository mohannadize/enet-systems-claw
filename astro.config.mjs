// @ts-check
import { defineConfig } from 'astro/config';
import { business } from './src/data/business.ts';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: business.publicSiteUrl,
  base: '/',
  output: 'static',

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      dedupe: ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime'],
    },
  },

  server: {
    host: true,
  },

  integrations: [react(), sitemap(), mdx()]
});