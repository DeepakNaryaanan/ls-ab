# Debug CSS Styles Not Applied

## Overview

Diagnose and fix CSS styling issues on the Duopa migrated pages. The CSS loading infrastructure is in place (`head.html` → `fonts.css` + `styles.css` → `brand.css`, plus dynamic block CSS via `ak.js`), but several issues may prevent styles from rendering correctly.

## CSS Loading Chain

```
head.html
├── /styles/fonts.css    ← Still has Skyrizi Univers font declarations (wrong)
├── /styles/styles.css   ← Updated for Duopa (imports brand.css)
│   └── @import brand.css  ← Updated with Duopa tokens
├── /scripts/ak.js       ← Framework: loads block CSS dynamically
└── /scripts/scripts.js  ← App entry point
```

Block CSS loaded on demand: `ak.js:loadBlock()` → `loadStyle('blocks/{name}/{name}.css')`

## Identified Issues

### Issue 1: `fonts.css` still declares Skyrizi Univers fonts
The file references `"Univers LT W01_45 Light1475944"`, `"Univers LT W01_47 Light1475998"`, etc. — these are Skyrizi fonts. The `brand.css` now declares `"Roboto Slab"` as the font family, but `fonts.css` doesn't load Roboto Slab from any source (Google Fonts or local). Browsers will fall back to the `sans-serif, arial` fallback chain, making text render in Arial rather than Roboto Slab.

### Issue 2: Favicon points to skyrizi.com
`head.html` line 7: `<link rel="icon" href="https://www.skyrizi.com/...skyrizi_favicon.png">` — should be Duopa favicon.

### Issue 3: CSS `@import` potential timing issue
`styles.css` uses `@import url('brand.css')` which is render-blocking but may cause a flash of unstyled content (FOUC) if the browser hasn't cached `brand.css`.

### Issue 4: Block CSS might not load if block name doesn't match folder
The `ak.js` framework uses `classList[0]` as the block name and loads `blocks/{name}/{name}.css`. If the decorated block class differs from the folder name, CSS won't load. The blocks we have (`hero-treatment`, `columns-icontext`, `cards-navigation`, `columns-callout`) all match their folder names — this should be fine.

### Issue 5: `styles.css` heading color references `--accent-color` (now teal)
Line 171 in styles.css previously used `color: var(--accent-color)` for headings. This was updated to `--color-blue-heading` in the last session. If that change was reverted or cached incorrectly, headings may show wrong colors.

## Checklist

- [ ] Start local preview and inspect which CSS files load successfully (network tab)
- [ ] Check if `brand.css` variables are resolving (inspect computed styles on body, headings)
- [ ] Update `fonts.css` to load Roboto Slab (replace Univers declarations)
- [ ] Update `head.html` favicon to Duopa
- [ ] Verify block CSS files load for each decorated block (check network for 404s)
- [ ] Verify computed heading color matches Duopa blue (`#004877`)
- [ ] Verify computed body font matches Roboto Slab fallback chain
- [ ] Test on a content page with all blocks (carrying-case)

## Execution Entry Point

When Execute mode is activated:
1. Navigate to `http://localhost:3000/carrying-case` with Playwright
2. Check network requests for CSS 404s
3. Inspect computed styles on key elements
4. Fix `fonts.css` to declare Roboto Slab
5. Fix `head.html` favicon
6. Verify all styles apply correctly
