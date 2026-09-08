# The Turquoise Dot website

Website of **The Turquoise Dot**, Singapore's Turkish and Turkic tech and research community.
Live at: https://turquoisedot.org/ (GitHub Pages; theturquoisedot.github.io redirects here).

## How this site works

- Plain static HTML with **no build system and no dependencies**. GitHub Pages serves the files directly.
- Shared pieces live in `assets/`: `site.css` (all styling), `site.js` (menu, time-aware content, form embed, analytics), the hero image, the social-share image (`og-image.jpg`), and the favicon.
- Every page is a folder with an `index.html`, so URLs stay clean (`/sponsors/`, `/events/2026-05-cybersecurity-and-ai/`).
- `.nojekyll` tells GitHub Pages to skip the Jekyll build. Keep it.

```
index.html                                  landing page
sponsors/index.html                         partnership page with the interest form
events/index.html                           list of all events
events/YYYY-MM-slug/index.html              one page per event
assets/site.css, assets/site.js             shared styling and behaviour
assets/events/YYYY-MM-slug/*.webp           event photos (optional)
sitemap.xml, robots.txt, CNAME, .nojekyll   keep as they are
```

## Common edits (for future officers)

- **Announce the next event:** in `index.html`, edit the `ANNOUNCEMENT BAR` block and the `SPOTLIGHT` block (text, speakers, Luma link) and set both `data-until` values to the event's end time, e.g. `2026-12-10T20:30:00+08:00`. Both blocks hide themselves automatically after that moment, so the site never shows a stale "next event".
- **Add an event:** copy an existing folder under `events/` (for example `events/2026-05-cybersecurity-and-ai/`) to `events/YYYY-MM-slug/`, edit its `index.html` (title, dates, venue, speakers, programme, recap, the JSON-LD block near the top), then add a card to `index.html` (the `EVENT CARDS` block) and to `events/index.html`, and add the URL to `sitemap.xml`. On an upcoming event's card, keep `data-until` and `data-past="chip"` so its red "next" chip and "Register" link switch to "Recap" automatically after the date.
- **Add photos to an event page:** export 6 to 10 photos as WebP, each under 300 KB, into `assets/events/YYYY-MM-slug/`, then add a `GALLERY` section following the pattern in `events/2025-12-kickoff/index.html`. Prefer stage and crowd shots; ask before publishing close-ups of identifiable attendees.
- **Add a short video to an event page:** encode it as MP4 (H.264, under about 3 MB, `-movflags +faststart`) with a poster JPG, put both in `assets/events/YYYY-MM-slug/`, and copy the `WATCH` section from `events/2026-05-cybersecurity-and-ai/index.html`. No YouTube embed is needed for clips this short.
- **Sponsorship form:** the page uses a Google Form owned by the community Google account. Paste the form's embed URL into `data-form-src` in `sponsors/index.html` (Google Forms: Send, then the `<>` tab, the value inside `src="..."`). While it is empty the page shows an email fallback.
- **Latest posts:** the `LATEST POSTS` section in `index.html` has two parts. The newest LinkedIn post goes in as an official embed: open the post on LinkedIn, choose "Embed this post", and paste the `<iframe>` inside the `li-embed` div. The cards below come from `assets/posts.js`: add the newest at the top, remove the oldest, keep 3 to 6. The section hides itself while both are empty.
- **Update stats:** edit the `<div class="stat">` blocks in `index.html` and the `reach` block in `sponsors/index.html`.
- **Change the contact email:** search for `turquoisedotsg@gmail.com` across all pages (it appears in the JSON-LD too). Prefer a role address on the domain (for example `hello@turquoisedot.org` forwarding to the community inbox) once email forwarding is set up.
- **Team:** edit the `TEAM CARDS` block in `index.html`. Professional role line and LinkedIn only; no personal emails.
- **Analytics:** create a free GoatCounter site under the community Google account and put its code in `TD_GOATCOUNTER_CODE` at the top of `assets/site.js`. Leave it empty to disable.
- **Custom domain:** `turquoisedot.org` is set via the `CNAME` file (do not delete it). DNS lives in the GoDaddy account: four A records on the apex pointing to GitHub Pages IPs, plus a `www` CNAME to `theturquoisedot.github.io`. Keep "Enforce HTTPS" ticked in the repo's Pages settings. If the domain ever moves, update `CNAME`, `sitemap.xml`, `robots.txt`, and every `canonical`, `og:url`, and `og:image` URL.

## Conventions

- Use **Türkiye** (never "Turkey") and **"Turkish and Turkic"** when describing the community's scope. Proper names of other organisations stay as they are.
- Formal style: "Ambassador of Türkiye to Singapore", "Embassy of Türkiye in Singapore".
- Hero tagline is the formal one: *Singapore's Turkish and Turkic tech and research community*.
- Event titles use "and", not "+". Speakers get their full titles. No em dashes anywhere in site copy.
- Logos of partner organisations appear only with their written permission; names in text are fine.

This repository should be owned by a GitHub **organisation** account with at least two owners, not a personal account.
