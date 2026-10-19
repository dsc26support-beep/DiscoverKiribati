import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${siteConfig.name}.`,
};

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Contact" }]} />
      <div className="container-prose py-10 sm:py-14">
        <h1 className="font-display text-3xl text-ocean sm:text-4xl">Contact</h1>
        <p className="mt-4 text-charcoal/85">
          For business listings, use the{" "}
          <a href="/submit-business" className="font-medium text-lagoon no-underline hover:text-ocean">
            submission form
          </a>
          . For everything else, reach {siteConfig.operatedBy} at:
        </p>

        <div className="mt-6 rounded-xl border border-grey/15 p-6">
          {siteConfig.contact.emailIsPlaceholder ? (
            <p className="text-sm text-coral">
              <strong>Setup note:</strong> no real contact email has been
              configured yet. Replace{" "}
              <code className="rounded bg-sand px-1.5 py-0.5">
                siteConfig.contact.email
              </code>{" "}
              in <code className="rounded bg-sand px-1.5 py-0.5">lib/config.ts</code>{" "}
              with a real, monitored address before launch.
            </p>
          ) : (
            <p className="text-charcoal/85">
              Email:{" "}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="font-medium text-lagoon no-underline hover:text-ocean"
              >
                {siteConfig.contact.email}
              </a>
            </p>
          )}
          {siteConfig.contact.phone && (
            <p className="mt-2 text-charcoal/85">Phone: {siteConfig.contact.phone}</p>
          )}
          <p className="mt-2 text-charcoal/85">{siteConfig.contact.location}</p>
        </div>
      </div>
    </>
  );
}
