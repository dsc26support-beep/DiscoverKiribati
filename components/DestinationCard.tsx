import Link from "next/link";
import type { Destination } from "@/lib/types";
import PlaceholderImage from "@/components/PlaceholderImage";

export default function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className="group block overflow-hidden rounded-xl border border-grey/15 bg-warm-white no-underline transition-shadow hover:shadow-lg"
    >
      <div className="aspect-[5/3] overflow-hidden">
        <PlaceholderImage label={destination.region} className="h-full w-full" />
      </div>
      <div className="p-4">
        <p className="label-caps text-lagoon">{destination.region}</p>
        <h3 className="mt-1 font-display text-lg text-ocean group-hover:text-lagoon">
          {destination.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-charcoal/80">
          {destination.introduction}
        </p>
      </div>
    </Link>
  );
}
