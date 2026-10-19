import type { Article } from "@/lib/types";

/**
 * Sample journal articles. publishedStatus: "sample" on every record — the
 * UI renders a "Sample article" badge. No interviews, quotations, or
 * first-person travel claims are fabricated; these are general, factual
 * framing pieces only. Replace or expand with real, fact-checked writing
 * before launch.
 */
export const articles: Article[] = [
  {
    id: "a1",
    slug: "planning-a-first-trip-to-kiribati",
    title: "Planning a first trip to Kiribati: what to know before you go",
    category: "travel-planning",
    summary:
      "A sample planning-focused article outlining the basics a first-time visitor to Kiribati should research before booking.",
    body: [
      "This is sample editorial content for the Discover Kiribati journal. It is written in a general, factual tone and makes no claims about a specific author's personal travel experience.",
      "A genuine version of this article would cover practical planning topics — flight routing into Bonriki International Airport, typical trip-planning lead times for outer-island travel, and where to find current official guidance — each linked to a real, current source rather than an invented one.",
      "Replace this placeholder before publishing, and keep a last-reviewed date on any fact that can change.",
    ],
    publishedStatus: "sample",
    image: null,
  },
  {
    id: "a2",
    slug: "respectful-travel-in-kiribati",
    title: "Respectful travel: customs and etiquette in Kiribati",
    category: "culture-traditions",
    summary:
      "A sample article on general principles of respectful travel, written without specific unverified claims.",
    body: [
      "This is sample content illustrating the tone and structure of a culture-and-traditions article: respectful, general, and free of stereotypes.",
      "A finished version should be reviewed by someone knowledgeable about contemporary I-Kiribati customs — ideally a local contributor — rather than drafted from assumption.",
    ],
    publishedStatus: "sample",
    image: null,
  },
  {
    id: "a3",
    slug: "south-tarawa-neighbourhood-guide",
    title: "A neighbourhood guide to South Tarawa",
    category: "destination-guides",
    summary:
      "A sample destination-guide article outlining South Tarawa's main areas at a high level.",
    body: [
      "This sample article is a placeholder for a proper neighbourhood-by-neighbourhood guide to South Tarawa, from Betio to Bonriki.",
      "A complete version would describe each area's character and practical role (for example, Betio as a port town, Bairiki as a government and commercial centre) based on verified, current information.",
    ],
    publishedStatus: "sample",
    image: null,
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
