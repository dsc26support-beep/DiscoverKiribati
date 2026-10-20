# LIVE handoff: Discover Kiribati
Updated 2026-10-20. Branch claude/optimistic-franklin-g1xbdy, PR #1 (draft) -> main.

## Goal
Take uploaded Next.js 16 static site (tourism magazine + business directory, MainKT Enterprise, Cloudflare Pages) from demo to launchable. User asked for review, then Phases 1-3 of roadmap; "best choices for the product".

## Next steps
1. Get a preview live: Netlify project `discover-kiribati-preview` (site id 80dfd154-77d1-41b7-b578-cc045cb416f2) exists, EMPTY, no deploy. User must either link GitHub repo in Netlify UI (prod branch = PR branch) or allow *.netlify.app + netlify.com in env Network access, then rerun `npx @netlify/mcp deploy` (get fresh command via Netlify deploy-site tool; token expires, not stored).
2. Phase 4 (not started): JSON-LD, sitemap lastModified, OG image, URL-synced explore filters, image pipeline (sharp, srcset), Gilbertese i18n (/en,/gil), a11y (menu Esc/focus), Vitest+Playwright, Lighthouse CI.
3. Business form endpoint (replace mailto): Cloudflare Pages Function + Turnstile. BLOCKED on owner: where submissions go, email/storage provider, Turnstile key.
4. Update PR body if scope changes; PR currently describes 3 commits (netlify.toml commit 733d6cd not mentioned).

## State
- Pushed commits: baseline import 3a5ed38, launch safety 1011dbf, content system 6ec7a56, netlify.toml 733d6cd. CI `verify` (lint,typecheck,build) green on 6ec7a56; PR mergeable, 0 review comments.
- main = empty root commit 1583459 (created because repo had none); branch was rebased/force-pushed once onto it.
- Local: lint/typecheck/build pass; `npm run validate` OK (8 biz, 5 dest, 3 exp, 3 art, 0 partners).

## Decisions + why
- Static export kept; form endpoint can use Pages Functions without leaving Pages (README claim of needing Workers was too strong).
- Content -> content/<collection>/<slug>.json + Zod validator (scripts/validate-content.ts, prebuild) so non-coders edit via Decap CMS (/admin, editorial_workflow = PRs) and bad edits fail the build.
- `island` string -> `destination` slug ref; fixed real bug (Kiritimati biz missing from its destination page).
- Launch guard only enforces when LAUNCH_CHECK=1 (Cloudflare prod env) so previews still build.
- Article body kept string[] (MDX deferred: build complexity, CMS-unfriendly).
- Per-collection defaults in lib/content.ts because CMS omits empty fields.
- Stacked all phases on the one PR branch (session only allows that branch).

## Gotchas
- No real domain/emails: lib/config.ts placeholders; `LAUNCH_CHECK=1 npm run check-launch` lists blockers (7 items).
- OAuth for CMS needs GitHub OAuth App + Cloudflare secrets GITHUB_CLIENT_ID/SECRET (callback /api/callback). Untested with real GitHub; only mocked + login screen in Chromium.
- unpkg.com and Netlify hosts blocked by sandbox network policy; Decap tested from npm-packed local copy.
- public/_headers uses Cloudflare-only `! Content-Security-Policy` detach for /admin; Netlify may ignore/warn.
- Dev notices shown unless NEXT_PUBLIC_LAUNCH_MODE=production; previews show demo content.
- Never `pkill -f` a pattern contained in own command line (killed shell once).
- Stop hook wants this file committed alone: git add .handoff/LIVE.md only.

## Open questions
- Hosting: Cloudflare Pages (README) vs Netlify (preview)? Real domain?
- Who receives business submissions; which email provider?
- Merge PR #1 now or after owner review? Set main as default branch?
- Native Gilbertese reviewer available?
