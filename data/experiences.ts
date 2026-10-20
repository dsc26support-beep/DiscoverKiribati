import type { Experience } from "@/lib/types";
import { readCollection } from "@/lib/content";
import { destinations } from "@/data/destinations";

const islandName = (slug: string) => destinations.find((d) => d.slug === slug)?.name ?? slug;

/** Experiences live in content/experiences/*.json; `island` is derived from `destination`. */
export const experiences: Experience[] = readCollection<Omit<Experience, "island">>(
  "experiences"
).map((e) => ({ ...e, island: islandName(e.destination) }));

export function getExperienceBySlug(slug: string): Experience | undefined {
  return experiences.find((e) => e.slug === slug);
}
