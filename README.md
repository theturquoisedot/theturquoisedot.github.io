# The Turquoise Dot website

Website of **The Turquoise Dot**, Singapore's Turkish and Turkic tech and research community.
Live at: https://turquoisedot.org/ (GitHub Pages; theturquoisedot.github.io redirects here).

## How this site works

- Plain static HTML with **no build system and no dependencies**. GitHub Pages serves the files directly.
- Shared pieces live in `assets/`: `site.css` (all styling; the design tokens sit at the top), `site.js` (menu, light/dark toggle, time-aware content, form embed, analytics), `fonts/` (self-hosted Fraunces, IBM Plex Sans and IBM Plex Mono, latin and latin-ext subsets so Turkish characters render; no Google Fonts request), the social-share image (`og-image.jpg`), and the icons.
- Every page is a folder with an `index.html`, so URLs stay clean (`/sponsors/`, `/events/2026-05-cybersecurity-and-ai/`).
- `.nojekyll` tells GitHub Pages to skip the Jekyll build. Keep it.

```
index.html                                  landing page
sponsors/index.html                         partnership page with the interest form
events/index.html                           list of all events
events/YYYY-MM-slug/index.html              one page per event
assets/site.css, assets/site.js             shared styling and behaviour
assets/fonts/                               self-hosted web fonts (do not rename)
assets/events/YYYY-MM-slug/*.webp           event photos (optional)
privacy/index.html                          privacy notice (PDPA); update it once the Society is registered
404.html                                    branded not-found page
llms.txt                                    plain-text summary of the community for AI assistants; update with each event
sitemap.xml, robots.txt, site.webmanifest, CNAME, .nojekyll   keep as they are
```

## Common edits (for future officers)

- **Announce the next event:** in `index.html`, edit the `ANNOUNCEMENT BAR` block and the `SPOTLIGHT` block (text, speakers, Luma link) and set both `data-until` values to the event's end time, e.g. `2026-12-10T20:30:00+08:00`. Both blocks hide themselves automatically after that moment, so the site never shows a stale "next event".
- **Add an event:** copy an existing folder under `events/` (for example `events/2026-05-cybersecurity-and-ai/`) to `events/YYYY-MM-slug/`, edit its `index.html` (title, dates, venue, speakers, programme, recap, the JSON-LD block near the top), then add a card to `index.html` (the `EVENT CARDS` block) and to `events/index.html`, and add the URL to `sitemap.xml`. On an upcoming event's card, keep `data-until` and `data-past="chip"` so its red "next" chip and "Register" link switch to "Recap" automatically after the date.
- **Add photos to an event page:** export 6 to 10 photos as WebP, each under 300 KB, into `assets/events/YYYY-MM-slug/`, then add a `GALLERY` section following the pattern in `events/2025-12-kickoff/index.html`. Prefer stage and crowd shots; ask before publishing close-ups of identifiable attendees.
- **Add a short video to an event page:** encode it as MP4 (H.264, under about 3 MB, `-movflags +faststart`) with a poster JPG, put both in `assets/events/YYYY-MM-slug/`, and copy the `WATCH` section from `events/2026-05-cybersecurity-and-ai/index.html`. No YouTube embed is needed for clips this short.
- **Sponsorship form:** the page uses a Google Form owned by the community Google account. Paste the form's embed URL into `data-form-src` in `sponsors/index.html` (Google Forms: Send, then the `<>` tab, the value inside `src="..."`). While it is empty the page shows an email fallback.
- **Latest posts:** the `LATEST POSTS` section in `index.html` has two parts. The newest LinkedIn post goes in as an official embed: open the post on LinkedIn, choose "Embed this post", and paste the `<iframe>` inside the `li-embed` div. The cards below come from `assets/posts.js`: add the newest at the top, remove the oldest, keep 3 to 6. The section hides itself while both are empty.
- **After each event:** add the event to `llms.txt` (one line), add the new page to `sitemap.xml`, and add the photo-removal note under the gallery (copy it from an existing event page).
- **Update the numbers:** the landing page carries one sentence of facts (the `FACTS LINE` block in `index.html`); the sponsors page has the `reach` row. Edit both after each event.
- **Hero photo:** the landing page opens on a photograph from the latest event (`hero-art` in `index.html`, with its mono caption). Swap it each quarter: 1200 by 900 WebP under 150 KB, a wide shot of the room rather than a close-up.
- **Change the contact email:** search for `turquoisedotsg@gmail.com` across all pages (it appears in the JSON-LD too). Prefer a role address on the domain (for example `hello@turquoisedot.org` forwarding to the community inbox) once email forwarding is set up.
- **Team:** edit the `TEAM CARDS` block in `index.html`. Professional role line and LinkedIn only; no personal emails.
- **Analytics:** create a free GoatCounter site under the community Google account and put its code in `TD_GOATCOUNTER_CODE` at the top of `assets/site.js`. Leave it empty to disable.
- **Structured data:** each page carries JSON-LD (Organization on the landing page, Event plus speakers on event pages, BreadcrumbList on sub-pages). When the core team changes, update the `member` list in `index.html`; when speakers are added, update `performer` on the event page. Test with Google's Rich Results Test after changes.
- **Custom domain:** `turquoisedot.org` is set via the `CNAME` file (do not delete it). DNS lives in the GoDaddy account: four A records on the apex pointing to GitHub Pages IPs, plus a `www` CNAME to `theturquoisedot.github.io`. Keep "Enforce HTTPS" ticked in the repo's Pages settings. If the domain ever moves, update `CNAME`, `sitemap.xml`, `robots.txt`, and every `canonical`, `og:url`, and `og:image` URL.

