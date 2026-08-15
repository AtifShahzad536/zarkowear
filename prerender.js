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

// Comprehensive route metadata and rich static SEO body content (300-500+ words per page)
const routesData = {
  '/about': {
    title: 'About Zarko Sportswear | USA Custom Sports Uniform Manufacturer',
    description: 'Learn how Zarko Sportswear manufactures high-performance custom team jerseys, wrestling singlets, and athletic uniforms with direct factory USA shipping.',
    canonical: 'https://www.zarkosportswear.com/about',
    h1: 'About Zarko Sportswear - Premier USA Custom Sportswear Manufacturer',
    bodyContent: `
      <section class="seo-content-block">
        <h2>Factory-Direct Custom Teamwear & Sports Uniform Manufacturing</h2>
        <p>Zarko Sportswear is a world-class sportswear manufacturer and direct supplier specializing in fully customized sports uniforms, team jerseys, athletic performance wear, and sublimation team kits for sports organizations across the United States. With state-of-the-art production facilities and decades of master craftsmanship based in Sialkot, Pakistan, we bridge the gap between factory-direct wholesale pricing and uncompromising export quality.</p>
        
        <h2>Our Manufacturing Heritage & Craftsmanship</h2>
        <p>Every jersey, wrestling singlet, and athletic apparel piece manufactured by Zarko Sportswear undergoes rigorous quality control. From selecting premium moisture-wicking interlock polyester and 4-way stretch compression spandex to high-precision laser cutting, 4K digital sublimation printing, and reinforced multi-needle flatlock stitching, our production is optimized for durability, athletic agility, and vibrant long-lasting colors that never fade or crack.</p>
        
        <h2>Why Sports Programs Across the USA Partner With Us</h2>
        <ul>
          <li><strong>Direct Factory Pricing:</strong> Eliminate middleman markups by sourcing directly from our certified manufacturing hub.</li>
          <li><strong>Low Minimum Order Quantities (MOQs):</strong> Flexible low MOQs starting at just 15 to 25 pieces per order, perfect for schools, youth leagues, and professional clubs.</li>
          <li><strong>Full Sublimation Customization:</strong> Complete freedom to customize colors, team logos, sponsor graphics, player names, and roster numbers.</li>
          <li><strong>Express USA Fulfillment:</strong> Fast, reliable door-to-door international express shipping directly to all 50 US states with full tracking support.</li>
          <li><strong>Dedicated USA Customer Support:</strong> Personal account managers ready to guide you through mockup approval, fabric selection, and order delivery.</li>
        </ul>

        <h2>Commitment to Athletic Excellence & Innovation</h2>
        <p>Whether equipping high school wrestling teams, collegiate soccer clubs, adult baseball leagues, or independent gym brands, Zarko Sportswear is dedicated to delivering gear that elevates athletic performance. Explore our wide range of custom sport categories or use our interactive 3D uniform builder to bring your team's vision to life today.</p>
      </section>
    `
  },
  '/contact': {
    title: 'Contact Zarko Sportswear | Request Free Uniform Quote USA',
    description: 'Get in touch with Zarko Sportswear for factory-direct custom sports uniform quotes, fabric swatches, and team sizing assistance. Fast response & USA shipping.',
    canonical: 'https://www.zarkosportswear.com/contact',
    h1: 'Contact Zarko Sportswear - USA Customer & Order Support Desk',
    bodyContent: `
      <section class="seo-content-block">
        <h2>Get in Touch for Custom Sports Uniform Quotes & Bulk Inquiries</h2>
        <p>Looking for a factory-direct quote on custom team uniforms, sublimation sports jerseys, wrestling gear, or private label athletic apparel? The Zarko Sportswear team is here to provide immediate assistance with custom designs, fabric swatches, sizing guides, and wholesale pricing tailored for USA sports organizations, clubs, and distributors.</p>

        <h2>Direct Support Channels & Contact Details</h2>
        <p>Our dedicated export representatives operate around the clock to ensure swift communication across all US time zones (EST, CST, MST, PST). Reach out through any of our official channels:</p>
        <ul>
          <li><strong>WhatsApp Direct Support:</strong> +92 303 9200750 (Instant response for order specs, design approvals, and tracking updates)</li>
          <li><strong>Email Inquiries:</strong> zarkosportswear@gmail.com (Send roster files, vector logos, and custom mockup briefs)</li>
          <li><strong>Export Distribution Hub:</strong> Sialkot, Punjab, Pakistan — Supplying sports clubs and distributors across North America and worldwide.</li>
          <li><strong>Business Hours:</strong> Monday – Saturday, 9:00 AM – 6:00 PM (Online support available 24/7 for USA order inquiries).</li>
        </ul>

        <h2>How Our Ordering & Consultation Process Works</h2>
        <ol>
          <li><strong>Submit Your Brief:</strong> Share your sport, required quantities, color scheme, and artwork files with our team.</li>
          <li><strong>Free 3D Mockup & Quote:</strong> We provide high-resolution digital mockups and detailed transparent pricing with no hidden fees.</li>
          <li><strong>Sample Approval & Production:</strong> Upon your final approval, your custom gear enters our advanced sublimation production line.</li>
          <li><strong>Express Door-to-Door Delivery:</strong> Completed orders are securely packaged and shipped via express courier directly to your USA address.</li>
        </ol>
      </section>
    `
  },
  '/custom': {
    title: 'Start Custom Uniform Order | Factory Direct Teamwear USA',
    description: 'Order factory-direct custom sports uniforms and team apparel. Submit your roster, colors, and design specs to get an instant quote and fast USA delivery.',
    canonical: 'https://www.zarkosportswear.com/custom',
    h1: 'Start Your Custom Sports Uniform Order - Factory Direct USA Supply',
    bodyContent: `
      <section class="seo-content-block">
        <h2>Bespoke Team Uniforms & Private Label Apparel Manufacturing</h2>
        <p>Zarko Sportswear provides comprehensive custom manufacturing services for sports teams, universities, amateur athletic unions, and fitness brands throughout the United States. We make ordering custom uniforms straightforward, fast, and affordable with factory-direct pricing and low minimum order quantities.</p>

        <h2>Available Customization Capabilities</h2>
        <ul>
          <li><strong>4K Full Sublimation Printing:</strong> Seamless, edge-to-edge printing infused into fabric fibers so designs never peel, fade, or wash out.</li>
          <li><strong>Tackle Twill & 3D Embroidery:</strong> Traditional pro-grade stitched lettering, numbers, and embroidered crests for baseball and hockey jerseys.</li>
          <li><strong>Individual Player Personalization:</strong> Customize unique player names, numbers, and custom sizes across your entire roster without extra setup fees.</li>
          <li><strong>Engineered Performance Fabrics:</strong> Choose from high-filament moisture-wicking polyester, micro-mesh, 4-way stretch spandex, and thermal fleece.</li>
          <li><strong>Pantone Color Matching:</strong> Exact color matching to ensure your team kit adheres strictly to your official brand and school colors.</li>
        </ul>

        <h2>Custom Sports Uniform Packages We Manufacture</h2>
        <p>We produce turnkey uniform packages for football (soccer), baseball, softball, wrestling, cricket, basketball, volleyball, ice hockey, field hockey, rugby, tennis, track and field, and fitness gym wear. Request a free quote today and discover how Zarko Sportswear delivers superior athletic apparel with fast USA shipping.</p>
      </section>
    `
  },
  '/builder': {
    title: '3D Custom Sports Uniform Builder | Design Online USA',
    description: 'Design custom sports jerseys, team uniforms, and wrestling singlets online in real-time with our 3D builder tool. Instant customization and fast USA shipping.',
    canonical: 'https://www.zarkosportswear.com/builder',
    h1: '3D Custom Sports Uniform Builder - Design Team Jerseys Online',
    bodyContent: `
      <section class="seo-content-block">
        <h2>Real-Time 3D Interactive Jersey & Uniform Customizer</h2>
        <p>Take full creative control of your team's visual identity with the Zarko Sportswear 3D Uniform Builder. Our cutting-edge 3D customization tool allows coaches, team managers, and athletic directors to design custom sports jerseys, wrestling singlets, and full uniforms in real-time with 360-degree interactive preview capabilities.</p>

        <h2>How to Use the 3D Customizer</h2>
        <ul>
          <li><strong>Choose Your Sport:</strong> Select your category from football, basketball, wrestling singlets, baseball, cricket, and more.</li>
          <li><strong>Pick a Base Design:</strong> Browse dozens of modern athletic templates engineered for optimal sublimation aesthetics.</li>
          <li><strong>Customize Colors:</strong> Change primary, secondary, collar, sleeve, and accent colors instantly.</li>
          <li><strong>Add Logos & Text:</strong> Upload your team crest, sponsor graphics, and customize player name/number fonts.</li>
          <li><strong>Request Factory Production:</strong> Submit your 3D design directly to our manufacturing queue for instant pricing and quick production turnaround.</li>
        </ul>

        <h2>Factory Precision from 3D Screen to On-Field Reality</h2>
        <p>Our 3D models are precision-mapped to actual production cut-and-sew patterns. When you approve your 3D design, our automated pre-press systems generate exact dye-sublimation print files, ensuring that the physical sportswear you receive in the USA matches your online creation with pinpoint accuracy.</p>
      </section>
    `
  },
  '/builder/models': {
    title: '3D Custom Jersey Templates & Models | Zarko Sportswear USA',
    description: 'Explore our 3D custom sports uniform templates. Customize sublimation jerseys, singlets, and teamwear online with real-time 3D previews and fast USA delivery.',
    canonical: 'https://www.zarkosportswear.com/builder/models',
    h1: '3D Sports Uniform Templates & Custom Jersey Base Models',
    bodyContent: `
      <section class="seo-content-block">
        <h2>Explore Professional 3D Uniform Templates Across All Sports</h2>
        <p>Discover our expansive library of 3D sports uniform templates engineered for modern athletic performance. Whether you need classic crew neck soccer kits, reversible basketball jerseys, high-cut wrestling singlets, or button-down baseball jerseys, our 3D model catalog offers the ideal foundation for your teamwear project.</p>

        <h2>Featured 3D Model Categories</h2>
        <ul>
          <li><strong>Wrestling Singlets 3D Models:</strong> High-compression ergonomic cut singlets with flatlock seams and silicone leg gripper bands.</li>
          <li><strong>Soccer & Football Kit 3D Models:</strong> Modern athletic fit jerseys with raglan sleeves and breathable side mesh ventilation zones.</li>
          <li><strong>Basketball Uniform 3D Models:</strong> Wide-armhole pro-mesh jerseys and matching lightweight court shorts.</li>
          <li><strong>Baseball & Softball 3D Models:</strong> Full button-down and two-button moisture-wicking jersey templates.</li>
          <li><strong>Cricket & Rugby 3D Models:</strong> UV-shielded cricket kits and heavy-duty reinforced collar rugby jerseys.</li>
        </ul>

        <p>Select any 3D model template above to launch our real-time 3D customizer. Personalize your teamwear with custom colors, logos, and rosters, and receive factory-direct delivery anywhere in the United States.</p>
      </section>
    `
  },
  '/blogs': {
    title: 'Custom Sportswear Blog & Uniform Guides | Zarko Sportswear',
    description: 'Read expert sportswear manufacturing guides, sublimation jersey design tips, fabric comparisons, and team uniform care tutorials from Zarko Sportswear USA.',
    canonical: 'https://www.zarkosportswear.com/blogs',
    h1: 'Zarko Sportswear Blog - Sports Uniform Design Guides & Industry Insights',
    bodyContent: `
      <section class="seo-content-block">
        <h2>Expert Sportswear Manufacturing Guides & Athletic Apparel Trends</h2>
        <p>Welcome to the official Zarko Sportswear knowledge hub. Here we share comprehensive guides, design inspiration, fabric comparison analyses, and practical tips to help coaches, athletic directors, team managers, and sports brands make informed decisions when ordering custom sportswear.</p>

        <h2>Popular Topics & Educational Articles</h2>
        <ul>
          <li><strong>Sublimation Printing vs. Screen Printing:</strong> Why full-dye sublimation is the gold standard for durable, fade-proof sports uniforms.</li>
          <li><strong>Fabric Selection Guide:</strong> Understanding GSM, moisture-wicking microfibers, interlock polyester, and 4-way stretch spandex for high-performance athletics.</li>
          <li><strong>Wrestling Singlet Care & Maintenance:</strong> How to properly wash and preserve elastane compression singlets for multi-season competition.</li>
          <li><strong>Team Roster Ordering Tips:</strong> Best practices for gathering player measurements, sizing charts, and custom numbering schemes.</li>
          <li><strong>Direct-from-Factory Sourcing:</strong> How USA sports clubs save up to 40% on uniform budgets by partnering directly with OEM manufacturers.</li>
        </ul>

        <p>Browse our latest blog posts below to stay up to date with the latest innovations in athletic apparel manufacturing, sublimation technology, and sportswear styling.</p>
      </section>
    `
  },
  '/privacy-policy': {
    title: 'Privacy Policy | Zarko Sportswear USA',
    description: 'Read the Privacy Policy of Zarko Sportswear to understand how we collect, protect, and handle your team order specifications and personal contact information.',
    canonical: 'https://www.zarkosportswear.com/privacy-policy',
    h1: 'Privacy Policy - Zarko Sportswear USA Customer Data Protection',
    bodyContent: `
      <section class="seo-content-block">
        <h2>Our Commitment to Your Privacy & Data Security</h2>
        <p>Zarko Sportswear ("we", "our", or "us") respects your fundamental right to privacy. This comprehensive Privacy Policy outlines how we collect, utilize, store, and safeguard your personal information and team order details when you interact with our website, use our 3D uniform builder, or place custom sportswear orders.</p>

        <h2>Information We Collect</h2>
        <p>We only collect information necessary to process your custom sports uniform inquiries, generate accurate mockups, and deliver your manufactured apparel to your specified address in the United States or globally:</p>
        <ul>
          <li><strong>Contact Information:</strong> Full name, email address, phone/WhatsApp number, and delivery shipping address.</li>
          <li><strong>Team Order Data:</strong> Team rosters, player names, uniform numbers, sizing breakdowns, and vector artwork/logos.</li>
          <li><strong>Technical Usage Data:</strong> Anonymized browser type, device information, and site interaction data for performance optimization.</li>
        </ul>

        <h2>How Your Information is Used & Protected</h2>
        <p>Your personal data and proprietary team logos are strictly used to fulfill manufacturing orders, coordinate shipping logistics, and provide customer support. We implement enterprise-grade SSL encryption and secure server protocols to prevent unauthorized access. We never sell, rent, or trade your personal information to third-party marketing companies.</p>
      </section>
    `
  },
  '/terms': {
    title: 'Terms of Service | Zarko Sportswear USA',
    description: 'Review the Terms of Service for Zarko Sportswear custom sports uniforms manufacturing orders, turnaround times, payments, mockups, and USA delivery policies.',
    canonical: 'https://www.zarkosportswear.com/terms',
    h1: 'Terms of Service - Zarko Sportswear Custom Manufacturing Policies',
    bodyContent: `
      <section class="seo-content-block">
        <h2>Custom Manufacturing Terms, Order Policies & Fulfillment Guidelines</h2>
        <p>Welcome to Zarko Sportswear. By accessing our website, creating designs on our 3D builder, or submitting custom sports apparel manufacturing orders, you agree to comply with and be bound by the following Terms of Service.</p>

        <h2>Key Manufacturing & Ordering Policies</h2>
        <ul>
          <li><strong>Mockup & Artwork Approval:</strong> Before production commences, customers receive a digital proof detailing colors, logos, sizing, and spelling. Final production begins only after explicit client approval.</li>
          <li><strong>Minimum Order Quantities (MOQ):</strong> Standard custom orders start at 15 to 25 units per sport category. Repeat fill-in orders for existing teams receive flexible low-minimum accommodations.</li>
          <li><strong>Production Turnaround Times:</strong> Standard sublimation production takes approximately 10 to 18 business days following digital proof approval, followed by express international air shipping (4–7 business days).</li>
          <li><strong>Quality Guarantee:</strong> We stand 100% behind our manufacturing quality. If any item arrives with a verified manufacturing defect or deviates from the approved proof, we will promptly replace it free of charge.</li>
          <li><strong>Custom Product Returns:</strong> Because all sportswear is custom-made to order with specific rosters, names, and team branding, returns are accepted exclusively for manufacturing defects or shipping damages.</li>
        </ul>
      </section>
    `
  },
  // Sports category pages
  '/football': {
    title: 'Custom Football Uniforms & Jerseys USA | Zarko Sportswear',
    description: 'Design premium custom sublimation football uniforms and team jerseys. Factory-direct durable fabrics, custom numbers, team logos, and fast USA delivery.',
    canonical: 'https://www.zarkosportswear.com/football',
    h1: 'Custom Football & Soccer Uniforms Manufacturer USA',
    bodyContent: `
      <section class="seo-content-block">
        <h2>Professional Custom Sublimation Football & Soccer Kits for USA Teams</h2>
        <p>Zarko Sportswear manufactures championship-quality custom football kits and soccer uniforms engineered for maximum athletic performance, breathability, and durability on the pitch. Supplying youth academies, high schools, competitive clubs, and adult leagues across the USA, our factory-direct football apparel delivers pro-tier craftsmanship at wholesale prices.</p>

        <h2>Engineered Fabric Technology & Features</h2>
        <ul>
          <li><strong>Dri-FIT Moisture Management:</strong> Lightweight 160–180 GSM micro-interlock polyester fabric pulls sweat away from the body to keep players dry and cool during 90+ minutes of high-intensity play.</li>
          <li><strong>Laser-Cut Mesh Ventilation:</strong> Strategic underarm and side-torso mesh inserts optimize airflow and heat dissipation.</li>
          <li><strong>4K Full-Dye Sublimation:</strong> Vivid, high-definition club crests, sponsor graphics, player names, and numbers infused directly into the fabric — guaranteed never to crack, peel, or fade.</li>
          <li><strong>Ergonomic Athletic Cut:</strong> Raglan sleeves and 4-way stretch collar construction allow complete freedom of motion for sprinting, passing, and shooting.</li>
          <li><strong>Complete Kit Packages:</strong> Matching matchday jerseys, training shorts, custom goalkeeper sets with padded elbows, and sublimated socks.</li>
        </ul>

        <h2>Low MOQ & Fast Door-to-Door USA Delivery</h2>
        <p>Order custom soccer kits with a low minimum order of just 25 sets. Our automated manufacturing pipeline ensures rapid production in 10–14 days with express door-to-door air freight to all 50 US states. Contact us today for a free design mockup and team quote.</p>
      </section>
    `
  },
  '/baseball': {
    title: 'Custom Baseball Jerseys & Uniforms USA | Zarko Sportswear',
    description: 'Order premium custom sublimation baseball jerseys and team uniforms. Breathable moisture-wicking fabrics, custom tackle twill, and fast USA delivery.',
    canonical: 'https://www.zarkosportswear.com/baseball',
    h1: 'Custom Baseball Jerseys & Uniforms Manufacturer USA',
    bodyContent: `
      <section class="seo-content-block">
        <h2>Pro-Grade Custom Sublimation & Tackle Twill Baseball Uniforms</h2>
        <p>Upgrade your baseball club's diamond look with custom baseball jerseys and uniforms manufactured by Zarko Sportswear. Designed for high school varsity programs, Little League teams, travel ball tournaments, and college squads across the USA, our jerseys combine classic baseball heritage with modern moisture-wicking performance fabrics.</p>

        <h2>Available Styles & Performance Construction</h2>
        <ul>
          <li><strong>Full Button-Down & Two-Button Jerseys:</strong> Classic pro-style full button fronts with reinforced button plackets and faux-front options.</li>
          <li><strong>Durable Flatback Mesh & Interlock:</strong> High-density 200–220 GSM breathable mesh that withstands sliding, diving, and intensive season play while maximizing air circulation.</li>
          <li><strong>Custom Stitched Tackle Twill & Sublimation:</strong> Choose authentic multi-layer tackle twill embroidery or vibrant all-over dye sublimation for lightweight tournament jerseys.</li>
          <li><strong>Complete Baseball Team Gear:</strong> Match your jerseys with sublimated baseball pants, compression sliding shorts, batting cage jackets, and customized team caps.</li>
        </ul>

        <h2>Factory-Direct USA Wholesale Pricing</h2>
        <p>Eliminate retailer markups by ordering directly from our manufacturing facility. We accommodate custom rosters with player names and front/back numbers at no additional hidden charge. Fast delivery across the United States.</p>
      </section>
    `
  },
  '/wrestling': {
    title: 'Custom Wrestling Singlets & Gear USA | Zarko Sportswear',
    description: 'High-durability custom wrestling singlets, fight shorts, and team gear. Premium 4-way stretch compression spandex engineered for top performance in the USA.',
    canonical: 'https://www.zarkosportswear.com/wrestling',
    h1: 'Custom Wrestling Singlets & Team Gear Manufacturer USA',
    bodyContent: `
      <section class="seo-content-block">
        <h2>Elite Custom Sublimated Wrestling Singlets & Compression Gear</h2>
        <p>Zarko Sportswear is a premier manufacturer of custom wrestling singlets, two-piece fight gear, wrestling fight shorts, and compression shirts for middle schools, high schools, collegiate wrestling programs, and Olympic-style clubs throughout the United States. Engineered for maximum range of motion, muscle support, and brutal mat durability.</p>

        <h2>Superior Wrestling Singlet Engineering</h2>
        <ul>
          <li><strong>Heavyweight 4-Way Stretch Lycra Spandex:</strong> Premium 250–280 GSM compression fabric provides unmatched elasticity, shape retention, and snug ergonomic body contouring.</li>
          <li><strong>Flatlock Reinforced Seam Construction:</strong> Anti-chafe multi-thread flatlock stitching prevents mat burn, skin irritation, and seam blowouts during high-intensity grappling and takedowns.</li>
          <li><strong>Silicone Non-Slip Leg Grippers:</strong> Soft elastic leg bands with integrated silicone micro-dots keep the singlet legs firmly in place during competition.</li>
          <li><strong>Full-Dye Mat-Safe Sublimation:</strong> 100% smooth, weightless graphic infusion with no rough embroidered patches to ensure full compliance with USA Wrestling and NFHS standards.</li>
          <li><strong>Two-Piece Wrestling Uniforms:</strong> Modern compression wrestling tops and matched fight shorts with internal drawstrings for high school dual meets.</li>
        </ul>

        <h2>Low 15-Piece MOQ & Express USA Fulfillment</h2>
        <p>Equip your wrestling roster with customized team singlets starting at just 15 units. Enjoy fast turnaround and direct express air shipping to any wrestling club in the United States.</p>
      </section>
    `
  },
  '/cricket': {
    title: 'Custom Cricket Uniforms & Team Kits USA | Zarko Sportswear',
    description: 'Premium custom sublimation cricket uniforms, test whites, and T20 kits. Ultra-breathable, lightweight mesh fabrics with fast factory shipping across the USA.',
    canonical: 'https://www.zarkosportswear.com/cricket',
    h1: 'Custom Cricket Uniforms & Team Kits Manufacturer USA',
    bodyContent: `
      <section class="seo-content-block">
        <h2>Custom Sublimated Cricket Jerseys, T20 Kits & Test Whites for USA Leagues</h2>
        <p>With cricket growing rapidly across the USA (including Major League Cricket, Minor League Cricket, and regional weekend leagues in Texas, California, New York, and Florida), Zarko Sportswear delivers premier custom cricket uniforms, colored T20 kits, and traditional white test match apparel engineered for all-day comfort under the sun.</p>

        <h2>Cricket Apparel Features & Fabric Technology</h2>
        <ul>
          <li><strong>Micro-Honeycomb Dry-Fit Mesh:</strong> Ultra-lightweight 150 GSM polyester with micro-mesh jacquard texture delivers exceptional heat evaporation for long hours in the field.</li>
          <li><strong>UV 50+ Sun Protection:</strong> Built-in ultraviolet shielding protects players from harmful sun rays during daytime cricket tournaments.</li>
          <li><strong>Polo Collar & Raglan Sleeve Styling:</strong> Classic polo collar with button placket or modern athletic round neck with aerodynamic raglan sleeves.</li>
          <li><strong>Durable Sublimated Cricket Pants:</strong> Elastic waistband trousers with deep ball pockets, reinforced knee panels, and adjustable drawstrings.</li>
        </ul>

        <h2>Custom Team Names, Numbers & Sponsor Logos</h2>
        <p>Personalize your cricket team kits with vibrant 4K sublimation graphics that will never fade in the wash. Quick 25-kit minimum orders and fast factory-direct shipping to the USA.</p>
      </section>
    `
  },
  '/basketball': {
    title: 'Custom Basketball Jerseys & Uniforms USA | Zarko Sportswear',
    description: 'Shop high-performance custom basketball jerseys and reversible uniforms. Premium moisture-wicking mesh fabrics, vibrant sublimation, and fast USA delivery.',
    canonical: 'https://www.zarkosportswear.com/basketball',
    h1: 'Custom Basketball Jerseys & Team Uniforms Manufacturer USA',
    bodyContent: `
      <section class="seo-content-block">
        <h2>Custom Sublimation & Pro-Mesh Basketball Uniforms for USA Teams</h2>
        <p>Dominate the hardwood with high-performance custom basketball jerseys and shorts crafted by Zarko Sportswear. We supply AAU basketball circuits, high school varsity squads, recreation leagues, and 3x3 tournament teams across the United States with lightweight, breathable, and fully customized basketball uniforms.</p>

        <h2>Basketball Uniform Construction & Specifications</h2>
        <ul>
          <li><strong>Pro-Air Mesh & Interlock Fabrics:</strong> 170–190 GSM open-hole or smooth micro-mesh fabric ensures rapid sweat evaporation and lightweight agility.</li>
          <li><strong>Reversible Dual-Layer Options:</strong> Dual-layer sublimated reversible jerseys perfect for practice scrimmages and tournament pool play.</li>
          <li><strong>Wide-Armhole Athletic Cut:</strong> Deep armhole cutouts and ribbed trim deliver unrestricted shooting, rebounding, and defensive mobility.</li>
          <li><strong>Pro-Length Basketball Shorts:</strong> 2-inch heavy-duty elastic waistband with durable inner drawstring and modern mid-thigh or classic on-knee lengths.</li>
        </ul>

        <h2>Factory-Direct Pricing & Fast USA Delivery</h2>
        <p>Order custom basketball kits with customized team logos, front/back numbers, and player names. Quick production turnaround and reliable express shipping to all 50 US states.</p>
      </section>
    `
  },
  '/hockey': {
    title: 'Custom Field Hockey Uniforms & Jerseys USA | Zarko Sportswear',
    description: 'Design durable custom field hockey uniforms and team jerseys. Reinforced pro stitching, breathable athletic fabrics, and fast factory shipping to USA clubs.',
    canonical: 'https://www.zarkosportswear.com/hockey',
    h1: 'Custom Field Hockey Uniforms & Apparel Manufacturer USA',
    bodyContent: `
      <section class="seo-content-block">
        <h2>High-Performance Custom Field Hockey Uniforms & Team Kits</h2>
        <p>Zarko Sportswear manufactures durable, lightweight custom field hockey jerseys, player skirts, compression shorts, and team apparel for high school programs, NCAA collegiate teams, and club leagues throughout the United States. Designed for explosive lateral agility, stick-handling flexibility, and superior ventilation.</p>

        <h2>Field Hockey Apparel Features</h2>
        <ul>
          <li><strong>Durable Poly-Interlock Fabric:</strong> 180 GSM tear-resistant athletic polyester designed to withstand high-impact turf play.</li>
          <li><strong>Ergonomic Athletic Tops & Racerback Tanks:</strong> Available in short-sleeve, cap-sleeve, and sleeveless racerback cuts for unrestricted stick rotation.</li>
          <li><strong>Sublimated Match Skirts & Skorts:</strong> Lightweight performance skirts featuring built-in 4-way stretch spandex compression undershorts.</li>
          <li><strong>All-Over Sublimation:</strong> Vivid team colors, sponsor emblems, and individual player numbers infused into the fabric for everlasting vibrancy.</li>
        </ul>

        <p>Request a free digital mockup for your field hockey squad today with low MOQs and fast USA shipping.</p>
      </section>
    `
  },
  '/rugby': {
    title: 'Custom Rugby Jerseys & Team Kits USA | Zarko Sportswear',
    description: 'Engineered tough custom rugby jerseys, shorts, and team kits. Heavy-duty tear-resistant stretch fabrics designed for high-impact play with fast USA shipping.',
    canonical: 'https://www.zarkosportswear.com/rugby',
    h1: 'Custom Rugby Jerseys & Heavy-Duty Teamwear Manufacturer USA',
    bodyContent: `
      <section class="seo-content-block">
        <h2>Tear-Resistant Custom Sublimated Rugby Jerseys & Shorts for USA Clubs</h2>
        <p>Rugby demands the toughest apparel on the planet. Zarko Sportswear manufactures battle-tested custom rugby jerseys, scrum shorts, and warmup gear for USA Rugby affiliated clubs, collegiate rugby conferences, and youth sevens academies across North America.</p>

        <h2>Rugby Uniform Specifications & Toughness</h2>
        <ul>
          <li><strong>280–320 GSM Heavy-Duty Poly-Elastane:</strong> Super-tough high-tensile fabric built to withstand scrums, tackles, rucks, and aggressive gripping without tearing.</li>
          <li><strong>Multi-Stitch Reinforced Bar-Tacking:</strong> All critical stress points, collar junctions, and armholes feature triple-needle reinforced stitching.</li>
          <li><strong>Mandarin & Loop Neck Collar Styles:</strong> Ergonomic low-profile collars designed to minimize tackle grab opportunities on the field.</li>
          <li><strong>Heavy Cotton-Twill Rugby Shorts:</strong> Rugged shorts with elasticated waistbands, internal drawstrings, and stretch crotch panels for explosive scrums.</li>
        </ul>

        <p>Order custom 15s and 7s rugby team kits directly from the manufacturer with custom team colors, logos, and fast USA delivery.</p>
      </section>
    `
  },
  '/tennis': {
    title: 'Custom Tennis Apparel & Team Uniforms USA | Zarko Sportswear',
    description: 'Premium custom tennis shirts, polos, skirts, and athletic apparel for clubs and schools. Lightweight, UV-protective fabrics with fast USA turnaround.',
    canonical: 'https://www.zarkosportswear.com/tennis',
    h1: 'Custom Tennis Apparel & Teamwear Manufacturer USA',
    bodyContent: `
      <section class="seo-content-block">
        <h2>Sophisticated Custom Tennis Shirts, Polos, Skirts & Club Wear</h2>
        <p>Elevate your club or school tennis program with bespoke tennis apparel manufactured by Zarko Sportswear. We supply high school tennis teams, country clubs, collegiate tennis programs, and private academies across the USA with lightweight, UV-protected, and elegantly tailored court apparel.</p>

        <h2>Tennis Uniform Highlights</h2>
        <ul>
          <li><strong>Ultra-Light 140 GSM Microfiber:</strong> Featherlight moisture-management fabric prevents cling and optimizes swing biomechanics.</li>
          <li><strong>Built-in UPF 50+ Sun Defense:</strong> Essential UV protection for sunny outdoor matches and coaching sessions.</li>
          <li><strong>Custom Tennis Polos & Tops:</strong> Tailored button collars, zip plackets, and sleeveless options with crisp sublimation graphics.</li>
          <li><strong>Pleated & Flat-Front Skorts:</strong> Athletic skorts with integrated compression undershorts and dedicated ball-holding pockets.</li>
        </ul>

        <p>Enjoy low minimum order quantities and direct-to-club express shipping across the USA.</p>
      </section>
    `
  },
  '/running': {
    title: 'Custom Running Gear & Track Uniforms USA | Zarko Sportswear',
    description: 'High-performance custom running singlets, track uniforms, and athletic shorts. Ultra-lightweight moisture-management fabrics with fast shipping across the USA.',
    canonical: 'https://www.zarkosportswear.com/running',
    h1: 'Custom Track & Field Running Uniforms Manufacturer USA',
    bodyContent: `
      <section class="seo-content-block">
        <h2>Ultra-Lightweight Custom Track & Field Singlets and Cross Country Kits</h2>
        <p>Zarko Sportswear manufactures elite custom running singlets, track and field team kits, marathon apparel, and cross-country teamwear for high schools, universities, and running clubs throughout the United States. Designed to minimize weight and eliminate friction over long distances.</p>

        <h2>Running Apparel Engineering</h2>
        <ul>
          <li><strong>Featherlight 120–130 GSM Micro-Mesh:</strong> High-filament hydrophobic polyester ensures rapid moisture dispersion and zero drag.</li>
          <li><strong>Anti-Chafe Bonded Seams:</strong> Smooth seam construction engineered specifically to prevent chafing on long-distance runs and sprints.</li>
          <li><strong>Reflective Safety Accents:</strong> Optional 3M reflective trims and logos for low-light morning and evening road running.</li>
          <li><strong>Split-Leg Running Shorts:</strong> 3-inch and 5-inch inseam track shorts with breathable inner briefs and moisture-wicking waistbands.</li>
        </ul>

        <p>Get custom sublimation track uniforms customized with school mascots, team names, and numbers with fast factory shipping to the USA.</p>
      </section>
    `
  },
  '/gym': {
    title: 'Custom Gym Wear & Fitness Activewear USA | Zarko Sportswear',
    description: 'Factory-direct custom gym wear, workout hoodies, compression shirts, and joggers. Premium stretch fabrics tailored for fitness brands and gyms across the USA.',
    canonical: 'https://www.zarkosportswear.com/gym',
    h1: 'Custom Gym Wear & Fitness Activewear Manufacturer USA',
    bodyContent: `
      <section class="seo-content-block">
        <h2>Private Label Gym Clothing & Custom Fitness Activewear for USA Brands</h2>
        <p>Launch or scale your fitness apparel line with Zarko Sportswear's private label gym wear manufacturing services. We produce premium workout shirts, pump covers, compression leggings, athletic hoodies, and gym shorts for fitness centers, CrossFit boxes, and athletic apparel brands across the USA.</p>

        <h2>Gym Apparel Manufacturing Options</h2>
        <ul>
          <li><strong>Cotton-Spandex & Tri-Blend Blends:</strong> Ultra-soft 95% combed cotton / 5% elastane blends that flatter athletic physiques while providing 4-way stretch.</li>
          <li><strong>Dry-Tech Performance Tees:</strong> Anti-odor, quick-drying polyester athletic shirts for high-intensity gym training.</li>
          <li><strong>Heavyweight French Terry Hoodies & Joggers:</strong> 350–400 GSM premium cotton fleece for stylish athletic street style and warmups.</li>
          <li><strong>Custom Branding Services:</strong> Woven neck labels, custom hangtags, screen printing, high-density silicone prints, and 4K sublimation.</li>
        </ul>

        <p>Partner directly with a proven sports apparel manufacturer. Low MOQs, OEM capabilities, and reliable USA delivery.</p>
      </section>
    `
  },
  '/softball': {
    title: 'Custom Softball Jerseys & Uniforms USA | Zarko Sportswear',
    description: 'Design custom softball jerseys, pants, and team uniforms. Sublimation printing, moisture-wicking stretch fabric, custom team rosters, and fast USA delivery.',
    canonical: 'https://www.zarkosportswear.com/softball',
    h1: 'Custom Softball Jerseys & Fastpitch Uniforms Manufacturer USA',
    bodyContent: `
      <section class="seo-content-block">
        <h2>Custom Fastpitch Softball Uniforms & Sublimated Jerseys for USA Teams</h2>
        <p>Equip your fastpitch softball squad with high-quality custom softball jerseys, matching pants, and team outerwear manufactured by Zarko Sportswear. We supply travel ball organizations, high school softball teams, and adult slowpitch leagues across the United States with durable, vibrant, and perfectly tailored women's and girls' athletic uniforms.</p>

        <h2>Softball Uniform Features & Options</h2>
        <ul>
          <li><strong>Female-Specific Athletic Cut:</strong> Contoured athletic tailoring designed for full arm extension, pitching windups, and sliding mobility.</li>
          <li><strong>Two-Button, Full Button & Sleeveless Options:</strong> Choose classic full button-down, modern two-button plackets, or lightweight sleeveless jerseys.</li>
          <li><strong>Durable 200 GSM Sliding Mesh:</strong> Moisture-wicking, stain-resistant polyester built to withstand dirt slides and intense tournament play.</li>
          <li><strong>Matching Fastpitch Softball Pants:</strong> Low-rise and mid-rise softball pants with double-layer reinforced knees and elasticized cuffs.</li>
        </ul>

        <p>Order custom sublimated softball jerseys with custom player names and numbers with quick USA delivery.</p>
      </section>
    `
  },
  '/soccer': {
    title: 'Custom Soccer Jerseys & Uniforms USA | Zarko Sportswear',
    description: 'Design premium custom soccer jerseys, goalie kits, and team uniforms. Full sublimation printing, breathable mesh, and fast shipping to USA soccer clubs.',
    canonical: 'https://www.zarkosportswear.com/soccer',
    h1: 'Custom Soccer Jerseys & Team Kits Manufacturer USA',
    bodyContent: `
      <section class="seo-content-block">
        <h2>Custom Sublimated Soccer Jerseys & Complete Kits for USA Clubs</h2>
        <p>Zarko Sportswear is a trusted manufacturer of custom soccer jerseys, goalkeeper kits, and training tracksuits for youth soccer academies, adult recreation leagues, and competitive travel clubs across the United States. Our soccer uniforms combine modern European club styling with advanced moisture-wicking performance fabrics.</p>

        <h2>Soccer Uniform Technology & Customization</h2>
        <ul>
          <li><strong>Aerodynamic Micro-Poly Fabric:</strong> 160 GSM lightweight performance polyester for zero-drag sprinting and all-match comfort.</li>
          <li><strong>Sublimated Club Crests & Sponsors:</strong> Crisp, photorealistic printing that will never peel off, crack, or fade in the wash.</li>
          <li><strong>Custom Goalkeeper Uniforms:</strong> Long-sleeve keeper jerseys with optional ergonomic elbow padding and matching padded goalie pants/shorts.</li>
          <li><strong>Complete Youth & Adult Sizing:</strong> Sizing from Youth Extra Small (YXS) through Adult 4XL with tailored cuts for men, women, and youth.</li>
        </ul>

        <p>Order custom soccer jerseys with factory-direct pricing, 25-kit low minimums, and fast USA delivery.</p>
      </section>
    `
  },
  '/volleyball': {
    title: 'Custom Volleyball Jerseys & Uniforms USA | Zarko Sportswear',
    description: 'Premium custom volleyball jerseys, spandex shorts, and warmups. Ergonomic form-fitting cuts, vibrant sublimation graphics, and fast turnaround across the USA.',
    canonical: 'https://www.zarkosportswear.com/volleyball',
    h1: 'Custom Volleyball Jerseys & Uniforms Manufacturer USA',
    bodyContent: `
      <section class="seo-content-block">
        <h2>Custom Sublimated Indoor & Beach Volleyball Uniforms for USA Teams</h2>
        <p>Elevate your volleyball team's court presence with custom volleyball jerseys, long-sleeve athletic tops, and performance spandex shorts from Zarko Sportswear. We supply high school programs, club volleyball academies, and collegiate teams across the USA with high-stretch, breathable, and beautifully sublimated volleyball apparel.</p>

        <h2>Volleyball Apparel Features</h2>
        <ul>
          <li><strong>Sleeveless, Short-Sleeve & Long-Sleeve Cuts:</strong> Available in modern athletic crew neck or V-neck styling engineered for overhead spiking and diving.</li>
          <li><strong>4-Way Stretch Poly-Spandex:</strong> 180–200 GSM stretch fabric provides complete freedom of movement and ergonomic compression.</li>
          <li><strong>4-Inch Inseam Spandex Shorts:</strong> High-compression non-see-through volleyball shorts with wide stay-put comfort waistbands.</li>
          <li><strong>Libero Contrasting Jerseys:</strong> Easily order matching or contrasting Libero jerseys within the same team production run.</li>
        </ul>

        <p>Design your custom volleyball team uniforms with full sublimation graphics, custom rosters, and fast USA shipping.</p>
      </section>
    `
  },
  '/ice-hockey': {
    title: 'Custom Ice Hockey Jerseys & Uniforms USA | Zarko Sportswear',
    description: 'Heavyweight custom ice hockey jerseys and team uniforms. Pro-grade air knit mesh fabrics, fight straps, reinforced elbows, and fast delivery to USA teams.',
    canonical: 'https://www.zarkosportswear.com/ice-hockey',
    h1: 'Custom Ice Hockey Jerseys & Team Uniforms Manufacturer USA',
    bodyContent: `
      <section class="seo-content-block">
        <h2>Heavyweight Pro-Grade Custom Ice Hockey Sweaters & Jerseys USA</h2>
        <p>Zarko Sportswear manufactures authentic pro-grade custom ice hockey jerseys, practice pinnies, and hockey socks for youth hockey leagues, high school varsity teams, collegiate club programs, and adult beer league squads across the United States and Canada.</p>

        <h2>Ice Hockey Jersey Specifications</h2>
        <ul>
          <li><strong>220–250 GSM Heavyweight Pro-Air Knit Mesh:</strong> Heavy-duty, snag-resistant polyester designed to slide over hockey shoulder and elbow pads without binding.</li>
          <li><strong>Reinforced Double Shoulders & Elbows:</strong> Multi-layer fabric reinforcement on high-friction areas for exceptional on-ice durability.</li>
          <li><strong>Authentic Fight Straps & Lace-Up Collars:</strong> Optional sewn-in fight straps and classic lace-up neckline detailing for an authentic NHL-inspired look.</li>
          <li><strong>Sublimation or Stitched Tackle Twill:</strong> Choose full-dye sublimation for complex gradient artwork or traditional tackle twill embroidered crests and numbers.</li>
        </ul>

        <p>Order custom ice hockey jerseys with player names, back numbers, and captain C/A patches. Fast factory shipping to USA rinks.</p>
      </section>
    `
  },
  '/shoes': {
    title: 'Custom Sports Shoes & Athletic Turf Footwear USA | Zarko',
    description: 'High-performance custom athletic turf shoes, team cleats, and training sneakers. Engineered for superior grip, agility, and comfort with fast USA delivery.',
    canonical: 'https://www.zarkosportswear.com/shoes',
    h1: 'Custom Athletic Turf Shoes & Team Footwear Manufacturer USA',
    bodyContent: `
      <section class="seo-content-block">
        <h2>High-Performance Custom Sports Shoes, Cleats & Turf Trainers for USA Athletes</h2>
        <p>Step onto the field with custom athletic footwear engineered for maximum traction, lateral stability, and shock absorption. Zarko Sportswear manufactures customized team turf shoes, training sneakers, and sport-specific footwear for athletic organizations across the United States.</p>

        <h2>Athletic Footwear Features & Construction</h2>
        <ul>
          <li><strong>High-Traction Multi-Directional Outsoles:</strong> Specially molded rubber studs deliver superior grip on artificial turf, indoor hard courts, and outdoor grass fields.</li>
          <li><strong>Breathable Mesh & Synthetic Leather Uppers:</strong> Lightweight engineered mesh combined with reinforced synthetic overlays provides lightweight support and long-lasting durability.</li>
          <li><strong>Cushioned EVA Midsole:</strong> High-rebound ethylene-vinyl acetate foam absorbs impact forces and reduces foot fatigue during intense tournament play.</li>
          <li><strong>Custom Team Colors & Molded Branding:</strong> Integrate your organization's signature colors, team crests, and custom lace accents.</li>
        </ul>

        <p>Contact Zarko Sportswear today for bulk team shoe manufacturing orders and custom wholesale pricing for USA distributors.</p>
      </section>
    `
  },
  '/gloves': {
    title: 'Custom Sports Gloves & Goalkeeper Gear USA | Zarko Sportswear',
    description: 'Professional custom sports gloves, soccer goalkeeper gloves, and batting hand protectors. All-weather grip latex, custom logo printing, and fast USA shipping.',
    canonical: 'https://www.zarkosportswear.com/gloves',
    h1: 'Custom Sports Gloves & Goalkeeper Hand Protection Manufacturer USA',
    bodyContent: `
      <section class="seo-content-block">
        <h2>Professional Custom Goalkeeper Gloves, Batting Gloves & Sports Handwear</h2>
        <p>Protect your hands and maximize ball grip with high-performance custom sports gloves manufactured by Zarko Sportswear. We supply custom soccer goalkeeper gloves, baseball batting gloves, weightlifting handwear, and football receiver gloves to teams and sports brands across the USA.</p>

        <h2>Sports Glove Engineering & Materials</h2>
        <ul>
          <li><strong>German Contact Latex Palms:</strong> 4mm ultra-grip professional latex foam provides exceptional shot-stopping grip in both wet and dry match conditions.</li>
          <li><strong>Removable Finger-Save Spines:</strong> Optional rigid finger protection inserts prevent hyperextension during high-velocity ball saves.</li>
          <li><strong>Breathable Neoprene & Mesh Backhands:</strong> Ergonomic 3D embossed backhands with integrated silicone punch zones and flexible airflow panels.</li>
          <li><strong>Custom Wrist Straps & Branding:</strong> Full latex or elastic wrist wraps customized with your club name, personal signature, or team crest.</li>
        </ul>

        <p>Order professional custom sports gloves directly from our specialized manufacturing facility with fast USA shipping.</p>
      </section>
    `
  },
  '/caps': {
    title: 'Custom Team Caps & Sports Headwear USA | Zarko Sportswear',
    description: 'Order custom embroidered team caps, snapbacks, performance beanies, and athletic visors. Premium fabrics, 3D embroidery, and fast shipping across the USA.',
    canonical: 'https://www.zarkosportswear.com/caps',
    h1: 'Custom Team Caps & Sports Headwear Manufacturer USA',
    bodyContent: `
      <section class="seo-content-block">
        <h2>Custom Embroidered Team Caps, Snapbacks, Visors & Athletic Headwear</h2>
        <p>Complete your team's on-field and sideline look with premium custom headwear manufactured by Zarko Sportswear. Supplying baseball programs, golf clubs, tennis academies, and streetwear apparel brands throughout the United States with high-precision embroidered hats and performance caps.</p>

        <h2>Headwear Styles & Customization Features</h2>
        <ul>
          <li><strong>Classic 6-Panel & 5-Panel Caps:</strong> Structured and unstructured crowns available in high-grade acrylic-wool blends, cotton twill, and moisture-wicking poly.</li>
          <li><strong>High-Density 3D Puff Embroidery:</strong> Bold, raised embroidery delivers premium depth and crisp detail for team logos and initials.</li>
          <li><strong>Closure Options:</strong> Premium plastic snapbacks, adjustable brass buckle strapbacks, flexible stretch-fit bands, or hook-and-loop velcro.</li>
          <li><strong>Performance Laser-Perforated Visors & Beanies:</strong> Breathable perforated athletic caps for hot summer matches and knit acrylic beanies for cold weather training.</li>
        </ul>

        <p>Elevate your club merchandise with custom headwear. Low minimum order quantities and fast factory-direct shipping to the USA.</p>
      </section>
    `
  },
  '/bags': {
    title: 'Custom Sports Bags & Team Duffels USA | Zarko Sportswear',
    description: 'Durable custom team sports bags, equipment duffels, and gear backpacks. Heavy-duty water-resistant fabrics, custom embroidery, and fast USA fulfillment.',
    canonical: 'https://www.zarkosportswear.com/bags',
    h1: 'Custom Sports Bags & Team Equipment Duffels Manufacturer USA',
    bodyContent: `
      <section class="seo-content-block">
        <h2>Heavy-Duty Custom Sublimated Team Bags, Equipment Duffels & Backpacks</h2>
        <p>Keep your team organized on road trips and tournament weekends with custom sports bags and athletic duffels manufactured by Zarko Sportswear. Built from heavy-duty water-resistant materials, our bags are engineered to haul bulky pads, cleats, uniforms, and sports gear across the United States.</p>

        <h2>Sports Bag Construction & Durability Features</h2>
        <ul>
          <li><strong>600D to 1200D Ballistic Polyester:</strong> Ultra-tough water-resistant canvas fabric reinforced to resist tearing, scuffing, and heavy equipment loads.</li>
          <li><strong>Dedicated Ventilated Shoe & Cleat Compartments:</strong> Separate zippered shoe compartments keep muddy footwear and damp gear isolated from clean uniforms.</li>
          <li><strong>Heavy-Duty SBS Zippers & Reinforced Handles:</strong> Commercial-grade metal zippers with reinforced padded carry handles and adjustable padded shoulder straps.</li>
          <li><strong>Full Team Customization:</strong> Sublimated side panels, embroidered crests, individual player numbers, and dedicated personalized nametags.</li>
        </ul>

        <p>Equip your team with matching custom athletic duffel bags and backpacks. Factory-direct wholesale pricing and express USA shipping.</p>
      </section>
    `
  }
};

