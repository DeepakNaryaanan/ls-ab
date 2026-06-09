# Site Discovery Plan: duopa.com

## Overview

Discover all pages and identify layout templates for **https://www.duopa.com/** — a pharmaceutical site for Duopa (carbidopa/levodopa enteral suspension), a Parkinson's disease treatment by AbbVie.

## Approach

Use a two-phase discovery process:
1. **URL Discovery** — Fetch all pages via sitemap.xml or crawling
2. **Site Cataloging** — Analyze pages, group by structural similarity into templates, and identify unique layouts

## Phases

### Phase 1: URL Discovery
- Fetch sitemap.xml from https://www.duopa.com/sitemap.xml
- If no sitemap, crawl starting from the homepage
- Compile complete list of all discoverable URLs
- Filter out non-content pages (assets, redirects, etc.)

### Phase 2: Template Discovery & Site Cataloging
- Analyze representative pages from each URL pattern group
- Identify structural patterns (hero types, content layouts, sidebars, etc.)
- Group pages into template categories (e.g., homepage, treatment pages, HCP pages, patient pages)
- Document blocks used per template
- Create page-templates.json with template definitions

## Expected Page Types (hypothesis)

Based on typical pharma sites like duopa.com:
- Homepage / landing page
- Patient information pages
- HCP (Healthcare Professional) pages
- Safety / prescribing information
- Savings / copay assistance pages
- Video / testimonial pages
- Utility pages (sitemap, contact, privacy)

## Execution Entry Point

When Execute mode is activated, invoke:
1. **excat-url-discovery** skill with source URL `https://www.duopa.com/`
2. **excat-site-catalog** skill to analyze and group discovered URLs into templates

## Checklist

- [ ] Run URL discovery for https://www.duopa.com/ (sitemap or crawl)
- [ ] Compile and deduplicate full URL list
- [ ] Analyze page structure for representative URLs
- [ ] Group pages into template categories by layout similarity
- [ ] Create page-templates.json with template definitions
- [ ] Document block variants found per template
- [ ] Produce site catalog summary with page counts per template

## Prerequisites

- https://www.duopa.com/ must be publicly accessible
- No authentication or geo-blocking on the site

## Output Artifacts

| Artifact | Location | Purpose |
|----------|----------|---------|
| URL list | `tools/importer/urls-*.txt` | All discovered page URLs |
| Page templates | `tools/importer/page-templates.json` | Template definitions with blocks |
| Site catalog | `.migration/` | Summary of templates and page counts |
