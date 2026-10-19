import Link from "next/link";
import type { Experience } from "@/lib/types";
import PlaceholderImage from "@/components/PlaceholderImage";
import DisclosureLabel from "@/components/DisclosureLabel";

export default function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <Link
      href={`/experiences/${experience.slug}`}
      className="group block overflow-hidden rounded-xl border border-grey/15 bg-warm-white no-underline transition-shadow hover:shadow-lg"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <PlaceholderImage label={experience.island} className="h-full w-full" />
      </div>
      <div className="p-4">
        <p className="label-caps text-lagoon">{experience.island}</p>
        <h3 className="mt-1 font-display text-lg text-ocean group-hover:text-lagoon">
          {experience.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-charcoal/80">
          {experience.introduction}
        </p>
        {experience.isSample && (
          <div className="mt-3">
            <DisclosureLabel kind="sample" />
          </div>
        )}
      </div>
    </Link>
  );
}
