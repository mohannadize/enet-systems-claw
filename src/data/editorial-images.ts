export type EditorialImage = {
  src: string;
  alt: string;
};

export const heroImage: EditorialImage = {
  src: "/images/editorial/enet-hero-montage.webp",
  alt: "E-commerce, operations, analytics, and mobile app interfaces across connected devices",
};

export const serviceImages: Record<string, EditorialImage> = {
  "web-development": {
    src: "/images/editorial/service-web-development.webp",
    alt: "Responsive e-commerce storefront displayed on desktop and laptop screens",
  },
  "odoo-erp": {
    src: "/images/editorial/service-odoo-erp.webp",
    alt: "Integrated inventory and business analytics dashboard in a warehouse office",
  },
  "mobile-apps": {
    src: "/images/editorial/service-mobile-apps.webp",
    alt: "Mobile commerce and field operations app displayed across three smartphones",
  },
  "agentic-automation": {
    src: "/images/editorial/service-agentic-automation.webp",
    alt: "Workflow automation dashboard with connected agents displayed on a desktop in an office",
  },
};

export const portfolioImages: Record<string, EditorialImage> = {
  "beautika-secret": {
    src: "/images/editorial/case-study-beauty-commerce.webp",
    alt: "Premium beauty storefront and operations dashboard displayed with skincare products",
  },
  "odoo-beautika-secret": {
    src: "/images/editorial/case-study-beauty-commerce.webp",
    alt: "Premium beauty storefront and operations dashboard displayed with skincare products",
  },
  "wafi-ecommerce": {
    src: "/images/editorial/case-study-retail-operations.webp",
    alt: "Connected online store and inventory dashboards inside a modern warehouse",
  },
  "wafi-corporate": {
    src: "/images/editorial/case-study-retail-operations.webp",
    alt: "Connected online store and inventory dashboards inside a modern warehouse",
  },
  "odoo-wafi-general-trading": {
    src: "/images/editorial/case-study-retail-operations.webp",
    alt: "Connected online store and inventory dashboards inside a modern warehouse",
  },
  "odoo-healthygo-ksa": {
    src: "/images/editorial/case-study-food-distribution.webp",
    alt: "Warehouse operator reviewing food inventory analytics on a tablet",
  },
};

export const blogImages: Record<string, EditorialImage> = {
  "why-odoo-fits-mena-smes": {
    src: "/images/editorial/blog-odoo-mena.webp",
    alt: "Unified business dashboard surrounded by everyday operations tools",
  },
  "ecommerce-performance-kuwait": {
    src: "/images/editorial/blog-ecommerce-performance.webp",
    alt: "Mobile storefront beside a laptop showing website performance growth",
  },
  "mobile-first-b2b": {
    src: "/images/editorial/blog-mobile-b2b.webp",
    alt: "Warehouse professional checking inventory from a mobile business app",
  },
  "typesafe-jev-business-implications": {
    src: "/images/editorial/service-agentic-automation.webp",
    alt: "Workflow automation dashboard with connected agents displayed on a desktop in an office",
  },
};

export function localizedEntryId(id: string): string {
  return id.replace(/^(en|ar)\//, "");
}
