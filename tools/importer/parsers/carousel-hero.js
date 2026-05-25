/* eslint-disable */
/* global WebImporter */

/**
 * Parser for carousel-hero
 * Base block: carousel
 * Source: https://www.skyrizi.com/psoriasis
 * Selector: .home-hero-carousel
 * Generated: 2026-05-24
 *
 * Extracts a full-width rotating hero carousel with multiple slides.
 * Each slide contains: background image (CSS background-image), headline/statistic text, and CTA button.
 * Output: 2-column rows (image | text+CTA), one row per slide.
 */
export default function parse(element, { document }) {
  // Find all carousel slide items
  // Owl Carousel wraps items in .owl-item; also support direct .item[id^="slide"] fallback
  let slides = element.querySelectorAll('.owl-item .item');
  if (!slides.length) {
    slides = element.querySelectorAll('.item[id^="slide"]');
  }

  const cells = [];

  slides.forEach((slide) => {
    // Background image is set via CSS background-image on .abbv-background-container-display
    // (not an <img> tag in the live DOM)
    const bgContainer = slide.querySelector('.abbv-background-container-display, .abbv-background-container-image-swap-bg');
    let imageEl = null;

    if (bgContainer) {
      // Try to get background-image from inline style or computed style
      const bgStyle = bgContainer.style.backgroundImage
        || (typeof window !== 'undefined' ? window.getComputedStyle(bgContainer).backgroundImage : '');
      const urlMatch = bgStyle.match(/url\(["']?([^"')]+)["']?\)/);

      if (urlMatch && urlMatch[1]) {
        // Create an img element for the background image URL
        imageEl = document.createElement('img');
        imageEl.src = urlMatch[1];
        imageEl.alt = '';
      }

      // Fallback: check if there's an actual <img> inside the background container
      if (!imageEl) {
        const imgTag = bgContainer.querySelector('img');
        if (imgTag) {
          imageEl = imgTag;
        }
      }
    }

    // Extract all text content from rich-text containers within the slide content area
    const contentArea = slide.querySelector('.abbv-background-container-content');
    const richTextDivs = contentArea
      ? contentArea.querySelectorAll('.abbv-rich-text')
      : slide.querySelectorAll('.abbv-rich-text');

    // Extract CTA link
    const ctaLink = (contentArea || slide).querySelector('.cta.parbase a, .cta a, a.abbv-button-primary');

    // Extract overlay image if present (e.g., branded graphic in slide 1)
    const overlayImage = (contentArea || slide).querySelector('.abbv-image-text-v2 img, .abbv-image-content-container-v2 img');

    // Build the content cell: collect all text elements, overlay image, and CTA
    const contentCell = [];

    richTextDivs.forEach((richText) => {
      // Get heading or paragraph content from each rich-text div
      const heading = richText.querySelector('h1, h2, h3');
      const paragraph = richText.querySelector('p');

      if (heading) {
        contentCell.push(heading);
      } else if (paragraph) {
        contentCell.push(paragraph);
      }
    });

    // Add overlay image if present (e.g., "Nothing Is Everything" graphic in slide 1)
    if (overlayImage) {
      contentCell.push(overlayImage);
    }

    // Add CTA button
    if (ctaLink) {
      contentCell.push(ctaLink);
    }

    // Build the row: [image, content]
    // First cell: background image; Second cell: text content + CTA
    if (imageEl && contentCell.length > 0) {
      cells.push([imageEl, contentCell]);
    } else if (contentCell.length > 0) {
      // If no background image found, still include slide content with empty image cell
      cells.push(['', contentCell]);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-hero', cells });
  element.replaceWith(block);
}
