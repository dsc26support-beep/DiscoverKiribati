# Discover Kiribati

An independent tourism magazine, business directory and affiliate-ready platform for Kiribati, operated by **MainKT Enterprise**. Built as a statically exported Next.js site for deployment on Cloudflare Pages.

> **Status:** development build with demonstration/sample content throughout. See [Known limitations / placeholders](#known-limitations--placeholders) before launch.

---

## 1. Project description

Discover Kiribati promotes Kiribati as a travel destination, helps travellers discover local tourism businesses and experiences, supports local entrepreneurs, and is built to support future affiliate revenue. It is explicitly **not** an official government tourism portal — see `app/about/page.tsx`.

## 2. Features

- Editorial homepage (hero, search, featured destination, interest categories, featured listings, storytelling, business spotlight, Mwakete promotion, travel-info preview, listing invitation, journal preview)
- Searchable, filterable business directory (`/explore`) — client-side search/filter by name, category and island, with clear-filters and an empty state
- Destination guides (`/destinations`, `/destinations/[slug]`) with a "needs verification" panel per island
- Business detail pages (`/businesses/[slug]`) with honest verification-status labelling
- Editorial experiences (`/experiences`, `/experiences/[slug]`)
- Journal / blog (`/journal`, `/journal/[slug]`)
- Full travel guide (`/travel-guide`)
- About, Mwakete promotion, business submission (honest mailto-based form), contact
- Legal pages: Privacy, Terms, Affiliate Disclosure, Listing Policy
- SEO: per-page metadata, Open Graph, sitemap.xml, robots.txt, favicon
- Accessible, responsive, mobile-first design system with no horizontal overflow
- Demonstration/sample content clearly labelled throughout (never presented as real)

## 3. Technology stack

- **Next.js 16** (App Router), statically exported (`output: "export"`)
- **TypeScript** (strict mode)
- **Tailwind CSS v4** (CSS-based theme in `app/globals.css`)
- No external UI libraries, no analytics, no third-party web fonts (system font stacks only)

## 4. Requirements

- Node.js 20+ (built and tested with Node 22)
- npm 10+

## 5. Installation

```bash
cd discover-kiribati
npm install
```

## 6. Local development

```bash
npm run dev
```

Visit `http://localhost:3000`.

## 7. Production build

```bash
npm run build
```

This runs `next build` with `output: "export"` and writes a fully static site to the **`out/`** directory. No Node.js server is required to host it.

To preview the exported output locally:

```bash
npx serve out
# or: cd out && python3 -m http.server 8080
```

## 8. GitHub setup

```bash
cd discover-kiribati
git init
git add .
git commit -m "Initial commit: Discover Kiribati"
```

Create a new, empty repository on GitHub (no README/license/gitignore — you already have them), then:

```bash
git remote add origin https://github.com/<your-username>/discover-kiribati.git
git branch -M main
git push -u origin main
```

## 9. Cloudflare Pages deployment

1. In the Cloudflare dashboard, go to **Workers & Pages → Create → Pages → Connect to Git**, and select this repository.
2. **Build settings:**
   - **Framework preset:** Next.js (Static HTML Export) — or "None"
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
3. Deploy. Cloudflare will rebuild and redeploy automatically on every push to `main` (automatic deployments).
4. **Custom domain:** in the Pages project → **Custom domains → Set up a custom domain**, and follow the DNS instructions. Once connected, update `productionDomain` in `lib/config.ts` to match and redeploy (this value drives canonical URLs, Open Graph tags, and the sitemap).

**Troubleshooting:**
- *Build fails with a TypeScript error about `params`:* dynamic route pages in this project use the Next.js 16 async `params` API (`params: Promise<{ slug: string }>`) — don't revert to the old synchronous shape.
- *Images 404 or look broken:* this project uses `images: { unoptimized: true }` because static export cannot run the Next.js image optimization server. Don't remove that flag without adding a different image strategy.
- *A page 404s on Cloudflare but works in `next dev`:* confirm `trailingSlash: true` in `next.config.ts` hasn't been changed, and that the Pages build output directory is set to `out`, not `.next`.

## 10. Environment configuration

No secrets are needed. These public (non-secret) variables control launch behaviour — set them in the Cloudflare Pages **production** environment:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Real production domain (canonicals, Open Graph, sitemap). Falls back to a `.example` placeholder. |
| `NEXT_PUBLIC_LAUNCH_MODE=production` | Hides development-only notices ("photography needed", setup banners, "verify before publishing"). |
| `LAUNCH_CHECK=1` | Makes `npm run build` **fail** if any placeholder remains (domain, emails, demo/sample content). Run `npm run check-launch` to test locally. |
| `NODE_VERSION=22` | Pages build image Node version (matches `.nvmrc`). |

Contact details still live in `lib/config.ts`. Demo, sample and unpublished pages are marked `noindex` automatically. Security headers and caching rules are in `public/_headers`.

## Content system

All editorial content lives in `content/<collection>/<slug>.json` (businesses, destinations, experiences, articles, affiliate-partners).

- **Validation.** `npm run validate` (also run by every `npm run build` and by CI) checks every file with Zod and enforces: unique ids/slugs; every `destination`, `relatedBusinessSlugs`, `suggestedExperienceSlugs` and `nearbyDestinationSlugs` must exist; published businesses need `lastReviewed` and cannot be "unverified"; an `affiliateUrl` needs a disclosure **and** a matching active, approved partner; images need alt text, credit and licence. A bad edit fails the build instead of reaching the site.
- **Content manager.** `/admin/` is a Decap CMS form interface (`public/admin/`). Edits are saved as pull requests (editorial workflow), so nothing goes live until it is merged. One-time setup:
  1. Create a GitHub OAuth App; set its callback URL to `https://<your-domain>/api/callback`.
  2. In Cloudflare Pages → Settings → Variables and Secrets, add `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` (secret).
  3. Give each editor write access to the repository.
  The login functions are in `functions/api/`. `/admin/` is excluded from search engines (`robots.txt`, `noindex`) and uses its own relaxed CSP in `public/_headers` because it loads Decap from unpkg.
- **Order.** Each record has an `order` number; lists and the homepage use it (lowest first).

## 11. How to add and edit businesses

Use the content manager at `/admin/` (see `ADMIN_GUIDE.md` and the **Content system** section below), or add a file `content/businesses/<slug>.json` by hand. Fill in only real, business-supplied information, set `listingStatus` to `published` once reviewed, and set `verificationStatus` honestly. `npm run validate` checks your work.

## 12. How to add destinations and articles

- Destinations: `content/destinations/*.json`
- Journal articles: `content/articles/*.json`
- Experiences: `content/experiences/*.json`

One JSON file per record (shape: `lib/types.ts`, rules: `scripts/validate-content.ts`). The `data/*.ts` modules load them and expose `getXBySlug` helpers. Adding a file automatically creates its detail page via `generateStaticParams` — no component code needs to change.

## 13. How to manage Mwakete promotions

- The homepage and `/mwakete` promotional component is `components/MwaketePromo.tsx`; its copy and link come from `lib/config.ts` (`siteConfig.mwaketeUrl`).
- To feature a business as a Mwakete seller, set `mwaketeSeller: true` on its record in `content/businesses/<slug>.json` — it will automatically appear in the "Local businesses also selling on Mwakete" section of `/mwakete` and carry the "Also on Mwakete" label elsewhere.

## 14. How to configure approved affiliate partners

Add a file to `content/affiliate-partners/`. It starts **empty** — there are no live affiliate partnerships yet. When a real, approved partnership exists:

1. Add an entry with real partner details, `approvedProgramStatus: "approved"`, and `active: true`.
2. Set `affiliateUrl` on the relevant business record(s) in `content/businesses/`, along with an honest `affiliateDisclosure` string.
3. Update `app/affiliate-disclosure/page.tsx` so it no longer says there are no active programs.

Never invent tracking IDs, SubIDs, or commission rates.

## 15. How to update the production domain

Edit `productionDomain` in `lib/config.ts`. This single value drives canonical URLs, Open Graph `url`, and every entry in `app/sitemap.ts`.

## 16. How to change contact details

Edit the `contact` object in `lib/config.ts` (email, phone, location) and `submissionEmail`. Setting `emailIsPlaceholder` / `submissionEmailIsPlaceholder` to `false` removes the on-page "setup note" warnings on `/contact` and `/submit-business`.

## 17. How to update photographs

Every image slot currently renders `components/PlaceholderImage.tsx` (a labelled gradient placeholder) because no licensed photography was available to this build. To add a real photo:

1. Place the image file in `public/images/`.
2. Replace the relevant `<PlaceholderImage ... />` usage with a standard `<img>` tag (or `next/image`, keeping `unoptimized`-compatible usage) pointing at `/images/your-file.jpg`, with descriptive `alt` text.
3. Do this page-by-page — there is no single "add all images" step, by design, so each photo is deliberately chosen and attributed/licensed correctly.

## 18. Known limitations / placeholders

| Placeholder | Where | What to do |
|---|---|---|
| `productionDomain` | `lib/config.ts` | Set the real domain once known |
| `contact.email`, `submissionEmail` | `lib/config.ts` | Replace with real, monitored inboxes |
| All business records | `content/businesses/` | `listingStatus: "demo"` — replace with real, consented listings |
| All experiences | `content/experiences/` | `isSample: true` — replace with real, fact-checked content |
| All journal articles | `content/articles/` | `publishedStatus: "sample"` — replace with real, fact-checked writing |
| Affiliate partners | `content/affiliate-partners/` | Empty by design — add only real, approved partnerships |
| All photography | throughout | Placeholder gradients everywhere — no licensed images were available to this build |
| Destination facts flagged `needsVerification` | `content/destinations/` | Transport schedules, accommodation availability, etc. — verify before publishing |
| Newsletter signup | Homepage | Intentionally omitted — spec requires a real, consented collection mechanism before this can be added |

This is not a security, legal, or compliance review — see `app/privacy/page.tsx`, which says so explicitly.

## 19. Testing commands

```bash
npm run lint       # ESLint (next/core-web-vitals, next/typescript)
npm run typecheck  # tsc --noEmit, strict mode
npm run build      # production build + static export to out/
```

## 20. Troubleshooting

- **`npm install` warns about vulnerabilities:** `npm audit` currently reports high-severity issues only in `eslint-config-next`'s transitive dev dependency (`braces`, via `fast-glob`/`micromatch`). This affects linting tooling only, is never shipped to the built site, and `npm audit fix --force` would downgrade `eslint-config-next` to Next 14, which is not wanted here. Monitor for an upstream fix.
- **ESLint errors about a "circular structure" or a legacy `.eslintrc.json`:** this project uses the ESLint 9 flat config (`eslint.config.mjs`) that re-exports `eslint-config-next`'s own flat config directly. Don't wrap it in `@eslint/eslintrc`'s `FlatCompat` — that combination is what caused the circular-JSON crash during development.
- **A dynamic route page won't typecheck:** Next.js 16's App Router passes `params` as a `Promise`; every `page.tsx` under a `[slug]` folder in this project already awaits it — follow that pattern for any new dynamic route.

---

## Hosting architecture

This site uses `output: "export"` (static export) deployed to **Cloudflare Pages**, not Cloudflare Workers. Cloudflare Pages serves the pre-built `out/` directory as static files — there is no server-side rendering, no API routes, and no middleware at runtime. If a future requirement needs genuine server-side logic (a real database-backed form, authenticated areas, on-the-fly personalization), that would require moving to a Cloudflare Workers-based Next.js deployment, which is a different, more involved setup — don't make that change without a real need, and explain the trade-off first.
