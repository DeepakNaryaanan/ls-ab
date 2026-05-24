/* eslint-disable */
/* global WebImporter */

import cleanupTransformer from './transformers/ensure-cleanup.js';

const PAGE_TEMPLATE = {
  name: 'utility-page',
  description: 'Utility and marketing pages including contact, coupons, privacy, FAQ, and promotional landing pages',
  blocks: [],
  sections: [],
};

const transformers = [cleanupTransformer];

function executeTransformers(hookName, element, payload) {
  const enhancedPayload = { ...payload, template: PAGE_TEMPLATE };
  transformers.forEach((transformerFn) => {
    try { transformerFn.call(null, hookName, element, enhancedPayload); }
    catch (e) { console.error(`Transformer failed at ${hookName}:`, e); }
  });
}

export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;
    const main = document.body;

    executeTransformers('beforeTransform', main, payload);
    executeTransformers('afterTransform', main, payload);

    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    let path = new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '');
    if (!path || path === '') path = '/index';

    return [{ element: main, path, report: { title: document.title, template: PAGE_TEMPLATE.name, blocks: [] } }];
  },
};
