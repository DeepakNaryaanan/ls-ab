/* eslint-disable */
/* global WebImporter */

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/psoriasis-cleanup.js';

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'utility-page',
  description: 'Utility pages for site navigation (sitemap) and search functionality',
  urls: [
    'https://www.psoriasis.com/sitemap',
    'https://www.psoriasis.com/search-results',
  ],
  blocks: [],
};

// TRANSFORMER REGISTRY
const transformers = [
  cleanupTransformer,
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

export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;

    const main = document.body;

    // 1. Execute beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. No blocks to parse for utility pages

    // 3. Execute afterTransform transformers (final cleanup)
    executeTransformers('afterTransform', main, payload);

    // 4. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 5. Generate sanitized path
    let path = new URL(params.originalURL).pathname
      .replace(/\/$/, '')
      .replace(/\.html$/, '');
    if (!path || path === '') path = '/index';

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: [],
      },
    }];
  },
};
