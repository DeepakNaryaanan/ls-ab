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

  // tools/importer/import-recipe-page.js
  var import_recipe_page_exports = {};
  __export(import_recipe_page_exports, {
    default: () => import_recipe_page_default
  });

  // tools/importer/parsers/hero-recipe.js
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
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-recipe", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/embed-video.js
  function parse2(element, { document }) {
    let videoUrl = "";
    const iframe = element.querySelector('iframe.a-video__embed-video, iframe.a-video__player-source, iframe[src*="brightcove"], iframe[src*="video"]');
    if (iframe && iframe.getAttribute("src")) {
      videoUrl = iframe.getAttribute("src");
    }
    if (!videoUrl) {
      const video = element.querySelector("video");
      if (video) {
        const source = video.querySelector("source");
        videoUrl = source && source.getAttribute("src") || video.getAttribute("src") || "";
      }
    }
    if (!videoUrl) {
      const videoIdEl = element.querySelector("[data-video-id]");
      if (videoIdEl) {
        const videoId = videoIdEl.getAttribute("data-video-id");
        const account = videoIdEl.getAttribute("data-account") || "";
        if (videoId && account) {
          videoUrl = `https://players.brightcove.net/${account}/default_default/index.html?videoId=${videoId}`;
        } else if (videoId) {
          videoUrl = videoId;
        }
      }
    }
    if (!videoUrl) {
      const link = element.querySelector('a[href*="video"], a[href*="brightcove"], a[href*="youtube"], a[href*="vimeo"]');
      if (link) {
        videoUrl = link.getAttribute("href");
      }
    }
    const cells = [];
    if (videoUrl) {
      const link = document.createElement("a");
      link.href = videoUrl;
      link.textContent = videoUrl;
      cells.push([link]);
    } else {
      const placeholder = document.createElement("p");
      placeholder.textContent = "Recipe Video";
      cells.push([placeholder]);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "embed-video", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/table-nutrition.js
  function parse3(element, { document }) {
    const cells = [];
    const table = element.tagName === "TABLE" ? element : element.querySelector("table");
    if (table) {
      const headerRows = table.querySelectorAll("thead tr");
      const bodyRows = table.querySelectorAll("tbody tr");
      const allRows = headerRows.length > 0 || bodyRows.length > 0 ? [...headerRows, ...bodyRows] : table.querySelectorAll("tr");
      for (const row of allRows) {
        const rowCells = row.querySelectorAll("th, td");
        const cellContents = Array.from(rowCells).map((cell) => {
          return cell.cloneNode(true);
        });
        if (cellContents.length > 0) {
          cells.push(cellContents);
        }
      }
    } else {
      const textSections = element.querySelectorAll(".text .cmp-text, section.cmp-text");
      const paragraphs = textSections.length > 0 ? Array.from(textSections).flatMap((sec) => Array.from(sec.querySelectorAll("p"))) : Array.from(element.querySelectorAll("p"));
      for (const p of paragraphs) {
        const text = p.textContent.trim().replace(/ /g, " ").trim();
        if (!text) continue;
        if (text.startsWith("*") || text.includes("representative of") || text.includes("Nutrition information will vary")) continue;
        const labelSpan = p.querySelector(".brandonBlack");
        if (labelSpan) {
          const label = labelSpan.textContent.trim().replace(/ /g, " ").trim();
          const fullText = p.textContent.trim().replace(/ /g, " ").trim();
          const value = fullText.replace(label, "").trim();
          const labelEl = document.createElement("strong");
          labelEl.textContent = label;
          const valueEl = document.createElement("span");
          valueEl.textContent = value;
          cells.push([labelEl, valueEl]);
        } else {
          const trimmedText = text.replace(/^\s+/, "");
          const el = document.createElement("span");
          el.textContent = trimmedText;
          cells.push([el]);
        }
      }
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "table-nutrition", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-navigation.js
  function parse4(element, { document }) {
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

  // tools/importer/import-recipe-page.js
  var parsers = {
    "hero-recipe": parse,
    "embed-video": parse2,
    "table-nutrition": parse3,
    "cards-navigation": parse4
  };
  var PAGE_TEMPLATE = {
    name: "recipe-page",
    description: "Recipe detail page with ingredients, preparation steps, and nutritional information",
    blocks: [
      { name: "hero-recipe", instances: [".m-hero"] },
      { name: "embed-video", instances: [".s7dm-videoPlayer, .brightcove-container, .video-js, .a-video"] },
      { name: "table-nutrition", instances: [".m-table, table.cmp-table__table"] },
      { name: "cards-navigation", instances: [".m-card.m-card--large"] }
    ],
    sections: [
      { id: "section-1-hero", name: "Recipe Hero", selector: ".m-hero", style: "blue-wave", blocks: ["hero-recipe"], defaultContent: [] },
      { id: "section-2-content", name: "Recipe Content", selector: ".columncontrol", style: null, blocks: ["embed-video", "table-nutrition", "cards-navigation"], defaultContent: [] }
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
  var import_recipe_page_default = {
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
  return __toCommonJS(import_recipe_page_exports);
})();
