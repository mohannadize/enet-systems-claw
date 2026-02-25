import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const serviceSchema = z.object({
  title: z.string(),
  description: z.string(),
  shortDescription: z.string().optional(),
  features: z.array(z.string()),
  icon: z.string(),
  order: z.number().optional(),
});

const portfolioProjectSchema = z.object({
  name: z.string(),
  url: z.string().optional(),
  desc: z.string(),
  gradient: z.string(),
  category: z.enum(['ecommerce', 'companyProfiles', 'odoo']),
  order: z.number().optional(),
});

const services = defineCollection({
  loader: glob({
    pattern: '**/*.json',
    base: './src/content/services',
    generateId: ({ entry }) => entry.replace(/\.json$/, ''),
  }),
  schema: serviceSchema,
});

const portfolio = defineCollection({
  loader: glob({
    pattern: '**/*.json',
    base: './src/content/portfolio',
    generateId: ({ entry }) => entry.replace(/\.json$/, ''),
  }),
  schema: portfolioProjectSchema,
});

export const collections = {
  services,
  portfolio,
};
