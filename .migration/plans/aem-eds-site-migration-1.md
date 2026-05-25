Now I have a good understanding of the architecture. Let me look at how blocks are discovered by the EDS framework.Now I understand the full picture. The EDS framework in this project discovers blocks by looking for `div[class]` elements inside sections. The content HTML has `<div class="carousel-hero">`, `<div class="cards-navigation">`, and `<div class="columns-blog">` — these should be found and decorated. The key line is `section.blocks = [...section.querySelectorAll('.block-content > div[class]')]` (line 256).

The issue is likely that all content is in one `<div>` (one section), so there are no section breaks (`<hr>` elements), and the blocks might not be grouped correctly by `groupChildren()`. Let me check how the content structure maps to sections.Good - there are 4 top-level `<div>` elements (sections). The framework wraps each top-level `<div>` under `main` as a section. Within each section, it looks for `div[class]` elements. The content has blocks with classes like `carousel-hero`, `cards-navigation`, `columns-blog` — these are inside the first section. They should get detected by `section.blocks = [...section.querySelectorAll('.block-content > div[class]')]`.

The key question is: does the page actually render the blocks, or is something failing? Let me look at what the previous snapshot showed — the carousel IS rendering (it has slide controls, navigation dots). The cards-navigation renders as a list. The columns-blog renders. So the blocks ARE rendering from a DOM perspective.

The likely issue is **visual styling** — the blocks render but may not look correct without proper CSS being loaded. Let me check what CSS errors might exist.# Block Rendering Debug Plan for Skyrizi.com Psoriasis

## Overview

Investigate why blocks are not rendering correctly in the local preview at `http://localhost:3000/content/psoriasis`. The page content is imported and the DOM structure appears correct (blocks have proper class names), but visual rendering may be off.

**Current State (from previous preview snapshot inspection):**
- The carousel-hero block IS rendering — it has slide controls, navigation dots, Previous/Next buttons
- The cards-navigation block IS rendering — 4 list items with images and headings appear
- The columns-blog block IS rendering — 2-column layout with headings and links visible
- The ISI section renders as default content

## Diagnosis

Based on analysis of the content HTML (`content/psoriasis.plain.html`) and the project's block loading framework (`scripts/ak.js`):

1. **Content structure is correct:** 4 top-level `<div>` elements = 4 sections. Block `<div>` elements have proper class names (`carousel-hero`, `cards-navigation`, `columns-blog`)
2. **Block JS is loading:** The carousel has interactive slide controls in the DOM, meaning `carousel-hero.js` executed successfully
3. **Framework discovery works:** `ak.js` line 256 finds blocks via `.block-content > div[class]` — matches our structure

## Potential Issues to Investigate

| Issue | Likelihood | How to Verify |
|-------|-----------|---------------|
| Block CSS not loading (404) | Medium | Check HTTP status of `/blocks/carousel-hero/carousel-hero.css` etc. |
| CSS syntax errors preventing render | Low | Run stylelint or check browser console for CSS parse errors |
| Missing CSS variables (brand.css not imported) | Low | Check if `--accent-color`, `--button-bg` resolve |
| Image URLs broken (external skyrizi.com assets) | High | Images reference `https://www.skyrizi.com/content/dam/...` which may fail cross-origin |
| Section wrapper classes missing | Medium | Check if `.section` class is applied, affecting `.section > .default-content` |
| Cleanup transformer removed too much | Low | ISI section content is present, so likely fine |
| JS errors in block decoration | Medium | Check browser console for JS exceptions |

## Checklist

- [ ] **Check block CSS accessibility** — Verify `/blocks/carousel-hero/carousel-hero.css`, `/blocks/cards-navigation/cards-navigation.css`, `/blocks/columns-blog/columns-blog.css` return 200
- [ ] **Check browser console for errors** — Look for JS exceptions or failed resource loads in preview
- [ ] **Verify CSS variables resolve** — Inspect computed styles to confirm `--accent-color`, `--button-bg`, `--heading-font-family` are set
- [ ] **Check image loading** — Verify external skyrizi.com images load correctly (no CORS blocking)
- [ ] **Inspect section/block class structure** — Verify the DOM has `.section > .block-content > .carousel-hero` etc.
- [ ] **Check carousel-hero slide visibility** — Only first slide should be visible; others hidden via CSS
- [ ] **Check cards-navigation grid layout** — Verify 4-column grid applies on desktop viewport
- [ ] **Check columns-blog 2-column layout** — Verify flex layout splits into 66/33 columns
- [ ] **Fix any broken CSS selectors** — Update selectors if DOM structure doesn't match expected patterns
- [ ] **Fix any broken image references** — Download critical images locally if cross-origin fails
- [ ] **Verify after fixes** — Take screenshot to confirm visual rendering matches expectations

## Key Files to Inspect

| File | Purpose |
|------|---------|
| `blocks/carousel-hero/carousel-hero.css` | Hero carousel styles (slides, dots, arrows) |
| `blocks/carousel-hero/carousel-hero.js` | Carousel decoration logic |
| `blocks/cards-navigation/cards-navigation.css` | Navigation cards grid + card styles |
| `blocks/cards-navigation/cards-navigation.js` | Cards decoration (restructures to `ul > li`) |
| `blocks/columns-blog/columns-blog.css` | 2-column layout + icon float + CTA card |
| `blocks/columns-blog/columns-blog.js` | Columns decoration |
| `scripts/ak.js` | Block discovery and loading framework |
| `content/psoriasis.plain.html` | Imported page content |

## Expected DOM After Decoration

```
main
├── .section (section 1)
│   ├── .default-content (contains the skip link <p><a href="#">___</a></p>)
│   └── .block-content
│       ├── .carousel-hero (decorated by carousel-hero.js)
│       ├── .cards-navigation (decorated by cards-navigation.js)
│       └── .columns-blog (decorated by columns-blog.js)
├── .section (section 2 - CRM image)
│   └── .default-content
├── .section (section 3 - ISI)
│   └── .default-content (h3, h4, p, ul elements)
└── .section (section 4 - metadata)
    └── .block-content > .metadata
```

---

*Switch to Execute mode to run diagnostic checks in the browser, inspect computed styles, and fix any rendering issues found.*
