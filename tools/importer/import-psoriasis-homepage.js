/* eslint-disable */
/* global WebImporter */

import carouselHeroParser from './parsers/carousel-hero.js';
import cardsNavigationParser from './parsers/cards-navigation.js';
import columnsBlogParser from './parsers/columns-blog.js';

import skyriziCleanupTransformer from './transformers/skyrizi-cleanup.js';
import skyriziSectionsTransformer from './transformers/skyrizi-sections.js';

const parsers = {
  'carousel-hero': carouselHeroParser,
  'cards-navigation': cardsNavigationParser,
  'columns-blog': columnsBlogParser,
};

const transformers = [
  skyriziCleanupTransformer,
  skyriziSectionsTransformer,
];

const PAGE_TEMPLATE = {
  name: 'psoriasis-homepage',
  description: 'Main psoriasis landing page with hero, treatment overview, and navigation to sub-sections',
  urls: ['https://www.skyrizi.com/psoriasis'],
  blocks: [
    {
      name: 'carousel-hero',
      instances: ['.home-hero-carousel'],
    },
    {
      name: 'cards-navigation',
      instances: ['.psoriasis-tail-cards.gray-bg-colm'],
    },
    {
      name: 'columns-blog',
      instances: ['.abbv-flex-item.flex-col-lg-8, .abbv-flex-item.flex-col-lg-4'],
    },
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Hero Carousel',
      selector: '.home-hero-carousel',
      style: null,
      blocks: ['carousel-hero'],
      defaultContent: [],
    },
    {
      id: 'section-2',
      name: 'Navigation Cards Row',
      selector: '.psoriasis-tail-cards.gray-bg-colm',
      style: 'grey',
      blocks: ['cards-navigation'],
      defaultContent: [],
    },
    {
      id: 'section-3',
      name: 'Content Listing with Sidebar',
      selector: ['.abbv-flex-item.flex-col-lg-8', '.abbv-flex-item.flex-col-lg-4'],
      style: null,
      blocks: ['columns-blog'],
      defaultContent: [],
    },
    {
      id: 'section-4',
      name: 'Important Safety Information',
      selector: '.abbv-inline-use-isi',
      style: null,
      blocks: [],
      defaultContent: ['.abbv-inline-use-isi h2', '.abbv-inline-use-isi h3', '.abbv-isi-content p', '.abbv-isi-content ul'],
    },
  ],
};

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

    executeTransformers('beforeTransform', main, payload);

    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

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

    executeTransformers('afterTransform', main, payload);

    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

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
