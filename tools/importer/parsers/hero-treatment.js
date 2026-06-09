/* eslint-disable */
/* global WebImporter */

/**
 * Parser: hero-treatment
 * Base block: hero
 * Source: https://www.duopa.com/carrying-case
 * Selector: #background-container-582095465
 * Description: Full-width hero banner with background lifestyle image and heading overlay.
 *   Background image is applied via CSS (computed style) on .abbv-background-container-display.
 * Generated: 2026-06-09
 */
export default function parse(element, { document }) {
  // Extract background image - it's applied via CSS stylesheet (not inline, not <img>)
  // Use getComputedStyle to retrieve the background-image URL
  let bgImage = null;

  // Strategy 1: Check for actual img elements first (fallback for other pages)
  bgImage = element.querySelector(
    '.abbv-background-container-display img, .abbv-background-container-image-swap-bg img, img'
  );

  // Strategy 2: Extract from computed background-image CSS
  if (!bgImage) {
    const displayDiv = element.querySelector(
      '.abbv-background-container-display, .abbv-background-container-image-swap-bg'
    );
    if (displayDiv) {
      const computedStyle = window.getComputedStyle(displayDiv);
      const bgValue = computedStyle.backgroundImage;
      if (bgValue && bgValue !== 'none') {
        const urlMatch = bgValue.match(/url\(["']?([^"')]+)["']?\)/);
        if (urlMatch && urlMatch[1]) {
          bgImage = document.createElement('img');
          bgImage.src = urlMatch[1];
        }
      }
    }
  }

  // Strategy 3: Check the element itself for computed background
  if (!bgImage) {
    const computedStyle = window.getComputedStyle(element);
    const bgValue = computedStyle.backgroundImage;
    if (bgValue && bgValue !== 'none') {
      const urlMatch = bgValue.match(/url\(["']?([^"')]+)["']?\)/);
      if (urlMatch && urlMatch[1]) {
        bgImage = document.createElement('img');
        bgImage.src = urlMatch[1];
      }
    }
  }

  // Extract heading from the content block overlay
  const heading = element.querySelector(
    '.abbv-background-container-content-block-display h1, .abbv-background-container-content-block h1, .abbv-background-container-content h1, .abbv-rich-text-common h1, h1, h2'
  );

  // Build cells array matching hero block structure:
  // Row 1: Background image
  // Row 2: Content (heading and optional description/CTAs)
  const cells = [];

  // Row 1: Background image
  if (bgImage) {
    cells.push([bgImage]);
  }

  // Row 2: Content overlay (heading and any additional text)
  const contentCell = [];
  if (heading) {
    contentCell.push(heading);
  }

  // Check for any additional description or CTA links in the content block
  const contentBlock = element.querySelector(
    '.abbv-background-container-content-block-display, .abbv-rich-text-common'
  );
  if (contentBlock) {
    const description = contentBlock.querySelector('p, .description, [class*="subtitle"]');
    if (description) {
      contentCell.push(description);
    }
    const ctaLinks = contentBlock.querySelectorAll('a');
    if (ctaLinks.length > 0) {
      contentCell.push(...Array.from(ctaLinks));
    }
  }

  if (contentCell.length > 0) {
    cells.push(contentCell);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-treatment', cells });
  element.replaceWith(block);
}
