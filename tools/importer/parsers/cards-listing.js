/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards block on listing pages.
 * Handles card-link pattern: .abbv-col a[href] with img + h3 + p
 * Selector: .abbv-row-container.target-rcmd-touts
 */
export default function parse(element, { document }) {
  // Listing page cards are <a> links inside .abbv-col-4 columns
  const cardLinks = element.querySelectorAll('.abbv-col-4 a[href]');
  const cells = [];

  cardLinks.forEach((link) => {
    const image = link.querySelector('img');
    const heading = link.querySelector('h3, h2');
    const description = link.querySelector('p');

    // Build card row: [image, text content]
    const textContent = [];
    if (heading) textContent.push(heading.cloneNode(true));
    if (description) textContent.push(description.cloneNode(true));

    // Add the link as CTA
    const cta = document.createElement('p');
    const ctaLink = document.createElement('a');
    ctaLink.href = link.href;
    ctaLink.textContent = heading ? heading.textContent : 'Read More';
    cta.appendChild(ctaLink);
    textContent.push(cta);

    if (image) {
      cells.push([image.cloneNode(true), textContent]);
    }
  });

  if (cells.length > 0) {
    const block = WebImporter.Blocks.createBlock(document, { name: 'cards', cells });
    element.replaceWith(block);
  }
}
