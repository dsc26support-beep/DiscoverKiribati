import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PlaceholderImage from "@/components/PlaceholderImage";
import ExperienceCard from "@/components/ExperienceCard";
import { destinations, getDestinationBySlug } from "@/data/destinations";
import { experiences } from "@/data/experiences";
import { businesses } from "@/data/businesses";
import BusinessCard from "@/components/BusinessCard";

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);
  if (!destination) return {};
  return {
    title: destination.name,
    description: destination.introduction,
  };
}

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);
  if (!destination) notFound();

  const relatedExperiences = experiences.filter((e) =>
    destination.suggestedExperienceSlugs.includes(e.slug)
  );
  const relatedBusinesses = businesses.filter((b) => b.island === destination.name);
  const nearby = destinations.filter((d) =>
    destination.nearbyDestinationSlugs.includes(d.slug)
  );

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Destinations", href: "/destinations" },
          { label: destination.name },
        ]}
      />
      <article className="container-wide py-10 sm:py-14">
        <p className="label-caps text-lagoon">{destination.region}</p>
        <h1 className="mt-2 font-display text-3xl text-ocean sm:text-4xl">
          {destination.name}
        </h1>

        <PlaceholderImage
          label={`${destination.name} — photography needed`}
          className="mt-6 aspect-[16/9] w-full rounded-2xl"
        />

        <div className="mt-10 grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-8">
            <section>
              <h2 className="font-display text-2xl text-ocean">Introduction</h2>
              <p className="mt-3 text-charcoal/85">{destination.introduction}</p>
            </section>
            <section>
              <h2 className="font-display text-2xl text-ocean">Geography</h2>
              <p className="mt-3 text-charcoal/85">{destination.geography}</p>
            </section>
            <section>
              <h2 className="font-display text-2xl text-ocean">Practical travel notes</h2>
              <p className="mt-3 text-charcoal/85">{destination.practicalNotes}</p>
            </section>

            {relatedExperiences.length > 0 && (
              <section>
                <h2 className="font-display text-2xl text-ocean">Suggested experiences</h2>
                <div className="mt-4 grid gap-6 sm:grid-cols-2">
                  {relatedExperiences.map((experience) => (
                    <ExperienceCard key={experience.id} experience={experience} />
                  ))}
                </div>
              </section>
            )}

            {relatedBusinesses.length > 0 && (
              <section>
                <h2 className="font-display text-2xl text-ocean">Relevant businesses</h2>
                <div className="mt-4 grid gap-6 sm:grid-cols-2">
                  {relatedBusinesses.map((business) => (
                    <BusinessCard key={business.id} business={business} />
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="space-y-6">
            <div className="rounded-xl border border-coral/30 bg-coral/5 p-5">
              <h2 className="label-caps text-coral">To be verified before publishing</h2>
              <ul className="mt-3 list-disc space-y-2 pl-4 text-sm text-charcoal/80">
                {destination.needsVerification.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            {nearby.length > 0 && (
              <div className="rounded-xl border border-grey/15 p-5">
                <h2 className="label-caps text-lagoon">Nearby destinations</h2>
                <ul className="mt-3 space-y-2">
                  {nearby.map((d) => (
                    <li key={d.id}>
                      <Link
                        href={`/destinations/${d.slug}`}
                        className="text-sm font-medium text-ocean no-underline hover:text-lagoon"
                      >
                        {d.name} →
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </article>
    </>
  );
}
