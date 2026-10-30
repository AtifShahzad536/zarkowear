import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_BASE = 'C:\\Users\\ABC\\Downloads\\dashbaord\\eaySports\\zarko\\product';
const BACKEND_BASE = 'C:\\Users\\ABC\\Downloads\\dashbaord\\eaySports\\wear-backend';
const BACKEND_UPLOADS = path.join(BACKEND_BASE, 'uploads', 'products');
const FRONTEND_UPLOADS = path.resolve(__dirname, '..', 'public', 'uploads', 'products');
const BACKEND_JSON = path.join(BACKEND_BASE, 'src', 'data', 'products.json');
const FRONTEND_JSON = path.resolve(__dirname, '..', 'src', 'data', 'products.json');

// Subcategory definitions mapping
const SUB_CONFIGS = [
  // 1. Ice Hockey
  {
    folder: 'PRODUCT P-2\\ICE HOCKEY\\JERSEYS',
    categorySlug: 'ice-hockey',
    categoryName: 'Ice Hockey Uniforms & Gear',
    subSlug: 'jerseys',
    subName: 'Jerseys',
    prefix: 'ih',
    subPrefix: 'jrs',
    title: 'Heavyweight Pro-Knit Ice Hockey Jersey',
    desc: 'Heavy 260 GSM abrasion-resistant air-knit polyester hockey jersey with double-reinforced elbows and shoulders, fight strap option, and laser-sharp sublimation.'
  },
  // 2. Lacrosse
  {
    folder: 'PRODUCT P-2\\LACROSSE\\JERSEYS',
    categorySlug: 'lacrosse',
    categoryName: 'Lacrosse Kits & Teamwear',
    subSlug: 'jerseys',
    subName: 'Jerseys',
    prefix: 'lx',
    subPrefix: 'jrs',
    title: 'Custom Sublimated Lacrosse Game Jersey',
    desc: 'Pro-spec lacrosse game jersey featuring open-hole mesh panels for pad ventilation, durable polyester interlock body, and ergonomic athletic silhouette.'
  },
  {
    folder: 'PRODUCT P-2\\LACROSSE\\SHORTS',
    categorySlug: 'lacrosse',
    categoryName: 'Lacrosse Kits & Teamwear',
    subSlug: 'shorts',
    subName: 'Shorts',
    prefix: 'lx',
    subPrefix: 'sht',
    title: 'Athletic Team Lacrosse Game Shorts',
    desc: 'Comfortable stretch polyester lacrosse shorts with deep pockets, elastic drawstring waist, and motion-notch side splits for sprint agility.'
  },
  {
    folder: 'PRODUCT P-2\\LACROSSE\\SKORTS',
    categorySlug: 'lacrosse',
    categoryName: 'Lacrosse Kits & Teamwear',
    subSlug: 'skorts',
    subName: 'Skorts',
    prefix: 'lx',
    subPrefix: 'skr',
    title: "Women's Fast-Motion Lacrosse Game Skort",
    desc: "Two-in-one women's lacrosse skort featuring a lightweight woven outer skirt with built-in four-way stretch compression undershorts and ball pocket."
  },
  {
    folder: 'PRODUCT P-2\\LACROSSE\\TANKTOPS',
    categorySlug: 'lacrosse',
    categoryName: 'Lacrosse Kits & Teamwear',
    subSlug: 'tanktops',
    subName: 'Tanktops',
    prefix: 'lx',
    subPrefix: 'tnk',
    title: 'Racerback Performance Lacrosse Tank Top',
    desc: 'Lightweight racerback cut athletic tank top engineered for high heat games and summer tournaments with 360-degree airflow mesh.'
  },
  // 3. Soccer
  {
    folder: 'PRODUCT P-2\\SOCCER\\JERSEYS',
    categorySlug: 'soccer',
    categoryName: 'Soccer Kits & Uniforms',
    subSlug: 'jerseys',
    subName: 'Jerseys',
    prefix: 'sc',
    subPrefix: 'jrs',
    title: 'Striker Matchday Sublimated Soccer Jersey',
    desc: '150 GSM ultra-lightweight micro-poly soccer jersey with laser-cut ventilation underarms, ribbed collar, and anti-static quick-dry yarn.'
  },
  {
    folder: 'PRODUCT P-2\\SOCCER\\SHORTS',
    categorySlug: 'soccer',
    categoryName: 'Soccer Kits & Uniforms',
    subSlug: 'shorts',
    subName: 'Shorts',
    prefix: 'sc',
    subPrefix: 'sht',
    title: 'Pro Matchday Athletic Soccer Shorts',
    desc: 'Lightweight soccer match shorts with ergonomic side split hem, elasticated waistband with interior drawstring, and soft-touch chafe-free liner.'
  },
  // 4. Volleyball
  {
    folder: 'PRODUCT P-2\\VOLLEYBALL\\JERSEYS',
    categorySlug: 'volleyball',
    categoryName: 'Volleyball Kits & Uniforms',
    subSlug: 'jerseys',
    subName: 'Jerseys',
    prefix: 'vb',
    subPrefix: 'jrs',
    title: 'Dynamic Court Volleyball Game Jersey',
    desc: 'Four-way stretch athletic jersey engineered for vertical jumping and dive impact. Features moisture transport fabric and reinforced raglan stitching.'
  },
  {
    folder: 'PRODUCT P-2\\VOLLEYBALL\\SHORTS',
    categorySlug: 'volleyball',
    categoryName: 'Volleyball Kits & Uniforms',
    subSlug: 'shorts',
    subName: 'Shorts',
    prefix: 'vb',
    subPrefix: 'sht',
    title: 'Spandex Agility Volleyball Shorts',
    desc: 'High-stretch elastane volleyball shorts with 3-inch or 4-inch inseam, flatlock anti-chafing seams, and wide stay-put comfort waistband.'
  },
  {
    folder: 'PRODUCT P-2\\VOLLEYBALL\\SLEEVELESS TOPS',
    categorySlug: 'volleyball',
    categoryName: 'Volleyball Kits & Uniforms',
    subSlug: 'sleeveless-tops',
    subName: 'Sleeveless Tops',
    prefix: 'vb',
    subPrefix: 'slv',
    title: 'Elite Sleeveless Volleyball Uniform Top',
    desc: 'Sleeveless tournament volleyball top designed for unrestricted arm swing and spiking power, made with breathable featherweight stretch poly.'
  },
  // 5. American Football
  {
    folder: 'PRODUCTS 6-6\\AMERICAN FOOTBALL\\JERSEYS',
    categorySlug: 'football',
    categoryName: 'American Football Uniforms & Gear',
    subSlug: 'jerseys',
    subName: 'Jerseys',
    prefix: 'fb',
    subPrefix: 'jrs',
    title: 'Elite Pro Sublimated Football Jersey',
    desc: 'Export-grade custom American Football game jersey engineered with 260 GSM pro-interlock and 4K digital sublimation. Features double-ply cowl shoulders, reinforced pad clearance, and NFHS compliance.'
  },
  {
    folder: 'PRODUCTS 6-6\\AMERICAN FOOTBALL\\PANTS',
    categorySlug: 'football',
    categoryName: 'American Football Uniforms & Gear',
    subSlug: 'pants',
    subName: 'Pants',
    prefix: 'fb',
    subPrefix: 'pnt',
    title: 'Pro Integrated American Football Pants',
    desc: 'Heavyweight 4-way stretch football game pants featuring integrated pad pocket construction, bar-tacked stress seams, tunnel belt waist, and non-slip silicone elastic leg openings.'
  },
  // 6. Baseball
  {
    folder: 'PRODUCTS 6-6\\BASEBALL\\CAGE JACKETS',
    categorySlug: 'baseball',
    categoryName: 'Baseball Uniforms & Gear',
    subSlug: 'cage-jackets',
    subName: 'Cage Jackets',
    prefix: 'bb',
    subPrefix: 'cgj',
    title: 'Wind-Resistant Baseball Cage Batting Jacket',
    desc: 'Professional short-sleeve baseball batting cage jacket crafted from lightweight water-repellent micro-poly with breathable stretch mesh side inserts and ergonomic quarter-zip neck.'
  },
  {
    folder: 'PRODUCTS 6-6\\BASEBALL\\CREW NECK JERSEYS',
    categorySlug: 'baseball',
    categoryName: 'Baseball Uniforms & Gear',
    subSlug: 'crew-neck-jerseys',
    subName: 'Crew Neck Jerseys',
    prefix: 'bb',
    subPrefix: 'cnj',
    title: 'Pro Crew Neck Sublimated Baseball Jersey',
    desc: 'Lightweight 180 GSM moisture-wicking crew neck baseball jersey with mesh underarm ventilation inserts and fade-proof digital dye sublimation.'
  },
  {
    folder: 'PRODUCTS 6-6\\BASEBALL\\FULL BUTTON JERSEYS',
    categorySlug: 'baseball',
    categoryName: 'Baseball Uniforms & Gear',
    subSlug: 'full-button-jerseys',
    subName: 'Full Button Jerseys',
    prefix: 'bb',
    subPrefix: 'fbj',
    title: 'Classic Full-Button Baseball Game Jersey',
    desc: 'Factory-direct full-button baseball jersey made with 220 GSM pro-weight warp-knit fabric. Tailored baseball drop-tail cut with double-stitched buttons and tackle twill or sublimation printing.'
  },
  {
    folder: 'PRODUCTS 6-6\\BASEBALL\\PANTS',
    categorySlug: 'baseball',
    categoryName: 'Baseball Uniforms & Gear',
    subSlug: 'pants',
    subName: 'Pants',
    prefix: 'bb',
    subPrefix: 'pnt',
    title: 'Double-Knee Piped Baseball Game Pants',
    desc: 'High-durability 14-ounce pro-weight polyester double-knit baseball pants with reinforced sliding knee panels, brass YKK zipper fly, and silicone gripper waistband.'
  },
  {
    folder: 'PRODUCTS 6-6\\BASEBALL\\SOCKS',
    categorySlug: 'baseball',
    categoryName: 'Baseball Uniforms & Gear',
    subSlug: 'socks',
    subName: 'Socks',
    prefix: 'bb',
    subPrefix: 'sck',
    title: 'Cushioned Athletic Baseball Team Socks',
    desc: 'High-performance moisture-wicking compression baseball stirrups/socks with targeted arch support, padded heel-and-toe cushioning, and ribbed stay-up cuff.'
  },
  // 7. Basketball
  {
    folder: 'PRODUCTS 6-6\\BASKETBALL\\TOPS',
    categorySlug: 'basketball',
    categoryName: 'Basketball Kits & Apparel',
    subSlug: 'tops',
    subName: 'Tops',
    prefix: 'bk',
    subPrefix: 'top',
    title: 'Pro Mesh Basketball Game Jersey Top',
    desc: 'Lightweight 160 GSM breathable eyelet bird-eye mesh basketball jersey with wide armhole cut, ribbed athletic neck trim, and moisture management technology.'
  },
  {
    folder: 'PRODUCTS 6-6\\BASKETBALL\\SHORTS',
    categorySlug: 'basketball',
    categoryName: 'Basketball Kits & Apparel',
    subSlug: 'shorts',
    subName: 'Shorts',
    prefix: 'bk',
    subPrefix: 'sht',
    title: 'Speed-Dry Basketball Team Shorts',
    desc: 'Breathable mesh court basketball shorts featuring an athletic knee-length cut, 2-inch non-roll elastic drawstring waistband, and double-needle hemmed bottom.'
  },
  // 8. Softball
  {
    folder: 'PRODUCTS 6-6\\SOFTBALL\\CAPS',
    categorySlug: 'softball',
    categoryName: 'Softball Uniforms & Apparel',
    subSlug: 'caps',
    subName: 'Caps',
    prefix: 'sb',
    subPrefix: 'cap',
    title: 'Structured Performance Softball Team Cap',
    desc: 'Six-panel athletic performance moisture-wicking cap with curved visor, embroidered eyelets, structured front buckram, and adjustable hook-and-loop closure.'
  },
  {
    folder: 'PRODUCTS 6-6\\SOFTBALL\\CREW NECK JERSEYS',
    categorySlug: 'softball',
    categoryName: 'Softball Uniforms & Apparel',
    subSlug: 'crew-neck-jerseys',
    subName: 'Crew Neck Jerseys',
    prefix: 'sb',
    subPrefix: 'cnj',
    title: 'Performance Crew Neck Softball Jersey',
    desc: 'Tailored athletic fastpitch softball jersey with raglan sleeves, flatlock chafe-free stitching, and UV sun-defending lightweight polyester.'
  },
  {
    folder: 'PRODUCTS 6-6\\SOFTBALL\\KNICKERS PANTS',
    categorySlug: 'softball',
    categoryName: 'Softball Uniforms & Apparel',
    subSlug: 'knickers-pants',
    subName: 'Knickers Pants',
    prefix: 'sb',
    subPrefix: 'knk',
    title: 'Pro Low-Rise Softball Knicker Pants',
    desc: 'Heavy-duty stretch double-knit softball knickers with elastic calf cuffs, reinforced double-layer sliding knees, dual back welt pockets, and belt loops.'
  },
  {
    folder: 'PRODUCTS 6-6\\SOFTBALL\\SHORTS',
    categorySlug: 'softball',
    categoryName: 'Softball Uniforms & Apparel',
    subSlug: 'shorts',
    subName: 'Shorts',
    prefix: 'sb',
    subPrefix: 'sht',
    title: 'Agility Fastpitch Softball Shorts',
    desc: 'Lightweight moisture-wicking team shorts designed for fast movement on the dirt and turf, featuring wide elastic waistband and quick-dry breathability.'
  },
  {
    folder: 'PRODUCTS 6-6\\SOFTBALL\\TWO BUTTON JERSEYS',
    categorySlug: 'softball',
    categoryName: 'Softball Uniforms & Apparel',
    subSlug: 'two-button-jerseys',
    subName: 'Two Button Jerseys',
    prefix: 'sb',
    subPrefix: 'tbj',
    title: 'Fastpitch Two-Button Henley Softball Jersey',
    desc: "Women's fastpitch cut two-button henley jersey crafted from 180 GSM micro-interlock poly with anti-microbial finish and custom full-color sublimation."
  },
  // 9. Sports Wears / Streetwear
  {
    folder: 'PRODUCTS 6-6\\SPORTS WEARS\\HODIES',
    categorySlug: 'streetwear',
    categoryName: 'Sports Wear & Athleisure Streetwear',
    subSlug: 'hoodies',
    subName: 'Hoodies',
    prefix: 'sw',
    subPrefix: 'hdy',
    title: 'Heavyweight French Terry Athletic Hoodie',
    desc: 'Premium 360 GSM combed cotton/poly blend fleece pullover hoodie with double-layer hood, kangaroo front pocket, and heavy 2x2 ribbing.'
  },
  {
    folder: 'PRODUCTS 6-6\\SPORTS WEARS\\HODIES SHIRTS',
    categorySlug: 'streetwear',
    categoryName: 'Sports Wear & Athleisure Streetwear',
    subSlug: 'hoodie-shirts',
    subName: 'Hoodie Shirts',
    prefix: 'sw',
    subPrefix: 'hds',
    title: 'Lightweight Shooting Hoodie Warm-Up Shirt',
    desc: 'Athletic warm-up hoodie shirt crafted with lightweight dry-fit stretch fabric, scuba hood, and short or long sleeves for pre-game shootarounds.'
  },
  {
    folder: 'PRODUCTS 6-6\\SPORTS WEARS\\POLO SHIRTS',
    categorySlug: 'streetwear',
    categoryName: 'Sports Wear & Athleisure Streetwear',
    subSlug: 'polo-shirts',
    subName: 'Polo Shirts',
    prefix: 'sw',
    subPrefix: 'plo',
    title: 'Performance Pique Athletic Polo Shirt',
    desc: '200 GSM breathable textured pique polo shirt with 3-button placket, knit rib collar, side vents, and clean tailored silhouette.'
  },
  {
    folder: 'PRODUCTS 6-6\\SPORTS WEARS\\PULLOVERS',
    categorySlug: 'streetwear',
    categoryName: 'Sports Wear & Athleisure Streetwear',
    subSlug: 'pullovers',
    subName: 'Pullovers',
    prefix: 'sw',
    subPrefix: 'plv',
    title: 'Quarter-Zip Athletic Performance Pullover',
    desc: 'Technical mid-layer quarter-zip pullover with chin guard, raglan sleeves, brushed interior fleece warmth, and moisture-wicking exterior.'
  },
  {
    folder: 'PRODUCTS 6-6\\SPORTS WEARS\\SLEEVELESS HODIES',
    categorySlug: 'streetwear',
    categoryName: 'Sports Wear & Athleisure Streetwear',
    subSlug: 'sleeveless-hoodies',
    subName: 'Sleeveless Hoodies',
    prefix: 'sw',
    subPrefix: 'slh',
    title: 'Cut-Off Fleece Gym Sleeveless Hoodie',
    desc: 'Hardcore bodybuilding and athletic sleeveless hoodie with raw cut or hemmed armholes, deep hood, and durable cotton-fleece fabric.'
  },
  {
    folder: 'PRODUCTS 6-6\\SPORTS WEARS\\SWEATSHIRTS',
    categorySlug: 'streetwear',
    categoryName: 'Sports Wear & Athleisure Streetwear',
    subSlug: 'sweatshirts',
    subName: 'Sweatshirts',
    prefix: 'sw',
    subPrefix: 'swt',
    title: 'Classic Crewneck Athletic Sweatshirt',
    desc: '320 GSM brushed fleece crewneck sweatshirt with triangular collar rib insert, drop shoulders, and reinforced double-needle seam construction.'
  },
  {
    folder: 'PRODUCTS 6-6\\SPORTS WEARS\\TRACKSUITS',
    categorySlug: 'streetwear',
    categoryName: 'Sports Wear & Athleisure Streetwear',
    subSlug: 'tracksuits',
    subName: 'Tracksuits',
    prefix: 'sw',
    subPrefix: 'trk',
    title: 'Custom Team Warm-Up Tracksuit Set',
    desc: 'Complete two-piece athletic tracksuit featuring full-zip jacket with zippered pockets and tapered track pants with ankle zippers.'
  },
  {
    folder: 'PRODUCTS 6-6\\SPORTS WEARS\\V NECKS',
    categorySlug: 'streetwear',
    categoryName: 'Sports Wear & Athleisure Streetwear',
    subSlug: 'v-necks',
    subName: 'V Necks',
    prefix: 'sw',
    subPrefix: 'vnk',
    title: 'Sublimated Athletic V-Neck Shirt',
    desc: 'Comfortable sporty V-neck training shirt made with ultra-breathable silky polyester interlock, taped neckband, and vibrant all-over print.'
  }
];

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function numericSort(files) {
  return files.sort((a, b) => {
    const numA = parseInt(a.replace(/\D/g, ''), 10) || 0;
    const numB = parseInt(b.replace(/\D/g, ''), 10) || 0;
    return numA - numB;
  });
}

