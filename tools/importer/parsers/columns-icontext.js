/* eslint-disable */
/* global WebImporter */

/**
 * Parser: columns-icontext
 * Base block: columns
 * Source: https://www.duopa.com/carrying-case
 * Selector: .abbv-row-container.duopa-icon-tout-2
 * Description: Columns block with icon+text pairs. Each row has a small icon image
 * (abbv-col-2) and descriptive paragraph text (abbv-col-10).
 * Generated: 2026-06-09
 */
export default function parse(element, { document }) {
  // Find all rows within the container - each row is an icon+text pair
  const rows = element.querySelectorAll(':scope .abbv-row');

  const cells = [];

  rows.forEach((row) => {
    // Icon column: .abbv-col-2 contains the icon image
    const iconCol = row.querySelector('.abbv-col-2, .abbv-col.abbv-col-2');
    const icon = iconCol ? iconCol.querySelector('img') : null;

    // Text column: .abbv-col-10 contains the paragraph text
    const textCol = row.querySelector('.abbv-col-10, .abbv-col.abbv-col-10');
    const textContent = textCol ? textCol.querySelector('.abbv-rich-text p, .abbv-rich-text, p') : null;

    // Build row cells: [icon, text]
    const iconCell = icon || '';
    const textCell = textContent || '';

    cells.push([iconCell, textCell]);
  });

  // Fallback: if no .abbv-row found, try to extract directly
  if (cells.length === 0) {
    const icon = element.querySelector('.abbv-col-2 img, .abbv-image-text-img');
    const text = element.querySelector('.abbv-col-10 .abbv-rich-text p, .abbv-col-10 p');
    if (icon || text) {
      cells.push([icon || '', text || '']);
    }
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-icontext', cells });
  element.replaceWith(block);
}
