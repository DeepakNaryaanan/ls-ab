/* eslint-disable */
/* global WebImporter */

import columnsProductParser from './parsers/columns-product.js';
import cardsFlavorParser from './parsers/cards-flavor.js';
import columnsNutritionParser from './parsers/columns-nutrition.js';
import accordionFaqParser from './parsers/accordion-faq.js';
import cardsNavigationParser from './parsers/cards-navigation.js';
import embedReviewsParser from './parsers/embed-reviews.js';

import cleanupTransformer from './transformers/ensure-cleanup.js';
import sectionsTransformer from './transformers/ensure-sections.js';

const parsers = {
  'columns-product': columnsProductParser,
  'cards-flavor': cardsFlavorParser,
  'columns-nutrition': columnsNutritionParser,
  'accordion-faq': accordionFaqParser,
  'cards-navigation': cardsNavigationParser,
  'embed-reviews': embedReviewsParser,
};

const PAGE_TEMPLATE = {
  name: 'product-flavor-page',
  description: 'Individual product flavor page with detailed nutrition facts, ingredients, and product imagery',
  blocks: [
    { name: 'columns-product', instances: ['.columncontrol.column-align--left .columncontrol__column'] },
    { name: 'cards-flavor', instances: ['.columncontrol.column-align--center .m-card'] },
    { name: 'columns-nutrition', instances: ['.columncontrol.column-align--space-evenly .columncontrol__column'] },
    { name: 'accordion-faq', instances: ['.accordion.panelcontainer'] },
    { name: 'cards-navigation', instances: ['.m-card.m-card--large'] },
    { name: 'embed-reviews', instances: ['#SEO_BVRRSummaryContainer, #BVRRContainer'] },
  ],
  sections: [
    { id: 'section-1-product', name: 'Product Detail', selector: '.columncontrol.column-align--left', style: null, blocks: ['columns-product'], defaultContent: ['h1', 'h3'] },
    { id: 'section-2-flavors', name: 'Available Flavors', selector: '.columncontrol.column-align--center', style: null, blocks: ['cards-flavor'], defaultContent: [] },
    { id: 'section-3-nutrition', name: 'Nutritional Facts', selector: '.columncontrol.column-align--space-evenly', style: 'dark-header', blocks: ['columns-nutrition'], defaultContent: ['h2'] },
    { id: 'section-4-faq', name: 'Related FAQs', selector: '.accordion.panelcontainer', style: null, blocks: ['accordion-faq'], defaultContent: [] },
    { id: 'section-5-cards', name: 'Related Content Cards', selector: ['.m-card.m-card--large'], style: null, blocks: ['cards-navigation'], defaultContent: [] },
    { id: 'section-6-reviews', name: 'Product Reviews', selector: '#SEO_BVRRSummaryContainer', style: 'dark-header', blocks: ['embed-reviews'], defaultContent: [] },
  ],
};

const transformers = [
  cleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [sectionsTransformer] : []),
];

function executeTransformers(hookName, element, payload) {
  const enhancedPayload = { ...payload, template: PAGE_TEMPLATE };
  transformers.forEach((transformerFn) => {
    try { transformerFn.call(null, hookName, element, enhancedPayload); }
    catch (e) { console.error(`Transformer failed at ${hookName}:`, e); }
  });
}

function findBlocksOnPage(document, template) {
  const pageBlocks = [];
  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        pageBlocks.push({ name: blockDef.name, selector, element, section: blockDef.section || null });
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

    executeTransformers('beforeTransform', main, payload);
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try { parser(block.element, { document, url, params }); }
        catch (e) { console.error(`Failed to parse ${block.name}:`, e); }
      }
    });

    executeTransformers('afterTransform', main, payload);

    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    let path = new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '');
    if (!path || path === '') path = '/index';

    return [{ element: main, path, report: { title: document.title, template: PAGE_TEMPLATE.name, blocks: pageBlocks.map((b) => b.name) } }];
  },
};
