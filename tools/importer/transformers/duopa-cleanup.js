/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Duopa site-wide cleanup.
 * Removes non-authorable content (header, footer, nav, modals, cookie consent,
 * section navigation, back-to-top, dimmer overlay).
 * Selectors validated against migration-work/cleaned.html from duopa.com/carrying-case.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove cookie consent banner (OneTrust) - found at line 1497: <div id="onetrust-consent-sdk">
    // Remove modals that may block parsing - found at lines 821, 884, 942, 1033, 1086, 1144: <div class="modal parbase">
    WebImporter.DOMUtils.remove(element, [
      '#onetrust-consent-sdk',
      '.modal.parbase',
    ]);
  }

  if (hookName === TransformHook.afterTransform) {
    // Remove header - found at line 12: <div class="header-v2 parbase">
    // Remove footer - found at line 743: <div class="footer parbase">
    // Remove section navigation - found at line 171: <div class="section-navigation parbase">
    // Remove dimmer overlay - found at line 813: <div class="abbv-dimmer">
    // Remove back-to-top button - found at line 816: <button class="abbv-back-to-top ...">
    // Remove mobile hero duplicate (hidden) - found at line 134: <div class="abbv-image-text duopa-hero-banner-mobile ...">
    WebImporter.DOMUtils.remove(element, [
      '.header-v2.parbase',
      '.footer.parbase',
      '.section-navigation.parbase',
      '.abbv-dimmer',
      '.abbv-back-to-top',
      '.duopa-hero-banner-mobile',
    ]);

    // Remove empty structural divs that are non-authorable
    // Found at lines 3-4 and 5-6: <div class="newpar new section"> and <div class="par iparys_inherited">
    WebImporter.DOMUtils.remove(element, [
      '.newpar.new.section',
      '.par.iparys_inherited',
    ]);

    // Remove noscript, link, and iframe elements (non-authorable)
    WebImporter.DOMUtils.remove(element, [
      'noscript',
      'link',
      'iframe',
    ]);
  }
}
