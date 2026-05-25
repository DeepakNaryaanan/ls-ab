/* eslint-disable */
/* global WebImporter */

/**
 * Parser: columns-blog
 * Base block: columns
 * Source: https://www.skyrizi.com/psoriasis
 * Selector: .abbv-flex-item.flex-col-lg-8, .abbv-flex-item.flex-col-lg-4
 * Generated: 2026-05-24
 *
 * Two-column unequal layout (8-col content + 4-col sidebar):
 * - Left column (flex-col-lg-8): 3 stacked content items (icon + heading + text + link)
 *   plus a footnote about Nurse Ambassadors.
 * - Right column (flex-col-lg-4): Blue CTA signup card with Skyrizi logo, heading, and button
 *   over a background image.
 *
 * Source DOM structure (validated against source.html):
 * - Parent: div.flexbox.parbase > div.abbv-flex-container
 * - Left: div.abbv-flex-item.flex-col-lg-8
 *   - Multiple div.container.parbase > div.abbv-container.custom-component_listing
 *     - div.image-text.parbase > div.abbv-image-text > div.abbv-image-content-container > img
 *     - div.rich-text > div.abbv-rich-text (h3 + p with text/links)
 *   - div.container.parbase > div.abbv-container.custom-component_listing-note (footnote p)
 * - Right: div.abbv-flex-item.flex-col-lg-4
 *   - div.container.parbase > div.abbv-container.crm-signup-cta
 *     - div.background-container > div.abbv-background-container
 *       - div.abbv-background-container-display > img (background image)
 *       - div.abbv-background-container-content
 *         - div.abbv-image-text.cta-be-first > img (logo) + text + a.btn (CTA button)
 */
export default function parse(element, { document }) {
  // Find the two column containers within the element
  // The element may be the flex container or its parent
  const leftCol = element.querySelector('.abbv-flex-item.flex-col-lg-8')
    || element.querySelector('[class*="flex-col-lg-8"]');
  const rightCol = element.querySelector('.abbv-flex-item.flex-col-lg-4')
    || element.querySelector('[class*="flex-col-lg-4"]');

  // If element itself is one of the columns, look at parent for both
  let leftColumn = leftCol;
  let rightColumn = rightCol;

  if (!leftColumn && element.classList && element.classList.contains('flex-col-lg-8')) {
    leftColumn = element;
    rightColumn = element.parentElement
      ? element.parentElement.querySelector('.abbv-flex-item.flex-col-lg-4, [class*="flex-col-lg-4"]')
      : null;
  }
  if (!rightColumn && element.classList && element.classList.contains('flex-col-lg-4')) {
    rightColumn = element;
    leftColumn = element.parentElement
      ? element.parentElement.querySelector('.abbv-flex-item.flex-col-lg-8, [class*="flex-col-lg-8"]')
      : null;
  }

  // --- LEFT COLUMN CONTENT ---
  const leftContent = [];

  if (leftColumn) {
    // Extract each content listing item (icon + heading + paragraph + optional link)
    const contentListings = leftColumn.querySelectorAll('.abbv-container.custom-component_listing');
    contentListings.forEach((item) => {
      // Icon/inline image
      const img = item.querySelector('img.abbv-image-text-img, .abbv-image-content-container img');
      if (img) leftContent.push(img);

      // Heading (h3 is primary, fallback to h2/h4)
      const heading = item.querySelector('.abbv-rich-text h3, .abbv-rich-text h2, .abbv-rich-text h4');
      if (heading) leftContent.push(heading);

      // Paragraphs (description text and links)
      const richText = item.querySelector('.abbv-rich-text');
      if (richText) {
        const paragraphs = richText.querySelectorAll(':scope > p');
        paragraphs.forEach((p) => {
          leftContent.push(p);
        });
      }
    });

    // Extract footnote section (Nurse Ambassadors disclaimer)
    const footnoteContainer = leftColumn.querySelector(
      '.abbv-container.custom-component_listing-note, [class*="listing-note"]'
    );
    if (footnoteContainer) {
      const footnoteParagraphs = footnoteContainer.querySelectorAll('p');
      footnoteParagraphs.forEach((p) => {
        leftContent.push(p);
      });
    }
  }

  // --- RIGHT COLUMN CONTENT ---
  const rightContent = [];

  if (rightColumn) {
    // Background image of the CTA card
    // Look for img directly inside the background display container
    const bgDisplayContainer = rightColumn.querySelector(
      '[class*="abbv-background-container-display"], [class*="background-container-image"]'
    );
    if (bgDisplayContainer) {
      const bgImage = bgDisplayContainer.querySelector('img');
      if (bgImage) rightContent.push(bgImage);
    }

    // CTA card content: logo, heading text, and button
    // The CTA is inside .abbv-background-container-content
    const contentContainer = rightColumn.querySelector(
      '.abbv-background-container-content, [class*="background-container-content"]'
    );

    if (contentContainer) {
      // Logo image (inside .abbv-image-text or .abbv-image-content-container)
      const logo = contentContainer.querySelector('img.abbv-image-text-img, .abbv-image-content-container img');
      if (logo) rightContent.push(logo);

      // Text content (heading and description)
      const textContainer = contentContainer.querySelector(
        '.abbv-image-text-content-container, .abbv-image-text-content, [class*="image-text-content"]'
      );
      if (textContainer) {
        const headings = textContainer.querySelectorAll('h2, h3, h4');
        headings.forEach((h) => rightContent.push(h));

        const paragraphs = textContainer.querySelectorAll('p');
        paragraphs.forEach((p) => rightContent.push(p));
      }

      // CTA button link (may be inside text container or directly in content container)
      const ctaButton = contentContainer.querySelector('a.btn, a[class*="btn"], a.button, a[class*="cta"]')
        || contentContainer.querySelector('a');
      if (ctaButton) rightContent.push(ctaButton);
    } else {
      // Fallback: look for CTA card via other selectors
      const ctaCard = rightColumn.querySelector(
        '.abbv-image-text.cta-be-first, .abbv-image-text.be-first-know-container, .crm-signup-cta .abbv-image-text'
      );
      if (ctaCard) {
        const logo = ctaCard.querySelector('img.abbv-image-text-img, .abbv-image-content-container img');
        if (logo) rightContent.push(logo);

        const headings = ctaCard.querySelectorAll('h2, h3, h4');
        headings.forEach((h) => rightContent.push(h));

        const paragraphs = ctaCard.querySelectorAll('p');
        paragraphs.forEach((p) => rightContent.push(p));

        const ctaButton = ctaCard.querySelector('a.btn, a[class*="btn"], a.button, a');
        if (ctaButton) rightContent.push(ctaButton);
      } else {
        // Final fallback: extract all meaningful content from right column
        const allImages = rightColumn.querySelectorAll('img');
        allImages.forEach((img) => rightContent.push(img));

        const allText = rightColumn.querySelectorAll('h2, h3, h4, p');
        allText.forEach((el) => rightContent.push(el));

        const allLinks = rightColumn.querySelectorAll('a.btn, a[class*="btn"], a.button');
        allLinks.forEach((link) => rightContent.push(link));
      }
    }
  }

  // Skip if no meaningful content was found in either column
  // (handles case where selector matches a second element on the page with no relevant content)
  if (leftContent.length === 0 && rightContent.length === 0) {
    return;
  }

  // Build cells: single row with two columns (matches library example structure)
  const cells = [
    [
      leftContent.length > 0 ? leftContent : [''],
      rightContent.length > 0 ? rightContent : [''],
    ],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-blog', cells });
  element.replaceWith(block);
}
