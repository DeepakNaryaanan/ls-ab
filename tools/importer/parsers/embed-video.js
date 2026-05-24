/* eslint-disable */
/* global WebImporter */

/**
 * Parser: embed-video
 * Base block: embed
 * Source: https://www.ensure.com/recipes/drinks-smoothies/banana-smoothie
 * Generated: 2026-05-22
 *
 * Extracts video embed URL from Brightcove iframe, video element, or data attributes.
 * Source DOM uses: .video > .m-video > .a-video > .a-video__player > iframe.a-video__embed-video
 * Target: Single-column table with video URL in one content row.
 */
export default function parse(element, { document }) {
  // Try to find video URL from multiple sources (validated against source HTML)
  let videoUrl = '';

  // Primary: Brightcove iframe (validated selector from source.html)
  const iframe = element.querySelector('iframe.a-video__embed-video, iframe.a-video__player-source, iframe[src*="brightcove"], iframe[src*="video"]');
  if (iframe && iframe.getAttribute('src')) {
    videoUrl = iframe.getAttribute('src');
  }

  // Fallback: standard video element with source
  if (!videoUrl) {
    const video = element.querySelector('video');
    if (video) {
      const source = video.querySelector('source');
      videoUrl = (source && source.getAttribute('src')) || video.getAttribute('src') || '';
    }
  }

  // Fallback: data attributes for video ID (e.g., data-video-id, data-account)
  if (!videoUrl) {
    const videoIdEl = element.querySelector('[data-video-id]');
    if (videoIdEl) {
      const videoId = videoIdEl.getAttribute('data-video-id');
      const account = videoIdEl.getAttribute('data-account') || '';
      if (videoId && account) {
        videoUrl = `https://players.brightcove.net/${account}/default_default/index.html?videoId=${videoId}`;
      } else if (videoId) {
        videoUrl = videoId;
      }
    }
  }

  // Fallback: any anchor link to a video
  if (!videoUrl) {
    const link = element.querySelector('a[href*="video"], a[href*="brightcove"], a[href*="youtube"], a[href*="vimeo"]');
    if (link) {
      videoUrl = link.getAttribute('href');
    }
  }

  // Build cells: single row with the video URL as a link element
  const cells = [];

  if (videoUrl) {
    const link = document.createElement('a');
    link.href = videoUrl;
    link.textContent = videoUrl;
    cells.push([link]);
  } else {
    // Placeholder if no video URL could be extracted
    const placeholder = document.createElement('p');
    placeholder.textContent = 'Recipe Video';
    cells.push([placeholder]);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'embed-video', cells });
  element.replaceWith(block);
}
