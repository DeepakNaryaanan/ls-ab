# Full Site Migration to AEM Edge Delivery Services

## Overview

Migrate an entire website to AEM Edge Delivery Services with equal priority on content accuracy and design fidelity. This plan covers URL discovery, template cataloging, block mapping, design extraction, content import, and visual validation.

**Status:** Awaiting website URL to begin execution.

## Prerequisites

- [ ] Obtain the target website URL from the user
- [ ] Verify the local AEM EDS project is set up and the preview server is running
- [ ] Confirm project type (Document-based, DA, or CrossWalk)

## Phase 1: Site Discovery & Scoping

- [ ] Discover all URLs from the site (via sitemap.xml or crawling)
- [ ] Analyze URL patterns and group pages by type
- [ ] Generate a site scope report (total pages, templates, estimated effort)
- [ ] Review scope with user and confirm which templates/pages to prioritize

## Phase 2: Template Cataloging

- [ ] Analyze representative pages from each URL group
- [ ] Identify unique page templates (e.g., homepage, product page, blog post, landing page)
- [ ] Create `page-templates.json` with template definitions, names, and sample URLs
- [ ] Review template catalog with user for accuracy

## Phase 3: Page Analysis & Block Mapping

- [ ] For each template, perform deep page analysis on a representative page
- [ ] Identify all content sections, blocks, and authoring patterns
- [ ] Map source DOM elements to EDS block variants
- [ ] Catalog all unique block variants across the site
- [ ] Check for reusable existing blocks vs. new variants needed

## Phase 4: Design System Migration

- [ ] Extract global design tokens (colors, typography, spacing, breakpoints)
- [ ] Migrate site-level styles (header, footer, navigation, base typography)
- [ ] For each block variant, extract computed styles from the source
- [ ] Write EDS-compatible CSS for each block
- [ ] Validate design fidelity against the original site

## Phase 5: Import Infrastructure

- [ ] Generate block parsers for each unique block variant
- [ ] Generate page transformers (cleanup + section transformers)
- [ ] Create import scripts that combine templates, parsers, and transformers
- [ ] Test import infrastructure against sample pages

## Phase 6: Content Import

- [ ] Run bulk content import for each template group
- [ ] Verify imported HTML structure in the preview server
- [ ] Fix any import errors or malformed content
- [ ] Validate all pages render correctly

## Phase 7: Visual Validation & Refinement

- [ ] Compare migrated pages against originals (visual regression)
- [ ] Identify and fix CSS discrepancies per block
- [ ] Iterate on design fixes until achieving pixel-level fidelity
- [ ] Final QA pass across all templates

## Phase 8: Navigation & Global Elements

- [ ] Migrate navigation structure (nav.html)
- [ ] Migrate footer content
- [ ] Ensure header/nav/footer render consistently across all pages
- [ ] Validate responsive behavior (mobile, tablet, desktop)

## Checklist Summary

- [ ] **Website URL provided** — required to start
- [ ] Site discovery complete
- [ ] Template catalog created and approved
- [ ] All pages analyzed and blocks mapped
- [ ] Design system migrated (global + per-block)
- [ ] Import infrastructure built and tested
- [ ] Content imported for all templates
- [ ] Visual validation passed
- [ ] Navigation and global elements working
- [ ] Final review and sign-off

---

*To begin execution, please provide the website URL and switch to Execute mode.*
