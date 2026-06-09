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

  // tools/importer/import-product-detail.js
  var import_product_detail_exports = {};
  __export(import_product_detail_exports, {
    default: () => import_product_detail_default
  });

  // tools/importer/parsers/hero-treatment.js
  function parse(element, { document }) {
    let bgImage = null;
    bgImage = element.querySelector(
      ".abbv-background-container-display img, .abbv-background-container-image-swap-bg img, img"
    );
    if (!bgImage) {
      const displayDiv = element.querySelector(
        ".abbv-background-container-display, .abbv-background-container-image-swap-bg"
      );
      if (displayDiv) {
        const computedStyle = window.getComputedStyle(displayDiv);
        const bgValue = computedStyle.backgroundImage;
        if (bgValue && bgValue !== "none") {
          const urlMatch = bgValue.match(/url\(["']?([^"')]+)["']?\)/);
          if (urlMatch && urlMatch[1]) {
            bgImage = document.createElement("img");
            bgImage.src = urlMatch[1];
          }
        }
      }
    }
    if (!bgImage) {
      const computedStyle = window.getComputedStyle(element);
      const bgValue = computedStyle.backgroundImage;
      if (bgValue && bgValue !== "none") {
        const urlMatch = bgValue.match(/url\(["']?([^"')]+)["']?\)/);
        if (urlMatch && urlMatch[1]) {
          bgImage = document.createElement("img");
          bgImage.src = urlMatch[1];
        }
      }
    }
    const heading = element.querySelector(
      ".abbv-background-container-content-block-display h1, .abbv-background-container-content-block h1, .abbv-background-container-content h1, .abbv-rich-text-common h1, h1, h2"
    );
    const cells = [];
    if (bgImage) {
      cells.push([bgImage]);
    }
    const contentCell = [];
    if (heading) {
      contentCell.push(heading);
    }
    const contentBlock = element.querySelector(
      ".abbv-background-container-content-block-display, .abbv-rich-text-common"
    );
    if (contentBlock) {
      const description = contentBlock.querySelector('p, .description, [class*="subtitle"]');
      if (description) {
        contentCell.push(description);
      }
      const ctaLinks = contentBlock.querySelectorAll("a");
      if (ctaLinks.length > 0) {
        contentCell.push(...Array.from(ctaLinks));
      }
    }
    if (contentCell.length > 0) {
      cells.push(contentCell);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-treatment", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-icontext.js
  function parse2(element, { document }) {
    const rows = element.querySelectorAll(":scope .abbv-row");
    const cells = [];
    rows.forEach((row) => {
      const iconCol = row.querySelector(".abbv-col-2, .abbv-col.abbv-col-2");
      const icon = iconCol ? iconCol.querySelector("img") : null;
      const textCol = row.querySelector(".abbv-col-10, .abbv-col.abbv-col-10");
      const textContent = textCol ? textCol.querySelector(".abbv-rich-text p, .abbv-rich-text, p") : null;
      const iconCell = icon || "";
      const textCell = textContent || "";
      cells.push([iconCell, textCell]);
    });
    if (cells.length === 0) {
      const icon = element.querySelector(".abbv-col-2 img, .abbv-image-text-img");
      const text = element.querySelector(".abbv-col-10 .abbv-rich-text p, .abbv-col-10 p");
      if (icon || text) {
        cells.push([icon || "", text || ""]);
      }
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-icontext", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-navigation.js
  function parse3(element, { document }) {
    const columnsContainer = element.querySelector(".abbv-row-container.duopa-cases-component, .abbv-row-container.updated-column-control");
    const cardColumns = columnsContainer ? Array.from(columnsContainer.querySelectorAll(":scope .abbv-row > .abbv-col.abbv-col-3")) : Array.from(element.querySelectorAll(".abbv-col.abbv-col-3"));
    const cells = [];
    cardColumns.forEach((col) => {
      const img = col.querySelector(".abbv-image-text img, .abbv-image-content-container img");
      const label = col.querySelector(".abbv-image-text-display p, .abbv-image-text-content p");
      const cardContent = [];
      if (img) cardContent.push(img);
      if (label) cardContent.push(label);
      if (cardContent.length > 0) {
        cells.push(cardContent);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-navigation", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-callout.js
  function parse4(element, { document }) {
    const richText = element.querySelector(".abbv-rich-text, .rich-text");
    const heading = element.querySelector("p.subtitle-1, p b, .text-light-blue b");
    const bodyParagraph = element.querySelector("p.subtitle-2");
    const contentCell = [];
    if (heading) {
      const h2 = document.createElement("h2");
      h2.textContent = heading.textContent.trim();
      contentCell.push(h2);
    }
    if (bodyParagraph) {
      contentCell.push(bodyParagraph);
    } else if (richText) {
      const paragraphs = richText.querySelectorAll("p:not(.subtitle-1)");
      paragraphs.forEach((p) => contentCell.push(p));
    }
    const cells = [[...contentCell]];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-callout", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/duopa-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [
        "#onetrust-consent-sdk",
        ".modal.parbase"
      ]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        ".header-v2.parbase",
        ".footer.parbase",
        ".section-navigation.parbase",
        ".abbv-dimmer",
        ".abbv-back-to-top",
        ".duopa-hero-banner-mobile"
      ]);
      WebImporter.DOMUtils.remove(element, [
        ".newpar.new.section",
        ".par.iparys_inherited"
      ]);
      WebImporter.DOMUtils.remove(element, [
        "noscript",
        "link",
        "iframe"
      ]);
    }
  }

  // tools/importer/transformers/duopa-sections.js
  var TransformHook2 = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === TransformHook2.afterTransform) {
      const { template } = payload;
      if (!template || !template.sections || template.sections.length < 2) return;
      const { document } = element.ownerDocument ? { document: element.ownerDocument } : { document: element.getRootNode() };
      const sections = template.sections;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const selector = section.selector;
        if (!selector) continue;
        const sectionEl = element.querySelector(selector);
        if (!sectionEl) continue;
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

  // tools/importer/import-product-detail.js
  var parsers = {
    "hero-treatment": parse,
    "columns-icontext": parse2,
    "cards-navigation": parse3,
    "columns-callout": parse4
  };
  var PAGE_TEMPLATE = {
    name: "product-detail",
    description: "Product feature page with hero banner, section navigation, columns, and carousel",
    urls: [
      "https://www.duopa.com/carrying-case",
      "https://www.duopa.com/duopa-your-day",
      "https://www.duopa.com/how-duopa-works",
      "https://www.duopa.com/resources"
    ],
    blocks: [
      {
        name: "hero-treatment",
        instances: ["#background-container-582095465"]
      },
      {
        name: "columns-icontext",
        instances: [".abbv-row-container.duopa-icon-tout-2"]
      },
      {
        name: "cards-navigation",
        instances: [".abbv-row-container.duopa-carrying-cases"]
      },
      {
        name: "columns-callout",
        instances: [".abbv-container.duopa-blue-container-3"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero Banner",
        selector: "#background-container-582095465",
        style: null,
        blocks: ["hero-treatment"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Activities",
        selector: "#duopa-activities",
        style: null,
        blocks: ["columns-icontext"],
        defaultContent: []
      },
      {
        id: "section-3",
        name: "Carrying Cases",
        selector: ".abbv-container.bg-lightest-gray",
        style: "grey",
        blocks: ["cards-navigation"],
        defaultContent: [".abbv-title.abbv-text-center h1", ".abbv-rich-text.Body-text-3.abbv-text-center p", ".abbv-button-primary"]
      },
      {
        id: "section-4",
        name: "Safety Information",
        selector: ".abbv-container.abbv-margin-top-20",
        style: null,
        blocks: ["columns-callout"],
        defaultContent: [".abbv-rich-text h3", ".abbv-rich-text p", ".duopa-button-next-page"]
      },
      {
        id: "section-5",
        name: "ISI",
        selector: ".abbv-inline-use-isi",
        style: null,
        blocks: [],
        defaultContent: [".abbv-inline-use-isi h3", ".abbv-inline-use-isi p", ".abbv-inline-use-isi ul"]
      }
    ]
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
  var import_product_detail_default = {
    transform: (payload) => {
      const { document, url, params } = payload;
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
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "")
      );
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
  return __toCommonJS(import_product_detail_exports);
})();
