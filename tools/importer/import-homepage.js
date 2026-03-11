/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroParser from './parsers/hero.js';
import columnsParser from './parsers/columns.js';
import cardsParser from './parsers/cards.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/psoriasis-cleanup.js';
import sectionsTransformer from './transformers/psoriasis-sections.js';

// PAGE TEMPLATE CONFIGURATION - Embedded from page-templates.json
const PAGE_TEMPLATE = {
  name: 'homepage',
  description: 'Main landing page with hero banner, interactive poll widget, doctor finder CTA section, and 3-card recommended resources grid',
  urls: [
    'https://www.psoriasis.com/',
  ],
  blocks: [
    {
      name: 'hero',
      instances: ['.abbv-container.flat-bbg.red-pale'],
    },
    {
      name: 'columns',
      instances: ['.abbv-definition-block.abbv-find-the-right-doctor'],
    },
    {
      name: 'cards',
      instances: ['.abbv-row-container.target-rcmd-touts'],
    },
  ],
  sections: [
    {
      id: 'section-1-hero',
      name: 'Hero Banner',
      selector: '.abbv-container.flat-bbg.red-pale',
      style: 'warm-peach',
      blocks: ['hero'],
      defaultContent: [],
    },
    {
      id: 'section-2-poll',
      name: 'Quick Poll',
      selector: '.abbv-quick-poll.qp-home',
      style: null,
      blocks: [],
      defaultContent: ['.abbv-quick-poll .abbv-question', '.abbv-quick-poll .qPoll-options'],
    },
    {
      id: 'section-3-doctor',
      name: 'Find the Right Doctor',
      selector: '.abbv-definition-block.abbv-find-the-right-doctor',
      style: 'dark-teal',
      blocks: ['columns'],
      defaultContent: [],
    },
    {
      id: 'section-4-resources',
      name: 'Recommended Topics & Resources',
      selector: '.abbv-background-container.recommended',
      style: null,
      blocks: ['cards'],
      defaultContent: ['.abbv-title h2', 'a.abbv-button-plain.custom-link'],
    },
  ],
};

// PARSER REGISTRY
const parsers = {
  'hero': heroParser,
  'columns': columnsParser,
  'cards': cardsParser,
};

// TRANSFORMER REGISTRY
const transformers = [
  cleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [sectionsTransformer] : []),
];

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      }
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null,
        });
      });
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;

    const main = document.body;

    // 1. Execute beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 4. Execute afterTransform transformers (final cleanup + section breaks/metadata)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path (full localized path without extension)
    let path = new URL(params.originalURL).pathname
      .replace(/\/$/, '')
      .replace(/\.html$/, '');
    // Homepage gets /index path
    if (!path || path === '') path = '/index';

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
