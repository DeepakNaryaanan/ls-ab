/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: psoriasis cleanup.
 * Removes non-authorable content from psoriasis.com (AbbVie AEM Classic).
 * Selectors from captured DOM (migration-work/cleaned.html).
 */
const H = { before: 'beforeTransform', after: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === H.before) {
    // Remove empty AEM Classic placeholder divs
    WebImporter.DOMUtils.remove(element, [
      '.newpar',
      '.par.iparys_inherited',
    ]);

    // Remove modal dialogs (leaving-site warnings, terms & conditions)
    // Found on live page: .modal.parbase wraps .abbv-modal containers
    WebImporter.DOMUtils.remove(element, [
      '.modal.parbase',
      '.abbv-modal',
    ]);

    // Remove OneTrust cookie consent banner and privacy preference center
    WebImporter.DOMUtils.remove(element, [
      '#onetrust-consent-sdk',
      '#onetrust-pc-sdk',
      '#onetrust-style',
    ]);

    // Remove interactive poll elements that cannot be authored
    // Poll answer/results section, loading spinner, option buttons
    WebImporter.DOMUtils.remove(element, [
      '.abbv-quick-poll .answer',
      '.abbv-quick-poll .loading',
      '.abbv-quick-poll .qPoll-options',
    ]);

    // Remove empty source elements inside pictures (no srcset attribute)
    element.querySelectorAll('picture > source:not([srcset])').forEach((src) => src.remove());
  }

  if (hookName === H.after) {
    // Remove non-authorable site chrome (header, footer, navigation)
    WebImporter.DOMUtils.remove(element, [
      '.header-v2.parbase',
      'header.abbv-header-v2',
      'footer.abbv-footer',
      '.abv-footer-container',
      '.abbv-clear',
      'noscript',
      'link',
    ]);

    // Remove tracking pixels and empty anchor tags
    WebImporter.DOMUtils.remove(element, [
      'a#target-rcmd-touts-id',
      'img[src*="t.co/i/adsct"]',
      'img[src*="analytics.twitter.com"]',
    ]);
  }
}
