import { useEffect, useMemo } from 'react';

function ensureMeta(attr, value, content) {
  const selector = `meta[${attr}="${value}"]`;
  let element = document.head.querySelector(selector);
  const created = !element;
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, value);
    document.head.appendChild(element);
  }
  const previous = element.getAttribute('content');
  element.setAttribute('content', content);
  return { element, created, previous };
}

function ensureLink(rel, href) {
  const selector = `link[rel="${rel}"]`;
  let element = document.head.querySelector(selector);
  const created = !element;
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  const previous = element.getAttribute('href');
  element.setAttribute('href', href);
  return { element, created, previous };
}

const stringify = (value) => (value ? JSON.stringify(value) : '');

const SeoHead = ({
  title,
  description,
  canonical,
  openGraph,
  twitter,
  jsonLd,
  keywords,
  author,
  robots,
  viewport,
  themeColor,
  image,
  siteName,
  locale,
  alternateLangs,
}) => {
  const ogEntries = useMemo(() => Object.entries(openGraph || {}).filter(([, content]) => content), [openGraph]);
  const twitterEntries = useMemo(() => Object.entries(twitter || {}).filter(([, content]) => content), [twitter]);
  const jsonLdString = useMemo(() => (jsonLd ? JSON.stringify(jsonLd) : ''), [jsonLd]);

  useEffect(() => {
    if (typeof document === 'undefined') return undefined;

    const previousTitle = document.title;
    if (title) {
      document.title = title;
    }

    const metaRecords = [];

    // Basic meta tags
    if (description) {
      metaRecords.push(ensureMeta('name', 'description', description));
    }

    if (keywords) {
      metaRecords.push(ensureMeta('name', 'keywords', keywords));
    }

    if (author) {
      metaRecords.push(ensureMeta('name', 'author', author));
    }

    if (robots) {
      metaRecords.push(ensureMeta('name', 'robots', robots));
    }

    // Viewport and theme
    if (viewport) {
      metaRecords.push(ensureMeta('name', 'viewport', viewport));
    } else {
      metaRecords.push(ensureMeta('name', 'viewport', 'width=device-width, initial-scale=1, shrink-to-fit=no'));
    }

    if (themeColor) {
      metaRecords.push(ensureMeta('name', 'theme-color', themeColor));
    }

    // Open Graph tags
    ogEntries.forEach(([property, content]) => {
      metaRecords.push(ensureMeta('property', property, content));
    });

    // Twitter Card tags
    twitterEntries.forEach(([name, content]) => {
      metaRecords.push(ensureMeta('name', name, content));
    });

    // Canonical URL
    let linkRecord;
    if (canonical) {
      linkRecord = ensureLink('canonical', canonical);
    }

    // Alternate language versions
    if (alternateLangs) {
      alternateLangs.forEach(lang => {
        ensureLink('alternate', lang.href).element.setAttribute('hreflang', lang.lang);
      });
    }

    // JSON-LD Structured Data
    let jsonLdElement;
    if (jsonLdString) {
      jsonLdElement = document.createElement('script');
      jsonLdElement.type = 'application/ld+json';
      jsonLdElement.setAttribute('data-seo-head', 'true');
      jsonLdElement.textContent = jsonLdString;
      document.head.appendChild(jsonLdElement);
    }

    // Performance and security meta tags
    metaRecords.push(ensureMeta('http-equiv', 'X-UA-Compatible', 'IE=edge'));
    metaRecords.push(ensureMeta('http-equiv', 'Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:;"));
    metaRecords.push(ensureMeta('name', 'format-detection', 'telephone=no'));

    // Preload critical resources
    if (image) {
      ensureLink('preload', image).element.setAttribute('as', 'image');
    }

    return () => {
      if (title) {
        document.title = previousTitle;
      }

      metaRecords.forEach(({ element, created, previous }) => {
        if (created) {
          element.remove();
        } else if (previous !== null) {
          element.setAttribute('content', previous);
        } else {
          element.removeAttribute('content');
        }
      });

      if (linkRecord) {
        const { element, created, previous } = linkRecord;
        if (created) {
          element.remove();
        } else if (previous !== null) {
          element.setAttribute('href', previous);
        } else {
          element.removeAttribute('href');
        }
      }

      if (jsonLdElement) {
        jsonLdElement.remove();
      }
    };
  }, [title, description, canonical, keywords, author, robots, viewport, themeColor, image, siteName, locale, stringify(openGraph), stringify(twitter), jsonLdString, alternateLangs]);

  return null;
};

export default SeoHead;
