import { getCollection } from 'astro:content';
import { portfolioCategories, type PortfolioCategoryBase } from '../data/portfolio-categories';
import { t, type Locale, type UiKey } from '../i18n/i18n';

type EntryWithLocale = { id: string; filePath?: string };

/** Derive the locale of a content entry from its filePath (src/content/<col>/<locale>/...). */
export function entryLocale(entry: EntryWithLocale): Locale {
  const path = entry.filePath ?? '';
  const seg = path.match(/\/content\/[^/]+\/([^/]+)\//);
  return seg && (seg[1] === 'ar' || seg[1] === 'en') ? (seg[1] as Locale) : 'en';
}

/** Strip the leading locale segment from an id (en/web-development → web-development). */
export function entrySlug(id: string): string {
  return id.replace(/^(en|ar)\//, '');
}

/** Return an entry copy whose id is the locale-agnostic slug. */
function slugEntry<T extends { id: string }>(entry: T): T {
  return entry.id.startsWith('en/') || entry.id.startsWith('ar/')
    ? { ...entry, id: entrySlug(entry.id) }
    : entry;
}

export type ServiceKey = 'ecommerce' | 'odoo' | 'web' | 'mobile';

/** Localized label for a service/category key. */
export function serviceLabel(key: ServiceKey, locale: Locale): string {
  return t(locale, `cat.${key}` as UiKey);
}

export const serviceColors: Record<ServiceKey, string> = {
  ecommerce: 'bg-fire/10 text-fire border-fire/30',
  odoo: 'bg-purple-500/10 text-purple-700 border-purple-500/20',
  web: 'bg-blue-500/10 text-blue-700 border-blue-500/20',
  mobile: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20',
};

export async function getCaseStudies(locale: Locale, sort = true) {
  const entries = (await getCollection('caseStudies'))
    .filter((e) => entryLocale(e) === locale)
    .map(slugEntry);
  if (!sort) return entries;
  return entries.sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99));
}

export async function getFeaturedCaseStudies(locale: Locale) {
  const entries = await getCaseStudies(locale);
  return entries.filter((e) => e.data.featured);
}

export async function getBlogPosts(locale: Locale, sort = true) {
  const entries = (await getCollection('blog', ({ data }) => !data.draft))
    .filter((e) => entryLocale(e) === locale)
    .map(slugEntry);
  if (!sort) return entries;
  return entries.sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime(),
  );
}

const CATEGORY_ORDER = ['ecommerce', 'web', 'odoo', 'mobile'] as const;

export async function getServices(locale: Locale, sort = true) {
  const entries = (await getCollection('services'))
    .filter((e) => entryLocale(e) === locale)
    .map(slugEntry);
  // Hub entries only — no slash in id means top-level index.mdx
  const hubs = entries.filter((e) => !e.id.includes('/'));
  if (!sort) return hubs;
  return hubs.sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99));
}

export async function getServiceSubpages(serviceRoot: string, locale: Locale) {
  const entries = (await getCollection('services'))
    .filter((e) => entryLocale(e) === locale)
    .map(slugEntry);
  return entries
    .filter((e) => e.id.startsWith(serviceRoot + '/'))
    .sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99));
}

export async function getPortfolioByCategory(locale: Locale) {
  const entries = (await getCollection('portfolio'))
    .filter((e) => entryLocale(e) === locale)
    .map(slugEntry);
  const byCategory: typeof entries = [];
  return {
    ecommerce: entries.filter((e) => e.data.category === 'ecommerce').sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99)),
    web: entries.filter((e) => e.data.category === 'web').sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99)),
    mobile: entries.filter((e) => e.data.category === 'mobile').sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99)),
    odoo: entries.filter((e) => e.data.category === 'odoo').sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99)),
  };
}

export interface PortfolioCategory extends PortfolioCategoryBase {
  title: string;
  desc: string;
}

export function getPortfolioCategories(locale: Locale): PortfolioCategory[] {
  return portfolioCategories.map((cat) => ({
    ...cat,
    title: t(locale, `portfolio.cat.${cat.id}` as UiKey),
    desc: t(locale, `portfolio.cat.${cat.id}.desc` as UiKey),
  }));
}