/* eslint-disable */
/* global WebImporter */

import heroBlogParser from './parsers/hero-blog.js';
import columnsBlogParser from './parsers/columns-blog.js';
import cardsNavigationParser from './parsers/cards-navigation.js';

import cleanupTransformer from './transformers/ensure-cleanup.js';
import sectionsTransformer from './transformers/ensure-sections.js';

const parsers = {
  'hero-blog': heroBlogParser,
  'columns-blog': columnsBlogParser,
  'cards-navigation': cardsNavigationParser,
};

const PAGE_TEMPLATE = {
  name: 'blog-article',
  description: 'Blog content page with expert advice or nutrition information articles',
  blocks: [
    { name: 'hero-blog', instances: ['.m-hero'] },
    { name: 'columns-blog', instances: ['.columncontrol'] },
    { name: 'cards-navigation', instances: ['.m-card.m-card--large'] },
  ],
  sections: [
    { id: 'section-1-hero', name: 'Blog Hero', selector: '.m-hero', style: null, blocks: ['hero-blog'], defaultContent: [] },
    { id: 'section-2-content', name: 'Article Content', selector: '.columncontrol', style: null, blocks: ['columns-blog', 'cards-navigation'], defaultContent: [] },
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
      try {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element) => {
          pageBlocks.push({ name: blockDef.name, selector, element, section: blockDef.section || null });
        });
      } catch (e) { /* skip invalid selectors */ }
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
