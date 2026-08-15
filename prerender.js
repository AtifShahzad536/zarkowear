import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.join(__dirname, 'dist');
const INDEX_HTML_PATH = path.join(DIST_DIR, 'index.html');

// Helper to escape HTML attributes
function escapeAttr(str) {
  return str.replace(/"/g, '&quot;');
}

// Define metadata for each route (Optimized for USA Target Market & 130-160 char meta descriptions)
const routesMeta = {
  '/about': {
    title: 'About Zarko Sportswear | USA Custom Sports Uniform Manufacturer',
    description: 'Learn how Zarko Sportswear manufactures high-performance custom team jerseys, wrestling singlets, and athletic uniforms with direct factory USA shipping.',
    canonical: 'https://www.zarkosportswear.com/about'
  },
  '/contact': {
    title: 'Contact Zarko Sportswear | Request Free Uniform Quote USA',
    description: 'Get in touch with Zarko Sportswear for factory-direct custom sports uniform quotes, fabric swatches, and team sizing assistance. Fast response & USA shipping.',
    canonical: 'https://www.zarkosportswear.com/contact'
  },
  '/custom': {
    title: 'Start Custom Uniform Order | Factory Direct Teamwear USA',
    description: 'Order factory-direct custom sports uniforms and team apparel. Submit your roster, colors, and design specs to get an instant quote and fast USA delivery.',
    canonical: 'https://www.zarkosportswear.com/custom'
  },
  '/builder': {
    title: '3D Custom Sports Uniform Builder | Design Online USA',
    description: 'Design custom sports jerseys, team uniforms, and wrestling singlets online in real-time with our 3D builder tool. Instant customization and fast USA shipping.',
    canonical: 'https://www.zarkosportswear.com/builder'
  },
  '/builder/models': {
    title: '3D Custom Jersey Templates & Models | Zarko Sportswear USA',
    description: 'Explore our 3D custom sports uniform templates. Customize sublimation jerseys, singlets, and teamwear online with real-time 3D previews and fast USA delivery.',
    canonical: 'https://www.zarkosportswear.com/builder/models'
  },
  '/blogs': {
    title: 'Custom Sportswear Blog & Uniform Guides | Zarko Sportswear',
    description: 'Read expert sportswear manufacturing guides, sublimation jersey design tips, fabric comparisons, and team uniform care tutorials from Zarko Sportswear USA.',
    canonical: 'https://www.zarkosportswear.com/blogs'
  },
  '/privacy-policy': {
    title: 'Privacy Policy | Zarko Sportswear USA',
    description: 'Read the Privacy Policy of Zarko Sportswear to understand how we collect, protect, and handle your team order specifications and personal contact information.',
    canonical: 'https://www.zarkosportswear.com/privacy-policy'
  },
  '/terms': {
    title: 'Terms of Service | Zarko Sportswear USA',
    description: 'Review the Terms of Service for Zarko Sportswear custom sports uniforms manufacturing orders, turnaround times, payments, mockups, and USA delivery policies.',
    canonical: 'https://www.zarkosportswear.com/terms'
  },
  // Sports category pages
  '/football': {
    title: 'Custom Football Uniforms & Jerseys USA | Zarko Sportswear',
    description: 'Design premium custom sublimation football uniforms and team jerseys. Factory-direct durable fabrics, custom numbers, team logos, and fast USA delivery.',
    canonical: 'https://www.zarkosportswear.com/football'
  },
  '/baseball': {
    title: 'Custom Baseball Jerseys & Uniforms USA | Zarko Sportswear',
    description: 'Order premium custom sublimation baseball jerseys and team uniforms. Breathable moisture-wicking fabrics, custom tackle twill, and fast USA delivery.',
    canonical: 'https://www.zarkosportswear.com/baseball'
  },
  '/wrestling': {
    title: 'Custom Wrestling Singlets & Gear USA | Zarko Sportswear',
    description: 'High-durability custom wrestling singlets, fight shorts, and team gear. Premium 4-way stretch compression spandex engineered for top performance in the USA.',
    canonical: 'https://www.zarkosportswear.com/wrestling'
  },
  '/cricket': {
    title: 'Custom Cricket Uniforms & Team Kits USA | Zarko Sportswear',
    description: 'Premium custom sublimation cricket uniforms, test whites, and T20 kits. Ultra-breathable, lightweight mesh fabrics with fast factory shipping across the USA.',
    canonical: 'https://www.zarkosportswear.com/cricket'
  },
  '/basketball': {
    title: 'Custom Basketball Jerseys & Uniforms USA | Zarko Sportswear',
    description: 'Shop high-performance custom basketball jerseys and reversible uniforms. Premium moisture-wicking mesh fabrics, vibrant sublimation, and fast USA delivery.',
    canonical: 'https://www.zarkosportswear.com/basketball'
  },
  '/hockey': {
    title: 'Custom Field Hockey Uniforms & Jerseys USA | Zarko Sportswear',
    description: 'Design durable custom field hockey uniforms and team jerseys. Reinforced pro stitching, breathable athletic fabrics, and fast factory shipping to USA clubs.',
    canonical: 'https://www.zarkosportswear.com/hockey'
  },
  '/rugby': {
    title: 'Custom Rugby Jerseys & Team Kits USA | Zarko Sportswear',
    description: 'Engineered tough custom rugby jerseys, shorts, and team kits. Heavy-duty tear-resistant stretch fabrics designed for high-impact play with fast USA shipping.',
    canonical: 'https://www.zarkosportswear.com/rugby'
  },
  '/tennis': {
    title: 'Custom Tennis Apparel & Team Uniforms USA | Zarko Sportswear',
    description: 'Premium custom tennis shirts, polos, skirts, and athletic apparel for clubs and schools. Lightweight, UV-protective fabrics with fast USA turnaround.',
    canonical: 'https://www.zarkosportswear.com/tennis'
  },
  '/running': {
    title: 'Custom Running Gear & Track Uniforms USA | Zarko Sportswear',
    description: 'High-performance custom running singlets, track uniforms, and athletic shorts. Ultra-lightweight moisture-management fabrics with fast shipping across the USA.',
    canonical: 'https://www.zarkosportswear.com/running'
  },
  '/gym': {
    title: 'Custom Gym Wear & Fitness Activewear USA | Zarko Sportswear',
    description: 'Factory-direct custom gym wear, workout hoodies, compression shirts, and joggers. Premium stretch fabrics tailored for fitness brands and gyms across the USA.',
    canonical: 'https://www.zarkosportswear.com/gym'
  },
  '/softball': {
    title: 'Custom Softball Jerseys & Uniforms USA | Zarko Sportswear',
    description: 'Design custom softball jerseys, pants, and team uniforms. Sublimation printing, moisture-wicking stretch fabric, custom team rosters, and fast USA delivery.',
    canonical: 'https://www.zarkosportswear.com/softball'
  },
  '/soccer': {
    title: 'Custom Soccer Jerseys & Uniforms USA | Zarko Sportswear',
    description: 'Design premium custom soccer jerseys, goalie kits, and team uniforms. Full sublimation printing, breathable mesh, and fast shipping to USA soccer clubs.',
    canonical: 'https://www.zarkosportswear.com/soccer'
  },
  '/volleyball': {
    title: 'Custom Volleyball Jerseys & Uniforms USA | Zarko Sportswear',
    description: 'Premium custom volleyball jerseys, spandex shorts, and warmups. Ergonomic form-fitting cuts, vibrant sublimation graphics, and fast turnaround across the USA.',
    canonical: 'https://www.zarkosportswear.com/volleyball'
  },
  '/ice-hockey': {
    title: 'Custom Ice Hockey Jerseys & Uniforms USA | Zarko Sportswear',
    description: 'Heavyweight custom ice hockey jerseys and team uniforms. Pro-grade air knit mesh fabrics, fight straps, reinforced elbows, and fast delivery to USA teams.',
    canonical: 'https://www.zarkosportswear.com/ice-hockey'
  },
  // Accessories
  '/shoes': {
    title: 'Custom Sports Shoes & Athletic Turf Footwear USA | Zarko',
    description: 'High-performance custom athletic turf shoes, team cleats, and training sneakers. Engineered for superior grip, agility, and comfort with fast USA delivery.',
    canonical: 'https://www.zarkosportswear.com/shoes'
  },
  '/gloves': {
    title: 'Custom Sports Gloves & Goalkeeper Gear USA | Zarko Sportswear',
    description: 'Professional custom sports gloves, soccer goalkeeper gloves, and batting hand protectors. All-weather grip latex, custom logo printing, and fast USA shipping.',
    canonical: 'https://www.zarkosportswear.com/gloves'
  },
  '/caps': {
    title: 'Custom Team Caps & Sports Headwear USA | Zarko Sportswear',
    description: 'Order custom embroidered team caps, snapbacks, performance beanies, and athletic visors. Premium fabrics, 3D embroidery, and fast shipping across the USA.',
    canonical: 'https://www.zarkosportswear.com/caps'
  },
  '/bags': {
    title: 'Custom Sports Bags & Team Duffels USA | Zarko Sportswear',
    description: 'Durable custom team sports bags, equipment duffels, and gear backpacks. Heavy-duty water-resistant fabrics, custom embroidery, and fast USA fulfillment.',
    canonical: 'https://www.zarkosportswear.com/bags'
  }
};

function runPrerender() {
  if (!fs.existsSync(INDEX_HTML_PATH)) {
    console.error(`Error: index.html not found at ${INDEX_HTML_PATH}`);
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(INDEX_HTML_PATH, 'utf-8');
  console.log(`Starting pre-rendering for ${Object.keys(routesMeta).length} routes...`);

  Object.entries(routesMeta).forEach(([route, meta]) => {
    // Create directory for route (e.g. dist/about)
    const routeDir = path.join(DIST_DIR, route);
    fs.mkdirSync(routeDir, { recursive: true });

    let html = baseHtml;

    // 1. Replace title tag
    const titleTag = `<title>${meta.title}</title>`;
    const titleRegex = /<title>[^]*?<\/title>/i;
    if (titleRegex.test(html)) {
      html = html.replace(titleRegex, titleTag);
    } else {
      html = html.replace('</head>', `  ${titleTag}\n</head>`);
    }

    // 2. Replace description tag
    const descRegex = /<meta\s+name="description"\s+content="[^]*?"\s*\/?>/i;
    const descTag = `<meta name="description"\n    content="${escapeAttr(meta.description)}" />`;
    if (descRegex.test(html)) {
      html = html.replace(descRegex, descTag);
    } else {
      html = html.replace('</head>', `  ${descTag}\n</head>`);
    }

    // 3. Replace Canonical and alternate hreflangs
    const canonicalTag = `<link rel="canonical" href="${meta.canonical}" />`;
    const canonicalRegex = /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i;
    if (canonicalRegex.test(html)) {
      html = html.replace(canonicalRegex, canonicalTag);
    } else {
      html = html.replace('<!-- ✅ Canonical & Alternate URLs -->', `<!-- ✅ Canonical & Alternate URLs -->\n  ${canonicalTag}`);
    }

    const hreflangUsRegex = /<link\s+rel="alternate"\s+hreflang="en-US"\s+href="[^"]*"\s*\/?>/i;
    if (hreflangUsRegex.test(html)) {
      html = html.replace(hreflangUsRegex, `<link rel="alternate" hreflang="en-US" href="${meta.canonical}" />`);
    }

    const hreflangDefaultRegex = /<link\s+rel="alternate"\s+hreflang="x-default"\s+href="[^"]*"\s*\/?>/i;
    if (hreflangDefaultRegex.test(html)) {
      html = html.replace(hreflangDefaultRegex, `<link rel="alternate" hreflang="x-default" href="${meta.canonical}" />`);
    }

    // 4. Replace Open Graph Tags (URL, Title, Description)
    const ogUrlRegex = /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i;
    if (ogUrlRegex.test(html)) {
      html = html.replace(ogUrlRegex, `<meta property="og:url" content="${meta.canonical}" />`);
    }

    const ogTitleRegex = /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i;
    if (ogTitleRegex.test(html)) {
      html = html.replace(ogTitleRegex, `<meta property="og:title" content="${escapeAttr(meta.title)}" />`);
    }

    const ogDescRegex = /<meta\s+property="og:description"\s+content="[^]*?"\s*\/?>/i;
    if (ogDescRegex.test(html)) {
      html = html.replace(ogDescRegex, `<meta property="og:description"\n    content="${escapeAttr(meta.description)}" />`);
    }

    // 5. Replace Twitter Card Tags (URL, Title, Description)
    const twitterUrlRegex = /<meta\s+name="twitter:url"\s+content="[^"]*"\s*\/?>/i;
    if (twitterUrlRegex.test(html)) {
      html = html.replace(twitterUrlRegex, `<meta name="twitter:url" content="${meta.canonical}" />`);
    }

    const twitterTitleRegex = /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i;
    if (twitterTitleRegex.test(html)) {
      html = html.replace(twitterTitleRegex, `<meta name="twitter:title" content="${escapeAttr(meta.title)}" />`);
    }

    const twitterDescRegex = /<meta\s+name="twitter:description"\s+content="[^]*?"\s*\/?>/i;
    if (twitterDescRegex.test(html)) {
      html = html.replace(twitterDescRegex, `<meta name="twitter:description"\n    content="${escapeAttr(meta.description)}" />`);
    }

    // Write file to route directory
    const outputFilePath = path.join(routeDir, 'index.html');
    fs.writeFileSync(outputFilePath, html, 'utf-8');
    console.log(`Successfully pre-rendered: ${route} -> ${outputFilePath}`);
  });

  console.log('Pre-rendering finished successfully!');
}

runPrerender();
