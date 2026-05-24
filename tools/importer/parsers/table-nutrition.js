/* eslint-disable */
/* global WebImporter */

/**
 * Parser: table-nutrition
 * Base block: table
 * Source: https://www.ensure.com/recipes/drinks-smoothies/key-lime-colada
 * Generated: 2026-05-22
 *
 * Extracts nutrition facts data from recipe pages and converts to an EDS table block.
 * Handles two source formats:
 * 1. Actual HTML <table> element (table.cmp-table__table or table inside .m-table)
 * 2. Paragraph-based nutrition facts (div.text sections with .brandonBlack labels)
 *
 * Target structure: Multi-row table where each row contains nutrient name and value.
 */
export default function parse(element, { document }) {
  const cells = [];

  // Case 1: Element is or contains an actual HTML table
  const table = element.tagName === 'TABLE'
    ? element
    : element.querySelector('table');

  if (table) {
    // Extract rows from thead and tbody
    const headerRows = table.querySelectorAll('thead tr');
    const bodyRows = table.querySelectorAll('tbody tr');
    const allRows = headerRows.length > 0 || bodyRows.length > 0
      ? [...headerRows, ...bodyRows]
      : table.querySelectorAll('tr');

    for (const row of allRows) {
      const rowCells = row.querySelectorAll('th, td');
      const cellContents = Array.from(rowCells).map((cell) => {
        // Preserve the cell content as-is (semantic HTML)
        return cell.cloneNode(true);
      });
      if (cellContents.length > 0) {
        cells.push(cellContents);
      }
    }
  } else {
    // Case 2: Paragraph-based nutrition facts (div.text with .cmp-text sections)
    // Structure: series of div.text elements containing <p> with <span class="brandonBlack"> labels
    const textSections = element.querySelectorAll('.text .cmp-text, section.cmp-text');
    const paragraphs = textSections.length > 0
      ? Array.from(textSections).flatMap((sec) => Array.from(sec.querySelectorAll('p')))
      : Array.from(element.querySelectorAll('p'));

    for (const p of paragraphs) {
      const text = p.textContent.trim().replace(/ /g, ' ').trim();
      if (!text) continue;

      // Skip disclaimer/footnote text (starts with * or contains "representative of")
      if (text.startsWith('*') || text.includes('representative of') || text.includes('Nutrition information will vary')) continue;

      // Check if this is a label+value pair (has .brandonBlack span)
      const labelSpan = p.querySelector('.brandonBlack');
      if (labelSpan) {
        const label = labelSpan.textContent.trim().replace(/ /g, ' ').trim();
        const fullText = p.textContent.trim().replace(/ /g, ' ').trim();
        const value = fullText.replace(label, '').trim();

        const labelEl = document.createElement('strong');
        labelEl.textContent = label;
        const valueEl = document.createElement('span');
        valueEl.textContent = value;
        cells.push([labelEl, valueEl]);
      } else {
        // Sub-items (indented) or standalone text like "Amount Per Serving"
        const trimmedText = text.replace(/^\s+/, '');
        const el = document.createElement('span');
        el.textContent = trimmedText;
        cells.push([el]);
      }
    }
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'table-nutrition', cells });
  element.replaceWith(block);
}
