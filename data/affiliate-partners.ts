import type { AffiliatePartner } from "@/lib/types";

/**
 * Affiliate partner registry. Every entry is currently inactive —
 * Discover Kiribati has no live affiliate partnerships yet. Do NOT invent
 * affiliate IDs, tracking parameters, or commission rates. When a real
 * partnership is approved, add an entry here with active: true and a real
 * affiliateUrl; the site reads from this file wherever it needs to decide
 * whether to show a "Check availability" link or a plain informational one.
 */
export const affiliatePartners: AffiliatePartner[] = [];
