import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import ArticleCard from "@/components/ArticleCard";
import { articles } from "@/data/articles";

export const metadata: Metadata = {
  title: "Journal",
  description: "Destination guides, culture, food and travel planning stories from Kiribati.",
};

export default function JournalPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Journal" }]} />
      <div className="container-wide py-10 sm:py-14">
        <h1 className="font-display text-3xl text-ocean sm:text-4xl">Journal</h1>
        <p className="mt-3 max-w-2xl text-charcoal/80">
          Stories, guides and practical notes about travelling in Kiribati.
          The articles below are sample content for development and should
          not be read as finished, fact-checked journalism yet.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </>
  );
}
