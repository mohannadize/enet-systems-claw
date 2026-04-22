import { getCollection } from 'astro:content';
import { portfolioCategories } from '../data/portfolio-categories';

export const serviceLabels: Record<string, string> = {
  ecommerce: 'E-commerce',
  odoo: 'Odoo ERP',
  web: 'Web Development',
  mobile: 'Mobile App',
};

export const serviceColors: Record<string, string> = {
  ecommerce: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  odoo: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  web: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  mobile: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
};

export async function getCaseStudies(sort = true) {
  const entries = await getCollection('caseStudies');
  if (!sort) return entries;
  return entries.sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99));
}

export async function getFeaturedCaseStudies() {
  const entries = await getCaseStudies();
  return entries.filter((e) => e.data.featured);
}

export async function getBlogPosts(sort = true) {
  const entries = await getCollection('blog', ({ data }) => !data.draft);
  if (!sort) return entries;
  return entries.sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime(),
  );
}

const CATEGORY_ORDER = ['ecommerce', 'web', 'odoo', 'mobile'] as const;

export async function getServices(sort = true) {
  const entries = await getCollection('services');
  // Hub entries only — no slash in id means top-level index.mdx
  const hubs = entries.filter((e) => !e.id.includes('/'));
  if (!sort) return hubs;
  return hubs.sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99));
}

export async function getServiceSubpages(serviceRoot: string) {
  const entries = await getCollection('services');
  return entries
    .filter((e) => e.id.startsWith(serviceRoot + '/'))
    .sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99));
}

export async function getPortfolioByCategory() {
  const entries = await getCollection('portfolio');
  const byCategory: Record<string, typeof entries> = {
    ecommerce: [],
    web: [],
    mobile: [],
    odoo: [],
  };
  for (const entry of entries) {
    const cat = entry.data.category;
    if (byCategory[cat]) byCategory[cat].push(entry);
  }
  for (const cat of CATEGORY_ORDER) {
    byCategory[cat].sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99));
  }
  return {
    ecommerce: byCategory.ecommerce,
    web: byCategory.web,
    mobile: byCategory.mobile,
    odoo: byCategory.odoo,
  };
}

export function getPortfolioCategories() {
  return portfolioCategories;
}
