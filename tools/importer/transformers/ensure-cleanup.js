/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: ensure.com cleanup
 * Removes non-authorable site-wide elements from the DOM.
 * All selectors validated against migration-work/cleaned.html.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Cookie consent banner (TrustArc) - found at line 1072-1109 in cleaned.html
    WebImporter.DOMUtils.remove(element, [
      '#consent-banner',
      '#truste-consent-track',
      '.trustarc-banner-wrapper',
      '#teconsent',
    ]);

    // Modal dialogs and popups - found at lines 893, 898, 1060, 1118 in cleaned.html
    WebImporter.DOMUtils.remove(element, [
      '.modal',
      '.generic-modal',
      '#site-leaving-popup-content',
      '#site-entering-popup-content',
      '#tender-product-disclaimer-content',
      '.popup-wrapper',
      '.m-popup',
    ]);

    // Accessibility overlay widgets - found at lines 2-11 in cleaned.html
    WebImporter.DOMUtils.remove(element, [
      'access-widget-ui',
      '.acsb-sr-alert',
      'a[href*="accessibe.com"]',
    ]);

    // Spinner/loading overlays - found at lines 1113, 1295-1315 in cleaned.html
    WebImporter.DOMUtils.remove(element, ['.a-spinner']);
  }

  if (hookName === TransformHook.afterTransform) {
    // Header and navigation - found at lines 26-357 in cleaned.html
    WebImporter.DOMUtils.remove(element, [
      '.o-header',
      '#section-ensure-header',
      '.a-container--header',
    ]);

    // Footer - found at lines 652-861 in cleaned.html
    WebImporter.DOMUtils.remove(element, ['.o-footer']);

    // Alert banner (non-authorable site chrome) - found at line 30 in cleaned.html
    WebImporter.DOMUtils.remove(element, ['.abbott-alert']);

    // Link/style elements and hidden inputs - found at lines 12-18 in cleaned.html
    WebImporter.DOMUtils.remove(element, [
      'link',
      'noscript',
      'input[id="onetrust-url"]',
      'input[id="cmpidField"]',
      'input[id="selfValue"]',
      'input[id="wcmMode"]',
    ]);
  }
}
