# Full Site Migration Plan: https://www.ensure.com/ → AEM Edge Delivery Services

## Status: READY FOR EXECUTION

> **This plan is approved and ready to execute.** Switch to Execute mode to begin the migration. The site migration workflow will be invoked to orchestrate all phases automatically.

## Overview

Migrate the entire website at **https://www.ensure.com/** to AEM Edge Delivery Services. This involves discovering all pages, analyzing their structure, cataloging page templates, mapping blocks, generating import infrastructure, migrating the design system, and importing all content.

## Target Site

- **URL:** https://www.ensure.com/
- **Migration Scope:** Entire site
- **Approach:** Template-based migration — discover URL patterns, group into templates, analyze representative pages, then bulk import

## Migration Phases

### Phase 1: URL Discovery & Site Cataloging
- Discover all URLs from https://www.ensure.com/ (via sitemap.xml or crawl)
- Group pages into templates based on structural similarity
- Identify unique page types (e.g., homepage, product pages, nutrition info, recipes, articles)

### Phase 2: Page Analysis & Block Mapping
- Analyze representative pages from each template group
- Identify content sections, blocks, and authoring patterns
- Map source DOM elements to AEM Edge Delivery block variants
- Document block variants and their usage across templates

### Phase 3: Import Infrastructure
- Generate block parsers for each identified block variant
- Create page transformers (cleanup and section transformers)
- Build the import script combining parsers and transformers
- Validate infrastructure against sample pages

### Phase 4: Design Migration
- Extract design tokens (colors, typography, spacing) from ensure.com
- Migrate site-level styles (fonts, CSS custom properties, global layout)
- Style each block variant to match the original design
- Validate visual fidelity against the source

### Phase 5: Content Import
- Run bulk content import across all discovered URLs
- Verify imported content renders correctly in the local preview
- Fix any import issues or rendering problems

### Phase 6: Validation & QA
- Compare migrated pages visually against originals
- Fix styling discrepancies
- Verify navigation, metadata, and responsive behavior

---

## Checklist

- [ ] Discover all URLs from https://www.ensure.com/
- [ ] Analyze site structure and catalog page templates
- [ ] Analyze representative pages from each template
- [ ] Map blocks and create block variant definitions
- [ ] Generate block parsers for all identified variants
- [ ] Generate page transformers (cleanup + sections)
- [ ] Build and validate the import script
- [ ] Migrate site-level design (tokens, fonts, global CSS)
- [ ] Migrate block-level styles for each variant
- [ ] Run content import for all pages
- [ ] Validate imported content in preview
- [ ] Visual QA and fix any discrepancies
- [ ] Set up navigation structure

---

## Execution Entry Point

When Execute mode is activated, invoke the **site migration** workflow with:
- **Source URL:** https://www.ensure.com/
- **Scope:** Entire site
- **Migration type:** URL list (discovered from sitemap/crawl)

## Prerequisites

- Local AEM Edge Delivery Services project is set up and running
- Access to https://www.ensure.com/ (publicly accessible)
- Local preview server available for validation

## Notes

- Ensure.com likely contains product pages, nutrition content, recipes, and marketing landing pages — template diversity will become clear during discovery
- The migration workflow coordinates all sub-tasks (URL discovery, analysis, infrastructure generation, import, and design) automatically
