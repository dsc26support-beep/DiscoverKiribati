export type BusinessCategory =
  | "accommodation"
  | "tours-activities"
  | "culture-community"
  | "food-dining"
  | "transport"
  | "local-services"
  | "shops-souvenirs"
  | "travel-essentials";

export type VerificationStatus =
  | "information-supplied-by-business"
  | "details-pending-confirmation"
  | "unverified";

export type ListingStatus = "demo" | "draft" | "published";

export interface Business {
  id: string;
  slug: string;
  name: string;
  category: BusinessCategory;
  island: string;
  location: string | null;
  shortDescription: string;
  description: string;
  image: string | null;
  gallery: string[];
  website: string | null;
  email: string | null;
  phone: string | null;
  socialLinks: { label: string; url: string }[];
  mwaketeSeller: boolean;
  featured: boolean;
  sponsored: boolean;
  verificationStatus: VerificationStatus;
  listingStatus: ListingStatus;
  affiliateUrl: string | null;
  affiliateDisclosure: string | null;
  lastReviewed: string | null;
}

export interface Destination {
  id: string;
  slug: string;
  name: string;
  region: "Gilbert Islands" | "Phoenix Islands" | "Line Islands";
  introduction: string;
  geography: string;
  practicalNotes: string;
  suggestedExperienceSlugs: string[];
  nearbyDestinationSlugs: string[];
  needsVerification: string[];
  image: string | null;
}

export interface Experience {
  id: string;
  slug: string;
  title: string;
  introduction: string;
  description: string;
  island: string;
  relatedBusinessSlugs: string[];
  safetyNotes: string | null;
  bookingUrl: string | null;
  image: string | null;
  isSample: boolean;
}

export type ArticleCategory =
  | "destination-guides"
  | "culture-traditions"
  | "food"
  | "ocean-nature"
  | "community-stories"
  | "travel-planning"
  | "local-business-features";

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: ArticleCategory;
  summary: string;
  body: string[];
  publishedStatus: "sample" | "unpublished" | "published";
  image: string | null;
}

export interface AffiliatePartner {
  id: string;
  partnerName: string;
  partnerWebsite: string;
  approvedProgramStatus: "not-yet-approved" | "approved" | "inactive";
  affiliateUrl: string | null;
  disclosureText: string;
  active: boolean;
  lastReviewed: string;
}
