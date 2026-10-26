/**
 * SEO & Meta Tag Management Helper.
 * Dynamically synchronizes document title, meta description, meta keywords,
 * OpenGraph, Twitter cards, and canonical tags.
 */

export interface PageSeoMetadata {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl?: string;
  ogType?: 'website' | 'article';
}

export function updatePageSeo(meta: PageSeoMetadata): void {
  if (typeof document === 'undefined') return;

  // 1. Document Title
  document.title = meta.title;

  // 2. Meta Description
  setMetaTag('name', 'description', meta.description);

  // 3. Meta Keywords
  setMetaTag('name', 'keywords', meta.keywords);

  // 4. OpenGraph Tags
  setMetaTag('property', 'og:title', meta.title);
  setMetaTag('property', 'og:description', meta.description);
  setMetaTag('property', 'og:type', meta.ogType || 'website');

  // 5. Twitter Card Tags
  setMetaTag('name', 'twitter:title', meta.title);
  setMetaTag('name', 'twitter:description', meta.description);

  // 6. Canonical Link
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = meta.canonicalUrl || window.location.href;
}

function setMetaTag(attrName: 'name' | 'property', attrValue: string, content: string): void {
  let element = document.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}