function optimizeHtmlAssets(htmlContent) {
  let res = htmlContent;
  // Remove 3D modulepreload from initial landing page to prevent downloading 936kB Three.js on homepage
  res = res.replace(/<link\s+rel="modulepreload"\s+crossorigin\s+href="\/assets\/vendor-three-[^"]+\.js"\s*\/?>\s*/gi, '');
  return res;
}

function runPrerender() {
  if (!fs.existsSync(INDEX_HTML_PATH)) {
    console.error(`Error: index.html not found at ${INDEX_HTML_PATH}`);
    process.exit(1);
  }

  let baseHtml = fs.readFileSync(INDEX_HTML_PATH, 'utf-8');
  baseHtml = optimizeHtmlAssets(baseHtml);
  fs.writeFileSync(INDEX_HTML_PATH, baseHtml, 'utf-8');
  console.log(`Optimized root index.html asset preloads.`);

  console.log(`Starting pre-rendering for ${Object.keys(routesData).length} routes...`);

  Object.entries(routesData).forEach(([route, meta]) => {
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

    // 6. Inject Rich SEO Content for Search Crawlers (350-500+ Words) without causing visual layout shift
    const staticCrawlerMarkup = `
  <section class="seo-crawler-content" style="position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden;" aria-label="${escapeAttr(meta.title)}">
    <h1>${meta.h1}</h1>
    ${meta.bodyContent}
  </section>`;

    const crawlerRegex = /<section class="seo-crawler-content"[^]*?<\/section>/i;
    if (crawlerRegex.test(html)) {
      html = html.replace(crawlerRegex, staticCrawlerMarkup.trim());
    } else {
      html = html.replace('</noscript>', `</noscript>\n${staticCrawlerMarkup}`);
    }

    // Write file to route directory
    const outputFilePath = path.join(routeDir, 'index.html');
    fs.writeFileSync(outputFilePath, html, 'utf-8');
    console.log(`Successfully pre-rendered: ${route} (${meta.title}) -> ${outputFilePath}`);
  });

  console.log('Pre-rendering finished successfully!');
}

runPrerender();
