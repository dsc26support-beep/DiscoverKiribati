import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubmitBusinessForm from "@/components/SubmitBusinessForm";

export const metadata: Metadata = {
  title: "Submit a business",
  description: "List your tourism business on Discover Kiribati.",
};

export default function SubmitBusinessPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Submit a business" }]} />
      <div className="container-prose py-10 sm:py-14">
        <h1 className="font-display text-3xl text-ocean sm:text-4xl">List your business</h1>
        <p className="mt-3 text-charcoal/80">
          Independent businesses and Mwakete sellers alike are welcome.
          Selling through Mwakete is never required for a listing.
        </p>
        <div className="mt-8">
          <SubmitBusinessForm />
        </div>
      </div>
    </>
  );
}
