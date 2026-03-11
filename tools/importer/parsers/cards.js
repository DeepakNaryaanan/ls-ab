/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards block.
 * Base: cards. Source: https://www.psoriasis.com/
 * Selector: .abbv-row-container.target-rcmd-touts
 * Generated: 2026-03-11
 */
export default function parse(element, { document }) {
  // Each card is in .abbv-col containing .abbv-image-text
  const cards = element.querySelectorAll('.abbv-col .abbv-image-text');
  const cells = [];

  cards.forEach((card) => {
    // Column 1: card image (use the first/large variant)
    // Source: .abbv-image-content-container img (first img is large desktop version)
    const image = card.querySelector('.abbv-image-content-container img');

    // Column 2: text content from .abbv-image-text-display
    const textContainer = card.querySelector('.abbv-image-text-display, .abbv-image-text-content');

    // Extract heading (h3), description (first p without link), and CTA link
    const heading = textContainer ? textContainer.querySelector('h3, h2') : null;
    const cta = textContainer ? textContainer.querySelector('a[href]') : null;

    // Get description paragraph - select p elements and find one without a link
    let description = null;
    if (textContainer) {
      const paragraphs = textContainer.querySelectorAll('p');
      for (let i = 0; i < paragraphs.length; i++) {
        if (!paragraphs[i].querySelector('a')) {
          description = paragraphs[i];
          break;
        }
      }
    }

    // Build card row: [image, text content]
    const textContent = [];
    if (heading) textContent.push(heading);
    if (description) textContent.push(description);
    if (cta) textContent.push(cta);

    cells.push([image || '', textContent]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards', cells });
  element.replaceWith(block);
}
