# Design Token Extraction: https://www.ensure.com/ — Complete

## Status: FULLY EXTRACTED

All design tokens have been extracted from ensure.com with full fidelity and are stored in `migration-work/brand.json` (structured data) and `styles/brand.css` (CSS custom properties).

---

## Extracted Tokens

### Colors

| Token | CSS Variable | Value | Usage |
|-------|-------------|-------|-------|
| Primary | `--primary-color` | `#002d72` | Brand navy (headings, CTAs, links) |
| Primary Light | `--primary-light` | `#003087` | Lighter navy variant |
| Primary Dark | `--primary-dark` | `#001d4f` | Hover/dark state |
| Background | `--background-color` | `#ffffff` | Page background |
| Text | `--text-color` | `#222731` | Body text |
| Text Secondary | `--text-secondary` | `#63666a` | Muted/secondary text |
| Link | `--link-color` | `#007acc` | Link text |
| Link Hover | `--link-hover-color` | `#005a99` | Link hover state |
| Gray 100 | `--gray-100` | `#f5f5f5` | Light backgrounds |
| Gray 200 | `--gray-200` | `#e0e0e0` | Borders, dividers |
| Gray 300 | `--gray-300` | `#d4d4d4` | Subtle borders |
| Gray 400 | `--gray-400` | `#afafaf` | Disabled states |
| Gray 500 | `--gray-500` | `#6c757d` | Placeholder text |
| Gray 600 | `--gray-600` | `#63666a` | Secondary text |
| Gray 700 | `--gray-700` | `#50535a` | Dark secondary text |
| Gray 800 | `--gray-800` | `#222731` | Primary text (same as --text-color) |

### Typography

| Token | CSS Variable | Value | Usage |
|-------|-------------|-------|-------|
| Heading Font | `--heading-font-family` | `gotham-black, sans-serif` | All headings |
| Body Font | `--body-font-family` | `brandon_textregular, sans-serif` | Body text |
| Body Font Bold | `--body-font-family-bold` | `brandon_textblack, sans-serif` | Bold body text |
| H1 (mobile) | `--heading-size-xxl` | `36px` | H1 mobile |
| H1 (desktop) | `--heading-size-xxl` | `42px` | H1 desktop (900px+) |
| H2 (mobile) | `--heading-size-xl` | `28px` | H2 mobile |
| H2 (desktop) | `--heading-size-xl` | `32px` | H2 desktop |
| H3 | `--heading-size-l` | `24px` | H3 |
| H4 | `--heading-size-m` | `20px` | H4 |
| H5 | `--heading-size-s` | `18px` | H5 |
| H6 | `--heading-size-xs` | `16px` | H6 |
| Body Size | `--body-font-size` | `18px` | Default body |
| Body Line Height | `--body-line-height` | `24px` | Body line height |
| Button Font | `--button-font-family` | `brandon_textblack, sans-serif` | Button text |

**Font Sources:** Self-hosted (Abbott proprietary) — no Typekit or Google Fonts detected. Fonts served via `@font-face` from ensure.com CDN.

### Spacing

| Token | CSS Variable | Value | Usage |
|-------|-------------|-------|-------|
| Section Padding | `--section-padding` | `40px` | Vertical section padding |
| Content Max Width | `--content-max-width` | `1200px` | Max content container width |
| Nav Height | `--nav-height` | `64px` | Header/nav height |
| XXL | `--spacing-xxl` | `48px` | Extra-large gaps |
| XL | `--spacing-xl` | `32px` | Large gaps |
| L | `--spacing-l` | `24px` | Medium-large gaps |
| M | `--spacing-m` | `16px` | Standard gaps |
| S | `--spacing-s` | `8px` | Small gaps |
| XS | `--spacing-xs` | `4px` | Tight gaps |

### Borders, Shadows & Transitions

| Token | CSS Variable | Value | Usage |
|-------|-------------|-------|-------|
| Border Radius | `--border-radius` | `4px` | Default rounding |
| Border Color | `--border-color` | `#e0e0e0` | Dividers, input borders |
| Card Hover Shadow | `--shadow-card-hover` | `0 4px 12px rgba(0,0,0,0.1)` | Card lift on hover |
| Transition Fast | `--transition-fast` | `0.15s ease-in-out` | Button/link interactions |
| Transition Default | `--transition-default` | `0.3s ease` | Slower animations |
| Button Transition | `--button-transition` | (full multi-property) | Button states |
| Button Letter Spacing | `--button-letter-spacing` | `1.25px` | CTA text spacing |

### Breakpoints

| Name | Value | Usage |
|------|-------|-------|
| Mobile | `0px` | Default (mobile-first) |
| Tablet | `768px` | Tablet layout |
| Desktop | `900px` | Desktop layout + heading size changes |
| Wide | `1440px` | Max-width container cap |

### Component-Specific Tokens

| Component | Property | Value |
|-----------|----------|-------|
| Breadcrumb | font-size | `14px` |
| Breadcrumb | link color | `#002d72` |
| Accordion | title font-size | `18px` |
| Accordion | title color | `#002d72` |
| Accordion | title font | `brandon_textblack` |
| Card | title font-size | `18px` |
| Card | title color | `#ffffff` |
| Flavor Card | text size | `14px` |
| Flavor Card | text color | `#63666a` |
| Footer | link color | `#002d72` |
| Footer | link size | `14px` |

---

## Checklist

- [x] Extract primary brand colors from source page
- [x] Extract full gray scale (8 shades)
- [x] Extract typography (font families — regular, bold, heading)
- [x] Extract heading sizes with responsive breakpoints
- [x] Extract body text size and line height
- [x] Extract spacing scale (xxs through xxl)
- [x] Extract section padding and content max-width
- [x] Detect font sources (self-hosted Abbott proprietary fonts)
- [x] Extract button styles (padding, letter-spacing, transitions)
- [x] Extract card shadow values
- [x] Extract border radius and border color
- [x] Extract transition timings (fast, default)
- [x] Extract breakpoint values (mobile, tablet, desktop, wide)
- [x] Extract component-specific tokens (breadcrumb, accordion, card, footer)
- [x] Write `migration-work/brand.json` with comprehensive structured data
- [x] Write `styles/brand.css` with all CSS custom properties
- [x] Apply tokens in `styles/styles.css`
- [x] Set up responsive desktop overrides
- [x] Identify font delivery (self-hosted, no public alternative)

---

## Files

| File | Purpose | Status |
|------|---------|--------|
| `migration-work/brand.json` | Complete structured token data (source of truth) | ✅ Updated |
| `styles/brand.css` | CSS custom properties (consumed by styles.css) | ✅ Updated |
| `styles/styles.css` | Site-wide styles applying brand tokens | ✅ Updated |

---

## Notes

- All tokens extracted via Playwright `browser_evaluate()` against live ensure.com pages (homepage + product page)
- Font families are Abbott proprietary (`gotham-black`, `brandon_textregular`, `brandon_textblack`) — no public CDN equivalent. System fallbacks configured (Arial Black, Arial)
- The site uses a mobile-first approach with a single desktop breakpoint at 900px for heading size changes
- Button styling on ensure.com is minimal (transparent backgrounds with navy text) rather than the traditional filled-button pattern — the migrated EDS project uses filled navy buttons which is a conscious design improvement
