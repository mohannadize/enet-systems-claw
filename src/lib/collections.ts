import { getCollection } from 'astro:content';
import { portfolioCategories } from '../data/portfolio-categories';

export type ServiceKey = 'ecommerce' | 'odoo' | 'web' | 'mobile';

const serviceLabels: Record<ServiceKey, string> = {
  ecommerce: 'E-commerce',
  odoo: 'Odoo ERP',
  web: 'Web Development',
  mobile: 'Mobile App',
};

export function serviceLabel(key: ServiceKey): string {
  return serviceLabels[key];
}

export const serviceColors: Record<ServiceKey, string> = {
  ecommerce: 'bg-fire/10 text-fire border-fire/30',
  odoo: 'bg-purple-500/10 text-purple-700 border-purple-500/20',
  web: 'bg-blue-500/10 text-blue-700 border-blue-500/20',
  mobile: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20',
};

export async function getBlogPosts(sort = true) {
  const entries = await getCollection('blog', ({ data }) => !data.draft);
  if (!sort) return entries;
  return entries.sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime(),
  );
}

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
  return {
    ecommerce: entries.filter((e) => e.data.category === 'ecommerce').sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99)),
    web: entries.filter((e) => e.data.category === 'web').sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99)),
    mobile: entries.filter((e) => e.data.category === 'mobile').sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99)),
    odoo: entries.filter((e) => e.data.category === 'odoo').sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99)),
  };
}

export { portfolioCategories, type PortfolioCategory } from '../data/portfolio-categories';
