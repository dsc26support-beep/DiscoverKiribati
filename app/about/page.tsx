import Link from "next/link";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import SafeExternalLink from "@/components/SafeExternalLink";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.name}, an independent tourism website operated by ${siteConfig.operatedBy}.`,
};

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "About" }]} />
      <div className="container-prose space-y-8 py-10 sm:py-14">
        <div>
          <h1 className="font-display text-3xl text-ocean sm:text-4xl">About Discover Kiribati</h1>
          <p className="mt-4 text-charcoal/85">
            Discover Kiribati is an independent tourism magazine and business
            directory for the islands of Kiribati — built to help travellers
            find accurate, honest information about destinations, local
            businesses and experiences, and to give I-Kiribati entrepreneurs
            a place to be found.
          </p>
        </div>

        <section>
          <h2 className="font-display text-xl text-ocean">Independent, not official</h2>
          <p className="mt-3 text-charcoal/85">
            Discover Kiribati is a private website operated by{" "}
            {siteConfig.operatedBy}. It is <strong>not</strong> an official
            government tourism portal, and content here is not automatically
            endorsed by any public authority or tourism body. For official
            entry requirements and safety guidance, always check your own
            government&apos;s travel advisory and the relevant Kiribati
            government sources directly.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ocean">Focus on local businesses and authentic information</h2>
          <p className="mt-3 text-charcoal/85">
            The directory is built to be useful to a traveller whether or not
            they have ever heard of any affiliated marketplace. We aim to
            represent Kiribati and I-Kiribati culture accurately and
            respectfully, and we label demonstration, sample, and unverified
            content clearly rather than presenting it as fact.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ocean">Relationship with Mwakete.com</h2>
          <p className="mt-3 text-charcoal/85">
            Mwakete is an online marketplace also associated with{" "}
            {siteConfig.operatedBy}. Discover Kiribati promotes Mwakete as a
            related marketplace, and Mwakete-listed sellers may receive
            additional promotional visibility in the directory — but selling
            through Mwakete is never required for a local business to be
            listed on Discover Kiribati.
          </p>
          <SafeExternalLink
            href={siteConfig.mwaketeUrl}
            className="mt-3 inline-block text-sm font-semibold text-lagoon no-underline hover:text-ocean"
          >
            Learn more about Mwakete →
          </SafeExternalLink>
        </section>

        <section>
          <h2 className="font-display text-xl text-ocean">Business inclusion</h2>
          <p className="mt-3 text-charcoal/85">
            Any genuine business operating in Kiribati&apos;s tourism sector
            can submit a listing. Submission does not guarantee publication,
            verification, ranking, or commercial results — see our{" "}
            <Link href="/listing-policy" className="font-medium text-lagoon no-underline hover:text-ocean">
              Listing Policy
            </Link>{" "}
            for details.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ocean">Editorial and commercial transparency</h2>
          <p className="mt-3 text-charcoal/85">
            We distinguish clearly between organic editorial content, paid or
            sponsored placements, Mwakete promotion, and affiliate links. See
            our{" "}
            <Link href="/affiliate-disclosure" className="font-medium text-lagoon no-underline hover:text-ocean">
              Affiliate Disclosure
            </Link>{" "}
            for how commercial relationships are handled.
          </p>
        </section>
      </div>
    </>
  );
}
