import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/config";
import { businesses } from "@/data/businesses";
import { destinations } from "@/data/destinations";
import { experiences } from "@/data/experiences";
import { articles } from "@/data/articles";

export const dynamic = "force-static";

const staticRoutes = [
  "/",
  "/explore",
  "/destinations",
  "/experiences",
  "/travel-guide",
  "/journal",
  "/about",
  "/mwakete",
  "/submit-business",
  "/contact",
  "/privacy",
  "/terms",
  "/affiliate-disclosure",
  "/listing-policy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: absoluteUrl(route),
    changeFrequency: "weekly",
    priority: route === "/" ? 1 : 0.7,
  }));

  for (const b of businesses) {
    if (b.listingStatus === "published") {
      entries.push({ url: absoluteUrl(`/businesses/${b.slug}`), changeFrequency: "monthly" });
    }
  }
  for (const d of destinations) {
    entries.push({ url: absoluteUrl(`/destinations/${d.slug}`), changeFrequency: "monthly" });
  }
  for (const e of experiences) {
    if (!e.isSample) {
      entries.push({ url: absoluteUrl(`/experiences/${e.slug}`), changeFrequency: "monthly" });
    }
  }
  for (const a of articles) {
    if (a.publishedStatus === "published") {
      entries.push({ url: absoluteUrl(`/journal/${a.slug}`), changeFrequency: "monthly" });
    }
  }

  return entries;
}
