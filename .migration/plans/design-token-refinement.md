Let me check what design tokens have already been extracted in the current project.# Design Token Extraction Plan: https://www.ensure.com/

## Status: Previously Extracted — Refinement Available

Design tokens have already been extracted from ensure.com during the migration. The current tokens are stored in `migration-work/brand.json` and applied via `styles/brand.css`. This plan covers re-extracting with deeper fidelity or refining the existing tokens.

## Current Extracted Tokens

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `--background-color` | `#ffffff` | Page background |
| `--text-color` | `#222731` | Body text |
| `--link-color` | `#007acc` | Link text |
| `--link-hover-color` | `#005a99` | Link hover state |
| `--primary-color` | `#002d72` | Brand navy blue (headings, CTAs) |
| `--primary-light` | `#003087` | Lighter navy variant |
| `--color-gray-light` | `#f5f5f5` | Light section background |
| `--color-gray-medium` | `#6c757d` | Secondary text |

### Typography
| Token | Value | Usage |
|-------|-------|-------|
| `--heading-font-family` | `gotham-black, sans-serif` | Headings |
| `--body-font-family` | `brandon_textblack, sans-serif` | Body text |
| `--heading-size-xxl` | `36px` (mobile) / `42px` (desktop) | H1 |
| `--heading-size-xl` | `28px` (mobile) / `32px` (desktop) | H2 |
| `--heading-size-l` | `24px` | H3 |
| `--heading-size-m` | `20px` | H4 |
| `--heading-size-s` | `18px` | H5 |
| `--heading-size-xs` | `16px` | H6 |
| `--body-font-size-m` | `16px` | Default body |
| `--body-line-height` | `1.5` | Body line height |
| `--heading-line-height` | `1.2` | Heading line height |

### Spacing
| Token | Value | Usage |
|-------|-------|-------|
| `--section-padding` | `40px` | Vertical section padding |
| `--content-max-width` | `1200px` | Max content width |
| `--nav-height` | `64px` | Header height |
| `--spacing-xxl` | `48px` | Extra-large spacing |
| `--spacing-xl` | `32px` | Large spacing |
| `--spacing-l` | `24px` | Medium-large spacing |
| `--spacing-m` | `16px` | Medium spacing |
| `--spacing-s` | `8px` | Small spacing |
| `--spacing-xs` | `4px` | Extra-small spacing |
| `--border-radius` | `4px` | Default border radius |

### Font Sources
- **No Typekit** detected
- **No Google Fonts** detected
- Fonts are self-hosted via `@font-face` declarations on ensure.com

---

## Gaps in Current Extraction

The following tokens could be extracted with deeper analysis:

- [ ] Button styles (padding, font-size, hover transitions)
- [ ] Footer-specific colors (dark background, light text)
- [ ] Card shadow values (box-shadow for hover states)
- [ ] Form input styles (border, padding, focus states)
- [ ] Breakpoint values (exact responsive breakpoints from source)
- [ ] Animation/transition timings
- [ ] Additional color shades (success, warning, error states)

---

## Checklist

- [x] Extract primary brand colors from source page
- [x] Extract typography (font families, sizes, weights, line-heights)
- [x] Extract spacing tokens (section padding, content width, nav height)
- [x] Detect font sources (Typekit, Google Fonts, self-hosted)
- [x] Write `migration-work/brand.json` with structured tokens
- [x] Write `styles/brand.css` with CSS custom properties
- [x] Apply tokens in `styles/styles.css` (headings, body, links, buttons)
- [x] Set up responsive desktop overrides for heading sizes
- [ ] Re-extract with deeper fidelity (button variants, shadows, transitions)
- [ ] Extract footer-specific design tokens
- [ ] Identify and resolve hosted font alternatives (gotham-black → fallback)
- [ ] Extract form/input styling tokens
- [ ] Validate tokens against multiple pages (product, recipe, blog)

---

## Files

| File | Purpose |
|------|---------|
| `migration-work/brand.json` | Structured token data (source of truth) |
| `styles/brand.css` | CSS custom properties consumed by styles.css |
| `styles/styles.css` | Site-wide styles using brand tokens |

## Execution Notes

- To re-extract tokens with deeper fidelity, switch to Execute mode and invoke the design migration skill targeting ensure.com
- The existing extraction covers the core tokens; additional refinement targets button variants, shadows, and form elements
- Font resolution remains open — gotham-black and brandon_textblack are Abbott proprietary fonts with no public CDN equivalent
