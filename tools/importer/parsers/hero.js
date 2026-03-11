/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero block.
 * Base: hero. Source: https://www.psoriasis.com/
 * Selector: .abbv-container.flat-bbg.red-pale
 * Generated: 2026-03-11
 */
export default function parse(element, { document }) {
  // Extract hero image from the image flex item
  // Source: .abbv-image-content-container-v2 > picture > img
  const image = element.querySelector('.abbv-image-content-container-v2 img, .abbv-image-swap img');

  // Extract heading from rich text area
  // Source: .abbv-rich-text h1 "TAKE A DEEPER LOOK AT PSORIASIS"
  const heading = element.querySelector('.abbv-rich-text h1, .abbv-rich-text-common h1, h1, h2');

  // Extract description paragraph from rich text area
  // Source: .abbv-rich-text p (subtitle about free kit)
  const description = element.querySelector('.abbv-rich-text p, .abbv-rich-text-common p');

  // Extract CTA button link
  // Source: .cta.parbase a.abbv-button-primary "Get FREE Psoriasis Kit"
  const cta = element.querySelector('.cta.parbase a.abbv-button-primary, a.abbv-button-primary');

  // Build cells matching hero block library structure:
  // Row 1: background image
  // Row 2: heading + description + CTA
  const cells = [];

  if (image) {
    cells.push([image]);
  }

  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (description) contentCell.push(description);
  if (cta) contentCell.push(cta);
  cells.push([contentCell]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero', cells });
  element.replaceWith(block);
}
