# Design Token Extraction Plan for Skyrizi.com Psoriasis

## Overview

Extract design tokens (colors, typography, spacing) from https://www.skyrizi.com/psoriasis and update the existing `styles/brand.css` and `migration-work/brand.json` files to reflect the Skyrizi brand identity instead of the previously migrated Ensure.com brand.

**Current State:** The project already contains design token files (`styles/brand.css`, `migration-work/brand.json`) populated with **Ensure.com** brand values from the prior migration. These need to be replaced with Skyrizi psoriasis brand tokens.

## What Needs to Change

The existing brand files contain Ensure.com values (Abbott blue `#002d72`, Brandon Text font, etc.). Skyrizi uses a different brand palette and typography that needs to be extracted from the live site.

**Expected Skyrizi brand characteristics (to be confirmed via extraction):**
- Primary color: dark blue/navy (likely different shade from Ensure)
- Fonts: Likely AbbVie corporate fonts (not Brandon Text)
- Spacing/layout: Pharmaceutical page patterns with ISI sections
- Buttons: Rounded CTA buttons with specific brand colors

## Approach

Use the `excat-complete-design-expert` skill to:
1. Inspect computed styles on the live Skyrizi psoriasis page
2. Extract actual brand colors, fonts, and spacing
3. Overwrite `styles/brand.css` with Skyrizi-specific CSS custom properties
4. Update `migration-work/brand.json` with the structured token data
5. Update `styles/styles.css` base styles if needed

## Checklist

- [ ] **Extract typography tokens** — Font families, sizes, weights, line-heights from headings, body text, and CTAs on https://www.skyrizi.com/psoriasis
- [ ] **Extract color tokens** — Primary brand color, secondary colors, background colors, text colors, link colors, button colors, section background colors (grey section, hero overlays)
- [ ] **Extract spacing tokens** — Section padding, content max-width, card gaps, nav height, margin patterns
- [ ] **Extract button styles** — Primary CTA, secondary CTA, border-radius, padding, font, hover states
- [ ] **Extract border/shadow/transition tokens** — Card shadows, border-radius, border colors, animation timings
- [ ] **Extract responsive breakpoints** — Mobile/tablet/desktop thresholds observed in the site's CSS
- [ ] **Update `styles/brand.css`** — Replace Ensure values with Skyrizi CSS custom properties
- [ ] **Update `migration-work/brand.json`** — Replace Ensure JSON with Skyrizi structured token data
- [ ] **Update `styles/styles.css`** — Adjust base typography, link styles, and section styles to match Skyrizi
- [ ] **Update `styles/fonts.css`** — Update @font-face declarations if Skyrizi uses different web fonts
- [ ] **Validate in preview** — Confirm imported homepage picks up new brand tokens correctly

## Artifacts to Update

| File | Current Content | Target |
|------|----------------|--------|
| `styles/brand.css` | Ensure.com CSS variables | Skyrizi psoriasis CSS variables |
| `migration-work/brand.json` | Ensure.com token JSON | Skyrizi token JSON |
| `styles/styles.css` | Ensure base styles | Skyrizi base styles |
| `styles/fonts.css` | Ensure @font-face rules | Skyrizi @font-face rules |

## Extraction Sources

- **Live page:** https://www.skyrizi.com/psoriasis (computed styles via browser inspection)
- **Existing screenshot:** `migration-work/screenshot.png` (visual reference)
- **Cleaned HTML:** `migration-work/cleaned.html` (class names and inline styles)

## Dependencies

- Homepage content is already imported (`content/psoriasis.plain.html`)
- Block variant code exists (`blocks/carousel-hero/`)
- Preview server available for validation after token update

---

*Switch to Execute mode to run the design token extraction using the design expert skill.*
