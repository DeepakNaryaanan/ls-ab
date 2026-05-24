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

  // tools/importer/import-blog-article.js
  var import_blog_article_exports = {};
  __export(import_blog_article_exports, {
    default: () => import_blog_article_default
  });

  // tools/importer/parsers/hero-blog.js
  function parse(element, { document }) {
    const heading = element.querySelector("h1.m-hero__header, h1.h1-hero, h1, h2.m-hero__header");
    const image = element.querySelector(".m-hero__image img.cmp-image__image, .m-hero__media img.cmp-image__image, .m-hero__image img, .m-hero__media img");
    const cells = [];
    if (image) {
      cells.push([image]);
    }
    if (heading) {
      cells.push([heading]);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-blog", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-blog.js
  function parse2(element, { document }) {
    const row = element.querySelector(":scope > .container > .row") || element.querySelector(".row");
    if (!row) return;
    const columns = Array.from(row.querySelectorAll(":scope > .columncontrol__column"));
    if (columns.length < 2) return;
    let leftCol = columns.find((col) => col.classList.contains("col-md-8")) || columns[0];
    let rightCol = columns.find((col) => col.classList.contains("col-md-4")) || columns[1];
    function extractLeftContent(col) {
      const content = [];
      const children = col.children;
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.classList.contains("text")) {
          const cmpText = child.querySelector(".cmp-text");
          if (cmpText) {
            const textElements = cmpText.querySelectorAll(":scope > p, :scope > ul, :scope > ol, :scope > h1, :scope > h2, :scope > h3, :scope > h4, :scope > h5, :scope > h6, :scope > blockquote");
            textElements.forEach((el) => content.push(el));
          }
        }
        if (child.classList.contains("image")) {
          const img = child.querySelector("img.cmp-image__image");
          if (img && img.getAttribute("src") !== "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7") {
            content.push(img);
          } else if (img) {
            const cmpImage = child.querySelector(".cmp-image[data-cmp-src]");
            if (cmpImage) {
              const src = cmpImage.getAttribute("data-cmp-src").replace("{width}", "1024");
              img.setAttribute("src", src);
              content.push(img);
            } else {
              content.push(img);
            }
          }
        }
        if (child.classList.contains("link") || child.classList.contains("button")) {
          const link = child.querySelector("a.a-link__text, a");
          if (link) content.push(link);
        }
      }
      return content.length > 0 ? content : [col];
    }
    function extractRightContent(col) {
      const content = [];
      const children = col.children;
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.classList.contains("title")) {
          const heading = child.querySelector(".cmp-title__text");
          if (heading) content.push(heading);
        }
        if (child.classList.contains("experiencefragment")) {
          const cards = child.querySelectorAll("article.m-card");
          cards.forEach((card) => {
            const link = card.querySelector("a.m-card-link");
            const title = card.querySelector(".m-card__title");
            const img = card.querySelector("img.cmp-image__image");
            if (link) {
              content.push(link);
            } else if (title) {
              content.push(title);
            }
          });
        }
        if (child.classList.contains("contentfragment")) {
          const article = child.querySelector("article.cmp-contentfragment");
          if (article) {
            const headingElement = article.querySelector(".cmp-contentfragment__element--heading");
            if (headingElement) {
              const link = headingElement.querySelector("a");
              const paragraph = headingElement.querySelector("p");
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
    const cells = [
      [leftContent, rightContent]
    ];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-blog", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-navigation.js
  function parse3(element, { document }) {
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

  // tools/importer/import-blog-article.js
  var parsers = {
    "hero-blog": parse,
    "columns-blog": parse2,
    "cards-navigation": parse3
  };
  var PAGE_TEMPLATE = {
    name: "blog-article",
    description: "Blog content page with expert advice or nutrition information articles",
    blocks: [
      { name: "hero-blog", instances: [".m-hero"] },
      { name: "columns-blog", instances: [".columncontrol"] },
      { name: "cards-navigation", instances: [".m-card.m-card--large"] }
    ],
    sections: [
      { id: "section-1-hero", name: "Blog Hero", selector: ".m-hero", style: null, blocks: ["hero-blog"], defaultContent: [] },
      { id: "section-2-content", name: "Article Content", selector: ".columncontrol", style: null, blocks: ["columns-blog", "cards-navigation"], defaultContent: [] }
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
        try {
          const elements = document.querySelectorAll(selector);
          elements.forEach((element) => {
            pageBlocks.push({ name: blockDef.name, selector, element, section: blockDef.section || null });
          });
        } catch (e) {
        }
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_blog_article_default = {
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
  return __toCommonJS(import_blog_article_exports);
})();
