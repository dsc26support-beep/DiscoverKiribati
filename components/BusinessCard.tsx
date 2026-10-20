import Link from "next/link";
import type { Business } from "@/lib/types";
import { categoryLabels } from "@/lib/labels";
import PlaceholderImage from "@/components/PlaceholderImage";
import DisclosureLabel from "@/components/DisclosureLabel";

export default function BusinessCard({ business }: { business: Business }) {
  return (
    <Link
      href={`/businesses/${business.slug}`}
      className="group block overflow-hidden rounded-xl border border-grey/15 bg-warm-white no-underline transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <PlaceholderImage label={business.island} className="h-full w-full" />
        {business.sponsored && (
          <span className="absolute left-3 top-3">
            <DisclosureLabel kind="sponsored" />
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="label-caps text-lagoon">{categoryLabels[business.category]}</p>
        <h3 className="mt-1 font-display text-lg text-ocean group-hover:text-lagoon">
          {business.name}
        </h3>
        <p className="mt-1 text-sm text-grey">{business.island}</p>
        <p className="mt-2 line-clamp-2 text-sm text-charcoal/80">
          {business.shortDescription}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {business.listingStatus === "demo" && <DisclosureLabel kind="demo" />}
          {business.mwaketeSeller && <DisclosureLabel kind="mwakete" />}
        </div>
      </div>
    </Link>
  );
}
