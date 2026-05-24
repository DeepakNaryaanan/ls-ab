/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-blog
 * Base block: columns
 * Source: https://www.ensure.com/blog/nutrition-matters/five-secret-superfoods
 * Selector: .columncontrol.column-align--left (also matches .column-align--center on blog pages)
 * Generated: 2026-05-24
 *
 * Blog article two-column layout:
 * - Left column (col-md-8): Article body content with title, images, paragraphs, lists, nav links
 * - Right column (col-md-4): Sidebar with category cards, popular posts, and promotional cards
 *
 * Source structure (validated against live page):
 * - Parent: div.columncontrol with child div.container > div.row
 * - Left: div.col-12.col-md-8.col-lg-8.columncontrol__column
 *   - div.text > section.cmp-text (paragraphs, bold text, links)
 *   - div.image > div.cmp-image > img.cmp-image__image (article images)
 *   - div.link.button > div.a-link > a.a-link__text (navigation links like "Previous Post")
 * - Right: div.col-12.col-md-4.col-lg-4.columncontrol__column
 *   - div.title > div.cmp-title > h2.cmp-title__text (section headings)
 *   - div.experiencefragment > article.m-card (category cards with images and titles)
 *   - div.contentfragment > article.cmp-contentfragment (popular post references with links and images)
 */
export default function parse(element, { document }) {
  // Find the row containing the two columns
  const row = element.querySelector(':scope > .container > .row') || element.querySelector('.row');
  if (!row) return;

  // Get direct child columns from the row
  const columns = Array.from(row.querySelectorAll(':scope > .columncontrol__column'));
  if (columns.length < 2) return;

  // Identify left (wider, col-md-8) and right (narrower, col-md-4) columns
  // Fallback: first column is left, second is right
  let leftCol = columns.find(col => col.classList.contains('col-md-8')) || columns[0];
  let rightCol = columns.find(col => col.classList.contains('col-md-4')) || columns[1];

  // Extract article body content from left column
  function extractLeftContent(col) {
    const content = [];

    // Process children in DOM order to preserve article flow
    const children = col.children;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];

      // Text sections: paragraphs, lists, headings within .cmp-text
      if (child.classList.contains('text')) {
        const cmpText = child.querySelector('.cmp-text');
        if (cmpText) {
          const textElements = cmpText.querySelectorAll(':scope > p, :scope > ul, :scope > ol, :scope > h1, :scope > h2, :scope > h3, :scope > h4, :scope > h5, :scope > h6, :scope > blockquote');
          textElements.forEach(el => content.push(el));
        }
      }

      // Images: article images
      if (child.classList.contains('image')) {
        const img = child.querySelector('img.cmp-image__image');
        if (img && img.getAttribute('src') !== 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7') {
          content.push(img);
        } else if (img) {
          // Lazy-loaded image - check for data-cmp-src
          const cmpImage = child.querySelector('.cmp-image[data-cmp-src]');
          if (cmpImage) {
            const src = cmpImage.getAttribute('data-cmp-src').replace('{width}', '1024');
            img.setAttribute('src', src);
            content.push(img);
          } else {
            content.push(img);
          }
        }
      }

      // Navigation links (Previous/Next Post)
      if (child.classList.contains('link') || child.classList.contains('button')) {
        const link = child.querySelector('a.a-link__text, a');
        if (link) content.push(link);
      }
    }

    return content.length > 0 ? content : [col];
  }

  // Extract sidebar content from right column
  function extractRightContent(col) {
    const content = [];

    const children = col.children;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];

      // Section headings (BROWSE BY CONTENT, MOST POPULAR POSTS, etc.)
      if (child.classList.contains('title')) {
        const heading = child.querySelector('.cmp-title__text');
        if (heading) content.push(heading);
      }

      // Experience fragment cards (category navigation cards)
      if (child.classList.contains('experiencefragment')) {
        const cards = child.querySelectorAll('article.m-card');
        cards.forEach(card => {
          const link = card.querySelector('a.m-card-link');
          const title = card.querySelector('.m-card__title');
          const img = card.querySelector('img.cmp-image__image');

          if (link) {
            // Create a simplified card representation with link
            content.push(link);
          } else if (title) {
            content.push(title);
          }
        });
      }

      // Content fragment references (popular posts with links and images)
      if (child.classList.contains('contentfragment')) {
        const article = child.querySelector('article.cmp-contentfragment');
        if (article) {
          // Get the heading link
          const headingElement = article.querySelector('.cmp-contentfragment__element--heading');
          if (headingElement) {
            const link = headingElement.querySelector('a');
            const paragraph = headingElement.querySelector('p');
            if (link) {
              content.push(link);
            } else if (paragraph) {
              content.push(paragraph);
            }
          }
        }
      }
    }

    return content.length > 0 ? content : [col];
  }

  const leftContent = extractLeftContent(leftCol);
  const rightContent = extractRightContent(rightCol);

  // Build cells: single row with 2 columns of content
  // Matches columns block structure: Row 1 = block name, Row 2 = col1 | col2
  const cells = [
    [leftContent, rightContent],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-blog', cells });
  element.replaceWith(block);
}
