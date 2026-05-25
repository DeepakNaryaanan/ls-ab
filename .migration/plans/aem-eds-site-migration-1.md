# Navigation Setup Plan for Skyrizi.com Psoriasis

## Overview

The navigation content files (`nav.md` and `footer.md`) have already been authored with Skyrizi content. However, the navigation is not rendering correctly in the preview — it still shows the old Ensure.com navigation. This plan addresses verifying and fixing the navigation setup to ensure it renders properly.

**Current State:**
- `nav.md` — Already authored with Skyrizi structure (logo, 3 dropdown menus, tools section)
- `footer.md` — Already authored with 3-column Skyrizi footer (product links, safety info, AbbVie links)
- `blocks/header/header.js` + `header.css` — Exist (from previous Ensure migration)
- `blocks/footer/footer.js` + `footer.css` — Exist (from previous Ensure migration)
- **Missing:** `/icons/skyrizi-logo.svg` referenced in nav.md does not exist

## Issues to Resolve

1. **Missing logo asset:** `nav.md` references `/icons/skyrizi-logo.svg` which does not exist in the project
2. **Preview cache:** The local preview server may be serving cached old Ensure nav content
3. **Header/footer block code:** May still reference Ensure-specific patterns or need updating for Skyrizi structure

## Checklist

- [ ] **Download Skyrizi logo SVG** — Fetch the SKYRIZI logo from the source site and save to `/icons/skyrizi-logo.svg`
- [ ] **Verify header block code** — Review `blocks/header/header.js` to ensure it handles the 3-section nav structure (brand, sections with dropdowns, tools)
- [ ] **Verify footer block code** — Review `blocks/footer/footer.js` to ensure it handles the 3-column link layout with legal section
- [ ] **Update header CSS** — Adjust `blocks/header/header.css` for Skyrizi brand (nav height 156px, colors, font family)
- [ ] **Update footer CSS** — Adjust `blocks/footer/footer.css` for Skyrizi brand (cyan #00a3df background, white text)
- [ ] **Refresh preview** — Clear cached nav and verify header/footer render with Skyrizi content
- [ ] **Test dropdowns** — Verify Psoriasis, About SKYRIZI, and SKYRIZI Complete dropdown menus open/close correctly
- [ ] **Test mobile** — Verify hamburger menu works on mobile viewport
- [ ] **Test footer links** — Verify all 3 footer columns display correctly with proper link targets
- [ ] **Verify across pages** — Check nav/footer renders consistently on treatment, about, and disease-info pages

## File References

| File | Status | Action Needed |
|------|--------|---------------|
| `nav.md` | ✅ Authored | Verify rendering |
| `footer.md` | ✅ Authored | Verify rendering |
| `blocks/header/header.js` | Exists | Review compatibility |
| `blocks/header/header.css` | Exists | Update brand styles |
| `blocks/footer/footer.js` | Exists | Review compatibility |
| `blocks/footer/footer.css` | Exists | Update brand styles |
| `icons/skyrizi-logo.svg` | ❌ Missing | Download from source |

## Navigation Structure

### Header (3 sections)
1. **Brand:** SKYRIZI logo → /
2. **Sections:** Psoriasis (5 items), About SKYRIZI (3 items), SKYRIZI Complete (3 items)
3. **Tools:** Full Prescribing Information (external PDF), Sign Up

### Footer (2 sections)
1. **Links:** 3 columns — Product Pages, Safety Info, AbbVie Corporate
2. **Legal:** Job code US-SKZ-240247, AbbVie logo, copyright notice

---

*Switch to Execute mode to download the logo asset, update header/footer CSS, and verify navigation rendering.*
