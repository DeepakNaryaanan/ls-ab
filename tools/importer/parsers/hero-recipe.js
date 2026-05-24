/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-recipe variant.
 * Base block: hero
 * Source URL: https://www.ensure.com/recipes/drinks-smoothies/key-lime-colada
 * Selector: .m-hero
 * Generated: 2026-05-22
 *
 * Extracts category hero banner with heading and image from recipe pages.
 * Structure: H1 heading (recipe category name) + large hero image.
 * Target table: Row 1 = hero image, Row 2 = heading text.
 */
export default function parse(element, { document }) {
  // Extract the heading (H1 with class m-hero__header or h1-hero, fallback to any h1/h2)
  const heading = element.querySelector('h1.m-hero__header, h1.h1-hero, h1, h2.m-hero__header');

  // Extract the hero image (desktop version preferred)
  // Multiple responsive images exist; selector picks the first matching desktop image
  const image = element.querySelector('.m-hero__image img.cmp-image__image, .m-hero__media img.cmp-image__image, .m-hero__image img, .m-hero__media img');

  // Build cells array matching target structure: Row 1 = image, Row 2 = heading
  const cells = [];

  // Row 1: Hero image (category banner)
  if (image) {
    cells.push([image]);
  }

  // Row 2: Heading text (category name)
  if (heading) {
    cells.push([heading]);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-recipe', cells });
  element.replaceWith(block);
}
