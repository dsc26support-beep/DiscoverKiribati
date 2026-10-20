import type { BusinessCategory, ArticleCategory, VerificationStatus } from "@/lib/types";

export const categoryLabels: Record<BusinessCategory, string> = {
  accommodation: "Accommodation",
  "tours-activities": "Tours & Activities",
  "culture-community": "Culture & Community",
  "food-dining": "Food & Dining",
  transport: "Transport",
  "local-services": "Local Services",
  "shops-souvenirs": "Shops & Souvenirs",
  "travel-essentials": "Travel Essentials",
};

export const articleCategoryLabels: Record<ArticleCategory, string> = {
  "destination-guides": "Destination Guides",
  "culture-traditions": "Culture & Traditions",
  food: "Food",
  "ocean-nature": "Ocean & Nature",
  "community-stories": "Community Stories",
  "travel-planning": "Travel Planning",
  "local-business-features": "Local Business Features",
};

export const verificationLabels: Record<VerificationStatus, string> = {
  "information-supplied-by-business": "Information supplied by business",
  "details-pending-confirmation": "Details pending confirmation",
  unverified: "Unverified — not yet confirmed",
};
