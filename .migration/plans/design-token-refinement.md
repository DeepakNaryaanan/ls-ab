Now I can see the issue. Let me also check the `decoratePictures` function — the error in console was `TypeError: Cannot read properties of null (reading 'cloneNode')`:Now I have a complete picture. Let me look at the content file to understand the DOM structure that's being loaded:# CSS Debugging Plan: Styles Not Being Applied

## Status: ROOT CAUSES IDENTIFIED

After investigating the codebase, I've identified multiple issues preventing CSS from being properly applied to the migrated pages.

---

## Root Causes

### Issue 1: `decoratePictures` Error Breaks Page Decoration

**File:** `scripts/ak.js` line 92-104

The `decoratePictures` function crashes with `TypeError: Cannot read properties of null (reading 'cloneNode')` because it calls `source.cloneNode()` on `<picture>` elements that have no `<source>` child (the imported HTML uses `<picture><img>` without `<source>` elements).

```javascript
function decoratePictures(el) {
  const pics = el.querySelectorAll('picture');
  for (const pic of pics) {
    const source = pic.querySelector('source'); // Returns null!
    const clone = source.cloneNode(); // CRASHES HERE
    ...
  }
}
```

**Impact:** This error may halt the `loadArea()` execution flow, preventing sections from being decorated and blocks from loading their CSS.

---

### Issue 2: Circular CSS Variable References

**File:** `styles/styles.css` lines 38-40

```css
--body-font-family: var(--body-font-family);
--heading-font-family: var(--heading-font-family);
--font-family: var(--body-font-family);
```

These re-declare `--body-font-family` and `--heading-font-family` as referencing themselves. While `brand.css` defines them first (via `@import`), browsers may not resolve this correctly if the import hasn't loaded yet or if CSS spec treats the same-named re-declaration as circular.

---

### Issue 3: Block CSS Not Loading (Script Error Cascade)

**File:** `scripts/ak.js` line 296-299

Block CSS is loaded dynamically by `loadBlock()` (line 75: `loadStyle(\`${blockPath}.css\`)`). If `decoratePictures` crashes (Issue 1) before `loadArea()` reaches the block-loading loop, block-specific CSS files (`blocks/hero-product/hero-product.css`, etc.) never get injected into the page.

---

### Issue 4: `@import url('brand.css')` Path Resolution

**File:** `styles/styles.css` line 1

The `@import url('brand.css')` uses a relative path. In EDS local dev, this resolves to `/styles/brand.css` which should work. However, if the dev server doesn't serve it correctly or there's a CORS/path issue, the entire brand variable set would be undefined.

---

### Issue 5: Section Wrappers Missing

**File:** `styles/styles.css` lines 142-143

The CSS targets `.section > .default-content-wrapper` but the EDS framework creates `.default-content` class (line 238 of ak.js: `'default-content'`). The mismatch means section content styling doesn't apply.

---

## Fixes Required

| # | Fix | File | Priority |
|---|-----|------|----------|
| 1 | Add null-check in `decoratePictures` for `source` element | `scripts/ak.js` | **Critical** |
| 2 | Remove circular variable declarations — use brand.css values directly or use different names | `styles/styles.css` | High |
| 3 | Fix `.default-content-wrapper` → `.default-content` class name mismatch | `styles/styles.css` | High |
| 4 | Verify `@import url('brand.css')` resolves at `/styles/brand.css` | `styles/styles.css` | Medium |
| 5 | Ensure imported HTML has valid `<picture>` structure or handle gracefully | Content files | Low |

---

## Checklist

- [ ] Fix `decoratePictures` null-check — add guard: `if (!source) continue;` before `cloneNode()`
- [ ] Fix circular CSS variables — rename to avoid self-reference (e.g., use brand.css values directly in `:root`)
- [ ] Fix section wrapper class mismatch — change `.default-content-wrapper` to `.default-content` in styles.css
- [ ] Verify `@import url('brand.css')` resolves correctly in local dev server
- [ ] Test page renders after fixes — confirm blocks get `.section` class and block CSS loads
- [ ] Verify heading styles apply (font-family, font-size, color)
- [ ] Verify button styles apply (background, padding, border-radius)
- [ ] Verify section background variants work (`.navy-blue`, `.dark-header`)

---

## Files to Modify

| File | Changes Needed |
|------|----------------|
| `scripts/ak.js` | Line 95: Add `if (!source) continue;` null guard |
| `styles/styles.css` | Lines 38-40: Remove circular var declarations; Line 142: Fix class name |
| `styles/brand.css` | No changes needed (correctly defines root variables) |

---

## Verification Steps (After Fixes)

1. Navigate to `http://localhost:3000/content/home`
2. Confirm no JS errors in console
3. Confirm `styles.css` and `brand.css` both load (Network tab)
4. Confirm block CSS files load for `hero-product` and `cards-navigation`
5. Confirm headings show navy blue color and correct font sizes
6. Confirm hero section has gradient navy background
7. Confirm cards display in a grid with images

---

## Notes

- The most critical fix is Issue 1 (`decoratePictures` crash) — this single error cascades and prevents all downstream decoration including block CSS loading
- The imported content uses `<picture><img>` without `<source>` elements because images come from external CDN URLs, not from AEM's image optimization pipeline
- Execution of these fixes requires switching to Execute mode
