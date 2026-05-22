/* eslint-disable */
/* global WebImporter */

/**
 * Parser: accordion-faq
 * Base block: accordion
 * Source: https://www.ensure.com/nutrition-products/ensure-original
 * Selector: .accordion.panelcontainer
 * Test URL: https://www.ensure.com/nutrition-products/ensure-surgery
 * Validation: live validation not possible (ensure.com prevents networkidle due to persistent connections)
 * Generated: 2026-05-22
 *
 * Extracts FAQ accordion items from the source DOM and produces a 2-column
 * accordion block table where each row is: question title | answer content.
 *
 * Source structure:
 *   div.accordion.panelcontainer
 *     > div.m-accordion.cmp-accordion
 *       > div.m-accordion__content
 *         > div.m-accordion__content-items (per item)
 *           > div.m-accordion__header > div.m-accordion__title-wrapper > h3
 *           > div.m-accordion__body > div.cmp-accordion__panel > div.text > section.cmp-text
 */
export default function parse(element, { document }) {
  // Find all accordion items within the container
  const items = element.querySelectorAll('.m-accordion__content-items');

  const cells = [];

  items.forEach((item) => {
    // Extract the question title from the header
    // Selectors validated against source: .m-accordion__title-wrapper > h3
    const titleWrapper = item.querySelector('.m-accordion__title-wrapper');
    const titleEl = titleWrapper
      ? titleWrapper.querySelector('h3, h2, h4, span')
      : null;

    // Extract the answer content from the body
    // Selectors validated against source: .m-accordion__body .cmp-accordion__panel .text .cmp-text > p
    const bodyPanel = item.querySelector('.m-accordion__body .cmp-text, .m-accordion__body .text .cmp-text');
    let answerContent;

    if (bodyPanel) {
      // Get all content elements (paragraphs, links, lists) from the answer section
      const contentElements = bodyPanel.querySelectorAll('p, ul, ol, h2, h3, h4, h5, h6');
      if (contentElements.length > 0) {
        const container = document.createElement('div');
        contentElements.forEach((el) => {
          container.appendChild(el.cloneNode(true));
        });
        answerContent = container;
      } else {
        // Fallback: use the entire body panel content
        answerContent = bodyPanel;
      }
    } else {
      // Fallback: try broader selector for answer body
      const fallbackBody = item.querySelector('.m-accordion__body');
      answerContent = fallbackBody || document.createElement('p');
    }

    // Only add row if we have at least a title
    if (titleEl) {
      cells.push([titleEl, answerContent]);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'accordion-faq', cells });
  element.replaceWith(block);
}
