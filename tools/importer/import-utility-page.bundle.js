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

  // tools/importer/import-utility-page.js
  var import_utility_page_exports = {};
  __export(import_utility_page_exports, {
    default: () => import_utility_page_default
  });

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

  // tools/importer/import-utility-page.js
  var PAGE_TEMPLATE = {
    name: "utility-page",
    description: "Utility and marketing pages including contact, coupons, privacy, FAQ, and promotional landing pages",
    blocks: [],
    sections: []
  };
  var transformers = [transform];
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
  var import_utility_page_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      let path = new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "");
      if (!path || path === "") path = "/index";
      return [{ element: main, path, report: { title: document.title, template: PAGE_TEMPLATE.name, blocks: [] } }];
    }
  };
  return __toCommonJS(import_utility_page_exports);
})();
