import type { Experience } from "@/lib/types";

/**
 * Sample/demonstration experiences. isSample: true on every record — the UI
 * renders a "Sample content" badge for these. Replace with real,
 * fact-checked editorial content before launch (see ADMIN_GUIDE.md).
 */
export const experiences: Experience[] = [
  {
    id: "e1",
    slug: "lagoon-canoe-paddle",
    title: "Paddle the South Tarawa lagoon at sunset",
    introduction:
      "A sample experience entry describing a guided outrigger canoe paddle along the calm lagoon side of South Tarawa.",
    description:
      "This is sample editorial content showing how an experience entry looks, pairing a short introduction with practical and safety notes. It should be replaced with a verified, real experience description — ideally written with input from a local guide or operator — before publication.",
    island: "South Tarawa",
    relatedBusinessSlugs: ["ocean-rhythm-outrigger-tours"],
    safetyNotes:
      "Sample note: always confirm a life jacket is provided, check weather and lagoon conditions with your guide, and avoid paddling alone after dark.",
    bookingUrl: null,
    image: null,
    isSample: true,
  },
  {
    id: "e2",
    slug: "betio-ww2-heritage-walk",
    title: "A walking tour of Betio's WWII heritage sites",
    introduction:
      "A sample experience entry for a self-guided or guided walk past Betio's Second World War coastal defences and memorials.",
    description:
      "Betio was the site of significant fighting during the Second World War, and remnants of coastal gun emplacements and memorials remain visible today. This entry is sample content and should be replaced with verified historical detail and current site information, ideally sourced with a local historian or the relevant heritage authority.",
    island: "South Tarawa",
    relatedBusinessSlugs: [],
    safetyNotes:
      "Sample note: some structures are old and unstable — stay on marked paths and do not climb on fortifications.",
    bookingUrl: null,
    image: null,
    isSample: true,
  },
  {
    id: "e3",
    slug: "pandanus-weaving-workshop",
    title: "Learn pandanus-leaf weaving with a local collective",
    introduction:
      "A sample cultural-experience entry representing a hands-on weaving session with a community group.",
    description:
      "Sample content illustrating how a community cultural experience could be presented — introduction, practical notes, and a link to the hosting business. Replace with a real, consented listing before publication.",
    island: "North Tarawa",
    relatedBusinessSlugs: ["manra-weaving-collective"],
    safetyNotes: null,
    bookingUrl: null,
    image: null,
    isSample: true,
  },
];

export function getExperienceBySlug(slug: string): Experience | undefined {
  return experiences.find((e) => e.slug === slug);
}