## Design system (September 2026)

- **Ground and ink:** light "Iznik white" paper (`--paper #F3F6F4`, alternate band `#E8EEEB`), body ink `#1B2126`, headings in navy `#1C2B5A`, links and labels in turquoise `#0F6660`, fills in turquoise `#2ED3C3`, and one red dot `#C82A2A`. The palette comes from the two flags (red and white) and the Turkish stone (turquoise). Dark mode swaps the tokens; every colour is set through a token, never hard-coded in a component.
- **Light and dark:** light is the default; the site follows the visitor's system setting and the masthead button (`Dark` / `Light`) overrides it and remembers the choice in the browser. The three states are handled at the top of `site.css` (`:root`, the `prefers-color-scheme` block, and `[data-theme]`).
- **Type:** Fraunces (variable, weight 600) for headings and the footer tagline, IBM Plex Sans for text, IBM Plex Mono for dates, labels and captions. Headings are navy, never turquoise.
- **The kilim band:** the 24 px row of stepped diamonds under the masthead (`.kilim`) is an SVG data URI in the `--band` token, one for light and one for dark, generated from a 24 by 12 pixel grid (navy outline, turquoise, paper ring, red centre: the "göz" or eye motif). The 9 px version in `--glyph` marks list items. One band per page; it is the only ornament.
- **Layout rules:** hairlines (`--rule`) and ruled columns instead of boxed cards; 3 px radius; no drop shadows except the navy "next event" block and the poster; no hover lift, no scroll animation; buttons are rectangular, primary navy, secondary outlined. The red dot precedes every section label (`.kicker`).
- **Share images:** `assets/og-image.jpg` is rendered from the same system (kilim band, serif wordmark). Event pages use a photo or the poster as their own share image.

## Conventions

- Use **Türkiye** (never "Turkey") and **"Turkish and Turkic"** when describing the community's scope. Proper names of other organisations stay as they are.
- Formal style: "Ambassador of Türkiye to Singapore", "Embassy of Türkiye in Singapore".
- Hero tagline is the formal one: *Singapore's Turkish and Turkic tech and research community*.
- Event titles use "and", not "+". Speakers get their full titles. No em dashes anywhere in site copy.
- Logos of partner organisations appear only with their written permission; names in text are fine.

This repository should be owned by a GitHub **organisation** account with at least two owners, not a personal account.
