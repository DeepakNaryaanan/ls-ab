/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns block.
 * Base: columns. Source: https://www.psoriasis.com/
 * Selector: .abbv-definition-block.abbv-find-the-right-doctor
 * Generated: 2026-03-11
 */
export default function parse(element, { document }) {
  // Column 1: text content from the stretched card body
  // Source: .abbv-stretched-card-body contains h2, p, and CTA link
  const heading = element.querySelector('.abbv-stretched-card-body h2, .abbv-image-text-display-v2 h2');
  const description = element.querySelector('.abbv-stretched-card-body p, .abbv-image-text-content-v2 p');
  const cta = element.querySelector('.abbv-stretched-card-body a.abbv-button-primary, a.abbv-image-text-link');

  // Column 2: doctor image
  // Source: .abbv-image-content-container-v2 > picture > img
  const image = element.querySelector('.abbv-image-content-container-v2 img');

  // Build cells matching columns block library structure:
  // Single row with 2 columns: [text content, image]
  const col1 = [];
  if (heading) col1.push(heading);
  if (description) col1.push(description);
  if (cta) col1.push(cta);

  const cells = [
    [col1, image || ''],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns', cells });
  element.replaceWith(block);
}
