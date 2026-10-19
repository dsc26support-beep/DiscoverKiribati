import type { Destination } from "@/lib/types";

/**
 * Editorial destination content. General geographic framing is based on
 * well-established facts about Kiribati's islands. Anything that changes
 * over time (transport links, population, facilities) is deliberately left
 * out or flagged in needsVerification rather than invented — see
 * README.md "Content and truthfulness".
 */
export const destinations: Destination[] = [
  {
    id: "d1",
    slug: "south-tarawa",
    name: "South Tarawa",
    region: "Gilbert Islands",
    introduction:
      "South Tarawa is Kiribati's capital area and the country's main hub — a narrow, densely settled chain of islets connected by causeways, home to government offices, the international airport, and most of the country's shops, guesthouses and services.",
    geography:
      "A thin arc of reef islets enclosing a lagoon, South Tarawa stretches from Betio in the west to Tanaea in the east. Its narrowness means the ocean side and lagoon side are often only a short walk apart.",
    practicalNotes:
      "Most visitors arrive and begin their trip here, since Bonriki International Airport is on South Tarawa. Getting to other islands typically means a connecting flight or boat — confirm current options with an airline, shipping operator, or the Kiribati Tourism Authority before booking.",
    suggestedExperienceSlugs: ["lagoon-canoe-paddle", "betio-ww2-heritage-walk"],
    nearbyDestinationSlugs: ["north-tarawa", "abaiang"],
    needsVerification: [
      "Current domestic flight and ferry schedules to other islands.",
      "Any entry or movement restrictions that may apply to visitors.",
    ],
    image: null,
  },
  {
    id: "d2",
    slug: "north-tarawa",
    name: "North Tarawa",
    region: "Gilbert Islands",
    introduction:
      "North Tarawa is the quieter, less developed half of Tarawa atoll — a string of villages connected mostly by reef flats and causeways rather than paved roads, offering a slower pace than the capital area to its south.",
    geography:
      "Separated from South Tarawa by a natural channel, North Tarawa retains a more traditional, village-based way of life, with coconut groves, mangroves, and small settlements along the lagoon shore.",
    practicalNotes:
      "Travel between South and North Tarawa is typically by boat across the channel, or on foot across the reef flat at low tide with a local guide. Plan around tides and confirm transport locally.",
    suggestedExperienceSlugs: [],
    nearbyDestinationSlugs: ["south-tarawa", "abaiang"],
    needsVerification: [
      "Current boat transfer options and typical crossing times.",
      "Accommodation availability, if any, on North Tarawa itself.",
    ],
    image: null,
  },
  {
    id: "d3",
    slug: "abaiang",
    name: "Abaiang",
    region: "Gilbert Islands",
    introduction:
      "Abaiang is a large lagoon atoll just north of Tarawa, known for its broad lagoon, traditional villages, and relative closeness to the capital compared with Kiribati's more remote outer islands.",
    geography:
      "A classic Gilbert Islands atoll, Abaiang encloses a wide lagoon with numerous islets, making it a popular subject for boat trips and lagoon exploration from Tarawa.",
    practicalNotes:
      "Reaching Abaiang usually involves a short domestic flight or an inter-island boat from Tarawa. Facilities are more limited than on South Tarawa, so travellers should plan supplies and accommodation in advance with a local contact.",
    suggestedExperienceSlugs: [],
    nearbyDestinationSlugs: ["south-tarawa", "north-tarawa", "butaritari"],
    needsVerification: [
      "Current flight frequency and typical fares to Abaiang.",
      "Accommodation options currently operating on the island.",
    ],
    image: null,
  },
  {
    id: "d4",
    slug: "butaritari",
    name: "Butaritari",
    region: "Gilbert Islands",
    introduction:
      "Butaritari, in Kiribati's northern Gilbert Islands, is often described as one of the greenest and most fertile atolls in the country, with lush vegetation and a lagoon well known among sport-fishing visitors.",
    geography:
      "Unlike many thinner atolls, Butaritari has notably wide, fertile land areas, supporting dense coconut and breadfruit groves alongside its lagoon and reef systems.",
    practicalNotes:
      "Butaritari is a remote outer island; travel typically requires a domestic flight from Tarawa, and facilities for independent travellers are limited. Specialist sport-fishing operators sometimes arrange trips here — confirm directly with any operator before booking.",
    suggestedExperienceSlugs: [],
    nearbyDestinationSlugs: ["abaiang"],
    needsVerification: [
      "Current flight schedule and any lodging available to independent travellers.",
      "Which, if any, licensed tour or fishing operators currently run trips to Butaritari.",
    ],
    image: null,
  },
  {
    id: "d5",
    slug: "kiritimati",
    name: "Kiritimati (Christmas Island)",
    region: "Line Islands",
    introduction:
      "Kiritimati, also known as Christmas Island, is one of the largest coral atolls on Earth by land area and sits far from South Tarawa in the Line Islands, closer to Hawai'i than to the Gilbert Islands group. It is internationally known among anglers for its flats fishing and among birders for its seabird colonies.",
    geography:
      "Kiritimati's land area is dominated by a vast lagoon system and extensive flats, with the main settlement of London serving as the island's hub.",
    practicalNotes:
      "Kiritimati has its own international and domestic air links, separate from the Gilbert Islands' internal network, given the distance involved. Confirm current flight routing — including whether travel connects via Tarawa, Fiji, or another hub — directly with an airline before planning a visit.",
    suggestedExperienceSlugs: [],
    nearbyDestinationSlugs: [],
    needsVerification: [
      "Current international and domestic flight routes serving Kiritimati.",
      "Up-to-date list of licensed fishing lodges and tour operators.",
    ],
    image: null,
  },
];

export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug);
}
