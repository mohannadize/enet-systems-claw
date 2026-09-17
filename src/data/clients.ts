export const clientSectors = [
  'Beauty & cosmetics',
  'Trading & distribution',
  'Food & agriculture',
  'Automotive',
  'Health & wellness',
  'Professional services',
] as const;

export const clients = [
  { name: 'Beautika Secret', sector: 'Beauty', gradient: 'rose' as const, logo: '/clients/beautika-secret.webp' },
  { name: 'Fly Up Cosmetics', sector: 'Cosmetics', gradient: 'amber' as const, logo: '/clients/flyupcosmeticskw.svg' },
  { name: 'Wafi', sector: 'General trading', gradient: 'blue' as const, logo: '/clients/wafi.webp' },
  { name: 'Sora International', sector: 'Import & trading', gradient: 'purple' as const, logo: '/clients/sora.svg' },
  { name: 'Feeders Kuwait', sector: 'Food distribution', gradient: 'cyan' as const, logo: '/clients/feeders.png' },
  { name: 'HealthyGO KSA', sector: 'Health & wellness', gradient: 'blue' as const, logo: '/clients/healthygo.png' },
  { name: 'Raz Car', sector: 'Automotive', gradient: 'orange' as const, logo: '/clients/razcar.svg' },
  { name: 'Henzadem', sector: 'Specialty retail', gradient: 'purple' as const, logo: '/clients/henzadem.avif' },
];
