import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import PlaceholderImage from "@/components/PlaceholderImage";
import DisclosureLabel from "@/components/DisclosureLabel";
import SafeExternalLink from "@/components/SafeExternalLink";
import { businesses, getBusinessBySlug } from "@/data/businesses";
import { categoryLabels, verificationLabels } from "@/lib/labels";
import { safeExternalUrl } from "@/lib/url";

export function generateStaticParams() {
  return businesses.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const business = getBusinessBySlug(slug);
  if (!business) return {};
  return {
    title: business.name,
    description: business.shortDescription,
  };
}

export default async function BusinessDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const business = getBusinessBySlug(slug);
  if (!business) notFound();

  const website = safeExternalUrl(business.website);
  const hasContact = Boolean(website || business.email || business.phone);

  return (
    <>
      <Breadcrumbs
        items={[{ label: "Explore", href: "/explore" }, { label: business.name }]}
      />
      <article className="container-wide py-10 sm:py-14">
        <div className="flex flex-wrap items-center gap-2">
          {business.listingStatus === "demo" && <DisclosureLabel kind="demo" />}
          {business.sponsored && <DisclosureLabel kind="sponsored" />}
          {business.mwaketeSeller && <DisclosureLabel kind="mwakete" />}
        </div>

        <p className="label-caps mt-4 text-lagoon">{categoryLabels[business.category]}</p>
        <h1 className="mt-1 font-display text-3xl text-ocean sm:text-4xl">{business.name}</h1>
        <p className="mt-1 text-charcoal/70">
          {business.island}
          {business.location ? ` · ${business.location}` : ""}
        </p>

        <PlaceholderImage
          label={`${business.name} — photography needed`}
          className="mt-6 aspect-[16/9] w-full rounded-2xl"
        />

        <div className="mt-10 grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <p className="text-charcoal/85">{business.description}</p>

            {business.affiliateUrl && (
              <div className="rounded-xl border border-coral/30 bg-coral/5 p-4 text-sm text-charcoal/85">
                <p className="font-semibold text-coral">Commercial disclosure</p>
                <p className="mt-1">
                  {business.affiliateDisclosure ??
                    "This listing includes a commercial link. Discover Kiribati may earn a commission if you make a qualifying purchase through it."}
                </p>
              </div>
            )}
          </div>

          <aside className="space-y-6">
            <div className="rounded-xl border border-grey/15 p-5">
              <h2 className="label-caps text-grey">Listing status</h2>
              <p className="mt-2 text-sm text-charcoal/80">
                {verificationLabels[business.verificationStatus]}
              </p>
              {business.lastReviewed && (
                <p className="mt-1 text-xs text-grey">Last reviewed {business.lastReviewed}</p>
              )}
            </div>

            {hasContact && (
              <div className="rounded-xl border border-grey/15 p-5">
                <h2 className="label-caps text-grey">Contact</h2>
                <ul className="mt-2 space-y-2 text-sm">
                  {website && (
                    <li>
                      <SafeExternalLink
                        href={website}
                        sponsored={business.sponsored}
                        className="font-medium text-lagoon no-underline hover:text-ocean"
                      >
                        Visit website →
                      </SafeExternalLink>
                    </li>
                  )}
                  {business.email && <li className="text-charcoal/80">{business.email}</li>}
                  {business.phone && <li className="text-charcoal/80">{business.phone}</li>}
                </ul>
              </div>
            )}

            {business.affiliateUrl && safeExternalUrl(business.affiliateUrl) && (
              <SafeExternalLink
                href={business.affiliateUrl}
                sponsored
                className="block rounded-full bg-ocean px-5 py-3 text-center text-sm font-semibold text-warm-white no-underline hover:bg-lagoon"
              >
                Check availability with the provider
              </SafeExternalLink>
            )}
          </aside>
        </div>
      </article>
    </>
  );
}
