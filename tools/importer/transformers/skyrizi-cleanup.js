/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Skyrizi site-wide cleanup.
 * Removes non-authorable elements from skyrizi.com pages.
 * All selectors validated against captured DOM in migration-work/cleaned.html.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // OneTrust cookie consent banner (line 1927: <div id="onetrust-consent-sdk">)
    // Exit-site modals - "Leaving AbbVie Web Site" dialogs (line 1068+: <div class="abbv-modal ...">)
    // Modal parbase wrappers (line 1066+: <div class="modal parbase">)
    WebImporter.DOMUtils.remove(element, [
      '#onetrust-consent-sdk',
      '.abbv-modal',
      '.modal.parbase',
    ]);
  }

  if (hookName === TransformHook.afterTransform) {
    // Site header (line 24: <header class="abbv-header-v2 psoriasis-header ...">)
    // Site footer (line 963: <footer class="abbv-footer">)
    // Promotional eyebrow bar (line 12: <div class="abbv-rich-text abbv-slimEyebrow ...">)
    // ISI sticky safety bar - fixed position regulatory text (line 1709: <div class="abbv-safety-bar ...">)
    // Iframes used for tracking (line 1923+)
    // Link elements (stylesheets)
    WebImporter.DOMUtils.remove(element, [
      'header.abbv-header-v2',
      'footer.abbv-footer',
      '.abbv-slimEyebrow',
      '.abbv-safety-bar',
      'iframe',
      'link',
    ]);
  }
}
