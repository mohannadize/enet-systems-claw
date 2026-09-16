import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const serviceSchema = z.object({
  title: z.string(),
  description: z.string(),
  shortDescription: z.string().optional(),
  features: z.array(z.string()).optional(),
  icon: z.string().optional(),
  order: z.number().optional(),
});

const portfolioProjectSchema = z.object({
  name: z.string(),
  url: z.string().optional(),
  desc: z.string(),
  gradient: z.string(),
  category: z.enum(['ecommerce', 'odoo', 'web', 'mobile']),
  order: z.number().optional(),
});

const caseStudySchema = z.object({
  name: z.string(),
  tagline: z.string().optional(),
  desc: z.string(),
  gradient: z.string(),
  services: z.array(z.enum(['ecommerce', 'odoo', 'web', 'mobile'])),
  url: z.string().optional(),
  featured: z.boolean().optional(),
  order: z.number().optional(),
});

const blogPostSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  author: z.string().optional(),
  tags: z.array(z.string()).optional(),
  draft: z.boolean().optional(),
});

const services = defineCollection({
  loader: glob({
    pattern: '**/*.mdx',
    base: './src/content/services',
    generateId: ({ entry }) => {
      // web-development/index.mdx → web-development
      // web-development/performance.mdx → web-development/performance
      return entry.replace(/\/index\.mdx$/, '').replace(/\.mdx$/, '');
    },
  }),
  schema: serviceSchema,
});

const portfolio = defineCollection({
  loader: glob({
    pattern: '**/*.mdx',
    base: './src/content/portfolio',
    generateId: ({ entry }) => entry.replace(/\.mdx$/, ''),
  }),
  schema: portfolioProjectSchema,
});

const caseStudies = defineCollection({
  loader: glob({
    pattern: '**/*.mdx',
    base: './src/content/case-studies',
    generateId: ({ entry }) => entry.replace(/\.mdx$/, ''),
  }),
  schema: caseStudySchema,
});

const blog = defineCollection({
  loader: glob({
    pattern: '**/*.mdx',
    base: './src/content/blog',
    generateId: ({ entry }) => entry.replace(/\.mdx$/, ''),
  }),
  schema: blogPostSchema,
});

export const collections = {
  services,
  portfolio,
  caseStudies,
  blog,
};
