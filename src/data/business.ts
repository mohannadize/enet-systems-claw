/**
 * Canonical business identity, contact, and public URLs. Import this module
 * anywhere the site needs company details so email/phone/tagline stay in sync.
 */

const email = "inquiry@enet.systems" as const;
/** E.164 including country code (used for tel: and wa.me). */
const phoneE164 = "+201276666314" as const;
/** Digits only, no +, for https://wa.me/{digits} */
const phoneDigits = "201276666314" as const;

export interface BusinessInfo {
  legalName: string;
  shortName: string;
  tagline: string;
  publicSiteUrl: string;
  email: string;
  emailDisplay: string;
  phoneE164: string;
  phoneDisplay: string;
  telHref: string;
  mailtoHref: string;
  whatsAppUrl: string;
  workingHours: string;
  defaultPageDescription: string;
  organizationDescription: string;
  logoPath: string;
  address: { addressCountry: string };
  availableLanguages: readonly [string, string];
  areaServed: string;
}

export const business = {
  legalName: "ENET Systems LTD",
  shortName: "ENET Systems",
  tagline: "Growth through technology.",

  publicSiteUrl: "https://enet.systems",

  email,
  emailDisplay: "Inquiry@enet.systems",
  phoneE164,
  phoneDisplay: "+20 127 6666 314",
  telHref: `tel:${phoneE164}`,
  mailtoHref: `mailto:${email}`,
  whatsAppUrl: `https://wa.me/${phoneDigits}`,

  workingHours: "Sunday - Thursday: 9:00 AM - 6:00 PM",

  defaultPageDescription:
    "ENET Systems LTD - Your trusted partner for digital transformation",
  organizationDescription:
    "ENET Systems LTD - Your trusted partner for digital transformation, providing Odoo ERP, Web Development, and Mobile App solutions.",

  logoPath: "/logo.svg",

  address: {
    addressCountry: "KW",
  },
  availableLanguages: ["English", "Arabic"] as const,
  areaServed: "KW",
} as const satisfies BusinessInfo;

/** Absolute URL for a path on the public site (e.g. `/contact`). */
export function publicUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${business.publicSiteUrl}${normalized}`;
}
