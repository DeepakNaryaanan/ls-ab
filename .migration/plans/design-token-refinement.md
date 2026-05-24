# Navigation Migration Plan: https://www.ensure.com/

## Status: ALREADY IMPLEMENTED

The navigation structure from ensure.com has been migrated. Both header and footer are implemented using the AuthorKit fragment pattern (`fragments/nav/header.html` and `fragments/nav/footer.html`).

---

## Current Implementation

### Header (`fragments/nav/header.html`)

3-section structure matching the AuthorKit header block pattern:

| Section | Role | Content |
|---------|------|---------|
| **1. Brand** | Logo + mobile menu toggle | Ensure logo → `/home`, hamburger menu button |
| **2. Sections** | Main navigation links | Products, Sign Up & Save, Recipes, Health Articles |
| **3. Tools** | Utility CTA | Buy Now → `/where-to-buy-ensure` |

### Footer (`fragments/nav/footer.html`)

3-section structure:

| Section | Role | Content |
|---------|------|---------|
| **1. Link Columns** | Site navigation | Site Pages (6 links), Abbott (3 links), Abbott Brands (3 links) |
| **2. Legal** | Compliance links | Unsubscribe, Privacy Policy, Terms of Use, Your Privacy Choices |
| **3. Copyright** | Legal notice | © 2026 Abbott. All rights reserved. |

### Also Exists: `nav.md` + `footer.md`

Markdown versions exist at the project root for DA-based authoring (alternative to fragment HTML). The AuthorKit header/footer blocks currently load from `fragments/nav/` path.

---

## Comparison with Original Site

### Header

| Original Feature | Migrated | Notes |
|-----------------|----------|-------|
| Ensure logo (links to /home) | ✅ | In brand section |
| Abbott logo (links to abbott.com) | ❌ | Could add as second image in brand |
| Products nav link | ✅ | `/nutrition-products` |
| Sign Up & Save nav link | ✅ | `/coupons` |
| Recipes nav link | ✅ | `/recipes` |
| Health Articles nav link | ✅ | `/health-articles-tips` |
| Buy Now CTA | ✅ | In tools section |
| Search icon + overlay | ❌ | Requires custom JS widget |
| Mobile hamburger menu | ✅ | Handled by header block JS |
| Alert banner (strawberry notice) | ❌ | Ephemeral — not migrated |

### Footer

| Original Feature | Migrated | Notes |
|-----------------|----------|-------|
| Site Pages column (6 links) | ✅ | Products, Recipes, Health, Coupons, Where to Buy, Contact |
| Abbott column (3 links) | ✅ | Abbott.com, Abbott Nutrition, Careers |
| Abbott Brands column (3 links) | ✅ | Glucerna, PediaSure, Similac |
| Legal links (4 links) | ✅ | Unsubscribe, Privacy, Terms, Privacy Choices |
| Copyright | ✅ | © 2026 Abbott |
| Ensure footer logo | ❌ | Not in current fragment |
| Social icons (Instagram, Facebook) | ❌ | Not in current fragment (exists in footer.md) |

---

## Potential Enhancements

The following could be added to bring the navigation closer to the original:

- [ ] Add Abbott logo as dual-brand in header
- [ ] Add Ensure logo to footer section 2
- [ ] Add Instagram + Facebook social icons to footer
- [ ] Add search widget to header tools section
- [ ] Add product mega-menu dropdown (sub-categories per product line)
- [ ] Style header with ensure.com navy blue sticky bar
- [ ] Style Buy Now as a prominent button (not plain link)
- [ ] Add CCPA privacy icon next to "Your Privacy Choices"

---

## Checklist

- [x] Analyze original ensure.com header structure
- [x] Map header content to 3-section EDS pattern (brand / sections / tools)
- [x] Create `fragments/nav/header.html` with ensure.com links
- [x] Include Ensure logo in brand section
- [x] Include main navigation links (Products, Sign Up & Save, Recipes, Health Articles)
- [x] Include Buy Now CTA in tools section
- [x] Analyze original ensure.com footer structure
- [x] Create `fragments/nav/footer.html` with ensure.com content
- [x] Include 3 link columns (Site Pages, Abbott, Abbott Brands)
- [x] Include legal/privacy links
- [x] Include copyright notice
- [x] Verify header renders on page preview
- [x] Verify footer renders on page preview
- [ ] Add Abbott dual-logo to header brand section
- [ ] Add social media icons to footer
- [ ] Add search functionality
- [ ] Style header/footer to match ensure.com design

---

## Files

| File | Purpose | Status |
|------|---------|--------|
| `fragments/nav/header.html` | Header fragment (AuthorKit pattern) | ✅ Ensure.com content |
| `fragments/nav/footer.html` | Footer fragment (AuthorKit pattern) | ✅ Ensure.com content |
| `nav.md` | Header content (DA markdown format) | ✅ Created |
| `footer.md` | Footer content (DA markdown format) | ✅ Created |
| `blocks/header/header.js` | Header block decoration | ✅ Loads from `/fragments/nav/header` |
| `blocks/header/header.css` | Header styling | ✅ Exists |
| `blocks/footer/footer.js` | Footer block decoration | ✅ Loads from `/fragments/nav/footer` |
| `blocks/footer/footer.css` | Footer styling | ✅ Exists |

---

## Notes

- The AuthorKit project uses the **fragment pattern** for navigation — header/footer blocks fetch HTML from `fragments/nav/` rather than reading `nav.md` directly
- The `nav.md` and `footer.md` files exist as a DA-authoring alternative but are not currently consumed by the block JS
- To implement enhancements (dual logos, search, mega-menus), switch to Execute mode and modify the fragment HTML + header CSS/JS
