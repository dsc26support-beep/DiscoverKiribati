import Link from "next/link";
import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = { title: "Terms of Use" };

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use">
      <section>
        <h2 className="font-display text-xl text-ocean">About this site</h2>
        <p className="mt-2">
          Discover Kiribati is an independent tourism website operated by{" "}
          {siteConfig.operatedBy}. It is not an official government tourism
          portal, and using this site does not create any commercial or
          agency relationship with Discover Kiribati unless explicitly
          stated otherwise.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl text-ocean">Information accuracy</h2>
        <p className="mt-2">
          We work to keep listings and editorial content accurate, but
          businesses are independently operated, and details such as prices,
          opening hours, availability, and schedules can change without
          notice. Always confirm directly with a business or operator before
          making plans or payments.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl text-ocean">No booking or payment functionality</h2>
        <p className="mt-2">
          This website does not currently accept reservations or payments.
          Any claim to the contrary on any page is an error — please report
          it via the{" "}
          <Link href="/contact" className="font-medium text-lagoon no-underline hover:text-ocean">
            Contact page
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl text-ocean">External links</h2>
        <p className="mt-2">
          Links to external websites, including Mwakete.com and affiliate
          partners, are provided for convenience. We are not responsible for
          the content, policies, or practices of external sites.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl text-ocean">Changes to these terms</h2>
        <p className="mt-2">
          These terms may be updated from time to time; the date at the top
          of this page reflects the last review.
        </p>
      </section>
    </LegalPage>
  );
}
