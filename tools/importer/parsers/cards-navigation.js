/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-navigation
 * Base block: cards
 * Source: https://www.ensure.com/home
 * Selector: .col-12.col-md-6.col-lg-2.columncontrol__column .m-card.m-card--large
 * Generated: 2026-05-22
 *
 * Extracts navigation cards (image + heading + link) from the source DOM
 * and produces a Cards block table with one row per card:
 *   Row 1: block name
 *   Row N: [image] | [heading + link]
 */
export default function parse(element, { document }) {
  // Find all card articles within the element
  // The element may be a container holding multiple cards, or a single card
  let cards = Array.from(element.querySelectorAll('article.m-card.m-card--large'));

  // If no nested cards found, the element itself might be a card
  if (cards.length === 0 && element.matches && element.matches('article.m-card.m-card--large, .m-card.m-card--large')) {
    cards = [element];
  }

  // Fallback: try broader selectors
  if (cards.length === 0) {
    cards = Array.from(element.querySelectorAll('.m-card.m-card--large'));
  }

  // If still no cards, treat element itself as the only card
  if (cards.length === 0) {
    cards = [element];
  }

  const cells = [];

  cards.forEach((card) => {
    // Extract image from .m-card__image img
    const img = card.querySelector('.m-card__image img, .m-card__media img');

    // Extract heading from h2.m-card__title
    const heading = card.querySelector('h2.m-card__title, .m-card__title, h2');

    // Extract link from a.m-card-link
    const link = card.querySelector('a.m-card-link, a[href]');

    // Build image cell (column 1)
    const imageCell = [];
    if (img) {
      imageCell.push(img);
    }

    // Build text cell (column 2): heading + link
    const textCell = [];
    if (heading) {
      // Clone heading to avoid moving it out of the link context
      const h = document.createElement('h2');
      h.textContent = heading.textContent;
      textCell.push(h);
    }
    if (link) {
      const a = document.createElement('a');
      a.href = link.href || link.getAttribute('href');
      a.textContent = heading ? heading.textContent : link.textContent || link.getAttribute('aria-label') || 'Learn More';
      textCell.push(a);
    }

    // Only add row if we have meaningful content
    if (imageCell.length > 0 || textCell.length > 0) {
      cells.push([imageCell, textCell]);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-navigation', cells });
  element.replaceWith(block);
}
