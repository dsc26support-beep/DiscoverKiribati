import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import SafeExternalLink from "@/components/SafeExternalLink";
import { showDevNotices } from "@/lib/config";

export const metadata: Metadata = {
  title: "Travel Guide",
  description: "Practical guidance for planning a trip to Kiribati.",
};

const sections: { heading: string; body: string; verify?: boolean }[] = [
  {
    heading: "Planning a visit",
    body: "Kiribati is remote, and many outer islands have limited flight frequency and facilities. Build extra flexibility into any itinerary that includes travel beyond South Tarawa.",
  },
  {
    heading: "Getting to and around Kiribati",
    body: "International flights connect to Bonriki International Airport on South Tarawa. Domestic connections to outer islands are operated separately and schedules change — confirm current routing and frequency directly with an airline before booking.",
    verify: true,
  },
  {
    heading: "Accommodation",
    body: "South Tarawa has the widest range of accommodation. Options narrow considerably on outer islands — arrange lodging in advance through a local contact where possible.",
  },
  {
    heading: "Weather and seasonal considerations",
    body: "Kiribati has a tropical climate with a wet and dry season that varies across the island groups, and the wider region can be affected by tropical cyclones at certain times of year. Check current forecasts and official advisories before and during travel.",
    verify: true,
  },
  {
    heading: "Connectivity and internet",
    body: "Internet access has been expanding in Kiribati but remains more limited and slower on outer islands than on South Tarawa. Do not assume reliable connectivity away from the capital.",
  },
  {
    heading: "Currency and payment considerations",
    body: "Kiribati uses the Australian dollar. Cash is the most reliable way to pay outside the main commercial areas of South Tarawa — confirm current card acceptance locally.",
    verify: true,
  },
  {
    heading: "Local customs and respectful travel",
    body: "I-Kiribati culture places a strong value on community, modesty, and respect for local customs. Dress modestly, ask before photographing people, and follow the lead of local hosts.",
  },
  {
    heading: "Packing suggestions",
    body: "Lightweight, modest clothing, reef-safe sun protection, a reusable water bottle, and any specific medication you need are sensible to bring — pharmacy and shopping options are limited outside South Tarawa.",
  },
  {
    heading: "Health, safety and emergency preparation",
    body: "Medical facilities are concentrated on South Tarawa and limited elsewhere. Arrange travel insurance that covers medical evacuation, and check current health advisories with a travel clinic before departure.",
    verify: true,
  },
  {
    heading: "Remote-island travel considerations",
    body: "Travel to the outer Gilbert Islands, the Phoenix Islands, or the Line Islands (including Kiritimati) can involve long gaps between flights or ships. Plan for self-sufficiency and confirm return transport before departing South Tarawa.",
  },
];

export default function TravelGuidePage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Travel Guide" }]} />
      <div className="container-prose py-10 sm:py-14">
        <h1 className="font-display text-3xl text-ocean sm:text-4xl">Travel Guide</h1>
        <p className="mt-3 text-charcoal/80">
          General guidance for planning a trip to Kiribati. This is not a
          substitute for official government travel advice — sections marked
          below should be checked against a current, authoritative source
          before you travel.
        </p>

        <div className="mt-10 space-y-10">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-display text-xl text-ocean">{section.heading}</h2>
              <p className="mt-2 text-charcoal/85">{section.body}</p>
              {showDevNotices && section.verify && (
                <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-coral">
                  Verify against a current, official source before publishing
                </p>
              )}
            </section>
          ))}

          <section className="rounded-xl border border-grey/15 bg-sand p-6">
            <h2 className="font-display text-xl text-ocean">Useful official resources</h2>
            <p className="mt-2 text-sm text-charcoal/80">
              Always check your own government&apos;s travel advisory and
              official Kiribati government sources for the most current
              entry requirements, health guidance, and safety information.
            </p>
            <SafeExternalLink
              href="https://www.mfa.gov.ki/"
              className="mt-3 inline-block text-sm font-semibold text-lagoon no-underline hover:text-ocean"
            >
              Kiribati Ministry of Foreign Affairs & Immigration →
            </SafeExternalLink>
          </section>
        </div>
      </div>
    </>
  );
}
