import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "Affiliate Disclosure" };

export default function AffiliateDisclosurePage() {
  return (
    <LegalPage title="Affiliate Disclosure">
      <section>
        <h2 className="font-display text-xl text-ocean">Current status: no active affiliate programs</h2>
        <p className="mt-2">
          Discover Kiribati does not currently have any active, approved
          affiliate partnerships. No link on this site is presented as an
          affiliate link unless a real, tested partnership is in place.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl text-ocean">What this means going forward</h2>
        <p className="mt-2">
          Discover Kiribati is built with an affiliate-ready architecture
          for categories such as accommodation, flights, travel insurance,
          tours and activities, and travel equipment. If and when a real
          partnership is approved, Discover Kiribati may earn a commission
          if you make a qualifying purchase through a clearly labelled link.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl text-ocean">How we will disclose it</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>Not every link on this site is, or will be, an affiliate link.</li>
          <li>
            A commercial relationship does not automatically mean a provider
            is recommended over others — we aim not to let commission
            arrangements affect editorial rankings, and will update this
            statement if that policy ever changes.
          </li>
          <li>
            Affiliate links will carry a visible disclosure near the link
            itself, not just on this page.
          </li>
          <li>
            Visitors should always check final prices, terms and
            availability directly with the provider.
          </li>
        </ul>
      </section>
    </LegalPage>
  );
}
