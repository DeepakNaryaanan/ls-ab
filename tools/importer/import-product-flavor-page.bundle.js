/* eslint-disable */
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

  // tools/importer/import-product-flavor-page.js
  var import_product_flavor_page_exports = {};
  __export(import_product_flavor_page_exports, {
    default: () => import_product_flavor_page_default
  });

  // tools/importer/parsers/columns-product.js
  function parse(element, { document }) {
    const columns = element.querySelectorAll(':scope > .container > .row > .columncontrol__column, :scope > [class*="container"] > .row > .col-12.col-md-6');
    const leftColumn = columns[0];
    const leftContent = [];
    if (leftColumn) {
      const textSections = leftColumn.querySelectorAll(".cmp-text");
      textSections.forEach((section) => {
        const paragraphs = section.querySelectorAll(":scope > p");
        paragraphs.forEach((p) => {
          leftContent.push(p);
        });
        const lists = section.querySelectorAll(":scope > ul");
        lists.forEach((ul) => {
          leftContent.push(ul);
        });
      });
    }
    const rightColumn = columns[1];
    const rightContent = [];
    if (rightColumn) {
      const imageLink = rightColumn.querySelector(".cmp-image__link");
      const productImage = rightColumn.querySelector('.cmp-image__image, img[class*="cmp-image"]');
      if (imageLink && productImage) {
        const link = document.createElement("a");
        link.href = imageLink.href;
        const img = document.createElement("img");
        img.src = productImage.src;
        img.alt = productImage.alt || "";
        link.appendChild(img);
        rightContent.push(link);
      } else if (productImage) {
        const img = document.createElement("img");
        img.src = productImage.src;
        img.alt = productImage.alt || "";
        rightContent.push(img);
      }
      const buyButtonLabel = rightColumn.querySelector(".ps-button-label");
      if (buyButtonLabel) {
        const buyLink = document.createElement("a");
        buyLink.href = "#where-to-buy";
        buyLink.textContent = buyButtonLabel.textContent.trim();
        const strong = document.createElement("strong");
        strong.appendChild(buyLink);
        rightContent.push(strong);
      }
    }
    const cells = [
      [leftContent, rightContent]
    ];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-product", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-flavor.js
  function parse2(element, { document }) {
    const link = element.querySelector("a.m-card-link, a[href]");
    const href = link ? link.href || link.getAttribute("href") : "";
    const img = element.querySelector(".m-card__image img.cmp-image__image, .m-card__image img, img");
    const descriptionEl = element.querySelector(".m-card__description p, .m-card__description");
    const titleEl = element.querySelector("h2.m-card__title, .m-card__title, h2");
    let flavorName = "";
    if (descriptionEl && descriptionEl.textContent.trim()) {
      flavorName = descriptionEl.textContent.trim().replace(/\s+/g, " ");
    } else if (titleEl && titleEl.textContent.trim()) {
      flavorName = titleEl.textContent.trim();
    }
    const imageCell = [];
    if (img) {
      imageCell.push(img);
    }
    const textCell = [];
    if (flavorName) {
      const p = document.createElement("p");
      p.textContent = flavorName;
      textCell.push(p);
    }
    if (href && href !== "#") {
      const a = document.createElement("a");
      a.href = href;
      a.textContent = flavorName || "View Flavor";
      textCell.push(a);
    }
    const cells = [[imageCell, textCell]];
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-flavor", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-nutrition.js
  function parse3(element, { document }) {
    const row = element.querySelector(":scope > .container > .row");
    if (!row) return;
    const columns = Array.from(row.querySelectorAll(":scope > .columncontrol__column"));
    if (columns.length < 2) return;
    const leftCol = columns[0];
    const rightCol = columns[1];
    function extractContent(col) {
      const content = [];
      const headings = col.querySelectorAll(".cmp-title__text");
      headings.forEach((h) => content.push(h));
      const textSections = col.querySelectorAll(".cmp-text");
      textSections.forEach((section) => {
        const children = section.querySelectorAll(":scope > p, :scope > ul, :scope > ol");
        children.forEach((child) => content.push(child));
      });
      const imageLinks = col.querySelectorAll(":scope > .image .cmp-image__link");
      const standaloneImages = col.querySelectorAll(":scope > .image img.cmp-image__image");
      imageLinks.forEach((link) => content.push(link));
      if (imageLinks.length === 0) {
        standaloneImages.forEach((img) => content.push(img));
      }
      return content.length > 0 ? content : [col];
    }
    const leftContent = extractContent(leftCol);
    const rightContent = extractContent(rightCol);
    const cells = [
      [leftContent, rightContent]
    ];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-nutrition", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/accordion-faq.js
  function parse4(element, { document }) {
    const items = element.querySelectorAll(".m-accordion__content-items");
    const cells = [];
    items.forEach((item) => {
      const titleWrapper = item.querySelector(".m-accordion__title-wrapper");
      const titleEl = titleWrapper ? titleWrapper.querySelector("h3, h2, h4, span") : null;
      const bodyPanel = item.querySelector(".m-accordion__body .cmp-text, .m-accordion__body .text .cmp-text");
      let answerContent;
      if (bodyPanel) {
        const contentElements = bodyPanel.querySelectorAll("p, ul, ol, h2, h3, h4, h5, h6");
        if (contentElements.length > 0) {
          const container = document.createElement("div");
          contentElements.forEach((el) => {
            container.appendChild(el.cloneNode(true));
          });
          answerContent = container;
        } else {
          answerContent = bodyPanel;
        }
      } else {
        const fallbackBody = item.querySelector(".m-accordion__body");
        answerContent = fallbackBody || document.createElement("p");
      }
      if (titleEl) {
        cells.push([titleEl, answerContent]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "accordion-faq", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-navigation.js
  function parse5(element, { document }) {
    let cards = Array.from(element.querySelectorAll("article.m-card.m-card--large"));
    if (cards.length === 0 && element.matches && element.matches("article.m-card.m-card--large, .m-card.m-card--large")) {
      cards = [element];
    }
    if (cards.length === 0) {
      cards = Array.from(element.querySelectorAll(".m-card.m-card--large"));
    }
    if (cards.length === 0) {
      cards = [element];
    }
    const cells = [];
    cards.forEach((card) => {
      const img = card.querySelector(".m-card__image img, .m-card__media img");
      const heading = card.querySelector("h2.m-card__title, .m-card__title, h2");
      const link = card.querySelector("a.m-card-link, a[href]");
      const imageCell = [];
      if (img) {
        imageCell.push(img);
      }
      const textCell = [];
      if (heading) {
        const h = document.createElement("h2");
        h.textContent = heading.textContent;
        textCell.push(h);
      }
      if (link) {
        const a = document.createElement("a");
        a.href = link.href || link.getAttribute("href");
        a.textContent = heading ? heading.textContent : link.textContent || link.getAttribute("aria-label") || "Learn More";
        textCell.push(a);
      }
      if (imageCell.length > 0 || textCell.length > 0) {
        cells.push([imageCell, textCell]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-navigation", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/embed-reviews.js
  function parse6(element, { document }) {
    const ratingText = element.querySelector(".bv_offscreen_text, .bv_avgRating_component_container");
    const reviewCount = element.querySelector(".bv_numReviews_text");
    const recommendText = element.querySelector(".bv_percentRecommend_component_container");
    const placeholder = document.createElement("p");
    placeholder.textContent = "Product Reviews";
    const cells = [
      [placeholder]
    ];
    const block = WebImporter.Blocks.createBlock(document, { name: "embed-reviews", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/ensure-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [
        "#consent-banner",
        "#truste-consent-track",
        ".trustarc-banner-wrapper",
        "#teconsent"
      ]);
      WebImporter.DOMUtils.remove(element, [
        ".modal",
        ".generic-modal",
        "#site-leaving-popup-content",
        "#site-entering-popup-content",
        "#tender-product-disclaimer-content",
        ".popup-wrapper",
        ".m-popup"
      ]);
      WebImporter.DOMUtils.remove(element, [
        "access-widget-ui",
        ".acsb-sr-alert",
        'a[href*="accessibe.com"]'
      ]);
      WebImporter.DOMUtils.remove(element, [".a-spinner"]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        ".o-header",
        "#section-ensure-header",
        ".a-container--header"
      ]);
      WebImporter.DOMUtils.remove(element, [".o-footer"]);
      WebImporter.DOMUtils.remove(element, [".abbott-alert"]);
      WebImporter.DOMUtils.remove(element, [
        "link",
        "noscript",
        'input[id="onetrust-url"]',
        'input[id="cmpidField"]',
        'input[id="selfValue"]',
        'input[id="wcmMode"]'
      ]);
    }
  }

  // tools/importer/transformers/ensure-sections.js
  var TransformHook2 = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === TransformHook2.afterTransform) {
      const { document } = payload;
      const sections = payload.template && payload.template.sections;
      if (!sections || sections.length < 2) {
        return;
      }
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const sectionEl = element.querySelector(section.selector);
        if (!sectionEl) {
          continue;
        }
        if (section.style) {
          const sectionMetadata = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.after(sectionMetadata);
        }
        if (i > 0) {
          const hr = document.createElement("hr");
          sectionEl.before(hr);
        }
      }
    }
  }

  // tools/importer/import-product-flavor-page.js
  var parsers = {
    "columns-product": parse,
    "cards-flavor": parse2,
    "columns-nutrition": parse3,
    "accordion-faq": parse4,
    "cards-navigation": parse5,
    "embed-reviews": parse6
  };
  var PAGE_TEMPLATE = {
    name: "product-flavor-page",
    description: "Individual product flavor page with detailed nutrition facts, ingredients, and product imagery",
    blocks: [
      { name: "columns-product", instances: [".columncontrol.column-align--left .columncontrol__column"] },
      { name: "cards-flavor", instances: [".columncontrol.column-align--center .m-card"] },
      { name: "columns-nutrition", instances: [".columncontrol.column-align--space-evenly .columncontrol__column"] },
      { name: "accordion-faq", instances: [".accordion.panelcontainer"] },
      { name: "cards-navigation", instances: [".m-card.m-card--large"] },
      { name: "embed-reviews", instances: ["#SEO_BVRRSummaryContainer, #BVRRContainer"] }
    ],
    sections: [
      { id: "section-1-product", name: "Product Detail", selector: ".columncontrol.column-align--left", style: null, blocks: ["columns-product"], defaultContent: ["h1", "h3"] },
      { id: "section-2-flavors", name: "Available Flavors", selector: ".columncontrol.column-align--center", style: null, blocks: ["cards-flavor"], defaultContent: [] },
      { id: "section-3-nutrition", name: "Nutritional Facts", selector: ".columncontrol.column-align--space-evenly", style: "dark-header", blocks: ["columns-nutrition"], defaultContent: ["h2"] },
      { id: "section-4-faq", name: "Related FAQs", selector: ".accordion.panelcontainer", style: null, blocks: ["accordion-faq"], defaultContent: [] },
      { id: "section-5-cards", name: "Related Content Cards", selector: [".m-card.m-card--large"], style: null, blocks: ["cards-navigation"], defaultContent: [] },
      { id: "section-6-reviews", name: "Product Reviews", selector: "#SEO_BVRRSummaryContainer", style: "dark-header", blocks: ["embed-reviews"], defaultContent: [] }
    ]
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), { template: PAGE_TEMPLATE });
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
        elements.forEach((element) => {
          pageBlocks.push({ name: blockDef.name, selector, element, section: blockDef.section || null });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_product_flavor_page_default = {
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
            console.error(`Failed to parse ${block.name}:`, e);
          }
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
      return [{ element: main, path, report: { title: document.title, template: PAGE_TEMPLATE.name, blocks: pageBlocks.map((b) => b.name) } }];
    }
  };
  return __toCommonJS(import_product_flavor_page_exports);
})();
