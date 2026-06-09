/* eslint-disable */
/* global WebImporter */

/**
 * Parser: columns-callout
 * Base block: columns
 * Source: https://www.duopa.com/carrying-case
 * Selector: .abbv-container.duopa-blue-container-3
 * Description: Promotional callout box with dark blue background containing
 *   a heading (light blue/bold) and a paragraph with phone number link and enrollment link.
 * Generated: 2026-06-09
 */
export default function parse(element, { document }) {
  // Extract the rich text container with heading and body content
  const richText = element.querySelector('.abbv-rich-text, .rich-text');

  // Extract the heading paragraph (subtitle-1 with bold text)
  const heading = element.querySelector('p.subtitle-1, p b, .text-light-blue b');

  // Extract the body paragraph with links (subtitle-2)
  const bodyParagraph = element.querySelector('p.subtitle-2');

  // Build content cell - single column with all rich text content
  const contentCell = [];

  // Add heading as a strong/bold element if found
  if (heading) {
    const h2 = document.createElement('h2');
    h2.textContent = heading.textContent.trim();
    contentCell.push(h2);
  }

  // Add the body paragraph with its inline links preserved
  if (bodyParagraph) {
    contentCell.push(bodyParagraph);
  } else if (richText) {
    // Fallback: grab all paragraphs except the heading
    const paragraphs = richText.querySelectorAll('p:not(.subtitle-1)');
    paragraphs.forEach((p) => contentCell.push(p));
  }

  // Columns block: single row, single column with all content stacked
  const cells = [[...contentCell]];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-callout', cells });
  element.replaceWith(block);
}
