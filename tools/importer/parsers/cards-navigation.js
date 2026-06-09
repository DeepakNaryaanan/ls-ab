/* eslint-disable */
/* global WebImporter */

/**
 * Parser: cards-navigation
 * Base block: cards
 * Source: https://www.duopa.com/carrying-case
 * Selector: .abbv-row-container.duopa-carrying-cases
 * Generated: 2026-06-09
 *
 * Extracts a grid of product image cards (each with image + bold label)
 * from AbbVie columns layout into standard EDS cards block rows.
 * Structure: 4 cards in .abbv-col-3 columns, each with image-text component.
 */
export default function parse(element, { document }) {
  // Find the inner columns container with the card items
  const columnsContainer = element.querySelector('.abbv-row-container.duopa-cases-component, .abbv-row-container.updated-column-control');

  // Get all card columns (.abbv-col-3 within the columns row)
  const cardColumns = columnsContainer
    ? Array.from(columnsContainer.querySelectorAll(':scope .abbv-row > .abbv-col.abbv-col-3'))
    : Array.from(element.querySelectorAll('.abbv-col.abbv-col-3'));

  const cells = [];

  cardColumns.forEach((col) => {
    // Extract image from the image-text component
    const img = col.querySelector('.abbv-image-text img, .abbv-image-content-container img');

    // Extract label text (bold paragraph within the text content area)
    const label = col.querySelector('.abbv-image-text-display p, .abbv-image-text-content p');

    const cardContent = [];
    if (img) cardContent.push(img);
    if (label) cardContent.push(label);

    if (cardContent.length > 0) {
      cells.push(cardContent);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-navigation', cells });
  element.replaceWith(block);
}
