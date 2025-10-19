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

    if (description) {
      metaRecords.push(ensureMeta('name', 'description', description));
    }

    ogEntries.forEach(([property, content]) => {
      metaRecords.push(ensureMeta('property', property, content));
    });

    twitterEntries.forEach(([name, content]) => {
      metaRecords.push(ensureMeta('name', name, content));
    });

    let linkRecord;
    if (canonical) {
      linkRecord = ensureLink('canonical', canonical);
    }

    let jsonLdElement;
    if (jsonLdString) {
      jsonLdElement = document.createElement('script');
      jsonLdElement.type = 'application/ld+json';
      jsonLdElement.setAttribute('data-seo-head', 'true');
      jsonLdElement.textContent = jsonLdString;
      document.head.appendChild(jsonLdElement);
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
  }, [title, description, canonical, stringify(openGraph), stringify(twitter), jsonLdString]);

  return null;
};

export default SeoHead;
