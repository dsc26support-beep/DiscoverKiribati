import type { Destination } from "@/lib/types";
import { readCollection } from "@/lib/content";

/** Editorial destination content lives in content/destinations/*.json. */
export const destinations = readCollection<Destination>("destinations");

export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug);
}
