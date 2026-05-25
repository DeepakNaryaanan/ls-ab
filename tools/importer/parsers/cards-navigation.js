/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-navigation
 * Base block: cards
 * Source: https://www.skyrizi.com/psoriasis
 * Selector: .psoriasis-tail-cards.gray-bg-colm
 * Generated: 2026-05-24
 *
 * Structure: 4 navigation cards in a row. Each card has:
 *   - An icon/illustration image
 *   - A bold heading
 *   - A CTA button link
 *
 * Target table: 2 columns per row (image | heading + CTA), one row per card.
 */
export default function parse(element, { document }) {
  // Each card is inside .abbv-col.abbv-col-3 > .image-text > .abbv-image-text.quarter-hero
  const cardContainers = element.querySelectorAll('.abbv-image-text.quarter-hero');

  const cells = [];

  cardContainers.forEach((card) => {
    // Extract the icon/illustration image
    const image = card.querySelector('img.abbv-image-text-img, img[class*="abbv-image-text"]');

    // Extract the heading (h2.h3 > b or fallback to h2, h3)
    const heading = card.querySelector('.abbv-image-text-display h2, .abbv-image-text-display h3');

    // Extract the CTA link (primary button, exclude hidden spacer links in .home-tout-link)
    const ctaLink = card.querySelector('a.abbv-button-primary, .abbv-image-text-display > .abbv-image-text-content a[class*="button"]');

    // Build the content cell: heading + optional CTA
    const contentCell = [];
    if (heading) contentCell.push(heading);
    if (ctaLink) contentCell.push(ctaLink);

    // Row: [image cell, content cell]
    if (image) {
      cells.push([image, contentCell]);
    } else {
      // Fallback if no image found - still create row with content
      cells.push([contentCell]);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-navigation', cells });
  element.replaceWith(block);
}
