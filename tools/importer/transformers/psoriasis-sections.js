/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: psoriasis sections.
 * Adds section breaks (<hr>) and Section Metadata blocks from template sections.
 * Runs in afterTransform only. Uses payload.template.sections from page-templates.json.
 * Selectors from captured DOM (migration-work/cleaned.html).
 */
export default function transform(hookName, element, payload) {
  if (hookName === 'afterTransform') {
    const sections = payload && payload.template && payload.template.sections;
    if (!sections || sections.length < 2) return;

    const document = element.ownerDocument;

    // Process sections in reverse order to avoid DOM position shifts
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];

      // Support selector as string or array of selectors
      const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
      let sectionEl = null;
      for (const sel of selectors) {
        sectionEl = element.querySelector(sel);
        if (sectionEl) break;
      }
      if (!sectionEl) continue;

      // Add Section Metadata block if section has a style
      if (section.style) {
        const metaBlock = WebImporter.Blocks.createBlock(document, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        sectionEl.parentNode.insertBefore(metaBlock, sectionEl.nextSibling);
      }

      // Add <hr> before non-first sections
      if (i > 0) {
        const hr = document.createElement('hr');
        sectionEl.parentNode.insertBefore(hr, sectionEl);
      }
    }
  }
}
