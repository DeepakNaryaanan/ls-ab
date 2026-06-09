/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroTreatmentParser from './parsers/hero-treatment.js';
import columnsIcontextParser from './parsers/columns-icontext.js';
import cardsNavigationParser from './parsers/cards-navigation.js';
import columnsCalloutParser from './parsers/columns-callout.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/duopa-cleanup.js';
import sectionsTransformer from './transformers/duopa-sections.js';

// PARSER REGISTRY
const parsers = {
  'hero-treatment': heroTreatmentParser,
  'columns-icontext': columnsIcontextParser,
  'cards-navigation': cardsNavigationParser,
  'columns-callout': columnsCalloutParser,
};

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'product-detail',
  description: 'Product feature page with hero banner, section navigation, columns, and carousel',
  urls: [
    'https://www.duopa.com/carrying-case',
    'https://www.duopa.com/duopa-your-day',
    'https://www.duopa.com/how-duopa-works',
    'https://www.duopa.com/resources',
  ],
  blocks: [
    {
      name: 'hero-treatment',
      instances: ['#background-container-582095465'],
    },
    {
      name: 'columns-icontext',
      instances: ['.abbv-row-container.duopa-icon-tout-2'],
    },
    {
      name: 'cards-navigation',
      instances: ['.abbv-row-container.duopa-carrying-cases'],
    },
    {
      name: 'columns-callout',
      instances: ['.abbv-container.duopa-blue-container-3'],
    },
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Hero Banner',
      selector: '#background-container-582095465',
      style: null,
      blocks: ['hero-treatment'],
      defaultContent: [],
    },
    {
      id: 'section-2',
      name: 'Activities',
      selector: '#duopa-activities',
      style: null,
      blocks: ['columns-icontext'],
      defaultContent: [],
    },
    {
      id: 'section-3',
      name: 'Carrying Cases',
      selector: '.abbv-container.bg-lightest-gray',
      style: 'grey',
      blocks: ['cards-navigation'],
      defaultContent: ['.abbv-title.abbv-text-center h1', '.abbv-rich-text.Body-text-3.abbv-text-center p', '.abbv-button-primary'],
    },
    {
      id: 'section-4',
      name: 'Safety Information',
      selector: '.abbv-container.abbv-margin-top-20',
      style: null,
      blocks: ['columns-callout'],
      defaultContent: ['.abbv-rich-text h3', '.abbv-rich-text p', '.duopa-button-next-page'],
    },
    {
      id: 'section-5',
      name: 'ISI',
      selector: '.abbv-inline-use-isi',
      style: null,
      blocks: [],
      defaultContent: ['.abbv-inline-use-isi h3', '.abbv-inline-use-isi p', '.abbv-inline-use-isi ul'],
    },
  ],
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
    const { document, url, params } = payload;

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

    // 4. Execute afterTransform transformers (final cleanup + section breaks)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, ''),
    );

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
