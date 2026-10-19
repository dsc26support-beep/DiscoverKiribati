import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import PlaceholderImage from "@/components/PlaceholderImage";
import DisclosureLabel from "@/components/DisclosureLabel";
import BusinessCard from "@/components/BusinessCard";
import SafeExternalLink from "@/components/SafeExternalLink";
import { experiences, getExperienceBySlug } from "@/data/experiences";
import { businesses } from "@/data/businesses";
import { noIndexUnless } from "@/lib/seo";

export function generateStaticParams() {
  return experiences.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const experience = getExperienceBySlug(slug);
  if (!experience) return {};
  return {
    title: experience.title,
    description: experience.introduction,
    ...noIndexUnless(!experience.isSample),
  };
}

export default async function ExperienceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const experience = getExperienceBySlug(slug);
  if (!experience) notFound();

  const relatedBusinesses = businesses.filter((b) =>
    experience.relatedBusinessSlugs.includes(b.slug)
  );

  return (
    <>
      <Breadcrumbs
        items={[{ label: "Experiences", href: "/experiences" }, { label: experience.title }]}
      />
      <article className="container-wide py-10 sm:py-14">
        {experience.isSample && (
          <div className="mb-3">
            <DisclosureLabel kind="sample" />
          </div>
        )}
        <p className="label-caps text-lagoon">{experience.island}</p>
        <h1 className="mt-1 font-display text-3xl text-ocean sm:text-4xl">{experience.title}</h1>

        <PlaceholderImage
          label={`${experience.title} — photography needed`}
          className="mt-6 aspect-[16/9] w-full rounded-2xl"
        />

        <div className="mt-10 grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <p className="text-charcoal/85">{experience.description}</p>

            {!experience.bookingUrl && (
              <p className="text-sm text-grey">
                There is no working booking system for this experience yet —
                contact a related business directly to arrange a visit.
              </p>
            )}

            {experience.bookingUrl && (
              <SafeExternalLink
                href={experience.bookingUrl}
                className="inline-block rounded-full bg-ocean px-5 py-3 text-sm font-semibold text-warm-white no-underline hover:bg-lagoon"
              >
                Book this experience
              </SafeExternalLink>
            )}
          </div>

          <aside className="space-y-6">
            {experience.safetyNotes && (
              <div className="rounded-xl border border-coral/30 bg-coral/5 p-5">
                <h2 className="label-caps text-coral">Safety &amp; practical notes</h2>
                <p className="mt-2 text-sm text-charcoal/80">{experience.safetyNotes}</p>
              </div>
            )}

            {relatedBusinesses.length > 0 && (
              <div>
                <h2 className="label-caps text-lagoon">Related business</h2>
                <div className="mt-3 space-y-4">
                  {relatedBusinesses.map((business) => (
                    <BusinessCard key={business.id} business={business} />
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </article>
    </>
  );
}
