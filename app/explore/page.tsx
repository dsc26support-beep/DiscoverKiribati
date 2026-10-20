import { Suspense } from "react";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import ExploreDirectory from "@/components/ExploreDirectory";
import { businesses } from "@/data/businesses";

export const metadata: Metadata = {
  title: "Explore the directory",
  description:
    "Search and filter tourism businesses across Kiribati — accommodation, tours, culture, food, transport, and more.",
};

export default function ExplorePage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Explore" }]} />
      <div className="container-wide py-10 sm:py-14">
        <h1 className="font-display text-3xl text-ocean sm:text-4xl">Explore the directory</h1>
        <p className="mt-3 max-w-2xl text-charcoal/80">
          Search accommodation, tours, culture, food, transport, local
          services, shops and travel essentials across Kiribati.
          Independent businesses and Mwakete-listed sellers alike are
          welcome here.
        </p>

        <div className="mt-8">
          <Suspense fallback={<p className="text-sm text-grey">Loading directory…</p>}>
            <ExploreDirectory businesses={businesses} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
