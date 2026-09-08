# The Turquoise Dot website

Landing page for **The Turquoise Dot**, Singapore's Turkish and Turkic tech and research community.
Live at: https://turquoisedot.org/ (GitHub Pages; theturquoisedot.github.io redirects here).

## How this site works

- Plain static HTML with **no build system and no dependencies**. GitHub Pages serves `index.html` directly.
- Everything lives in two places:
  - `index.html`: all content and styling (CSS is embedded in the `<style>` block).
  - `assets/`: hero image, social-share image (`og-image.jpg`), favicon.
- `.nojekyll` tells GitHub Pages to skip the Jekyll build. Keep it.

## Common edits (for future officers)

- **Add a new event:** in `index.html`, find the `EVENT CARDS` comment inside `<section id="events">`, copy one `<div class="event">…</div>` block, and update the date chip, title, venue, blurb, and Luma link. Move older events down; keep the "announcing soon" card last, pointing to Luma.
- **Update stats:** edit the four `<div class="stat">` blocks.
- **Change contacts:** edit `<section id="contact">`. Prefer role-based addresses (president@ / secretary@) once the custom domain and Society registration are in place.
- **Custom domain:** `turquoisedot.org` is set via the `CNAME` file (do not delete it). DNS lives in the GoDaddy account: four A records on the apex pointing to GitHub Pages IPs, plus a `www` CNAME to `theturquoisedot.github.io`. Keep "Enforce HTTPS" ticked in the repo's Pages settings. If the domain ever moves, update `CNAME` and the `canonical`, `og:url`, and `og:image` URLs in `index.html`.

## Conventions

- Use **Türkiye** (never "Turkey") and **"Turkish and Turkic"** when describing the community's scope.
- Formal style: "Ambassador of Türkiye to Singapore", "Embassy of Türkiye in Singapore".
- Hero tagline is the formal one: *Singapore's Turkish and Turkic tech and research community*.

This repository should be owned by a GitHub **organisation** account with at least two owners, not a personal account.
