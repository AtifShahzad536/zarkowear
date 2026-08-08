import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.join(__dirname, 'dist');
const INDEX_HTML_PATH = path.join(DIST_DIR, 'index.html');

// Define metadata for each route
const routesMeta = {
  '/about': {
    title: 'About Zarko Sportswear | Premium USA Custom Uniforms',
    description: 'Learn how Zarko Sportswear manufactures and ships premium custom team jerseys, wrestling singlets, and athletic apparel across the USA.',
    canonical: 'https://www.zarkosportswear.com/about'
  },
  '/contact': {
    title: 'Contact Zarko Sportswear | Request Free Uniform Quote',
    description: 'Get in touch with our team for custom sports uniforms pricing, fabrics, and design queries. Quick response & fast USA shipping.',
    canonical: 'https://www.zarkosportswear.com/contact'
  },
  '/custom': {
    title: 'Start Custom Uniform Order | Zarko Sportswear',
    description: 'Ready to order custom sports uniforms? Submit your design requirements, sports, and team sizes. Get a free quote today!',
    canonical: 'https://www.zarkosportswear.com/custom'
  },
  '/builder': {
    title: '3D Custom Sports Uniform Builder | Zarko Sportswear',
    description: 'Design your own custom sports jerseys, wrestling singlets, and teamwear online in real-time. Free 3D customization tool.',
    canonical: 'https://www.zarkosportswear.com/builder'
  },
  '/builder/models': {
    title: 'Custom Sports Jerseys USA | 3D Templates',
    description: 'Select and customize premium uniform templates online. Personalize your teamwear in real-time with fast USA shipping.',
    canonical: 'https://www.zarkosportswear.com/builder/models'
  },
  '/blogs': {
    title: 'Blogs & Stories | Zarko Sportswear',
    description: 'Read our latest articles about sports uniforms design tips, sublimation technology, and custom sportswear manufacturing.',
    canonical: 'https://www.zarkosportswear.com/blogs'
  },
  // Sports category pages
  '/football': {
    title: 'Custom Football Kits & Soccer Jerseys | Zarko Sportswear',
    description: 'Premium custom sublimation football kits and soccer uniforms. Choose your colors, add team logos, and design your jerseys.',
    canonical: 'https://www.zarkosportswear.com/football'
  },
  '/baseball': {
    title: 'Custom Baseball Jerseys & Uniforms | Zarko Sportswear',
    description: 'Premium custom sublimation baseball kits and jerseys. Choose colors, add team logos, and design your baseball uniforms.',
    canonical: 'https://www.zarkosportswear.com/baseball'
  },
  '/wrestling': {
    title: 'Custom Wrestling Singlets & Gear | Zarko Sportswear',
    description: 'Premium custom wrestling singlets and training gear. Tailored fit, high-durability spandex fabrics, and complete team customization.',
    canonical: 'https://www.zarkosportswear.com/wrestling'
  },
  '/cricket': {
    title: 'Custom Cricket Uniforms & Kits | Zarko Sportswear',
    description: 'Premium custom sublimation cricket kits and team jerseys. Lightweight, breathable, and designed for maximum comfort on the field.',
    canonical: 'https://www.zarkosportswear.com/cricket'
  },
  '/basketball': {
    title: 'Custom Basketball Jerseys & Uniforms | Zarko Sportswear',
    description: 'Premium custom sublimation basketball uniforms and jerseys. High-performance mesh fabrics and custom numbers/names.',
    canonical: 'https://www.zarkosportswear.com/basketball'
  },
  '/hockey': {
    title: 'Custom Hockey Jerseys & Uniforms | Zarko Sportswear',
    description: 'Premium custom sublimation hockey uniforms. High-durability stitching and customized player names/numbers.',
    canonical: 'https://www.zarkosportswear.com/hockey'
  },
  '/rugby': {
    title: 'Custom Rugby Kits & Jerseys | Zarko Sportswear',
    description: 'Premium custom sublimation rugby kits and team wear. Toughened fabrics built for high impact play.',
    canonical: 'https://www.zarkosportswear.com/rugby'
  },
  '/tennis': {
    title: 'Custom Tennis Apparel & Wear | Zarko Sportswear',
    description: 'Premium custom sublimation tennis shirts, skirts, and activewear for players and teams.',
    canonical: 'https://www.zarkosportswear.com/tennis'
  },
  '/running': {
    title: 'Custom Running Gear & Activewear | Zarko Sportswear',
    description: 'Premium custom sublimation running apparel, singlets, shorts, and activewear for track events.',
    canonical: 'https://www.zarkosportswear.com/running'
  },
  '/gym': {
    title: 'Custom Gym & Training Activewear | Zarko Sportswear',
    description: 'Premium custom sublimation training shirts, hoodies, joggers, and activewear for fitness teams.',
    canonical: 'https://www.zarkosportswear.com/gym'
  },
  '/softball': {
    title: 'Custom Softball Uniforms & Jerseys | Zarko Sportswear',
    description: 'Premium custom sublimation softball kits and jerseys. Custom team name and numbers.',
    canonical: 'https://www.zarkosportswear.com/softball'
  },
  '/soccer': {
    title: 'Custom Soccer Jerseys & Uniforms | Zarko Sportswear',
    description: 'Premium custom sublimation soccer jerseys and uniforms. Tailored team packages with fast USA shipping.',
    canonical: 'https://www.zarkosportswear.com/soccer'
  },
  '/volleyball': {
    title: 'Custom Volleyball Jerseys & Uniforms | Zarko Sportswear',
    description: 'Premium custom sublimation volleyball uniforms and jerseys. Form-fitting activewear for teams.',
    canonical: 'https://www.zarkosportswear.com/volleyball'
  },
  '/ice-hockey': {
    title: 'Custom Ice Hockey Jerseys | Zarko Sportswear',
    description: 'Premium custom sublimation ice hockey jerseys and team uniforms. Heavyweight mesh fabric options.',
    canonical: 'https://www.zarkosportswear.com/ice-hockey'
  },
  // Accessories
  '/shoes': {
    title: 'Custom Sports Shoes & Turf Footwear | Zarko Sportswear',
    description: 'Premium custom athletic turf shoes and sports sneakers. Built for maximum grip, agility, and comfort.',
    canonical: 'https://www.zarkosportswear.com/shoes'
  },
  '/gloves': {
    title: 'Custom Sports Gloves & Goalkeeper Gear | Zarko Sportswear',
    description: 'Premium custom goalkeeper gloves, batting gloves, and sports hand protectors.',
    canonical: 'https://www.zarkosportswear.com/gloves'
  },
  '/caps': {
    title: 'Custom Team Caps & Headwear | Zarko Sportswear',
    description: 'Premium custom embroidered team caps, beanies, and sports headbands.',
    canonical: 'https://www.zarkosportswear.com/caps'
  },
  '/bags': {
    title: 'Custom Sports Bags & Team Duffles | Zarko Sportswear',
    description: 'Premium custom sublimation team equipment bags, duffles, and athletic backpacks.',
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

    // Build replacement tags
    const titleTag = `<title>${meta.title}</title>`;
    const descriptionTag = `<meta name="description" content="${meta.description}">`;
    const canonicalTag = `<link rel="canonical" href="${meta.canonical}" />`;
    const alternateLangs = `
  <link rel="alternate" hreflang="en-US" href="${meta.canonical}" />
  <link rel="alternate" hreflang="x-default" href="${meta.canonical}" />`;

    // Inject tags into index.html
    let html = baseHtml;

    // 1. Replace title tag
    const titleRegex = /<title>[^]*?<\/title>/i;
    if (titleRegex.test(html)) {
      html = html.replace(titleRegex, titleTag);
    } else {
      html = html.replace('</head>', `  ${titleTag}\n</head>`);
    }

    // 2. Replace or insert description tag
    const descRegex = /<meta\s+name="description"\s+content="[^]*?"\s*\/?>/i;
    if (descRegex.test(html)) {
      html = html.replace(descRegex, descriptionTag);
    } else {
      html = html.replace('</head>', `  ${descriptionTag}\n</head>`);
    }

    // 3. Inject canonical and alternates in place of our comments or at head end
    const canonicalComment = '<!-- ✅ Canonical & Alternate URLs -->';
    if (html.includes(canonicalComment)) {
      html = html.replace(canonicalComment, `${canonicalComment}\n  ${canonicalTag}${alternateLangs}`);
    } else {
      html = html.replace('</head>', `  ${canonicalTag}${alternateLangs}\n</head>`);
    }

    // Write file to route directory
    const outputFilePath = path.join(routeDir, 'index.html');
    fs.writeFileSync(outputFilePath, html, 'utf-8');
    console.log(`Successfully pre-rendered: ${route} -> ${outputFilePath}`);
  });

  console.log('Pre-rendering finished successfully!');
}

runPrerender();
