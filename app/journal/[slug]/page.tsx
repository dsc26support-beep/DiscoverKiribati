import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import PlaceholderImage from "@/components/PlaceholderImage";
import DisclosureLabel from "@/components/DisclosureLabel";
import { articles, getArticleBySlug } from "@/data/articles";
import { articleCategoryLabels } from "@/lib/labels";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return { title: article.title, description: article.summary };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <>
      <Breadcrumbs items={[{ label: "Journal", href: "/journal" }, { label: article.title }]} />
      <article className="container-prose py-10 sm:py-14">
        {article.publishedStatus === "sample" && (
          <div className="mb-3">
            <DisclosureLabel kind="sample" />
          </div>
        )}
        <p className="label-caps text-lagoon">{articleCategoryLabels[article.category]}</p>
        <h1 className="mt-1 font-display text-3xl text-ocean sm:text-4xl">{article.title}</h1>

        <PlaceholderImage
          label={`${article.title} — photography needed`}
          className="mt-6 aspect-[16/9] w-full rounded-2xl"
        />

        <div className="prose-content mt-8 space-y-5 text-charcoal/85">
          {article.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </article>
    </>
  );
}
