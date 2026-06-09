# Duopa.com Navigation Setup Plan

## Overview

Replace the existing Skyrizi navigation and footer with the Duopa site navigation structure. The current `nav.md` and `footer.md` contain Skyrizi content that must be replaced with the Duopa header navigation, utility links, and footer extracted from the source site.

## Source Navigation Structure (from duopa.com)

### Header Navigation
- **Logo:** Duopa logo linking to `/`
- **Utility Nav (top bar):**
  - Important Safety Information (modal)
  - Prescribing Information & Patient Information (dropdown: PI, Medication Guide, Instructions for Use)
  - For Healthcare Professionals (modal)
  - "TALK WITH A REAL DUOPA PATIENT AND CARE PARTNER" CTA → `/mentor-program`
- **Primary Nav:**
  - HOME → `/`
  - UNDERSTANDING ADVANCING PARKINSON'S → `/advanced-parkinsons`
  - WHAT IS DUOPA? → `/what-is-duopa`
  - HOW DUOPA WORKS → `/how-duopa-works`
  - CARRYING CASE STYLES → `/carrying-case`
  - PATIENT STORIES → `/patient-stories`
  - PATIENT RESOURCES → `/resources`
- **Search:** Links to `/search-results`

### Footer
- Safety/legal links, AbbVie copyright, privacy notices (standard AbbVie pharma footer)

## Approach

Use the **navigation orchestrator** skill to programmatically extract and instrument the Duopa navigation from the source site, capturing hover/click behaviors, megamenu structure (if any), and responsive mobile patterns. Then build the EDS `nav.md` and `footer.md` files.

## Checklist

- [ ] Extract Duopa header navigation structure from source site
- [ ] Capture desktop and mobile navigation screenshots for reference
- [ ] Build EDS `nav.md` with Duopa logo, primary nav links, and utility nav
- [ ] Build EDS `footer.md` with Duopa footer links, legal text, and AbbVie branding
- [ ] Verify header block renders correctly in local preview
- [ ] Verify footer block renders correctly in local preview
- [ ] Test responsive navigation behavior (mobile hamburger menu)

## Execution Entry Point

When Execute mode is activated, invoke the **excat-navigation-orchestrator** skill with:
- **Source URL:** https://www.duopa.com/carrying-case (representative page with full nav)
- **Task:** Migrate header/navigation from source to EDS nav.md

Then invoke the **excat-footer-orchestrator** skill for footer migration.

## Key Files to Modify

| File | Current Content | Target Content |
|------|----------------|----------------|
| `nav.md` | Skyrizi navigation | Duopa navigation |
| `footer.md` | Skyrizi footer | Duopa footer |
| `blocks/header/header.js` | May need updates for Duopa nav structure |
| `blocks/header/header.css` | May need styling updates |
| `blocks/footer/footer.js` | May need updates |
| `blocks/footer/footer.css` | May need styling updates |

## Notes

- Duopa has a simpler flat navigation (no megamenu dropdowns in primary nav)
- Utility nav has modal triggers (ISI, HCP) that won't directly translate — these become links or fragments
- The "TALK WITH A REAL DUOPA PATIENT" CTA in the utility bar is a prominent feature to preserve
- Search functionality links to `/search-results`
- Footer follows standard AbbVie pharma pattern (safety links, PI, copyright)
