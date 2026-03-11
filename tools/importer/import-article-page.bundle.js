var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-article-page.js
  var import_article_page_exports = {};
  __export(import_article_page_exports, {
    default: () => import_article_page_default
  });

  // tools/importer/parsers/cards.js
  function parse(element, { document }) {
    const cards = element.querySelectorAll(".abbv-col .abbv-image-text");
    const cells = [];
    cards.forEach((card) => {
      const image = card.querySelector(".abbv-image-content-container img");
      const textContainer = card.querySelector(".abbv-image-text-display, .abbv-image-text-content");
      const heading = textContainer ? textContainer.querySelector("h3, h2") : null;
      const cta = textContainer ? textContainer.querySelector("a[href]") : null;
      let description = null;
      if (textContainer) {
        const paragraphs = textContainer.querySelectorAll("p");
        for (let i = 0; i < paragraphs.length; i++) {
          if (!paragraphs[i].querySelector("a")) {
            description = paragraphs[i];
            break;
          }
        }
      }
      const textContent = [];
      if (heading) textContent.push(heading);
      if (description) textContent.push(description);
      if (cta) textContent.push(cta);
      cells.push([image || "", textContent]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/psoriasis-cleanup.js
  var H = { before: "beforeTransform", after: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === H.before) {
      WebImporter.DOMUtils.remove(element, [
        ".newpar",
        ".par.iparys_inherited"
      ]);
      WebImporter.DOMUtils.remove(element, [
        ".modal.parbase",
        ".abbv-modal"
      ]);
      WebImporter.DOMUtils.remove(element, [
        "#onetrust-consent-sdk",
        "#onetrust-pc-sdk",
        "#onetrust-style"
      ]);
      WebImporter.DOMUtils.remove(element, [
        ".abbv-quick-poll .answer",
        ".abbv-quick-poll .loading",
        ".abbv-quick-poll .qPoll-options"
      ]);
      element.querySelectorAll("picture > source:not([srcset])").forEach((src) => src.remove());
    }
    if (hookName === H.after) {
      WebImporter.DOMUtils.remove(element, [
        ".header-v2.parbase",
        "header.abbv-header-v2",
        "footer.abbv-footer",
        ".abv-footer-container",
        ".abbv-clear",
        "noscript",
        "link"
      ]);
      WebImporter.DOMUtils.remove(element, [
        "a#target-rcmd-touts-id",
        'img[src*="t.co/i/adsct"]',
        'img[src*="analytics.twitter.com"]'
      ]);
    }
  }

  // tools/importer/transformers/psoriasis-sections.js
  function transform2(hookName, element, payload) {
    if (hookName === "afterTransform") {
      const sections = payload && payload.template && payload.template.sections;
      if (!sections || sections.length < 2) return;
      const document = element.ownerDocument;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
        let sectionEl = null;
        for (const sel of selectors) {
          sectionEl = element.querySelector(sel);
          if (sectionEl) break;
        }
        if (!sectionEl) continue;
        if (section.style) {
          const metaBlock = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.parentNode.insertBefore(metaBlock, sectionEl.nextSibling);
        }
        if (i > 0) {
          const hr = document.createElement("hr");
          sectionEl.parentNode.insertBefore(hr, sectionEl);
        }
      }
    }
  }

  // tools/importer/import-article-page.js
  var PAGE_TEMPLATE = {
    name: "article-page",
    description: "Standard content page with H1 title, rich body content (text, images, callout boxes), and a Recommended Topics & Resources section with 3 cards at the bottom",
    urls: [],
    blocks: [
      {
        name: "cards",
        instances: [".abbv-row-container.target-rcmd-touts"]
      }
    ],
    sections: [
      {
        id: "section-1-title",
        name: "Page Title",
        selector: ".abbv-background-container.wave-bbg",
        style: "warm-yellow",
        blocks: [],
        defaultContent: ["h1"]
      },
      {
        id: "section-2-content",
        name: "Main Content",
        selector: ".abbv-row-container.psoriasis.page-main-content",
        style: null,
        blocks: [],
        defaultContent: []
      },
      {
        id: "section-3-resources",
        name: "Recommended Topics & Resources",
        selector: [".abbv-background-container.recommended", ".abbv-row-container.target-rcmd-touts"],
        style: null,
        blocks: ["cards"],
        defaultContent: [".abbv-title h2", "a.abbv-button-plain.custom-link"]
      }
    ]
  };
  var parsers = {
    "cards": parse
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
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
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_article_page_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
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
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      let path = new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "");
      if (!path || path === "") path = "/index";
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_article_page_exports);
})();
