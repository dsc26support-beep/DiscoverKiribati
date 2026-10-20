import Link from "next/link";
import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "Listing Policy" };

export default function ListingPolicyPage() {
  return (
    <LegalPage title="Listing Policy">
      <section>
        <h2 className="font-display text-xl text-ocean">Who can be listed</h2>
        <p className="mt-2">
          Any genuine tourism-related business operating in Kiribati can
          submit a listing — accommodation, tours, culture and community
          experiences, food and dining, transport, local services, shops, or
          travel essentials. Selling through Mwakete.com is never required
          to qualify.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl text-ocean">What submission does and does not guarantee</h2>
        <p className="mt-2">
          Submitting a listing does not guarantee publication, verification,
          a particular ranking, or any commercial result. We review
          submissions before publishing and may ask for more information.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl text-ocean">Verification status</h2>
        <p className="mt-2">
          Listings are labelled honestly based on what we actually know:
          &ldquo;Information supplied by business&rdquo; for details the
          business itself provided, &ldquo;Details pending confirmation&rdquo;
          where something is still unverified, or left unlabelled only once
          a genuine verification step has taken place. We do not describe a
          business as verified without one.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl text-ocean">Sponsored and Mwakete-affiliated listings</h2>
        <p className="mt-2">
          Paid or sponsored placements, and listings from businesses that
          also sell on Mwakete, are visually labelled as such. Payment for
          promotion does not guarantee an editorial recommendation.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl text-ocean">Updating or removing a listing</h2>
        <p className="mt-2">
          A business owner can request a correction or removal of their
          listing at any time via the{" "}
          <Link href="/contact" className="font-medium text-lagoon no-underline hover:text-ocean">
            Contact page
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl text-ocean">Accuracy is the business&apos;s responsibility too</h2>
        <p className="mt-2">
          We do not fabricate prices, hours, availability, or booking
          details. Where information changes, please let us know so we can
          correct it — visitors should still confirm details directly with
          the business before relying on them.
        </p>
      </section>
    </LegalPage>
  );
}
