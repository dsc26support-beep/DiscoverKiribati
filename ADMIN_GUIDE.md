# Admin Guide (for the site owner — no coding experience required)

This guide explains how to maintain Discover Kiribati day-to-day. It assumes you (or whoever helps you) can open files in a text editor and ask a developer to run `npm run build` and redeploy when you're done — you don't need to understand code to follow the steps below, but someone will need to do the "save and redeploy" step for you unless you're comfortable with that yourself.

## Where everything lives

| What | File |
|---|---|
| Business listings | `data/businesses.ts` |
| Destinations (islands) | `data/destinations.ts` |
| Experiences | `data/experiences.ts` |
| Journal articles | `data/articles.ts` |
| Affiliate partners | `data/affiliate-partners.ts` |
| Contact details, domain, Mwakete link | `lib/config.ts` |

## Adding a business

1. Open `data/businesses.ts`.
2. Copy one of the existing entries (everything between one `{` and the matching `}`).
3. Paste it in, and change each value:
   - `id`: a short unique code, e.g. `"b9"`
   - `slug`: a web-address-friendly version of the name, e.g. `"my-guesthouse"` (lowercase, hyphens, no spaces)
   - `name`, `category`, `island`, `location`, `shortDescription`, `description`: fill in only what the business actually told you
   - `listingStatus`: use `"draft"` while you're still reviewing it, or `"published"` once it's ready to go live (it will **not** appear as a demonstration listing once published)
   - `verificationStatus`: be honest —
     - `"information-supplied-by-business"` if the business gave you the details
     - `"details-pending-confirmation"` if something is still unconfirmed
     - `"unverified"` if you haven't checked anything yet
4. Save the file, and have it rebuilt and redeployed.

**Never invent** a phone number, email, website, or price for a business. Leave a field `null` if you don't have real information for it.

## Correcting inaccurate information

Find the business, destination, experience, or article in its data file and edit the relevant field directly. There's no separate "edit mode" — the data file **is** the content.

## Replacing images

Every page currently shows a plain coloured placeholder instead of a photo, because no licensed photography was available when this site was built. To add a real photo, you'll need a developer to:

1. Save your image file into the `public/images/` folder.
2. Swap the placeholder for that image on the specific page.

This is deliberately done one photo at a time, so nothing gets published without someone actually choosing and checking it.

## Reviewing business submissions

The "List your business" form doesn't send submissions straight into the website. Instead, it opens the visitor's own email program with a ready-made message addressed to your configured submission email (see `lib/config.ts` → `submissionEmail`). When you receive one of these emails:

1. Check the details are genuine and the business actually wants to be listed.
2. Add it to `data/businesses.ts` following "Adding a business" above.
3. Reply to the business to let them know it's live (or ask for more information first).

## Labelling paid placements

To mark a listing as sponsored/paid, set `sponsored: true` on its entry in `data/businesses.ts`. It will automatically show a "Sponsored placement" label on its card and detail page. To mark a business as also selling on Mwakete, set `mwaketeSeller: true` the same way.

## Updating affiliate links

Affiliate partnerships start **empty** on purpose — there are none yet. When you have a real, approved affiliate partnership:

1. Open `data/affiliate-partners.ts` and add an entry with the partner's real name, website, and your actual affiliate URL.
2. On the relevant business's entry in `data/businesses.ts`, set `affiliateUrl` to that link and `affiliateDisclosure` to a short, honest sentence about the commercial relationship.
3. Update the wording on the "Affiliate Disclosure" page (`app/affiliate-disclosure/page.tsx`) so it reflects that a real partnership now exists.

**Never** make up a referral code, tracking ID, or commission percentage.

## Full list of placeholders to replace before launch

See the "Known limitations / placeholders" table in `README.md` — it lists every placeholder in the project (domain, contact emails, demo listings, sample articles, and so on) with where to find and fix each one.
