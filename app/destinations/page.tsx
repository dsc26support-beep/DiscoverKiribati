import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import DestinationCard from "@/components/DestinationCard";
import { destinations } from "@/data/destinations";

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "Discover the islands of Kiribati — from South Tarawa to the remote Line Islands.",
};

export default function DestinationsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Destinations" }]} />
      <div className="container-wide py-10 sm:py-14">
        <h1 className="font-display text-3xl text-ocean sm:text-4xl">Destinations</h1>
        <p className="mt-3 max-w-2xl text-charcoal/80">
          Kiribati spans 33 atolls and reef islands across the Gilbert,
          Phoenix and Line Islands groups. Not every island has the same
          facilities or transport connections — each guide below notes what
          still needs verification before you travel.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </div>
    </>
  );
}
