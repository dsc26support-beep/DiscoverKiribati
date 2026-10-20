import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import ExperienceCard from "@/components/ExperienceCard";
import { experiences } from "@/data/experiences";

export const metadata: Metadata = {
  title: "Experiences",
  description: "Activities and cultural experiences across the islands of Kiribati.",
};

export default function ExperiencesPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Experiences" }]} />
      <div className="container-wide py-10 sm:py-14">
        <h1 className="font-display text-3xl text-ocean sm:text-4xl">Experiences</h1>
        <p className="mt-3 max-w-2xl text-charcoal/80">
          From lagoon paddling to cultural workshops — note that the entries
          below are sample editorial content until real experiences are
          added. Discover Kiribati does not imply a visitor can book directly
          through this site unless a working booking link is shown.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {experiences.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </div>
      </div>
    </>
  );
}
