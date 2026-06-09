# Duopa Navigation Styling Plan

## Overview

Style the existing EDS header and footer blocks to visually match the original duopa.com navigation design. The structure is already in place (`nav.md`, `footer.md`, `nav.plain.html`, `footer.plain.html`) — this plan covers CSS styling to match the original site's appearance.

## Current State

- **Header CSS** (`blocks/header/header.css`): Dark navy background (`#071d49`), white text, fixed positioning, grid layout with brand/nav/actions sections
- **Footer CSS** (`blocks/footer/footer.css`): Blue background (`#00a3df`), white text, 3-column layout on desktop
- **Brand tokens** (`styles/brand.css`): Skyrizi/Ensure colors — needs Duopa palette

## Target Design (from duopa.com screenshot)

### Header
- **Background:** White
- **Logo:** Duopa blue logo, left-aligned
- **Nav links:** Dark teal/navy text, uppercase, horizontal on desktop
- **Mobile:** Hamburger menu with slide-down panel
- **Utility bar:** Thin top bar with safety/PI links (lighter blue)

### Footer
- **Background:** Medium blue (#0078b4 or similar Duopa blue)
- **Text:** White links in horizontal layout
- **Legal row:** Lighter text, separated by top border
- **AbbVie logo:** White, bottom-right area

## Changes Required

### 1. Update brand.css tokens for Duopa
- Header background: `#ffffff` (white)
- Header text: `#005b8c` (Duopa dark teal)
- Footer background: keep `#00a3df` or adjust to Duopa blue
- Primary color: Duopa teal/blue instead of Skyrizi pink
- Accent-dark: Duopa header blue

### 2. Update header.css
- Change background from dark navy to white
- Change text/link color from white to dark teal
- Adjust logo sizing for Duopa logo dimensions
- Keep fixed positioning and mobile hamburger behavior

### 3. Update footer.css
- Minor adjustments if needed (current blue footer is close to Duopa)
- Ensure link layout matches horizontal style of original

## Checklist

- [ ] Extract Duopa color palette from source site (header blue, footer blue, nav text color)
- [ ] Update brand.css with Duopa design tokens (colors, fonts)
- [ ] Update header.css for white background with dark nav text
- [ ] Update footer.css to match Duopa footer layout
- [ ] Verify styled header in local preview
- [ ] Verify styled footer in local preview
- [ ] Test mobile responsive behavior

## Execution Entry Point

When Execute mode is activated, invoke the **excat-complete-design-expert** skill to extract exact Duopa design tokens from the source site and apply them to the header/footer CSS. Alternatively, manually update the CSS variables in `brand.css` and adjust `blocks/header/header.css` based on the computed styles from the original site.

## Notes

- The current header.css structure is well-suited to Duopa's simple flat nav — no megamenu changes needed
- The footer already has a blue background that's close to Duopa's design
- Key visual change is header: dark navy → white background, white text → dark teal text
- Font family may need updating if Duopa uses different web fonts than the current Univers/Skyrizi fonts
