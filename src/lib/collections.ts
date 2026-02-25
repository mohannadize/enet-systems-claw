import { getCollection } from 'astro:content';
import { portfolioCategories } from '../data/portfolio-categories';

const CATEGORY_ORDER = ['ecommerce', 'companyProfiles', 'odoo'] as const;

export async function getServices(sort = true) {
  const entries = await getCollection('services');
  if (!sort) return entries;
  return entries.sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99));
}

export async function getPortfolioByCategory() {
  const entries = await getCollection('portfolio');
  const byCategory: Record<string, typeof entries> = {
    ecommerce: [],
    companyProfiles: [],
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
    companyProfiles: byCategory.companyProfiles,
    odoo: byCategory.odoo,
  };
}

export async function getAllProjectsForModal() {
  const { ecommerce, companyProfiles, odoo } = await getPortfolioByCategory();
  const mapEntry = (entry: { id: string; data: { name: string; url?: string; desc: string; gradient: string } }, category: string) => ({
    name: entry.data.name,
    url: entry.data.url,
    desc: entry.data.desc,
    gradient: entry.data.gradient,
    category,
  });
  return [
    ...ecommerce.map((e) => mapEntry(e, 'E-commerce')),
    ...companyProfiles.map((e) => mapEntry(e, 'Company Profile')),
    ...odoo.map((e) => mapEntry(e, 'Odoo ERP')),
  ];
}

export function getPortfolioCategories() {
  return portfolioCategories;
}