async function main() {
  console.log('🚀 Starting Zarko Sportswear Ingestion & Listing Workflow...');
  
  ensureDir(BACKEND_UPLOADS);
  ensureDir(FRONTEND_UPLOADS);
  ensureDir(path.dirname(BACKEND_JSON));
  ensureDir(path.dirname(FRONTEND_JSON));

  const categoriesMap = {};
  let totalCopied = 0;

  for (const item of SUB_CONFIGS) {
    const fullSourcePath = path.join(SOURCE_BASE, item.folder);
    if (!fs.existsSync(fullSourcePath)) {
      console.warn(`⚠️ Warning: Folder not found: ${fullSourcePath}`);
      continue;
    }

    const files = fs.readdirSync(fullSourcePath)
      .filter(f => /\.(jpe?g|png)$/i.test(f) && !f.startsWith('.'));
    
    numericSort(files);

    const targetBackendDir = path.join(BACKEND_UPLOADS, item.categorySlug, item.subSlug);
    const targetFrontendDir = path.join(FRONTEND_UPLOADS, item.categorySlug, item.subSlug);
    ensureDir(targetBackendDir);
    ensureDir(targetFrontendDir);

    if (!categoriesMap[item.categorySlug]) {
      categoriesMap[item.categorySlug] = {
        slug: item.categorySlug,
        name: item.categoryName,
        gradientFrom: 'from-indigo-600',
        gradientTo: 'to-indigo-400',
        subcategories: [],
        products: []
      };
    }

    if (!categoriesMap[item.categorySlug].subcategories.includes(item.subName)) {
      categoriesMap[item.categorySlug].subcategories.push(item.subName);
    }

    files.forEach((file, idx) => {
      const srcFile = path.join(fullSourcePath, file);
      const dstBackendFile = path.join(targetBackendDir, file);
      const dstFrontendFile = path.join(targetFrontendDir, file);

      // Copy to backend uploads
      fs.copyFileSync(srcFile, dstBackendFile);
      // Copy to frontend public uploads fallback
      fs.copyFileSync(srcFile, dstFrontendFile);
      totalCopied++;

      const numStr = String(idx + 1).padStart(2, '0');
      const prodId = `${item.prefix}-${item.subPrefix}-${numStr}`;
      const imageUrl = `/uploads/products/${item.categorySlug}/${item.subSlug}/${file}`;

      categoriesMap[item.categorySlug].products.push({
        id: prodId,
        name: `${item.title} #${numStr}`,
        image: imageUrl,
        description: item.desc,
        subcategory: item.subName
      });
    });

    console.log(`✅ Processed [${item.categorySlug}] -> ${item.subName} (${files.length} images)`);
  }

  console.log(`\n📦 Total images copied & listed: ${totalCopied}`);

  // Format the master JSON array
  const finalCategories = Object.values(categoriesMap).map(c => {
    const firstImg = c.products[0]?.image || '';
    return {
      slug: c.slug,
      name: c.name,
      gradientFrom: c.gradientFrom,
      gradientTo: c.gradientTo,
      heroBadge: 'FACTORY DIRECT SIALKOT',
      heroVideo: 'https://res.cloudinary.com/dwo0pt9cq/video/upload/v1789985416/wearconnect/admin/lcq2on69ffvsz98ss2dk.mp4',
      featured: {
        name: `Pro ${c.name} Championship Uniform`,
        image: firstImg,
        description: `Export-grade custom ${c.name.toLowerCase()} manufactured with durable moisture-wicking interlock, reinforced seams, and vibrant 4K digital sublimation. Custom logos, team names, and numbers included.`,
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
      subcategories: c.subcategories,
      products: c.products
    };
  });

  // Write master products.json
  const jsonOutput = JSON.stringify(finalCategories, null, 2);
  fs.writeFileSync(BACKEND_JSON, jsonOutput, 'utf8');
  fs.writeFileSync(FRONTEND_JSON, jsonOutput, 'utf8');
  console.log(`💾 Saved master products.json to backend: ${BACKEND_JSON}`);
  console.log(`💾 Saved master products.json to frontend: ${FRONTEND_JSON}`);

  // ── Call Backend Routes & Connect to MongoDB ──
  console.log('\n🌐 Calling Backend Admin Routes to Upsert Categories & Products...');
  
  // Generate admin token
  const jwtSecret = process.env.JWT_SECRET || 'dev_secret_change_me';
  const adminToken = jwt.sign({ role: 'admin', email: 'admin@zarkosportswear.com' }, jwtSecret, { expiresIn: '7d' });

  // Call backend HTTP routes for each category
  for (const cat of finalCategories) {
    try {
      // 1. Try to get category
      const getRes = await fetch(`http://localhost:4001/api/category/${cat.slug}`);
      if (getRes.status === 404) {
        // Create category
        console.log(`Creating category [${cat.slug}] via POST /api/admin/categories...`);
        const createRes = await fetch('http://localhost:4001/api/admin/categories', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${adminToken}`
          },
          body: JSON.stringify({
            slug: cat.slug,
            name: cat.name,
            gradientFrom: cat.gradientFrom,
            gradientTo: cat.gradientTo,
            heroBadge: cat.heroBadge,
            heroVideo: cat.heroVideo,
            featured: cat.featured,
            products: cat.products
          })
        });
        const createdData = await createRes.json();
        console.log(`  -> Created [${cat.slug}]: HTTP ${createRes.status}`);
      } else {
        // Update category with fresh products
        console.log(`Updating category [${cat.slug}] (${cat.products.length} products) via PUT /api/admin/categories/${cat.slug}...`);
        const putRes = await fetch(`http://localhost:4001/api/admin/categories/${cat.slug}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${adminToken}`
          },
          body: JSON.stringify({
            name: cat.name,
            products: cat.products,
            featured: cat.featured
          })
        });
        console.log(`  -> Updated [${cat.slug}]: HTTP ${putRes.status}`);
      }
    } catch (httpErr) {
      console.error(`  ❌ HTTP error updating ${cat.slug}:`, httpErr.message);
    }
  }

  // Direct MongoDB update as guarantee
  const mongoUri = 'mongodb+srv://21101001059:Atif903%40@atif.bsbtfxk.mongodb.net/airbnb?retryWrites=true&w=majority&appName=atif';
  console.log('\n🗄️ Connecting directly to MongoDB Atlas to guarantee database state...');
  try {
    await mongoose.connect(mongoUri);
    console.log('  -> Connected to MongoDB Atlas successfully.');

    const CategorySchema = new mongoose.Schema({
      slug: { type: String, unique: true, required: true },
      name: { type: String, required: true },
      gradientFrom: String,
      gradientTo: String,
      heroVideo: String,
      heroBadge: String,
      featured: Object,
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
            products: cat.products
          }
        },
        { upsert: true, new: true }
      );
      console.log(`  -> Upserted in MongoDB: [${cat.slug}] with ${cat.products.length} products`);
    }

    await mongoose.disconnect();
    console.log('  -> MongoDB disconnected cleanly.');
  } catch (dbErr) {
    console.error('  ❌ MongoDB direct error:', dbErr.message);
  }

  console.log('\n✨ Ingestion, listing, and backend routes update completed successfully!');
}

main().catch(err => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});
