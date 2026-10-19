/**
 * Site-wide configuration.
 *
 * This is the single place to update before launch. Every value marked
 * "PLACEHOLDER" is fake/unset and must be replaced with real information —
 * see ADMIN_GUIDE.md and README.md "Known limitations / placeholders" for
 * the full list and instructions.
 */

export const siteConfig = {
  name: "Discover Kiribati",
  shortName: "Discover Kiribati",
  tagline: "An independent guide to the islands, people and businesses of Kiribati",
  operatedBy: "MainKT Enterprise",

  // PLACEHOLDER — the real production domain is not yet known. Update this
  // before deploying, and update it again if the domain changes. Used for
  // canonical URLs, Open Graph tags, and the sitemap.
  productionDomain: "https://discoverkiribati.example",

  mwaketeUrl: "https://mwakete.com/",

  // Contact details. These are intentionally unset placeholders — do NOT
  // invent a real address, phone number or email. Replace them in this file
  // once the business owner supplies real, working contact details.
  contact: {
    // PLACEHOLDER — replace with a real monitored inbox before launch.
    email: "hello@discoverkiribati.example",
    emailIsPlaceholder: true,
    // PLACEHOLDER — optional. Leave null if there is no public phone line.
    phone: null as string | null,
    location: "Betio, Tarawa, Kiribati",
  },

  // Business submissions are received by email (mailto link) until a tested
  // backend/form provider is connected. See app/submit-business/page.tsx.
  submissionEmail: "listings@discoverkiribati.example",
  submissionEmailIsPlaceholder: true,

  social: {
    // PLACEHOLDER — add real social links when accounts exist.
    facebook: null as string | null,
    instagram: null as string | null,
  },

  legal: {
    lastReviewed: "2026-10-19",
  },
} as const;

export function absoluteUrl(path: string): string {
  const base = siteConfig.productionDomain.replace(/\/$/, "");
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${base}${clean}`;
}
