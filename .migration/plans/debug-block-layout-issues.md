# Debug Block Layout Issues on Duopa Imported Pages

## Overview

All 4 imported product-detail pages (`carrying-case`, `duopa-your-day`, `how-duopa-works`, `resources`) have broken block layouts. This plan identifies the root causes and provides fixes.

## Diagnosis

Based on code analysis, the likely issues are:

### Issue 1: `cards-navigation` CSS targets `ul > li` but content has `div > div` structure
The `cards-navigation.css` styles target `.cards-navigation ul` and `.cards-navigation ul > li` (lines 17-24), which assumes the JS decorator restructures content into a `<ul>/<li>` layout. But the imported HTML has the block as nested `<div>` elements (EDS table format: `div > div > div`). If the JS decorator doesn't run or doesn't transform to `<ul>`, the CSS won't apply.

### Issue 2: `columns-icontext` and `columns-callout` generic column CSS
Both use `> div > div` selectors assuming a single row, but the imported content might have multiple rows that don't match the expected nesting depth.

### Issue 3: Mobile carousel duplicate content in `cards-navigation`
The imported HTML contains both desktop grid content (inside the `.cards-navigation` div) AND mobile carousel content (plain `<p>` elements with images outside the block div). This duplicate content appears as extra unstyled paragraphs in the section.

### Issue 4: `hero-treatment` picture positioning
The CSS uses `position: absolute` on `picture` and relies on `z-index: -1`. If the section or block container doesn't have proper `position: relative` context, the image won't appear behind the text.

### Issue 5: Grey section styling not applying
The `section-metadata` block applies the `grey` class to the section, but it needs the section to be properly decorated first. If section decoration timing is off, the grey background won't appear.

## Verification Steps

1. Navigate to `http://localhost:3000/carrying-case` (or `/` since the content is there)
2. Check browser console for JS errors in block decoration
3. Inspect DOM to see if blocks have proper class structure after decoration
4. Compare expected DOM structure vs actual

## Fixes Required

### Fix 1: Update `cards-navigation.js` to handle Duopa content structure
The decorator needs to handle the `div > div > div` table format from the import (image cell + label cell per row) and optionally restructure into a card list.

### Fix 2: Remove duplicate mobile carousel content from imported HTML
The import script/transformer should strip the mobile-only carousel markup that was included alongside the desktop grid content. Alternatively, hide it with CSS.

### Fix 3: Ensure `hero-treatment` container has position context
Add `position: relative` to the block's parent or verify the wrapper structure.

### Fix 4: Verify section-metadata decoration order
Ensure the `section-metadata` block runs and applies the `grey` class before other blocks render.

### Fix 5: Update block CSS to match imported content DOM structure
The block CSS selectors may need updating to match the actual DOM structure produced by the import (EDS table format) rather than the Skyrizi-era structure.

## Checklist

- [ ] Start local preview server and navigate to an imported page
- [ ] Check browser console for JS errors during block decoration
- [ ] Inspect DOM structure of each block after decoration
- [ ] Fix `hero-treatment` positioning/container issue
- [ ] Fix `columns-icontext` layout for Duopa content structure
- [ ] Fix `cards-navigation` — update CSS selectors or JS decorator to handle imported div structure
- [ ] Fix `columns-callout` styling (blue background, white text)
- [ ] Remove or hide duplicate mobile carousel content from cards section
- [ ] Verify `section-metadata` grey style applies correctly
- [ ] Re-check all 4 pages render correctly after fixes

## Execution Entry Point

When Execute mode is activated, use the **excat-eds-debugger** skill or manually:
1. Navigate to the local preview with Playwright
2. Check console errors and inspect block DOM
3. Apply CSS/JS fixes to each block
4. Verify rendering matches the original duopa.com layout
