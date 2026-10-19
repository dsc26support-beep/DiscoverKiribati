import type { Article } from "@/lib/types";
import { readCollection } from "@/lib/content";

/** Journal articles live in content/articles/*.json. */
export const articles = readCollection<Article>("articles");

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
