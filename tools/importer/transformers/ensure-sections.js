/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: ensure.com sections
 * Adds section breaks (<hr>) and Section Metadata blocks based on template sections.
 * Runs in afterTransform only. Processes sections in reverse order.
 * All selectors validated against migration-work/cleaned.html.
 *
 * Sections from page-templates.json (homepage):
 *   1. Hero Banner - selector: .o-hero-carousel.o-hero-carousel--tall (style: navy-blue)
 *   2. Category Cards Row - selector: #hero-card-row (no style)
 *   3. Disclaimer Footnotes - selector: .text.a-text--fg.a-text--fg-alternate (no style)
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.afterTransform) {
    const { document } = payload;
    const sections = payload.template && payload.template.sections;

    if (!sections || sections.length < 2) {
      return;
    }

    // Process sections in reverse order to avoid DOM position shifts
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      const sectionEl = element.querySelector(section.selector);

      if (!sectionEl) {
        continue;
      }

      // Add Section Metadata block after the section element if style is defined
      if (section.style) {
        const sectionMetadata = WebImporter.Blocks.createBlock(document, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        sectionEl.after(sectionMetadata);
      }

      // Add <hr> section break before each section except the first
      if (i > 0) {
        const hr = document.createElement('hr');
        sectionEl.before(hr);
      }
    }
  }
}
