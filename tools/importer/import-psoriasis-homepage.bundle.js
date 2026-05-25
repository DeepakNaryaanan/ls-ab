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

  // tools/importer/import-psoriasis-homepage.js
  var import_psoriasis_homepage_exports = {};
  __export(import_psoriasis_homepage_exports, {
    default: () => import_psoriasis_homepage_default
  });

  // tools/importer/parsers/carousel-hero.js
  function parse(element, { document }) {
    let slides = element.querySelectorAll(".owl-item .item");
    if (!slides.length) {
      slides = element.querySelectorAll('.item[id^="slide"]');
    }
    const cells = [];
    slides.forEach((slide) => {
      const bgContainer = slide.querySelector(".abbv-background-container-display, .abbv-background-container-image-swap-bg");
      let imageEl = null;
      if (bgContainer) {
        const bgStyle = bgContainer.style.backgroundImage || (typeof window !== "undefined" ? window.getComputedStyle(bgContainer).backgroundImage : "");
        const urlMatch = bgStyle.match(/url\(["']?([^"')]+)["']?\)/);
        if (urlMatch && urlMatch[1]) {
          imageEl = document.createElement("img");
          imageEl.src = urlMatch[1];
          imageEl.alt = "";
        }
        if (!imageEl) {
          const imgTag = bgContainer.querySelector("img");
          if (imgTag) {
            imageEl = imgTag;
          }
        }
      }
      const contentArea = slide.querySelector(".abbv-background-container-content");
      const richTextDivs = contentArea ? contentArea.querySelectorAll(".abbv-rich-text") : slide.querySelectorAll(".abbv-rich-text");
      const ctaLink = (contentArea || slide).querySelector(".cta.parbase a, .cta a, a.abbv-button-primary");
      const overlayImage = (contentArea || slide).querySelector(".abbv-image-text-v2 img, .abbv-image-content-container-v2 img");
      const contentCell = [];
      richTextDivs.forEach((richText) => {
        const heading = richText.querySelector("h1, h2, h3");
        const paragraph = richText.querySelector("p");
        if (heading) {
          contentCell.push(heading);
        } else if (paragraph) {
          contentCell.push(paragraph);
        }
      });
      if (overlayImage) {
        contentCell.push(overlayImage);
      }
      if (ctaLink) {
        contentCell.push(ctaLink);
      }
      if (imageEl && contentCell.length > 0) {
        cells.push([imageEl, contentCell]);
      } else if (contentCell.length > 0) {
        cells.push(["", contentCell]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "carousel-hero", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-navigation.js
  function parse2(element, { document }) {
    const cardContainers = element.querySelectorAll(".abbv-image-text.quarter-hero");
    const cells = [];
    cardContainers.forEach((card) => {
      const image = card.querySelector('img.abbv-image-text-img, img[class*="abbv-image-text"]');
      const heading = card.querySelector(".abbv-image-text-display h2, .abbv-image-text-display h3");
      const ctaLink = card.querySelector('a.abbv-button-primary, .abbv-image-text-display > .abbv-image-text-content a[class*="button"]');
      const contentCell = [];
      if (heading) contentCell.push(heading);
      if (ctaLink) contentCell.push(ctaLink);
      if (image) {
        cells.push([image, contentCell]);
      } else {
        cells.push([contentCell]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-navigation", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-blog.js
  function parse3(element, { document }) {
    const leftCol = element.querySelector(".abbv-flex-item.flex-col-lg-8") || element.querySelector('[class*="flex-col-lg-8"]');
    const rightCol = element.querySelector(".abbv-flex-item.flex-col-lg-4") || element.querySelector('[class*="flex-col-lg-4"]');
    let leftColumn = leftCol;
    let rightColumn = rightCol;
    if (!leftColumn && element.classList && element.classList.contains("flex-col-lg-8")) {
      leftColumn = element;
      rightColumn = element.parentElement ? element.parentElement.querySelector('.abbv-flex-item.flex-col-lg-4, [class*="flex-col-lg-4"]') : null;
    }
    if (!rightColumn && element.classList && element.classList.contains("flex-col-lg-4")) {
      rightColumn = element;
      leftColumn = element.parentElement ? element.parentElement.querySelector('.abbv-flex-item.flex-col-lg-8, [class*="flex-col-lg-8"]') : null;
    }
    const leftContent = [];
    if (leftColumn) {
      const contentListings = leftColumn.querySelectorAll(".abbv-container.custom-component_listing");
      contentListings.forEach((item) => {
        const img = item.querySelector("img.abbv-image-text-img, .abbv-image-content-container img");
        if (img) leftContent.push(img);
        const heading = item.querySelector(".abbv-rich-text h3, .abbv-rich-text h2, .abbv-rich-text h4");
        if (heading) leftContent.push(heading);
        const richText = item.querySelector(".abbv-rich-text");
        if (richText) {
          const paragraphs = richText.querySelectorAll(":scope > p");
          paragraphs.forEach((p) => {
            leftContent.push(p);
          });
        }
      });
      const footnoteContainer = leftColumn.querySelector(
        '.abbv-container.custom-component_listing-note, [class*="listing-note"]'
      );
      if (footnoteContainer) {
        const footnoteParagraphs = footnoteContainer.querySelectorAll("p");
        footnoteParagraphs.forEach((p) => {
          leftContent.push(p);
        });
      }
    }
    const rightContent = [];
    if (rightColumn) {
      const bgDisplayContainer = rightColumn.querySelector(
        '[class*="abbv-background-container-display"], [class*="background-container-image"]'
      );
      if (bgDisplayContainer) {
        const bgImage = bgDisplayContainer.querySelector("img");
        if (bgImage) rightContent.push(bgImage);
      }
      const contentContainer = rightColumn.querySelector(
        '.abbv-background-container-content, [class*="background-container-content"]'
      );
      if (contentContainer) {
        const logo = contentContainer.querySelector("img.abbv-image-text-img, .abbv-image-content-container img");
        if (logo) rightContent.push(logo);
        const textContainer = contentContainer.querySelector(
          '.abbv-image-text-content-container, .abbv-image-text-content, [class*="image-text-content"]'
        );
        if (textContainer) {
          const headings = textContainer.querySelectorAll("h2, h3, h4");
          headings.forEach((h) => rightContent.push(h));
          const paragraphs = textContainer.querySelectorAll("p");
          paragraphs.forEach((p) => rightContent.push(p));
        }
        const ctaButton = contentContainer.querySelector('a.btn, a[class*="btn"], a.button, a[class*="cta"]') || contentContainer.querySelector("a");
        if (ctaButton) rightContent.push(ctaButton);
      } else {
        const ctaCard = rightColumn.querySelector(
          ".abbv-image-text.cta-be-first, .abbv-image-text.be-first-know-container, .crm-signup-cta .abbv-image-text"
        );
        if (ctaCard) {
          const logo = ctaCard.querySelector("img.abbv-image-text-img, .abbv-image-content-container img");
          if (logo) rightContent.push(logo);
          const headings = ctaCard.querySelectorAll("h2, h3, h4");
          headings.forEach((h) => rightContent.push(h));
          const paragraphs = ctaCard.querySelectorAll("p");
          paragraphs.forEach((p) => rightContent.push(p));
          const ctaButton = ctaCard.querySelector('a.btn, a[class*="btn"], a.button, a');
          if (ctaButton) rightContent.push(ctaButton);
        } else {
          const allImages = rightColumn.querySelectorAll("img");
          allImages.forEach((img) => rightContent.push(img));
          const allText = rightColumn.querySelectorAll("h2, h3, h4, p");
          allText.forEach((el) => rightContent.push(el));
          const allLinks = rightColumn.querySelectorAll('a.btn, a[class*="btn"], a.button');
          allLinks.forEach((link) => rightContent.push(link));
        }
      }
    }
    if (leftContent.length === 0 && rightContent.length === 0) {
      return;
    }
    const cells = [
      [
        leftContent.length > 0 ? leftContent : [""],
        rightContent.length > 0 ? rightContent : [""]
      ]
    ];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-blog", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/skyrizi-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [
        "#onetrust-consent-sdk",
        ".abbv-modal",
        ".modal.parbase"
      ]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        "header.abbv-header-v2",
        "footer.abbv-footer",
        ".abbv-slimEyebrow",
        ".abbv-safety-bar",
        "iframe",
        "link"
      ]);
    }
  }

  // tools/importer/transformers/skyrizi-sections.js
  var TransformHook2 = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === TransformHook2.afterTransform) {
      const { document } = element.ownerDocument ? { document: element.ownerDocument } : { document: element.getRootNode() };
      const sections = payload && payload.template && payload.template.sections;
      if (!sections || sections.length < 2) return;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const selectorValue = section.selector;
        let sectionEl = null;
        if (Array.isArray(selectorValue)) {
          for (const sel of selectorValue) {
            sectionEl = element.querySelector(sel);
            if (sectionEl) break;
          }
        } else {
          sectionEl = element.querySelector(selectorValue);
        }
        if (!sectionEl) continue;
        if (section.style) {
          const sectionMetadata = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          if (sectionEl.nextSibling) {
            sectionEl.parentNode.insertBefore(sectionMetadata, sectionEl.nextSibling);
          } else {
            sectionEl.parentNode.appendChild(sectionMetadata);
          }
        }
        if (i > 0) {
          const hr = document.createElement("hr");
          sectionEl.parentNode.insertBefore(hr, sectionEl);
        }
      }
    }
  }

  // tools/importer/import-psoriasis-homepage.js
  var parsers = {
    "carousel-hero": parse,
    "cards-navigation": parse2,
    "columns-blog": parse3
  };
  var transformers = [
    transform,
    transform2
  ];
  var PAGE_TEMPLATE = {
    name: "psoriasis-homepage",
    description: "Main psoriasis landing page with hero, treatment overview, and navigation to sub-sections",
    urls: ["https://www.skyrizi.com/psoriasis"],
    blocks: [
      {
        name: "carousel-hero",
        instances: [".home-hero-carousel"]
      },
      {
        name: "cards-navigation",
        instances: [".psoriasis-tail-cards.gray-bg-colm"]
      },
      {
        name: "columns-blog",
        instances: [".abbv-flex-item.flex-col-lg-8, .abbv-flex-item.flex-col-lg-4"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero Carousel",
        selector: ".home-hero-carousel",
        style: null,
        blocks: ["carousel-hero"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Navigation Cards Row",
        selector: ".psoriasis-tail-cards.gray-bg-colm",
        style: "grey",
        blocks: ["cards-navigation"],
        defaultContent: []
      },
      {
        id: "section-3",
        name: "Content Listing with Sidebar",
        selector: [".abbv-flex-item.flex-col-lg-8", ".abbv-flex-item.flex-col-lg-4"],
        style: null,
        blocks: ["columns-blog"],
        defaultContent: []
      },
      {
        id: "section-4",
        name: "Important Safety Information",
        selector: ".abbv-inline-use-isi",
        style: null,
        blocks: [],
        defaultContent: [".abbv-inline-use-isi h2", ".abbv-inline-use-isi h3", ".abbv-isi-content p", ".abbv-isi-content ul"]
      }
    ]
  };
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
  var import_psoriasis_homepage_default = {
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
  return __toCommonJS(import_psoriasis_homepage_exports);
})();
