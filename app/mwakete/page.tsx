import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import MwaketePromo from "@/components/MwaketePromo";
import BusinessCard from "@/components/BusinessCard";
import { businesses } from "@/data/businesses";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Mwakete Marketplace",
  description: `Mwakete is an online marketplace associated with ${siteConfig.operatedBy}.`,
};

export default function MwaketePage() {
  const mwaketeSellers = businesses.filter((b) => b.mwaketeSeller);

  return (
    <>
      <Breadcrumbs items={[{ label: "Mwakete" }]} />
      <div className="container-wide space-y-10 py-10 sm:py-14">
        <MwaketePromo />

        <section>
          <h2 className="font-display text-2xl text-ocean">
            Local businesses also selling on Mwakete
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-charcoal/80">
            These directory listings are run by businesses that also sell
            through Mwakete. Featured placement here reflects that
            relationship — it is not a verification or quality endorsement,
            and independent businesses not on Mwakete remain fully eligible
            for the directory.
          </p>

          {mwaketeSellers.length > 0 ? (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {mwaketeSellers.map((business) => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </div>
          ) : (
            <p className="mt-6 text-sm text-grey">
              No Mwakete-affiliated sellers are listed yet.
            </p>
          )}
        </section>
      </div>
    </>
  );
}
