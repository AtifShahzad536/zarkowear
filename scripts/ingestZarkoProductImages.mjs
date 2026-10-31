import dns from 'dns';
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (_) {}

import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

const req = createRequire('C:/Users/ABC/Downloads/dashbaord/eaySports/wear-backend/package.json');
const cloudinary = req('cloudinary').v2;
const mongoose = req('mongoose');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dwo0pt9cq',
  api_key: process.env.CLOUDINARY_API_KEY || '529999639723975',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'l6LjXMLNH-qnpH8w-g_2QUpQkr4'
});

const SOURCE_BASE = 'C:\\Users\\ABC\\Downloads\\dashbaord\\eaySports\\zarko\\product\\ZARKO-Product-Images';
const BACKEND_BASE = 'C:\\Users\\ABC\\Downloads\\dashbaord\\eaySports\\wear-backend';
const BACKEND_JSON = path.join(BACKEND_BASE, 'products.json');
const BACKEND_DATA_JS = path.join(BACKEND_BASE, 'src', 'models', 'data.js');
const FRONTEND_JSON = 'C:\\Users\\ABC\\Downloads\\dashbaord\\eaySports\\zarko\\zarkowear\\src\\data\\products.json';
const CACHE_FILE = path.join(BACKEND_BASE, 'cloudinary_cache.json');

const COLOR_MAP = {
  black: 'Black',
  blue: 'Royal Blue',
  green: 'Forest Green',
  navy: 'Navy Blue',
  red: 'Scarlet Red',
  white: 'Optical White',
  grey: 'Steel Grey',
  'white-black': 'White & Black',
  'white-green': 'White & Green'
};

