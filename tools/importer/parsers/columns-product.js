/* eslint-disable */
/* global WebImporter */

/**
 * Parser: columns-product
 * Base block: columns
 * Source: https://www.ensure.com/nutrition-products/ensure-original/banana-nut-shake
 * Selector: .columncontrol.column-align--left .columncontrol__column
 * Parent element: div.columncontrol.column-align--left
 * Template: product-flavor-page
 * Generated: 2026-05-22
 *
 * Extracts a two-column product detail layout:
 * - Left column: Product description text, bullet list of features, additional information list, footnotes
 * - Right column: Large product image (linked), "WHERE TO BUY" button link
 */
export default function parse(element, { document }) {
  // Find the two column containers within the row
  const columns = element.querySelectorAll(':scope > .container > .row > .columncontrol__column, :scope > [class*="container"] > .row > .col-12.col-md-6');

  // Left column: extract all text content (paragraphs and lists)
  const leftColumn = columns[0];
  const leftContent = [];

  if (leftColumn) {
    // Get all cmp-text sections which contain paragraphs and lists
    const textSections = leftColumn.querySelectorAll('.cmp-text');
    textSections.forEach((section) => {
      // Extract paragraphs
      const paragraphs = section.querySelectorAll(':scope > p');
      paragraphs.forEach((p) => {
        leftContent.push(p);
      });
      // Extract unordered lists
      const lists = section.querySelectorAll(':scope > ul');
      lists.forEach((ul) => {
        leftContent.push(ul);
      });
    });
  }

  // Right column: extract product image and buy button
  const rightColumn = columns[1];
  const rightContent = [];

  if (rightColumn) {
    // Product image - linked image with .cmp-image__link wrapping img
    const imageLink = rightColumn.querySelector('.cmp-image__link');
    const productImage = rightColumn.querySelector('.cmp-image__image, img[class*="cmp-image"]');

    if (imageLink && productImage) {
      // Preserve the linked image structure
      const link = document.createElement('a');
      link.href = imageLink.href;
      const img = document.createElement('img');
      img.src = productImage.src;
      img.alt = productImage.alt || '';
      link.appendChild(img);
      rightContent.push(link);
    } else if (productImage) {
      const img = document.createElement('img');
      img.src = productImage.src;
      img.alt = productImage.alt || '';
      rightContent.push(img);
    }

    // "WHERE TO BUY" button - from .ps-widget or .ps-button-label
    const buyButtonLabel = rightColumn.querySelector('.ps-button-label');
    if (buyButtonLabel) {
      const buyLink = document.createElement('a');
      buyLink.href = '#where-to-buy';
      buyLink.textContent = buyButtonLabel.textContent.trim();
      const strong = document.createElement('strong');
      strong.appendChild(buyLink);
      rightContent.push(strong);
    }
  }

  // Build cells array: single row with 2 columns (left content | right content)
  const cells = [
    [leftContent, rightContent],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-product', cells });
  element.replaceWith(block);
}
