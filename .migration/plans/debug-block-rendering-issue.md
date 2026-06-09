# Debug New Block Rendering Issue

## Overview

A new rendering issue has appeared on the Duopa migrated pages since the last successful debug session. The CSS files, block JS decorators, and content HTML are all present and were verified working previously. This plan will diagnose what broke.

## Current State (previously verified working)

- All 9 CSS files load successfully (fonts, styles, header, footer, 5 block CSS)
- Block JS decorators run (hero-treatment, columns-icontext, cards-navigation, columns-callout)
- Section-metadata applies `grey` class
- Design tokens in brand.css resolve correctly
- Computed styles matched Duopa source site

## Potential Causes of Regression

| Cause | Likelihood | How to Detect |
|-------|-----------|---------------|
| CSS file was overwritten by linter/hook | Medium | Read current file contents, compare to expected |
| Brand.css tokens changed | Medium | Check `--primary-color`, `--color-blue-callout` values in computed styles |
| Block JS throwing errors silently | Medium | Check browser console for exceptions |
| Content HTML changed (re-import overwrote) | Low | Check if carrying-case.plain.html still has block divs |
| Dev server caching stale CSS | Medium | Hard-reload, check response headers |
| New CSS specificity conflict | Medium | Inspect elements, check which rules win |

## Diagnosis Steps

1. Navigate to `http://localhost:3000/carrying-case` with Playwright
2. Check browser console for JS errors
3. Verify all CSS files still load (no 404s)
4. Inspect computed styles on each block:
   - `hero-treatment`: background image position, h1 color
   - `columns-icontext`: flex layout, icon sizing
   - `cards-navigation`: grid layout, image display
   - `columns-callout`: blue background, white text
5. Compare actual computed values against expected Duopa tokens
6. If styles load but don't apply: check CSS specificity conflicts (inspect which rules win)
7. If blocks not decorated: check if JS errors prevent decoration

## Checklist

- [ ] Start preview server and navigate to carrying-case page
- [ ] Check browser console for JS errors during block decoration
- [ ] Verify all CSS files load (check for 404s on block CSS)
- [ ] Inspect hero-treatment computed styles (picture position, text color)
- [ ] Inspect columns-icontext computed styles (flex layout, icon size)
- [ ] Inspect cards-navigation computed styles (grid, images)
- [ ] Inspect columns-callout computed styles (blue bg, white text)
- [ ] Identify root cause of regression
- [ ] Apply fix
- [ ] Verify fix resolves the issue

## Execution Entry Point

When Execute mode is activated, navigate to the preview with Playwright, run diagnostic evaluations on computed styles, identify what changed, and apply the fix.
