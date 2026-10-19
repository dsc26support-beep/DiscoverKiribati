import type { Business } from "@/lib/types";

/**
 * DEMONSTRATION DATA.
 *
 * Every record below has listingStatus: "demo". None of these are real
 * businesses — they exist only to populate the directory UI during
 * development. The UI always renders a "Demonstration listing" badge for
 * any record with listingStatus !== "published", so this is never presented
 * to a visitor as genuine.
 *
 * To add a REAL business: copy the shape of one record below, set
 * listingStatus to "draft" (until reviewed) or "published", fill in only
 * information the business has actually supplied, and set
 * verificationStatus honestly. See ADMIN_GUIDE.md → "Adding a business".
 */
export const businesses: Business[] = [
  {
    id: "b1",
    slug: "tabon-te-keekee-guesthouse",
    name: "Tabon Te Keekee Guesthouse",
    category: "accommodation",
    island: "South Tarawa",
    location: "Bairiki",
    shortDescription:
      "A small family-run guesthouse on South Tarawa with simple rooms and lagoon views.",
    description:
      "A small, family-run guesthouse with a handful of simple rooms near the lagoon shore. This is a demonstration listing used to preview how an accommodation page looks — replace it with a real, business-supplied listing before launch.",
    image: null,
    gallery: [],
    website: null,
    email: null,
    phone: null,
    socialLinks: [],
    mwaketeSeller: false,
    featured: true,
    sponsored: false,
    verificationStatus: "unverified",
    listingStatus: "demo",
    affiliateUrl: null,
    affiliateDisclosure: null,
    lastReviewed: null,
  },
  {
    id: "b2",
    slug: "ocean-rhythm-outrigger-tours",
    name: "Ocean Rhythm Outrigger Tours",
    category: "tours-activities",
    island: "South Tarawa",
    location: "Betio",
    shortDescription:
      "Guided outrigger canoe trips around the lagoon, demonstration listing only.",
    description:
      "A demonstration tour operator listing used to preview the directory's card and detail layout for tours and activities. Replace with a real, verified operator before launch.",
    image: null,
    gallery: [],
    website: null,
    email: null,
    phone: null,
    socialLinks: [],
    mwaketeSeller: true,
    featured: true,
    sponsored: false,
    verificationStatus: "information-supplied-by-business",
    listingStatus: "demo",
    affiliateUrl: null,
    affiliateDisclosure: null,
    lastReviewed: null,
  },
  {
    id: "b3",
    slug: "manra-weaving-collective",
    name: "Manra Weaving Collective",
    category: "culture-community",
    island: "North Tarawa",
    location: "Abatao",
    shortDescription:
      "A community group demonstrating pandanus and coconut-leaf weaving, demonstration listing only.",
    description:
      "A demonstration cultural-experience listing representing the kind of community craft group Discover Kiribati hopes to feature. Replace with a real group once contact and permission have been confirmed.",
    image: null,
    gallery: [],
    website: null,
    email: null,
    phone: null,
    socialLinks: [],
    mwaketeSeller: false,
    featured: false,
    sponsored: false,
    verificationStatus: "details-pending-confirmation",
    listingStatus: "demo",
    affiliateUrl: null,
    affiliateDisclosure: null,
    lastReviewed: null,
  },
  {
    id: "b4",
    slug: "te-bike-cafe",
    name: "Te Bike Café",
    category: "food-dining",
    island: "South Tarawa",
    location: "Bikenibeu",
    shortDescription:
      "A demonstration café listing showing local dishes and fresh fish specials.",
    description:
      "A demonstration café listing used to preview the food and dining category. Replace with a real café once the owner has supplied and approved the details.",
    image: null,
    gallery: [],
    website: null,
    email: null,
    phone: null,
    socialLinks: [],
    mwaketeSeller: false,
    featured: false,
    sponsored: false,
    verificationStatus: "unverified",
    listingStatus: "demo",
    affiliateUrl: null,
    affiliateDisclosure: null,
    lastReviewed: null,
  },
  {
    id: "b5",
    slug: "atoll-air-charters",
    name: "Atoll Air Charters",
    category: "transport",
    island: "South Tarawa",
    location: "Bonriki",
    shortDescription:
      "A demonstration inter-island charter listing — schedules shown nowhere, as none exist yet.",
    description:
      "A demonstration transport listing. Discover Kiribati does not publish invented flight or boat schedules; a real operator's listing would link to its own official timetable.",
    image: null,
    gallery: [],
    website: null,
    email: null,
    phone: null,
    socialLinks: [],
    mwaketeSeller: false,
    featured: false,
    sponsored: false,
    verificationStatus: "unverified",
    listingStatus: "demo",
    affiliateUrl: null,
    affiliateDisclosure: null,
    lastReviewed: null,
  },
  {
    id: "b6",
    slug: "mwakete-island-crafts-stall",
    name: "Mwakete Island Crafts Stall",
    category: "shops-souvenirs",
    island: "South Tarawa",
    location: "Bairiki",
    shortDescription:
      "A demonstration seller also listed on Mwakete, shown with promoted styling.",
    description:
      "A demonstration shops-and-souvenirs listing used to preview how a Mwakete-affiliated seller is visually distinguished without implying automatic verification.",
    image: null,
    gallery: [],
    website: null,
    email: null,
    phone: null,
    socialLinks: [],
    mwaketeSeller: true,
    featured: false,
    sponsored: true,
    verificationStatus: "information-supplied-by-business",
    listingStatus: "demo",
    affiliateUrl: null,
    affiliateDisclosure: null,
    lastReviewed: null,
  },
  {
    id: "b7",
    slug: "lagoon-edge-dive-services",
    name: "Lagoon Edge Dive Services",
    category: "tours-activities",
    island: "Kiritimati",
    location: "London",
    shortDescription:
      "A demonstration dive and snorkel operator listing for Kiritimati (Christmas Island).",
    description:
      "A demonstration listing used to preview a Kiritimati-based operator. Replace with a real, verified dive operator before launch.",
    image: null,
    gallery: [],
    website: null,
    email: null,
    phone: null,
    socialLinks: [],
    mwaketeSeller: false,
    featured: true,
    sponsored: false,
    verificationStatus: "unverified",
    listingStatus: "demo",
    affiliateUrl: null,
    affiliateDisclosure: null,
    lastReviewed: null,
  },
  {
    id: "b8",
    slug: "betio-essentials-store",
    name: "Betio Essentials Store",
    category: "travel-essentials",
    island: "South Tarawa",
    location: "Betio",
    shortDescription:
      "A demonstration general store listing for travel essentials and supplies.",
    description:
      "A demonstration listing used to preview the travel-essentials category. Replace with a real store once details are confirmed.",
    image: null,
    gallery: [],
    website: null,
    email: null,
    phone: null,
    socialLinks: [],
    mwaketeSeller: false,
    featured: false,
    sponsored: false,
    verificationStatus: "unverified",
    listingStatus: "demo",
    affiliateUrl: null,
    affiliateDisclosure: null,
    lastReviewed: null,
  },
];

export function getBusinessBySlug(slug: string): Business | undefined {
  return businesses.find((b) => b.slug === slug);
}

export function getFeaturedBusinesses(): Business[] {
  return businesses.filter((b) => b.featured);
}

export function getBusinessesByCategory(category: string): Business[] {
  return businesses.filter((b) => b.category === category);
}
