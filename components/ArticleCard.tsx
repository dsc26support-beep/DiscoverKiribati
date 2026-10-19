import Link from "next/link";
import type { Article } from "@/lib/types";
import { articleCategoryLabels } from "@/lib/labels";
import PlaceholderImage from "@/components/PlaceholderImage";
import DisclosureLabel from "@/components/DisclosureLabel";

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/journal/${article.slug}`}
      className="group block overflow-hidden rounded-xl border border-grey/15 bg-warm-white no-underline transition-shadow hover:shadow-lg"
    >
      <div className="aspect-[16/10] overflow-hidden">
        <PlaceholderImage label={articleCategoryLabels[article.category]} className="h-full w-full" />
      </div>
      <div className="p-4">
        <p className="label-caps text-lagoon">{articleCategoryLabels[article.category]}</p>
        <h3 className="mt-1 font-display text-lg text-ocean group-hover:text-lagoon">
          {article.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-charcoal/80">{article.summary}</p>
        {article.publishedStatus === "sample" && (
          <div className="mt-3">
            <DisclosureLabel kind="sample" />
          </div>
        )}
      </div>
    </Link>
  );
}
