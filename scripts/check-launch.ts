/**
 * Launch guard. Run by `npm run build` via `prebuild`. It only enforces
 * anything when LAUNCH_CHECK=1 (set this in the Cloudflare Pages
 * *production* environment), so preview and development builds still work
 * with placeholder content. Run with:
 *   node --experimental-strip-types scripts/check-launch.ts
 */
import { siteConfig } from "../lib/config.ts";
import { businesses } from "../data/businesses.ts";
import { experiences } from "../data/experiences.ts";
import { articles } from "../data/articles.ts";

if (process.env.LAUNCH_CHECK !== "1") {
  console.log("check-launch: skipped (set LAUNCH_CHECK=1 to enforce).");
  process.exit(0);
}

const problems: string[] = [];

if (siteConfig.productionDomain.includes(".example")) {
  problems.push("Site domain is still the placeholder. Set NEXT_PUBLIC_SITE_URL.");
}
if (siteConfig.contact.emailIsPlaceholder) {
  problems.push("contact.email is still a placeholder (lib/config.ts).");
}
if (siteConfig.submissionEmailIsPlaceholder) {
  problems.push("submissionEmail is still a placeholder (lib/config.ts).");
}
if (process.env.NEXT_PUBLIC_LAUNCH_MODE !== "production") {
  problems.push('NEXT_PUBLIC_LAUNCH_MODE must be "production" so dev notices are hidden.');
}

const demo = businesses.filter((b) => b.listingStatus === "demo").map((b) => b.slug);
if (demo.length) problems.push(`Demo businesses remain: ${demo.join(", ")}`);

const sampleExperiences = experiences.filter((e) => e.isSample).map((e) => e.slug);
if (sampleExperiences.length) {
  problems.push(`Sample experiences remain: ${sampleExperiences.join(", ")}`);
}

const sampleArticles = articles.filter((a) => a.publishedStatus === "sample").map((a) => a.slug);
if (sampleArticles.length) problems.push(`Sample articles remain: ${sampleArticles.join(", ")}`);

if (problems.length) {
  console.error("check-launch: NOT READY FOR LAUNCH\n - " + problems.join("\n - "));
  process.exit(1);
}
console.log("check-launch: OK");
