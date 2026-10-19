import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>
        This policy explains, in plain language, what Discover Kiribati
        actually does with information — not what a generic template claims.
        It describes the current, static version of the site, which has no
        server-side database.
      </p>

      <section>
        <h2 className="font-display text-xl text-ocean">What we collect</h2>
        <p className="mt-2">
          As a statically hosted website, Discover Kiribati does not run its
          own server-side database and does not collect account information,
          because there are no accounts. The business submission form does
          not transmit or store data through this website directly — it
          opens your own email application with a pre-filled message, and
          nothing is sent until you choose to send that email yourself. Any
          information you include in that message goes to {siteConfig.operatedBy}
          {"'"}s inbox, the same as any other email you send.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl text-ocean">Analytics and tracking</h2>
        <p className="mt-2">
          This site does not currently run analytics, advertising trackers,
          or marketing pixels. If that changes in a future version, this
          policy will be updated to disclose exactly what is collected and
          why, before any such tool is added.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl text-ocean">Affiliate and commercial links</h2>
        <p className="mt-2">
          Some pages may contain affiliate or sponsored links; see our{" "}
          <a href="/affiliate-disclosure" className="font-medium text-lagoon no-underline hover:text-ocean">
            Affiliate Disclosure
          </a>{" "}
          for details. Clicking an external link takes you to that
          provider&apos;s own website, which has its own, separate privacy
          practices.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl text-ocean">This is not a compliance guarantee</h2>
        <p className="mt-2">
          This page describes how the site currently works. It does not
          claim any specific legal compliance certification, and having
          this policy in place does not by itself make any particular data
          practice compliant with the law in your jurisdiction.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl text-ocean">Contact</h2>
        <p className="mt-2">
          Questions about this policy can be sent through the{" "}
          <a href="/contact" className="font-medium text-lagoon no-underline hover:text-ocean">
            Contact page
          </a>
          .
        </p>
      </section>
    </LegalPage>
  );
}
