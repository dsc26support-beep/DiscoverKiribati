/**
 * Validates everything under content/: shape (Zod), unique ids/slugs and
 * cross-references between collections. Runs before every build
 * (`prebuild`) and in CI. Run manually with: npm run validate
 */
import { z } from "zod";
import { readCollection } from "../lib/content.ts";

const nullableUrl = z.url().nullable();
const image = z.object({
  src: z.string().min(1),
  alt: z.string().min(5, "alt text is required"),
  credit: z.string().min(1, "photo credit is required"),
  licence: z.string().min(1, "licence is required"),
});
const slug = z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "lowercase letters, numbers and hyphens only");
const base = { id: z.string().min(1), slug, order: z.number().int() };
const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "use YYYY-MM-DD");

const business = z.strictObject({
  ...base,
  name: z.string().min(1),
  category: z.enum([
    "accommodation", "tours-activities", "culture-community", "food-dining",
    "transport", "local-services", "shops-souvenirs", "travel-essentials",
  ]),
  destination: slug,
  location: z.string().nullable(),
  shortDescription: z.string().min(10),
  description: z.string().min(10),
  image: image.nullable(),
  gallery: z.array(image),
  website: nullableUrl,
  email: z.email().nullable(),
  phone: z.string().nullable(),
  socialLinks: z.array(z.strictObject({ label: z.string().min(1), url: z.url() })),
  mwaketeSeller: z.boolean(),
  featured: z.boolean(),
  sponsored: z.boolean(),
  verificationStatus: z.enum(["information-supplied-by-business", "details-pending-confirmation", "unverified"]),
  listingStatus: z.enum(["demo", "draft", "published"]),
  affiliateUrl: nullableUrl,
  affiliateDisclosure: z.string().nullable(),
  lastReviewed: isoDate.nullable(),
});

const destination = z.strictObject({
  ...base,
  name: z.string().min(1),
  region: z.enum(["Gilbert Islands", "Phoenix Islands", "Line Islands"]),
  introduction: z.string().min(10),
  geography: z.string().min(10),
  practicalNotes: z.string().min(10),
  suggestedExperienceSlugs: z.array(slug),
  nearbyDestinationSlugs: z.array(slug),
  needsVerification: z.array(z.string().min(1)),
  image: image.nullable(),
});

const experience = z.strictObject({
  ...base,
  title: z.string().min(1),
  introduction: z.string().min(10),
  description: z.string().min(10),
  destination: slug,
  relatedBusinessSlugs: z.array(slug),
  safetyNotes: z.string().nullable(),
  bookingUrl: nullableUrl,
  image: image.nullable(),
  isSample: z.boolean(),
});

const article = z.strictObject({
  ...base,
  title: z.string().min(1),
  category: z.enum([
    "destination-guides", "culture-traditions", "food", "ocean-nature",
    "community-stories", "travel-planning", "local-business-features",
  ]),
  summary: z.string().min(10),
  body: z.array(z.string().min(1)).min(1),
  publishedStatus: z.enum(["sample", "unpublished", "published"]),
  image: image.nullable(),
});

const partner = z.strictObject({
  id: z.string().min(1),
  order: z.number().int(),
  partnerName: z.string().min(1),
  partnerWebsite: z.url(),
  approvedProgramStatus: z.enum(["not-yet-approved", "approved", "inactive"]),
  affiliateUrl: nullableUrl,
  disclosureText: z.string().min(10),
  active: z.boolean(),
  lastReviewed: isoDate,
});

const errors: string[] = [];
const fail = (msg: string) => errors.push(msg);

function load<T extends z.ZodType>(collection: string, schema: T): z.infer<T>[] {
  const out: z.infer<T>[] = [];
  for (const raw of readCollection<any>(collection)) {
    const label = `${collection}/${raw.slug ?? raw.id}`;
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      for (const issue of parsed.error.issues) fail(`${label}: ${issue.path.join(".") || "(root)"} — ${issue.message}`);
    } else {
      out.push(parsed.data);
    }
  }
  return out;
}

function unique(collection: string, items: { id: string; slug?: string }[]) {
  const ids = new Set<string>();
  const slugs = new Set<string>();
  for (const i of items) {
    if (ids.has(i.id)) fail(`${collection}: duplicate id "${i.id}"`);
    ids.add(i.id);
    if (i.slug) {
      if (slugs.has(i.slug)) fail(`${collection}: duplicate slug "${i.slug}"`);
      slugs.add(i.slug);
    }
  }
}

const businesses = load("businesses", business);
const destinations = load("destinations", destination);
const experiences = load("experiences", experience);
const articles = load("articles", article);
const partners = load("affiliate-partners", partner);

unique("businesses", businesses);
unique("destinations", destinations);
unique("experiences", experiences);
unique("articles", articles);
unique("affiliate-partners", partners);

const destSlugs = new Set(destinations.map((d) => d.slug));
const bizSlugs = new Set(businesses.map((b) => b.slug));
const expSlugs = new Set(experiences.map((e) => e.slug));

for (const b of businesses) {
  const l = `businesses/${b.slug}`;
  if (!destSlugs.has(b.destination)) fail(`${l}: destination "${b.destination}" does not exist`);
  if (b.listingStatus === "published") {
    if (!b.lastReviewed) fail(`${l}: published listings need lastReviewed`);
    if (b.verificationStatus === "unverified") fail(`${l}: published listings cannot be "unverified"`);
  }
  if (b.affiliateUrl) {
    if (!b.affiliateDisclosure) fail(`${l}: affiliateUrl requires an affiliateDisclosure`);
    const backed = partners.some(
      (p) => p.active && p.approvedProgramStatus === "approved" && p.affiliateUrl === b.affiliateUrl
    );
    if (!backed) fail(`${l}: affiliateUrl is not backed by an active, approved affiliate partner`);
  }
}
for (const e of experiences) {
  const l = `experiences/${e.slug}`;
  if (!destSlugs.has(e.destination)) fail(`${l}: destination "${e.destination}" does not exist`);
  for (const s of e.relatedBusinessSlugs) if (!bizSlugs.has(s)) fail(`${l}: unknown business "${s}"`);
}
for (const d of destinations) {
  const l = `destinations/${d.slug}`;
  for (const s of d.suggestedExperienceSlugs) if (!expSlugs.has(s)) fail(`${l}: unknown experience "${s}"`);
  for (const s of d.nearbyDestinationSlugs) {
    if (!destSlugs.has(s)) fail(`${l}: unknown nearby destination "${s}"`);
    if (s === d.slug) fail(`${l}: lists itself as nearby`);
  }
}

if (errors.length) {
  console.error(`validate-content: ${errors.length} problem(s)\n - ` + errors.join("\n - "));
  process.exit(1);
}
console.log(
  `validate-content: OK (${businesses.length} businesses, ${destinations.length} destinations, ` +
    `${experiences.length} experiences, ${articles.length} articles, ${partners.length} partners)`
);
