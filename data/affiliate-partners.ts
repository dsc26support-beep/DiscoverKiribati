import type { AffiliatePartner } from "@/lib/types";
import { readCollection } from "@/lib/content";

/**
 * Affiliate partner registry (content/affiliate-partners/*.json). Empty
 * today — there are no live affiliate partnerships. Do NOT invent affiliate
 * IDs, tracking parameters or commission rates. The content validator
 * refuses any business `affiliateUrl` that is not backed by an active,
 * approved partner here.
 */
export const affiliatePartners = readCollection<AffiliatePartner>("affiliate-partners");
