/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-flavor
 * Base block: cards
 * Source: https://www.ensure.com/nutrition-products/ensure-original/vanilla-shake
 * Selector: .columncontrol.column-align--center .m-card
 * Generated: 2026-05-22
 *
 * Extracts a single flavor card (image + flavor name + link) from the source DOM.
 * The import script calls this parser once per matched .m-card element.
 * Produces a Cards block table row:
 *   Row 1: block name 'cards-flavor'
 *   Row 2: [image] | [flavor name + link]
 *
 * Source structure per card:
 *   article.m-card > section.m-card__wrapper > a.m-card-link[href]
 *     > .m-card__media .m-card__image img.cmp-image__image
 *     > .m-card__body > .m-card__description > p (flavor name text)
 *   Note: h2.m-card__title is empty in source; flavor name is in .m-card__description p
 */
export default function parse(element, { document }) {
  // The element is a single article.m-card
  // Find the card link that wraps content
  const link = element.querySelector('a.m-card-link, a[href]');
  const href = link ? (link.href || link.getAttribute('href')) : '';

  // Extract the product image
  const img = element.querySelector('.m-card__image img.cmp-image__image, .m-card__image img, img');

  // Extract the flavor name text
  // h2.m-card__title is empty in source; actual name is in .m-card__description p
  const descriptionEl = element.querySelector('.m-card__description p, .m-card__description');
  const titleEl = element.querySelector('h2.m-card__title, .m-card__title, h2');

  // Determine flavor name: prefer description text, fall back to h2 title if populated
  let flavorName = '';
  if (descriptionEl && descriptionEl.textContent.trim()) {
    flavorName = descriptionEl.textContent.trim().replace(/\s+/g, ' ');
  } else if (titleEl && titleEl.textContent.trim()) {
    flavorName = titleEl.textContent.trim();
  }

  // Build image cell (column 1)
  const imageCell = [];
  if (img) {
    imageCell.push(img);
  }

  // Build text cell (column 2): flavor name + link
  const textCell = [];
  if (flavorName) {
    const p = document.createElement('p');
    p.textContent = flavorName;
    textCell.push(p);
  }
  if (href && href !== '#') {
    const a = document.createElement('a');
    a.href = href;
    a.textContent = flavorName || 'View Flavor';
    textCell.push(a);
  }

  const cells = [[imageCell, textCell]];

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-flavor', cells });
  element.replaceWith(block);
}
