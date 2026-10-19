import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * A Git-based CMS leaves empty optional fields out of the saved JSON. These
 * per-collection defaults restore them: nullable fields become null, list
 * fields become [], on/off switches become false.
 */
const DEFAULTS: Record<string, { nulls?: string[]; lists?: string[]; flags?: string[] }> = {
  businesses: {
    nulls: ["location", "image", "website", "email", "phone", "affiliateUrl", "affiliateDisclosure", "lastReviewed"],
    lists: ["gallery", "socialLinks"],
    flags: ["mwaketeSeller", "featured", "sponsored"],
  },
  destinations: {
    nulls: ["image"],
    lists: ["suggestedExperienceSlugs", "nearbyDestinationSlugs", "needsVerification"],
  },
  experiences: {
    nulls: ["safetyNotes", "bookingUrl", "image"],
    lists: ["relatedBusinessSlugs"],
    flags: ["isSample"],
  },
  articles: { nulls: ["image"] },
  "affiliate-partners": { nulls: ["affiliateUrl"], flags: ["active"] },
};

function normalise<T>(collection: string, raw: Record<string, unknown>): T {
  const d = DEFAULTS[collection] ?? {};
  const out = { ...raw };
  for (const k of d.nulls ?? []) if (out[k] === undefined || out[k] === "") out[k] = null;
  for (const k of d.lists ?? []) if (out[k] === undefined) out[k] = [];
  for (const k of d.flags ?? []) if (out[k] === undefined) out[k] = false;
  return out as T;
}

/**
 * Reads every `content/<collection>/*.json` file, sorted by `order` then
 * `slug`/`id`. Runs at build time only (server components and scripts) —
 * never import this from a client component. Shape and cross-references
 * are checked by `scripts/validate-content.ts`, which runs before every build.
 */
export function readCollection<T extends { order: number; slug?: string; id: string }>(
  collection: string
): T[] {
  const dir = join(process.cwd(), "content", collection);
  const items = readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => normalise<T>(collection, JSON.parse(readFileSync(join(dir, f), "utf8"))));
  return items.sort(
    (a, b) => a.order - b.order || (a.slug ?? a.id).localeCompare(b.slug ?? b.id)
  );
}
