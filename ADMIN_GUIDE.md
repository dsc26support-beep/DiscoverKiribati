# Admin Guide (for the site owner — no coding experience required)

All content is edited in the **Content Manager** at `https://<your-domain>/admin/`. You sign in with GitHub, fill in simple forms, and press **Save** then **Publish**. Nothing goes live until your change is reviewed and merged — and the website refuses to build if a record is incomplete or contradicts another (for example, a business pointing at an island that does not exist).

> First-time setup of the Content Manager (GitHub login) is a one-off job for a developer — see "Content system" in `README.md`.

## What you can edit

| Collection | What it is |
|---|---|
| Businesses | Directory listings |
| Destinations | Island guides |
| Experiences | Things to do |
| Journal articles | Blog posts |

Advanced users can also edit the files directly in `content/<collection>/<slug>.json` on GitHub. Contact details, the domain and the Mwakete link live in `lib/config.ts`.

## Adding a business

1. Open **Businesses → New Business**.
2. Fill in the form. Only enter what the business actually told you:
   - **ID**: a short unique code, e.g. `b9`. **Web address name**: lowercase with hyphens, e.g. `my-guesthouse`. **Display order**: a number (lowest shows first).
   - **Island / destination**: pick from the list.
   - **Listing status**: `Draft` while you review, `Published` when ready. (`Demo` is for sample data only.)
   - **Verification status** — be honest:
     - *Information supplied by business* — they gave you the details.
     - *Details pending confirmation* — something is still unconfirmed.
     - *Unverified* — you have not checked anything. Unverified listings **cannot** be published.
   - **Last reviewed**: today's date as `YYYY-MM-DD` — required for Published listings.
3. **Never invent** a phone number, email, website or price. Leave the box empty if you do not have it.
4. Press **Save**, then set the status to **Ready**, then **Publish**. This creates a change for review; once merged, the site rebuilds.

If the form is incomplete the build will fail with a plain message such as `businesses/my-guesthouse: published listings need lastReviewed` — fix that field and save again.

## Correcting inaccurate information

Open the record in the Content Manager, change the field, and publish. There is no separate "edit mode".

## Photos

In a record, open **Photo** and upload the file. You must also fill in:
- **Alt text** — a short description for people using screen readers,
- **Photographer / source**, and
- **Licence or permission** — e.g. "Owned by business, permission granted".

A photo missing any of these will not build. (Photos are not shown on pages yet — a developer still needs to swap each `PlaceholderImage` for the real image.)

## Reviewing business submissions

The "List your business" form currently opens the visitor's email program with a ready-made message to your submission email (`lib/config.ts` → `submissionEmail`). When one arrives:
1. Check the details are genuine and the business wants to be listed.
2. Add it as a **Draft** in the Content Manager, then publish once reviewed.
3. Reply to let them know (or ask for more information).

## Paid placements and Mwakete

- Tick **Paid / sponsored placement** to show the "Sponsored placement" label.
- Tick **Also sells on Mwakete** to show the "Also on Mwakete" label and list it on the Mwakete page.

## Affiliate links

There are no affiliate partnerships yet, on purpose. When you have a real, approved one:
1. Add the partner under `content/affiliate-partners/` (ask a developer) with its real details, `approved` status and `active` switched on.
2. On the business, set the **Affiliate link** to exactly the partner's link and write an honest **Affiliate disclosure**. The site will refuse to build if no active, approved partner matches.
3. Update the wording on the Affiliate Disclosure page.

**Never** make up a referral code, tracking ID or commission rate.

## Before launch

See "Known limitations / placeholders" in `README.md` and run `npm run check-launch` — it lists everything still to replace (domain, emails, demo and sample content).
