/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Duopa section breaks and section metadata.
 * Splits page into EDS sections based on template section definitions.
 * Only runs for templates with 2+ sections (product-detail has 5).
 * Selectors validated against migration-work/cleaned.html from duopa.com/carrying-case.
 *
 * Template sections (product-detail):
 *   1. Hero Banner       - #background-container-582095465 (no style)
 *   2. Activities        - #duopa-activities (no style)
 *   3. Carrying Cases    - .abbv-container.bg-lightest-gray (style: grey)
 *   4. Safety Information - .abbv-container.abbv-margin-top-20 (no style)
 *   5. ISI              - .abbv-inline-use-isi (no style)
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.afterTransform) {
    const { template } = payload;
    if (!template || !template.sections || template.sections.length < 2) return;

    const { document } = element.ownerDocument ? { document: element.ownerDocument } : { document: element.getRootNode() };
    const sections = template.sections;

    // Process sections in reverse order to preserve DOM positions
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      const selector = section.selector;
      if (!selector) continue;

      // Find the section element in the DOM
      const sectionEl = element.querySelector(selector);
      if (!sectionEl) continue;

      // Add Section Metadata block if section has a style
      if (section.style) {
        const sectionMetadata = WebImporter.Blocks.createBlock(document, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        // Insert section metadata after the last content element of this section
        // (before the next section break or at the end of section content)
        sectionEl.after(sectionMetadata);
      }

      // Insert <hr> (section break) before each non-first section
      if (i > 0) {
        const hr = document.createElement('hr');
        sectionEl.before(hr);
      }
    }
  }
}
