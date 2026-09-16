import { business } from "./business";

/** Update LinkedIn and Instagram URLs when official profiles are confirmed. */
export const socialLinks = [
  {
    label: "WhatsApp",
    href: business.whatsAppUrl,
  },
  {
    label: "Email",
    href: business.mailtoHref,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/enet-systems",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/enet.systems",
  },
] as const;
