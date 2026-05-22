/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-nutrition
 * Base block: columns
 * Source: https://www.ensure.com/nutrition-products/ensure-original
 * Selector: .columncontrol.column-align--left .columncontrol__column
 * Generated: 2026-05-22
 *
 * Handles two-column layouts on product pages:
 * - Product detail: left = description/bullet lists, right = product image + flavor cards
 * - Nutrition facts: left = nutrient data, right = ingredients
 * - Vitamins/Minerals: left = vitamins data, right = minerals data
 *
 * Source structure (validated against cleaned.html):
 * - Parent: div.columncontrol with child div.container > div.row
 * - Columns: div.col-12.col-md-6.col-lg-6.columncontrol__column (or col-md-5)
 * - Content: .cmp-title__text (headings), .cmp-text (paragraphs, lists), .cmp-image (images)
 */
export default function parse(element, { document }) {
  // The element is the parent .columncontrol div
  // Find the row that contains the columns
  const row = element.querySelector(':scope > .container > .row');
  if (!row) return;

  // Get the two main column children
  const columns = Array.from(row.querySelectorAll(':scope > .columncontrol__column'));
  if (columns.length < 2) return;

  const leftCol = columns[0];
  const rightCol = columns[1];

  // Extract content elements from a column, preserving headings, text, lists, images, links
  function extractContent(col) {
    const content = [];

    // Get headings from .cmp-title containers
    const headings = col.querySelectorAll('.cmp-title__text');
    headings.forEach((h) => content.push(h));

    // Get paragraphs and lists from .cmp-text sections
    const textSections = col.querySelectorAll('.cmp-text');
    textSections.forEach((section) => {
      const children = section.querySelectorAll(':scope > p, :scope > ul, :scope > ol');
      children.forEach((child) => content.push(child));
    });

    // Get images (product images in .image containers, not nested flavor cards)
    const imageLinks = col.querySelectorAll(':scope > .image .cmp-image__link');
    const standaloneImages = col.querySelectorAll(':scope > .image img.cmp-image__image');
    imageLinks.forEach((link) => content.push(link));
    if (imageLinks.length === 0) {
      standaloneImages.forEach((img) => content.push(img));
    }

    return content.length > 0 ? content : [col];
  }

  const leftContent = extractContent(leftCol);
  const rightContent = extractContent(rightCol);

  // Build cells: single row with 2 columns of content
  // Matches block library structure: Row 1 = block name, Row 2 = col1 | col2
  const cells = [
    [leftContent, rightContent],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-nutrition', cells });
  element.replaceWith(block);
}
