import { business, publicUrl } from "../data/business";

/**
 * Type-safe JSON-LD builders for schema.org. Each returns a plain object ready to JSON.stringify.
 * Canonical site URL comes from [src/data/business.ts] (keep in sync with astro.config `site`).
 */

export const SITE_URL = business.publicSiteUrl;
export const ORGANIZATION_ID = `${SITE_URL}/#organization` as const;
export const WEBSITE_ID = `${SITE_URL}/#website` as const;

const orgRef = { "@id": ORGANIZATION_ID } as const;
const websiteRef = { "@id": WEBSITE_ID } as const;

/** Build an absolute URL for a path (e.g. `/contact` → full origin URL). */
export function siteUrl(path: string): string {
  return publicUrl(path);
}

export type JsonLdObject = Record<string, unknown>;

export function buildWebPage(input: {
  name: string;
  description: string;
  url: string;
}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${input.url}#webpage`,
    name: input.name,
    description: input.description,
    url: input.url,
    isPartOf: websiteRef,
    publisher: orgRef,
  };
}

export function buildAboutPage(input: {
  name: string;
  description: string;
  url: string;
}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${input.url}#webpage`,
    name: input.name,
    description: input.description,
    url: input.url,
    isPartOf: websiteRef,
    publisher: orgRef,
  };
}

export function buildContactPage(input: {
  url: string;
  description: string;
}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${input.url}#webpage`,
    url: input.url,
    description: input.description,
    isPartOf: websiteRef,
    publisher: orgRef,
  };
}

export function buildBlogIndex(input: {
  name: string;
  description: string;
  url: string;
}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${input.url}#blog`,
    name: input.name,
    description: input.description,
    url: input.url,
    isPartOf: websiteRef,
    publisher: orgRef,
  };
}

export interface BlogPostingInput {
  headline: string;
  description: string;
  url: string;
  datePublished: Date;
  dateModified?: Date;
  author?: string;
  keywords?: string[];
}

export function buildBlogPosting(input: BlogPostingInput): JsonLdObject {
  const obj: JsonLdObject = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${input.url}#article`,
    headline: input.headline,
    description: input.description,
    url: input.url,
    datePublished: input.datePublished.toISOString(),
    dateModified: (input.dateModified ?? input.datePublished).toISOString(),
    publisher: orgRef,
    isPartOf: { "@id": `${siteUrl("/blog")}#blog` },
  };
  if (input.author) {
    obj.author = { "@type": "Person", name: input.author };
  }
  if (input.keywords?.length) {
    obj.keywords = input.keywords.join(", ");
  }
  return obj;
}

export interface ServicePageInput {
  title: string;
  description: string;
  url: string;
  features?: string[];
}

export function buildServicePage(input: ServicePageInput): JsonLdObject {
  const obj: JsonLdObject = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${input.url}#service`,
    name: input.title,
    description: input.description,
    url: input.url,
    provider: orgRef,
  };
  if (input.features?.length) {
    obj.serviceType = input.features.join(", ");
  }
  return obj;
}

export function buildPortfolioIndex(input: {
  name: string;
  description: string;
  url: string;
}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${input.url}#webpage`,
    name: input.name,
    description: input.description,
    url: input.url,
    isPartOf: websiteRef,
    publisher: orgRef,
  };
}

export interface PortfolioProjectInput {
  name: string;
  desc: string;
  url: string;
  liveUrl?: string | null;
}

export function buildPortfolioProject(input: PortfolioProjectInput): JsonLdObject {
  const obj: JsonLdObject = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${input.url}#creativework`,
    name: input.name,
    description: input.desc,
    url: input.url,
    creator: orgRef,
  };
  if (input.liveUrl) {
    obj.sameAs = input.liveUrl;
  }
  return obj;
}
