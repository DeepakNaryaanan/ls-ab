# Full Site Migration Plan: duopa.com → AEM Edge Delivery Services

## Overview

Migrate the entire **https://www.duopa.com/** site (23 pages, 10 templates, 31 block variants) to AEM Edge Delivery Services. Site discovery and cataloging is already complete — this plan covers the remaining migration phases.

## Current State

- **Site catalog:** Complete (100% coverage, 23/23 pages analyzed)
- **Templates identified:** 10 (homepage, disease-education, product-detail, content-detail, video-transcript, materials-hub, mentor-program, form-page, program-signup, search-results)
- **Block variants:** 31 (19 EDS-mapped, 12 custom/unknown)
- **Project type:** DA (Document Authoring)

## Migration Phases

### Phase 1: Page Analysis & Block Mapping
Analyze representative pages from each template to map DOM selectors to block variants and build `page-templates.json` for the import infrastructure.

**Templates to analyze (by priority):**
1. `product-detail` (4 pages) — hero, section nav, columns, carousel
2. `content-detail` (4 pages) — hero, video/media, accordion, columns
3. `disease-education` (2 pages) — section nav, multi-block content
4. `video-transcript` (7 pages) — minimal text-only
5. `homepage` (1 page) — hero, content blocks
6. `materials-hub` (1 page) — section nav, video content
7. `mentor-program` (1 page) — info + form
8. `form-page` (1 page) — single form block
9. `program-signup` (1 page) — single enrollment block
10. `search-results` (1 page) — search widget

### Phase 2: Import Infrastructure
Generate block parsers and page transformers for each template, then build and validate the import script.

- Block parsers for each identified block variant
- Cleanup transformer (remove nav, footer, ISI boilerplate)
- Sections transformer (split DOM into EDS sections)
- Combined import scripts per template

### Phase 3: Content Import
Run bulk content import across all 23 pages using template-based import scripts.

- Import representative pages first (validate output)
- Bulk import remaining pages per template
- Verify imported HTML renders in local preview

### Phase 4: Design Migration
Extract and migrate the visual design system from duopa.com to EDS.

- Extract design tokens (colors, typography, spacing)
- Migrate site-level styles (fonts, CSS custom properties, global layout)
- Style each block variant to match the original
- Validate visual fidelity

### Phase 5: Navigation & Footer
Migrate the site navigation (header) and footer components.

- Instrument the navigation header
- Build the EDS footer
- Validate responsive behavior

### Phase 6: Validation & QA
Visual comparison of migrated pages against originals.

- Compare each template's representative page
- Fix CSS discrepancies
- Verify metadata, responsive behavior, and accessibility

---

## Checklist

- [ ] Analyze representative pages for each template (page-analysis skill)
- [ ] Map block variants with DOM selectors (block-mapping-manager)
- [ ] Generate block parsers for all block variants
- [ ] Generate page transformers (cleanup + sections)
- [ ] Build import scripts for each template
- [ ] Import representative pages and validate
- [ ] Bulk import all 23 pages
- [ ] Verify imported content in local preview
- [ ] Migrate site-level design tokens and global CSS
- [ ] Style all block variants
- [ ] Migrate navigation header
- [ ] Migrate footer
- [ ] Visual QA — compare migrated pages to originals
- [ ] Fix any rendering or styling issues

---

## Execution Entry Point

When Execute mode is activated, invoke the **excat-site-migration** skill with:
- **Source URL:** https://www.duopa.com/
- **Scope:** Full site (all 23 pages)
- **Catalog:** Already complete at `catalog/`
- **Templates:** 10 templates defined in `catalog/template-catalog.json`

## Key Artifacts

| Artifact | Location | Status |
|----------|----------|--------|
| Template catalog | `catalog/template-catalog.json` | Done |
| Block catalog | `catalog/block-catalog.json` | Done |
| Page analyses | `catalog/.pages/*/page-catalog.json` | Done |
| Page templates (import) | `tools/importer/page-templates.json` | To create |
| Block parsers | `tools/importer/parsers/` | To create |
| Page transformers | `tools/importer/transformers/` | To create |
| Import scripts | `tools/importer/import-*.js` | To create |
| Imported content | `content/` | To create |
