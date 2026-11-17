/**
 * URL and SEO Slug Utility for Zarko Sportswear
 * Handles canonical hierarchical URLs like competitor Hamco Sports:
 * - Category path: /custom-<sport>-uniforms (e.g. /custom-baseball-uniforms)
 * - Product path: /custom-<sport>-uniforms/custom-<sport>-<item-slug>
 *   (e.g. /custom-baseball-uniforms/custom-baseball-cage-batting-jackets-01)
 */

export const SPORT_CATEGORY_MAP = {
  baseball: { parentSlug: 'custom-baseball-uniforms', sportName: 'Baseball' },
  basketball: { parentSlug: 'custom-basketball-uniforms', sportName: 'Basketball' },
  football: { parentSlug: 'custom-football-uniforms', sportName: 'Football' },
  soccer: { parentSlug: 'custom-soccer-uniforms', sportName: 'Soccer' },
  softball: { parentSlug: 'custom-softball-uniforms', sportName: 'Softball' },
  volleyball: { parentSlug: 'custom-volleyball-uniforms', sportName: 'Volleyball' },
  wrestling: { parentSlug: 'custom-wrestling-singlets', sportName: 'Wrestling' },
  lacrosse: { parentSlug: 'custom-lacrosse-uniforms', sportName: 'Lacrosse' },
  'ice-hockey': { parentSlug: 'custom-ice-hockey-uniforms', sportName: 'Ice Hockey' },
  cricket: { parentSlug: 'custom-cricket-uniforms', sportName: 'Cricket' },
  rugby: { parentSlug: 'custom-rugby-uniforms', sportName: 'Rugby' },
  gym: { parentSlug: 'custom-gym-fitness-wear', sportName: 'Gym & Fitness' },
  running: { parentSlug: 'custom-running-apparel', sportName: 'Running' },
  tennis: { parentSlug: 'custom-tennis-apparel', sportName: 'Tennis' },
  streetwear: { parentSlug: 'custom-streetwear-apparel', sportName: 'Streetwear' },
  caps: { parentSlug: 'custom-sports-caps-headwear', sportName: 'Caps & Headwear' },
  bags: { parentSlug: 'custom-sports-gear-bags', sportName: 'Sports Bags' },
  gloves: { parentSlug: 'custom-sports-gloves', sportName: 'Gloves' },
};

// Reverse map: parentSlug -> short sport slug (e.g. 'custom-baseball-uniforms' -> 'baseball')
export const PARENT_TO_SPORT_MAP = Object.entries(SPORT_CATEGORY_MAP).reduce((acc, [sport, conf]) => {
  acc[conf.parentSlug] = sport;
  return acc;
}, {});

export function slugify(str) {
  if (!str) return '';
  return String(str)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

/**
 * Build keyword-rich product slug (similar to Hamco Sports)
 * e.g. "Wind-Resistant Baseball Cage Batting Jacket #01" -> "custom-baseball-cage-batting-jacket-01"
 */
export function buildProductSlug(name, id, sport = '') {
  const rawId = id ? slugify(id) : '';
  const rawName = name ? slugify(name) : '';
  const sportSlug = slugify(sport);

  let clean = rawName || rawId;
  
  // Strip redundant leading "pro-", "custom-" if repeating
  clean = clean.replace(/^(custom|pro)-/, '');

  if (sportSlug && !clean.includes(sportSlug)) {
    clean = `${sportSlug}-${clean}`;
  }

  if (!clean.startsWith('custom-')) {
    clean = `custom-${clean}`;
  }

  return clean;
}

/**
 * Generate full SEO URL for a product
 * Returns e.g. "/custom-baseball-uniforms/custom-baseball-cage-batting-jacket-01"
 */
export function getProductUrl(product, categorySlug = '') {
  if (!product) return '/custom';
  const sportKey = (categorySlug || product.categorySlug || product.sport || '').toLowerCase();
  const parentSlug = SPORT_CATEGORY_MAP[sportKey]?.parentSlug || (sportKey ? `custom-${sportKey}-uniforms` : 'custom-sports-uniforms');
  
  const productSlug = buildProductSlug(product.name, product.id, SPORT_CATEGORY_MAP[sportKey]?.sportName || sportKey);
  return `/${parentSlug}/${productSlug}`;
}

/**
 * Generate SEO URL for a category
 * Returns e.g. "/custom-baseball-uniforms"
 */
export function getCategoryUrl(sportSlug) {
  if (!sportSlug) return '/custom';
  const key = sportSlug.toLowerCase();
  return `/${SPORT_CATEGORY_MAP[key]?.parentSlug || `custom-${key}-uniforms`}`;
}