const FOLDER_CONFIGS = [
  // 1. American Football
  {
    folder: 'American Football\\Compression Padded Girdles',
    categorySlug: 'football',
    categoryName: 'American Football Uniforms & Gear',
    subSlug: 'padded-girdles',
    subName: 'Compression Padded Girdles',
    title: 'Pro Compression 5-Pad Football Girdle',
    desc: 'Export-grade 4-way stretch moisture-wicking compression football girdle with integrated EVA high-impact hip, tailbone, and thigh protection pads.'
  },
  {
    folder: 'American Football\\Elite Game Jerseys',
    categorySlug: 'football',
    categoryName: 'American Football Uniforms & Gear',
    subSlug: 'elite-jerseys',
    subName: 'Elite Game Jerseys',
    title: 'Elite Pro Sublimated Football Jersey',
    desc: '260 GSM heavy-duty dazzle and pro-interlock football game jersey with double-ply cowl shoulders, pad-compatible athletic cut, and NFHS regulation compliance.'
  },
  {
    folder: 'American Football\\Integrated 7-Pad Pants',
    categorySlug: 'football',
    categoryName: 'American Football Uniforms & Gear',
    subSlug: '7-pad-pants',
    subName: 'Integrated 7-Pad Pants',
    title: 'Integrated 7-Pad Football Game Pants',
    desc: 'Durable stretch-matte polyester football pants with factory sewn-in EVA pads (hips, spine, thighs, knees) and tunnel waistband with lace-up fly.'
  },
  {
    folder: 'American Football\\Porthole Mesh Practice Jerseys',
    categorySlug: 'football',
    categoryName: 'American Football Uniforms & Gear',
    subSlug: 'practice-jerseys',
    subName: 'Porthole Mesh Practice Jerseys',
    title: 'Heavy Porthole Mesh Football Practice Jersey',
    desc: 'Breathable heavyweight open-hole porthole mesh practice jersey with elasticized sleeves and ribbed V-neck collar for maximum pad ventilation.'
  },
  {
    folder: 'American Football\\Slotted Game Pants',
    categorySlug: 'football',
    categoryName: 'American Football Uniforms & Gear',
    subSlug: 'slotted-pants',
    subName: 'Slotted Game Pants',
    title: 'Heavyweight Slotted Football Game Pants',
    desc: 'Premium 280 GSM warp-knit heavyweight spandex football pants featuring slotted waistband for pad insert customization and bar-tacked stress seams.'
  },
  {
    folder: 'American Football\\Youth Tackle Football Kits',
    categorySlug: 'football',
    categoryName: 'American Football Uniforms & Gear',
    subSlug: 'youth-kits',
    subName: 'Youth Tackle Football Kits',
    title: 'Custom Youth Tackle Football Uniform Set',
    desc: 'Complete youth tackle football kit including sublimated game jersey and reinforced game pants with pad pockets. Engineered for young athletes.'
  },

  // 2. Baseball
  {
    folder: 'Baseball\\Cage Batting Jackets',
    categorySlug: 'baseball',
    categoryName: 'Baseball Uniforms & Gear',
    subSlug: 'cage-jackets',
    subName: 'Cage Batting Jackets',
    title: 'Pro Cage Batting Quarter-Zip Jacket',
    desc: 'Wind and light-rain resistant micro-poly short-sleeve batting cage jacket with breathable stretch mesh side inserts and ergonomic quarter-zip front.'
  },
  {
    folder: 'Baseball\\Crew Neck Jerseys',
    categorySlug: 'baseball',
    categoryName: 'Baseball Uniforms & Gear',
    subSlug: 'crew-neck-jerseys',
    subName: 'Crew Neck Jerseys',
    title: 'Sublimated Crew Neck Baseball Jersey',
    desc: 'Dri-FIT performance 200 GSM poly-interlock crewneck baseball jersey with 4K all-over sublimation, athletic cut, and reinforced double-needle seams.'
  },
  {
    folder: 'Baseball\\Full Button Jerseys',
    categorySlug: 'baseball',
    categoryName: 'Baseball Uniforms & Gear',
    subSlug: 'full-button-jerseys',
    subName: 'Full Button Jerseys',
    title: 'Classic Full-Button Pro Baseball Jersey',
    desc: '250 GSM heavy-duty double-knit polyester full-button baseball jersey with braided piping, tackle-twill numbering options, and drop-tail hem.'
  },
  {
    folder: 'Baseball\\Piped Game Pants',
    categorySlug: 'baseball',
    categoryName: 'Baseball Uniforms & Gear',
    subSlug: 'piped-pants',
    subName: 'Piped Game Pants',
    title: 'Pro Piped Baseball Game Pants',
    desc: 'Heavyweight 14 oz double-knit polyester baseball game pants with contrast side seam piping, double-knee reinforcement, and brass zipper fly.'
  },
  {
    folder: 'Baseball\\Pro Team Socks',
    categorySlug: 'baseball',
    categoryName: 'Baseball Uniforms & Gear',
    subSlug: 'socks',
    subName: 'Pro Team Socks',
    title: 'Cushioned Pro Baseball Stirrup Socks',
    desc: 'High-performance moisture-wicking ribbed athletic baseball socks with arch compression support and reinforced heel and toe cushioning.'
  },

  // 3. Basketball
  {
    folder: 'Basketball\\Pro Wide-Armhole Tops',
    categorySlug: 'basketball',
    categoryName: 'Basketball Kits & Apparel',
    subSlug: 'wide-armhole-tops',
    subName: 'Pro Wide-Armhole Tops',
    title: 'Pro Wide-Armhole Basketball Jersey',
    desc: 'Lightweight 170 GSM micro-mesh basketball jersey with wide-cut armholes for full shooting freedom and laser-cut heat dispersal ventilation.'
  },
  {
    folder: 'Basketball\\Shooting Warm-up Shirts',
    categorySlug: 'basketball',
    categoryName: 'Basketball Kits & Apparel',
    subSlug: 'shooting-shirts',
    subName: 'Shooting Warm-up Shirts',
    title: 'Pre-Game Basketball Shooting Warm-Up Shirt',
    desc: 'Comfortable stretch dry-fit short-sleeve pre-game shooting shirt with moisture-wicking silky poly interlock and high-definition sublimation print.'
  },
  {
    folder: 'Basketball\\Snap-Down Warm-Up Suits',
    categorySlug: 'basketball',
    categoryName: 'Basketball Kits & Apparel',
    subSlug: 'warm-up-suits',
    subName: 'Snap-Down Warm-Up Suits',
    title: 'Tearaway Snap-Down Basketball Warm-Up Suit',
    desc: 'Full-breakaway snap-button basketball warm-up pants and jacket set with heavy brass snaps, elastic waistband, and brushed tricot interior.'
  },
  {
    folder: 'Basketball\\Team Game Shorts',
    categorySlug: 'basketball',
    categoryName: 'Basketball Kits & Apparel',
    subSlug: 'game-shorts',
    subName: 'Team Game Shorts',
    title: 'Championship Team Basketball Game Shorts',
    desc: '9-inch inseam basketball shorts engineered with breathable dazzle side panels, elasticized waistband with interior drawstring, and deep pockets.'
  },
  {
    folder: 'Basketball\\Youth Basketball Kits',
    categorySlug: 'basketball',
    categoryName: 'Basketball Kits & Apparel',
    subSlug: 'youth-kits',
    subName: 'Youth Basketball Kits',
    title: 'Youth Championship Basketball Uniform Set',
    desc: 'Matching sublimated basketball jersey and shorts set sized for youth leagues, with ultra-soft non-chafing poly mesh and elastic drawstring waist.'
  },

  // 4. Cricket & Rugby
  {
    folder: 'Cricket & Rugby\\Cricket Match White Pants',
    categorySlug: 'cricket',
    categoryName: 'Cricket Kits & Apparel',
    subSlug: 'match-pants',
    subName: 'Match Pants',
    title: 'Test Match Pro Cricket White Pants',
    desc: 'Traditional off-white cricket pants made with 220 GSM stretch micro-poly, reinforced knees, deep pockets, and elastic waist with drawcord.'
  },
  {
    folder: 'Cricket & Rugby\\Test Match Dry-Fit Shirts',
    categorySlug: 'cricket',
    categoryName: 'Cricket Kits & Apparel',
    subSlug: 'test-shirts',
    subName: 'Test Shirts',
    title: 'Test Match Classic Polo Cricket Shirt',
    desc: 'UV-shielded dry-fit cricket polo shirt with knit collar, concealed placket, mesh underarm gussets, and moisture-transfer interlock.'
  },
  {
    folder: 'Cricket & Rugby\\T20 Sublimated Color Jerseys',
    categorySlug: 'cricket',
    categoryName: 'Cricket Kits & Apparel',
    subSlug: 't20-jerseys',
    subName: 'T20 Jerseys',
    title: 'Custom T20 Sublimated Cricket Jersey',
    desc: 'Vibrant full-bleed 4K sublimated T20 cricket jersey with mandarin or polo collar, breathable pinhole side panels, and anti-snag tech fabric.'
  },
  {
    folder: 'Cricket & Rugby\\Rugby Heavy-Duty Shorts',
    categorySlug: 'rugby',
    categoryName: 'Rugby Uniforms & Gear',
    subSlug: 'rugby-shorts',
    subName: 'Rugby Shorts',
    title: 'Heavy-Duty Ripstop Rugby Match Shorts',
    desc: 'Rugged 240 GSM twill rugby shorts with spandex crotch gusset for scrums and tackles, rubberized gripper waistband, and reinforced pocketless design.'
  },
  {
    folder: 'Cricket & Rugby\\Rugby Sublimated Heavy Shirts',
    categorySlug: 'rugby',
    categoryName: 'Rugby Uniforms & Gear',
    subSlug: 'heavy-jerseys',
    subName: 'Heavy Jerseys',
    title: 'Elite Sublimated Heavyweight Rugby Jersey',
    desc: 'Tear-resistant 280 GSM heavy elastane-polyester rugby jersey with reinforced collar loop, bar-tacked seams, and 4-way stretch body-mapping.'
  },

  // 5. Ice Hockey
  {
    folder: 'Ice Hockey\\Heavy Pro-Knit Sweaters',
    categorySlug: 'ice-hockey',
    categoryName: 'Ice Hockey Uniforms & Gear',
    subSlug: 'heavy-sweaters',
    subName: 'Heavy Pro-Knit Sweaters',
    title: 'Heavyweight Pro-Knit Ice Hockey Sweater',
    desc: '260 GSM heavy pro air-knit polyester hockey sweater with double-reinforced shoulders and elbows, fight strap option, and lace-up neck.'
  },
  {
    folder: 'Ice Hockey\\Practice Mesh Jerseys',
    categorySlug: 'ice-hockey',
    categoryName: 'Ice Hockey Uniforms & Gear',
    subSlug: 'practice-jerseys',
    subName: 'Practice Mesh Jerseys',
    title: 'Open-Mesh Ice Hockey Practice Jersey',
    desc: 'Lightweight yet resilient open-hole poly mesh practice jersey with oversized goalie or player cut designed to fit over full pads.'
  },
  {
    folder: 'Ice Hockey\\Pro Team Player Socks',
    categorySlug: 'ice-hockey',
    categoryName: 'Ice Hockey Uniforms & Gear',
    subSlug: 'socks',
    subName: 'Pro Team Player Socks',
    title: 'Wave-Knit Ice Hockey Player Socks',
    desc: 'Pro-style ribbed hockey socks with Velcro tabs to secure under hockey shorts, elasticized ankles, and heavy snag-resistant acrylic-knit blend.'
  },

  // 6. Lacrosse
  {
    folder: 'Lacrosse\\Athletic Tank Tops',
    categorySlug: 'lacrosse',
    categoryName: 'Lacrosse Kits & Teamwear',
    subSlug: 'tank-tops',
    subName: 'Athletic Tank Tops',
    title: 'Custom Sublimated Athletic Lacrosse Tank',
    desc: 'Lightweight moisture-wicking racerback or standard athletic cut lacrosse tank top with wide armholes and pinhole mesh heat venting.'
  },
  {
    folder: 'Lacrosse\\Game Skorts',
    categorySlug: 'lacrosse',
    categoryName: 'Lacrosse Kits & Teamwear',
    subSlug: 'game-skorts',
    subName: 'Game Skorts',
    title: "Women's Fast-Motion Lacrosse Game Skort",
    desc: 'Performance 2-in-1 skort featuring lightweight woven outer skirt with built-in 4-way compression undershorts and ball pocket.'
  },
  {
    folder: 'Lacrosse\\Lacrosse Game Jerseys',
    categorySlug: 'lacrosse',
    categoryName: 'Lacrosse Kits & Teamwear',
    subSlug: 'game-jerseys',
    subName: 'Lacrosse Game Jerseys',
    title: 'Pro Sublimated Lacrosse Game Jersey',
    desc: 'Field-tested lacrosse jersey featuring open-hole mesh panels for pad ventilation, durable poly interlock body, and ergonomic athletic silhouette.'
  },
  {
    folder: 'Lacrosse\\Lacrosse Team Shorts',
    categorySlug: 'lacrosse',
    categoryName: 'Lacrosse Kits & Teamwear',
    subSlug: 'team-shorts',
    subName: 'Lacrosse Team Shorts',
    title: 'Athletic Team Lacrosse Game Shorts',
    desc: 'Comfortable stretch polyester lacrosse shorts with deep pockets, elastic drawstring waist, and motion-notch side splits for sprint agility.'
  },

  // 7. Soccer
  {
    folder: 'Soccer\\Club Training Tops & Bibs',
    categorySlug: 'soccer',
    categoryName: 'Soccer Kits & Uniforms',
    subSlug: 'training-tops',
    subName: 'Club Training Tops & Bibs',
    title: 'Club Soccer Training Top & Scrimmage Bib',
    desc: 'Lightweight breathable dry-fit soccer training top with high-visibility color accents, raglan sleeves, and anti-static poly fabric.'
  },
  {
    folder: 'Soccer\\Matchday Striker Jerseys',
    categorySlug: 'soccer',
    categoryName: 'Soccer Kits & Uniforms',
    subSlug: 'matchday-jerseys',
    subName: 'Matchday Striker Jerseys',
    title: 'Pro Matchday Striker Soccer Jersey',
    desc: '160 GSM aerated micro-interlock soccer jersey with ergonomic neck, underarm mesh ventilation, and sharp 4K sublimated club graphics.'
  },
  {
    folder: 'Soccer\\Padded Goalkeeper Kits',
    categorySlug: 'soccer',
    categoryName: 'Soccer Kits & Uniforms',
    subSlug: 'goalkeeper-kits',
    subName: 'Padded Goalkeeper Kits',
    title: 'Padded Pro Soccer Goalkeeper Uniform Set',
    desc: 'Specialized goalkeeper jersey and pants set featuring high-density foam padding on forearms, elbows, hips, and knees for slide protection.'
  },
  {
    folder: 'Soccer\\Performance Match Shorts',
    categorySlug: 'soccer',
    categoryName: 'Soccer Kits & Uniforms',
    subSlug: 'match-shorts',
    subName: 'Performance Match Shorts',
    title: 'Performance Matchday Soccer Shorts',
    desc: 'Lightweight moisture-wicking match soccer shorts with elasticated waistband, interior drawcord, side slits, and no restrictive pockets.'
  },
  {
    folder: 'Soccer\\Soccer Travel Tracksuits',
    categorySlug: 'soccer',
    categoryName: 'Soccer Kits & Uniforms',
    subSlug: 'travel-tracksuits',
    subName: 'Soccer Travel Tracksuits',
    title: 'Custom Soccer Team Travel Tracksuit Set',
    desc: 'Two-piece poly-tricot warm-up tracksuit with full-zip jacket, zippered hand pockets, and tapered training pants with ankle zippers.'
  },

  // 8. Softball
  {
    folder: 'Softball\\Crew Neck Jerseys',
    categorySlug: 'softball',
    categoryName: 'Softball Uniforms & Apparel',
    subSlug: 'crew-neck-jerseys',
    subName: 'Crew Neck Jerseys',
    title: 'Fastpitch Sublimated Crew Neck Jersey',
    desc: 'Lightweight 180 GSM moisture-wicking polyester crewneck fastpitch jersey with feminine athletic cut and vibrant full-bleed sublimation.'
  },
  {
    folder: 'Softball\\Fastpitch Caps & Visors',
    categorySlug: 'softball',
    categoryName: 'Softball Uniforms & Apparel',
    subSlug: 'caps-visors',
    subName: 'Fastpitch Caps & Visors',
    title: 'Pro Fastpitch Softball Visor & Cap',
    desc: 'Performance moisture-wicking structured visor with dark underbill for glare reduction and adjustable hook-and-loop closure.'
  },
  {
    folder: 'Softball\\Knickers Pants',
    categorySlug: 'softball',
    categoryName: 'Softball Uniforms & Apparel',
    subSlug: 'knickers-pants',
    subName: 'Knickers Pants',
    title: 'Low-Rise Knickers Fastpitch Softball Pants',
    desc: 'Durable 12 oz stretch polyester knicker-style softball pants with elastic cuffs below the knee, reinforced double knees, and belt loops.'
  },
  {
    folder: 'Softball\\Padded Sliding Shorts',
    categorySlug: 'softball',
    categoryName: 'Softball Uniforms & Apparel',
    subSlug: 'sliding-shorts',
    subName: 'Padded Sliding Shorts',
    title: 'Compression Padded Softball Sliding Shorts',
    desc: 'High-flex 4-way compression sliding shorts with low-profile quilted foam side thigh pads to prevent base-sliding abrasions.'
  },
  {
    folder: 'Softball\\Two Button Jerseys',
    categorySlug: 'softball',
    categoryName: 'Softball Uniforms & Apparel',
    subSlug: 'two-button-jerseys',
    subName: 'Two Button Jerseys',
    title: 'Classic Two-Button Fastpitch Game Jersey',
    desc: 'Traditional two-button Henley placket softball jersey crafted from durable breathable interlock with contrast raglan sleeves.'
  },

  // 9. Volleyball
  {
    folder: 'Volleyball\\Active Long Sleeve Jerseys',
    categorySlug: 'volleyball',
    categoryName: 'Volleyball Kits & Uniforms',
    subSlug: 'long-sleeve-jerseys',
    subName: 'Active Long Sleeve Jerseys',
    title: 'Elite Long Sleeve Volleyball Game Jersey',
    desc: 'Flexible 4-way stretch spandex-poly long sleeve volleyball jersey with thumbhole cuffs, flatlock anti-chafing seams, and dive durability.'
  },
  {
    folder: 'Volleyball\\Elite Sleeveless Jerseys',
    categorySlug: 'volleyball',
    categoryName: 'Volleyball Kits & Uniforms',
    subSlug: 'sleeveless-jerseys',
    subName: 'Elite Sleeveless Jerseys',
    title: 'Championship Sleeveless Volleyball Jersey',
    desc: 'Ultra-lightweight racerback or standard sleeveless volleyball jersey with athletic armholes for unrestricted spike and block movement.'
  },
  {
    folder: 'Volleyball\\Lateral Agility Shorts',
    categorySlug: 'volleyball',
    categoryName: 'Volleyball Kits & Uniforms',
    subSlug: 'agility-shorts',
    subName: 'Lateral Agility Shorts',
    title: 'Lateral Agility Volleyball Spandex Shorts',
    desc: '3.5-inch to 4-inch inseam high-stretch volleyball spandex shorts with wide waistband that stays put during digs and continuous jumps.'
  },
  {
    folder: 'Volleyball\\Libero Contrast Uniforms',
    categorySlug: 'volleyball',
    categoryName: 'Volleyball Kits & Uniforms',
    subSlug: 'libero-uniforms',
    subName: 'Libero Contrast Uniforms',
    title: 'Official Libero High-Contrast Volleyball Uniform',
    desc: 'USAV and NFHS compliant high-contrast sublimated Libero jersey engineered with premium stretch fabric for defensive diving agility.'
  },
  {
    folder: 'Volleyball\\Training Compression Tops',
    categorySlug: 'volleyball',
    categoryName: 'Volleyball Kits & Uniforms',
    subSlug: 'compression-tops',
    subName: 'Training Compression Tops',
    title: 'Performance Training Volleyball Compression Top',
    desc: 'Targeted athletic compression top providing muscle support, superior sweat transfer, and quick recovery during rigorous training sessions.'
  },

  // 10. Wrestling & Others
  {
    folder: 'Wrestling & Others\\2-Piece Compression Sets',
    categorySlug: 'wrestling',
    categoryName: 'Wrestling & Combat Gear',
    subSlug: '2-piece-sets',
    subName: '2-Piece Sets',
    title: '2-Piece Compression Wrestling & Grappling Set',
    desc: 'NFHS approved 2-piece wrestling uniform comprising a form-fitting compression shirt and fight shorts with internal drawcord.'
  },
  {
    folder: 'Wrestling & Others\\Cheerleaders Uniform Sets',
    categorySlug: 'wrestling',
    categoryName: 'Wrestling & Combat Gear',
    subSlug: 'cheerleaders-uniforms',
    subName: 'Cheerleaders Uniforms',
    title: 'Championship Athletic Cheerleader Uniform Set',
    desc: 'Stunning 4-way stretch poly-spandex cheer uniform set with V-neck crop/shell top and pleated motion skirt with built-in boy-cut briefs.'
  },
  {
    folder: 'Wrestling & Others\\Netball Match Uniforms',
    categorySlug: 'wrestling',
    categoryName: 'Wrestling & Combat Gear',
    subSlug: 'netball-uniforms',
    subName: 'Netball Uniforms',
    title: 'Custom Sublimated Netball Match Dress & Bib Set',
    desc: 'Comfortable A-line netball match dress with breathable mesh back panel and matching Velcro position bib set (GS, GA, WA, C, WD, GD, GK).'
  },
  {
    folder: 'Wrestling & Others\\NFHS Certified Singlets',
    categorySlug: 'wrestling',
    categoryName: 'Wrestling & Combat Gear',
    subSlug: 'singlets',
    subName: 'Singlets',
    title: 'NFHS Certified Pro Wrestling Singlet',
    desc: 'Export-grade 4-way stretch heavyweight nylon-spandex wrestling singlet with silicone leg grippers, reinforced flatlock stitching, and rib-knit trim.'
  },
  {
    folder: 'Wrestling & Others\\Swimming & Water Polo Suits',
    categorySlug: 'wrestling',
    categoryName: 'Wrestling & Combat Gear',
    subSlug: 'swimming-water-polo',
    subName: 'Swimming & Water Polo',
    title: 'Chlorine-Resistant Water Polo & Swim Trunks',
    desc: 'Dual-layer chlorine and salt-resistant PBT polyester water polo trunks and competitive swim briefs with reinforced flat seams and inner tie-cord.'
  }
];

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function main() {
  console.log('🚀 Initializing ZARKO-Product-Images Cloudinary & DB Ingestion Pipeline...');

  let cache = {};
  if (fs.existsSync(CACHE_FILE)) {
    try {
      cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
      console.log(`📦 Loaded ${Object.keys(cache).length} cached Cloudinary URLs.`);
    } catch (_) {}
  }

  // Load existing products.json from backend
  let existingCategories = [];
  if (fs.existsSync(BACKEND_JSON)) {
    try {
      existingCategories = JSON.parse(fs.readFileSync(BACKEND_JSON, 'utf8'));
      console.log(`📂 Loaded ${existingCategories.length} existing categories from products.json.`);
    } catch (_) {}
  }

  // Map of categories by slug
  const categoriesMap = {};
  for (const cat of existingCategories) {
    categoriesMap[cat.slug] = {
      ...cat,
      subcategories: [...(cat.subcategories || [])],
      products: [...(cat.products || [])]
    };
  }

  // Track new products generated
  const uploadTasks = [];
  let totalNewProductsCount = 0;

  for (const cfg of FOLDER_CONFIGS) {
    const fullFolderPath = path.join(SOURCE_BASE, cfg.folder);
    if (!fs.existsSync(fullFolderPath)) {
      console.warn(`⚠️ Folder does not exist: ${fullFolderPath}`);
      continue;
    }

    const files = fs.readdirSync(fullFolderPath)
      .filter(f => /\.(webp|jpe?g|png)$/i.test(f) && !f.startsWith('.'));

    // Sort files cleanly
    files.sort();

    // Ensure category entry exists
    if (!categoriesMap[cfg.categorySlug]) {
      categoriesMap[cfg.categorySlug] = {
        slug: cfg.categorySlug,
        name: cfg.categoryName,
        gradientFrom: 'from-indigo-600',
        gradientTo: 'to-indigo-400',
        heroBadge: 'FACTORY DIRECT SIALKOT',
        heroVideo: 'https://res.cloudinary.com/dwo0pt9cq/video/upload/v1789985416/wearconnect/admin/lcq2on69ffvsz98ss2dk.mp4',
        featured: {
          name: `Pro ${cfg.categoryName} Championship Uniform`,
          image: '',
          description: `Export-grade custom ${cfg.categoryName.toLowerCase()} manufactured with durable moisture-wicking interlock, reinforced seams, and vibrant 4K digital sublimation. Custom logos, team names, and numbers included.`,
          details: [
            'High GSM moisture-wicking pro athletic fabric',
            'Reinforced flatlock & bar-tacked stress seams',
            '4K Full dye-sublimation or premium tackle-twill embroidery',
            'Custom logos, individual player names, and numbers',
            'NFHS and NCAA regulation sizing and compliance',
            'Low 15-set factory direct MOQ with fast air shipping'
          ],
          sizes: ['YS', 'YM', 'YL', 'XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL']
        },
        subcategories: [],
        products: []
      };
    }

    const catObj = categoriesMap[cfg.categorySlug];
    if (!catObj.subcategories.includes(cfg.subName)) {
      catObj.subcategories.push(cfg.subName);
    }

    files.forEach(file => {
      const srcFile = path.join(fullFolderPath, file);
      // Example filename: zarko-compression-padded-girdles-black-04.webp
      const rawId = file.replace(/\.webp$/i, '');
      const match = rawId.match(/^zarko-(.+)-([a-z-]+)-(\d+)$/i);

      let colorFormatted = 'Custom Edition';
      let numStr = '01';

      if (match) {
        const rawColor = match[2].toLowerCase();
        colorFormatted = COLOR_MAP[rawColor] || (rawColor.charAt(0).toUpperCase() + rawColor.slice(1));
        numStr = match[3];
      }

      const prodId = rawId;
      const publicId = rawId;
      const folderName = `wearconnect/products/${cfg.categorySlug}/${cfg.subSlug}`;
      const cacheKey = `${folderName}/${publicId}`;

      const prodObj = {
        id: prodId,
        name: `${cfg.title} - ${colorFormatted} #${numStr}`,
        image: cache[cacheKey] || '',
        description: cfg.desc,
        subcategory: cfg.subName
      };

      // Check if product already exists in this category
      const existingIdx = catObj.products.findIndex(p => p.id === prodId);
      if (existingIdx >= 0) {
        catObj.products[existingIdx] = prodObj;
      } else {
        catObj.products.push(prodObj);
      }

      totalNewProductsCount++;

      uploadTasks.push({
        srcFile,
        folderName,
        publicId,
        prodObj,
        cacheKey
      });
    });
  }

  console.log(`📋 Total ${totalNewProductsCount} new products queued across all categories.`);
  console.log(`☁️ Cloudinary upload tasks count: ${uploadTasks.length}`);

  // Parallel uploads to Cloudinary
  const CONCURRENCY = 12;
  let completed = 0;
  let uploadedCount = 0;
  let cachedCount = 0;

  async function processTask(task) {
    const { srcFile, folderName, publicId, prodObj, cacheKey } = task;

    if (cache[cacheKey]) {
      prodObj.image = cache[cacheKey];
      cachedCount++;
      completed++;
      return;
    }

    let attempts = 0;
    while (attempts < 3) {
      try {
        const result = await cloudinary.uploader.upload(srcFile, {
          folder: folderName,
          public_id: publicId,
          overwrite: false,
          resource_type: 'image'
        });
        const secureUrl = result.secure_url;
        cache[cacheKey] = secureUrl;
        prodObj.image = secureUrl;
        uploadedCount++;
        completed++;
        if (completed % 20 === 0 || completed === uploadTasks.length) {
          console.log(`  [Cloudinary] Progress: ${completed}/${uploadTasks.length} (${Math.round(completed / uploadTasks.length * 100)}%) - New: ${uploadedCount}, Cached: ${cachedCount}`);
          fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), 'utf8');
        }
        return;
      } catch (err) {
        attempts++;
        if (attempts >= 3) {
          console.error(`  ❌ Failed uploading ${cacheKey} after 3 attempts:`, err.message);
          // Fallback direct Cloudinary URL
          const fallbackUrl = `https://res.cloudinary.com/dwo0pt9cq/image/upload/${folderName}/${publicId}.webp`;
          cache[cacheKey] = fallbackUrl;
          prodObj.image = fallbackUrl;
          completed++;
          return;
        }
        await sleep(1200);
      }
    }
  }

  let taskIdx = 0;
  async function worker() {
    while (taskIdx < uploadTasks.length) {
      const task = uploadTasks[taskIdx++];
      await processTask(task);
    }
  }

  const workers = Array.from({ length: CONCURRENCY }, () => worker());
  await Promise.all(workers);

  // Save final cache file
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), 'utf8');
  console.log(`✅ All Cloudinary uploads finished! (New uploaded: ${uploadedCount}, Cached: ${cachedCount}, Total: ${completed})`);

  // Finalize categories list
  const finalCategories = Object.values(categoriesMap).map(c => {
    if (!c.featured?.image && c.products.length > 0) {
      c.featured.image = c.products[0].image;
    }
    return c;
  });

  // Write to BACKEND_JSON, FRONTEND_JSON, and BACKEND_DATA_JS
  const jsonOutput = JSON.stringify(finalCategories, null, 2);
  fs.writeFileSync(BACKEND_JSON, jsonOutput, 'utf8');
  fs.writeFileSync(FRONTEND_JSON, jsonOutput, 'utf8');
  fs.writeFileSync(BACKEND_DATA_JS, '// Master Seed Categories with Cloudinary CDN URLs\nexport const categories = ' + jsonOutput + ';\n', 'utf8');
  console.log(`💾 Saved updated products.json to backend and frontend! Total categories: ${finalCategories.length}`);
  finalCategories.forEach(c => {
    console.log(`   - [${c.slug}] ${c.name}: ${c.products.length} products`);
  });

  // Connect to MongoDB Atlas and update all categories
  const mongoUri = 'mongodb+srv://21101001059:Atif903%40@atif.bsbtfxk.mongodb.net/airbnb?retryWrites=true&w=majority&appName=atif';
  console.log('\n🗄️ Connecting to MongoDB Atlas to update categories...');
  try {
    await mongoose.connect(mongoUri);
    const CategorySchema = new mongoose.Schema({
      slug: { type: String, unique: true, required: true },
      name: { type: String, required: true },
      gradientFrom: String,
      gradientTo: String,
      heroVideo: String,
      heroBadge: String,
      featured: Object,
      subcategories: Array,
      products: Array
    }, { timestamps: true });

    const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

    for (const cat of finalCategories) {
      await Category.findOneAndUpdate(
        { slug: cat.slug },
        {
          $set: {
            slug: cat.slug,
            name: cat.name,
            gradientFrom: cat.gradientFrom,
            gradientTo: cat.gradientTo,
            heroBadge: cat.heroBadge,
            heroVideo: cat.heroVideo,
            featured: cat.featured,
            subcategories: cat.subcategories,
            products: cat.products
          }
        },
        { upsert: true, new: true }
      );
      console.log(`  -> MongoDB updated [${cat.slug}] (${cat.products.length} products)`);
    }

    await mongoose.connection.close();
    console.log('🎉 MongoDB Atlas synchronization completed successfully!');
  } catch (mongoErr) {
    console.error('⚠️ MongoDB sync error:', mongoErr.message);
  }

  console.log('\n✨ Entire pipeline completed successfully!');
}

main().catch(err => {
  console.error('Fatal pipeline error:', err);
  process.exit(1);
});
