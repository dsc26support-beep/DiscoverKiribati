import type { Business } from "@/lib/types";
import { readCollection } from "@/lib/content";
import { destinations } from "@/data/destinations";

const islandName = (slug: string) => destinations.find((d) => d.slug === slug)?.name ?? slug;

/**
 * Business listings live in content/businesses/*.json (one file per
 * business). `island` is derived from `destination`. See ADMIN_GUIDE.md.
 */
export const businesses: Business[] = readCollection<Omit<Business, "island">>(
  "businesses"
).map((b) => ({ ...b, island: islandName(b.destination) }));

export function getBusinessBySlug(slug: string): Business | undefined {
  return businesses.find((b) => b.slug === slug);
}

export function getFeaturedBusinesses(): Business[] {
  return businesses.filter((b) => b.featured);
}

export function getBusinessesByCategory(category: string): Business[] {
  return businesses.filter((b) => b.category === category);
}
