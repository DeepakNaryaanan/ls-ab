/* eslint-disable */
/* global WebImporter */

/**
 * Parser for embed-reviews.
 * Base block: embed.
 * Source: https://www.ensure.com/nutrition-products/ensure-original
 * Description: Bazaarvoice product reviews widget embedded on product pages.
 * Generated: 2026-05-22
 */
export default function parse(element, { document }) {
  // Extract available summary text from Bazaarvoice SEO container
  // The element may be #SEO_BVRRSummaryContainer or #BVRRContainer
  const ratingText = element.querySelector('.bv_offscreen_text, .bv_avgRating_component_container');
  const reviewCount = element.querySelector('.bv_numReviews_text');
  const recommendText = element.querySelector('.bv_percentRecommend_component_container');

  // Create placeholder content for the reviews embed
  // Since Bazaarvoice is a dynamic JS widget, we capture a simple marker
  const placeholder = document.createElement('p');
  placeholder.textContent = 'Product Reviews';

  // Single-column table: Row 1 = block name, Row 2 = placeholder text
  const cells = [
    [placeholder],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'embed-reviews', cells });
  element.replaceWith(block);
}
