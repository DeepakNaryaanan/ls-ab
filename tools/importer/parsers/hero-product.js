/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-product
 * Base block: hero
 * Source: https://www.ensure.com/home
 * Selector: .o-hero-carousel.o-hero-carousel--tall
 * Generated: 2026-05-22T00:00:00Z
 *
 * Extracts hero banner with background image, heading, subheading, and CTA button.
 * Target structure (from block library):
 *   Row 1: hero image
 *   Row 2: heading + subheading + CTA link
 */
export default function parse(element, { document }) {
  // Extract hero image (prefer desktop image, fallback to any .m-hero__image img)
  const heroImage = element.querySelector('.m-hero__image img, img.cmp-image__image');

  // Extract H1 heading
  const heading = element.querySelector('h1.m-hero__header, h1.h1-hero, .m-hero__header');

  // Extract H2 subheading
  const subheading = element.querySelector('h2.m-hero__subtitle, h2.h2-hero, .m-hero__subtitle');

  // Extract CTA link from hero extras section
  const ctaLink = element.querySelector('.m-hero__extras a.btn, .m-hero__extras .a-button a, .m-hero__extras a');

  // Build cells array matching block library structure:
  // Row 1: hero image
  // Row 2: heading + subheading + CTA
  const cells = [];

  // Row 1: Image
  if (heroImage) {
    cells.push([heroImage]);
  }

  // Row 2: Text content (heading, subheading, CTA)
  const contentCell = [];
  if (heading) {
    contentCell.push(heading);
  }
  if (subheading) {
    contentCell.push(subheading);
  }
  if (ctaLink) {
    contentCell.push(ctaLink);
  }
  if (contentCell.length > 0) {
    cells.push(contentCell);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-product', cells });
  element.replaceWith(block);
}
