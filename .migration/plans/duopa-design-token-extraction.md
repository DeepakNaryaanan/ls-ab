# Duopa.com Design Token Extraction Plan

## Overview

Extract a comprehensive set of design tokens from https://www.duopa.com/ covering colors, typography, spacing, borders, shadows, and component-specific values.

## Status: COMPLETE

All design tokens have been extracted from duopa.com and applied to the project. No further action needed.

## Extracted Tokens Summary

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `--primary-color` | `#004877` | Primary heading blue |
| `--primary-light` | `#004f7d` | Section heading blue |
| `--primary-dark` | `#003659` | Hover/active state |
| `--accent-color` | `#00a1bd` | Button teal |
| `--accent-light` | `#00aec7` | CTA links |
| `--color-blue-callout` | `#005195` | Callout box / footer |
| `--color-orange` | `#f26c22` | Section nav links |
| `--color-cyan-light` | `#a1f1ff` | Light link color (on dark) |
| `--text-color` | `#4a4a4a` | Body text |
| `--gray-100` | `#f2f2f2` | Grey sections |
| `--gray-200` | `#e4e4e4` | Borders |

### Typography
| Token | Desktop | Mobile |
|-------|---------|--------|
| `--heading-size-xxl` | 60px | 30px |
| `--heading-size-xl` | 58px | 28px |
| `--heading-size-l` | 40px | 24px |
| `--heading-size-m` | 30px | 22px |
| `--heading-size-s` | 22px | 20px |
| `--body-font-size` | 18px | 18px |
| Font family | Roboto Slab (headings + body) | — |
| H3+ font | Roboto Condensed | — |

### Buttons & Spacing
| Token | Value |
|-------|-------|
| `--button-bg` | `#00a1bd` (teal) |
| `--button-font-size` | 20px |
| `--button-border-radius` | 5px |
| `--button-text-transform` | uppercase |
| `--section-padding` | 20px |
| `--content-max-width` | 1200px |
| `--header-height` | 110px |

## Files Updated
- `styles/brand.css` — Complete Duopa design token system
- `styles/styles.css` — Updated variable mappings, removed Skyrizi references
- `blocks/header/header.css` — White background, teal text
- `blocks/footer/footer.css` — Duopa blue background, horizontal link layout

## Checklist

- [x] Extract full color palette (backgrounds, text, borders, interactive states)
- [x] Extract typography scale (font sizes, weights, line heights for h1-h6, body, captions)
- [x] Extract spacing system (section padding, component margins, grid gaps)
- [x] Extract button styles (primary, secondary, hover/active states)
- [x] Extract border and shadow tokens (radius, card shadows, separator styles)
- [x] Extract responsive breakpoints
- [x] Update `styles/brand.css` with complete token set
- [x] Update `styles/styles.css` references (remove Skyrizi-specific values)
- [x] Verify visual consistency in local preview
