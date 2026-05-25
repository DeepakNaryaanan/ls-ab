/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Skyrizi section breaks and section metadata.
 * Inserts <hr> between sections and adds Section Metadata blocks where style is defined.
 * Section selectors from page-templates.json, validated against captured DOM.
 *
 * Sections (from template):
 *   1. Hero Carousel - selector: .home-hero-carousel (no style)
 *   2. Navigation Cards Row - selector: .psoriasis-tail-cards.gray-bg-colm (style: grey)
 *   3. Content Listing with Sidebar - selector: .abbv-flex-item.flex-col-lg-8 (no style)
 *   4. Important Safety Information - selector: .abbv-inline-use-isi (no style)
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.afterTransform) {
    const { document } = element.ownerDocument ? { document: element.ownerDocument } : { document: element.getRootNode() };
    const sections = payload && payload.template && payload.template.sections;
    if (!sections || sections.length < 2) return;

    // Process sections in reverse order to preserve DOM positions
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      const selectorValue = section.selector;

      // Find the first element matching the section selector
      let sectionEl = null;
      if (Array.isArray(selectorValue)) {
        // For array selectors, find the first matching element
        for (const sel of selectorValue) {
          sectionEl = element.querySelector(sel);
          if (sectionEl) break;
        }
      } else {
        sectionEl = element.querySelector(selectorValue);
      }

      if (!sectionEl) continue;

      // Add Section Metadata block if section has a style
      if (section.style) {
        const sectionMetadata = WebImporter.Blocks.createBlock(document, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        // Insert section metadata after the section content
        if (sectionEl.nextSibling) {
          sectionEl.parentNode.insertBefore(sectionMetadata, sectionEl.nextSibling);
        } else {
          sectionEl.parentNode.appendChild(sectionMetadata);
        }
      }

      // Insert <hr> before each non-first section
      if (i > 0) {
        const hr = document.createElement('hr');
        sectionEl.parentNode.insertBefore(hr, sectionEl);
      }
    }
  }
}
