import ingestedCategories from './products.json';

const defaultGradient = 'from-indigo-600 via-indigo-500 to-blue-500';
const defaultAccent = {
  check: 'text-indigo-500',
  chip: 'bg-indigo-100 text-indigo-700',
  button: 'bg-indigo-600 hover:bg-indigo-700',
  pill: 'bg-indigo-50 border border-indigo-100 text-indigo-600',
};

export const categoryConfigs = {
  football: {
    name: 'American Football Uniforms & Gear',
    heroDescription: 'Engineered for high-impact gridiron action. NFHS & NCAA compliant custom football uniforms featuring heavy double-knit dazzle, reinforced yoke, and integrated pad pants.',
    gradient: defaultGradient,
    accent: { ...defaultAccent },
    seoTitle: "Custom American Football Uniforms & Sublimated Jerseys Wholesale | Zarko",
    seoDescription: "Order NFHS compliant custom American football uniforms wholesale direct from Sialkot factory. Heavyweight dazzle & interlock, integrated 7-pad pants, low 15-set MOQ.",
    seoKeywords: "custom american football uniforms, wholesale football jerseys, tackle twill football jerseys USA, integrated football pants, sublimated football uniforms Sialkot, direct manufacturer football apparel",
    technicalSpecs: {
      fabric: "220-260 GSM Heavyweight Pro-Interlock with Spandex Flex Panels & Dazzle Cowl",
      printing: "4K Full dye-sublimation or premium stitched tackle-twill numbers",
      compliance: "NFHS & NCAA gridiron uniform regulations compliant",
      moq: "15 sets per design",
      shipping: "Door-to-Door DDP Air Express (4-6 business days to USA/Canada)",
      sizing: "Youth XS to Adult 4XL (Pad-compatible sizing charts available)"
    },
    featured: {
      name: 'Championship American Football Game Uniform',
      image: '/images/hero_football.webp',
      description:
        'Engineered for maximum tackle tear-resistance and speed. Features reinforced double-ply shoulder yoke for pad clearance, spandex side inserts, and breathable moisture-control interlock.',
      details: [
        'Heavy-duty 240-260 GSM interlock fabric with dazzle cowl',
        'Reinforced double-layered shoulders built for pad clearance',
        'Spandex side and underarm panels for full range of motion',
        'Full dye-sublimation or custom tackle twill embroidery',
        'Bar-tacked high stress points for maximum tackle resistance',
        'Includes customizable game jersey and integrated pad pants',
        'Custom team roster names and numbers included',
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL'],
    },
    products: [
      { name: 'Elite Game Jersey (Tackle Twill)', image: '/images/hero_football.webp' },
      { name: 'Integrated 7-Pad Football Pants', image: '/images/slide1.jpg' },
      { name: 'Porthole Mesh Practice Jersey', image: '/images/slide2.jpg' },
      { name: 'Compression Padded Girdle', image: '/images/hero_football.webp' },
      { name: 'Sublimated High School Uniform Set', image: '/images/slide1.jpg' },
      { name: 'Slotted Football Game Pants', image: '/images/slide2.jpg' },
      { name: 'Youth Tackle Football Kit', image: '/images/hero_football.webp' },
      { name: 'Coach Sideline Polo & Tech Shorts', image: '/images/slide1.jpg' },
    ],
  },
  cricket: {
    name: 'Cricket Kits & Apparel',
    heroDescription: 'Lightweight, UV-shielded cricket kits designed for long field innings, featuring advanced dry-fit mesh panels for optimum heat release.',
    gradient: defaultGradient,
    accent: { ...defaultAccent },
    seoTitle: "Custom Cricket Kits & Team Uniforms Wholesale | Zarko Sportswear",
    seoDescription: "Buy premium custom cricket kits and team jerseys direct from Sialkot factory. Moisture-wicking dry-fit mesh, UV protection, fast shipping.",
    seoKeywords: "custom cricket uniforms, wholesale cricket jerseys, cricket kits supplier Pakistan, custom cricket uniforms wholesale, dry fit cricket shirts",
    technicalSpecs: {
      fabric: "150-170 GSM Dry-Fit Polyester with UV protection",
      printing: "Full digital dye-sublimation with Japanese inks",
      compliance: "ICC standards compliant layout and branding areas",
      moq: "15 sets per design",
      shipping: "Worldwide express shipping (DHL/FedEx)",
      sizing: "Standard sizing charts (Youth & Adult)"
    },
    featured: {
      name: 'Premium Cricket Kit Pro',
      image: '/images/slide2.jpg',
      description:
        'Professional-grade cricket apparel with advanced moisture-wicking tech, breathable mesh panels, and reinforced stitching for durability during intense matches.',
      details: [
        'Advanced moisture-wicking fabric for all-day comfort',
        'Breathable mesh panels for enhanced ventilation',
        'Reinforced stitching at stress points',
        'Sublimation printing that never fades',
        'Available in custom team colors',
        'UV protection for outdoor play',
        'Quick-dry technology',
        'Custom logo and name printing available',
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'],
    },
    products: [
      { name: 'Cricket Kit A', image: '/images/slide2.jpg' },
      { name: 'Cricket Kit B', image: '/images/slide1.jpg' },
      { name: 'T20 Jersey', image: '/images/slide2.jpg' },
      { name: 'Test Jersey', image: '/images/slide1.jpg' },
      { name: 'ODI Kit Pro', image: '/images/slide2.jpg' },
      { name: 'Training Jersey', image: '/images/slide1.jpg' },
      { name: 'Wicket Keeper Kit', image: '/images/slide2.jpg' },
      { name: 'Team Bundle', image: '/images/slide1.jpg' },
    ],
  },
  basketball: {
    name: 'Basketball Kits & Apparel',
    heroDescription: 'Wide-armhole mesh basketball jerseys designed to facilitate broad range of arm motion and dynamic court cuts with rapid moisture evaporation.',
    gradient: defaultGradient,
    accent: { ...defaultAccent },
    seoTitle: "Custom Basketball Uniforms & Sublimated Jerseys Wholesale | Zarko",
    seoDescription: "Order custom basketball uniforms and mesh jerseys wholesale direct from factory. High breathability mesh, NFHS compliant designs, low MOQ.",
    seoKeywords: "custom basketball uniforms, wholesale basketball jerseys, basketball jersey manufacturer, sublimated basketball uniforms USA",
    technicalSpecs: {
      fabric: "160-190 GSM Breathable Poly Mesh & Interlock Polyester",
      printing: "Digital dye-sublimation or premium screen-printing options",
      compliance: "NFHS compliant designs and numbers",
      moq: "15 sets per design",
      shipping: "Direct factory wholesale shipping worldwide",
      sizing: "Standard loose basketball fitment size charts"
    },
    featured: {
      name: 'Pro Basketball Kit Elite',
      image: '/images/slide1.jpg',
      description:
        'Premium basketball uniforms featuring breathable mesh construction and moisture-wicking technology for peak athletic performance on the court.',
      details: [
        'Breathable mesh fabric for maximum airflow',
        'Moisture-wicking technology keeps you dry',
        'Lightweight design for agility and speed',
        'Reinforced stitching for durability',
        'Vibrant sublimation printing',
        'Available in custom team colors',
        'Quick-dry material',
        'Perfect fit for unrestricted movement',
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'],
    },
    products: [
      { name: 'Basketball Kit A', image: '/images/slide1.jpg' },
      { name: 'Basketball Kit B', image: '/images/slide2.jpg' },
      { name: 'Slam Dunk Jersey', image: '/images/slide1.jpg' },
      { name: 'Training Shorts', image: '/images/slide2.jpg' },
      { name: 'Pro Basketball Set', image: '/images/slide1.jpg' },
      { name: 'Youth Kit', image: '/images/slide2.jpg' },
      { name: 'Shooting Shirt', image: '/images/slide1.jpg' },
      { name: 'Team Bundle', image: '/images/slide2.jpg' },
    ],
  },
  wrestling: {
    name: 'Wrestling Singlets & Gear',
    heroDescription: 'High-compression spandex wrestling singlets with 4-way stretch zones and flatlock stitching for maximum comfort and durability on the mat.',
    gradient: defaultGradient,
    accent: { ...defaultAccent },
    seoTitle: "Custom Wrestling Singlets & Gear Manufacturer | Zarko",
    seoDescription: "Order NFHS compliant custom wrestling singlets direct from the manufacturer. Premium 4-way stretch compression lycra and double flatlock seams. Low MOQ!",
    seoKeywords: "custom wrestling singlets, wrestling gear manufacturer, USA wrestling uniforms, custom wrestling singlets direct factory, sublimated wrestling gear, NFHS compliant singlets",
    technicalSpecs: {
      fabric: "280 GSM Premium 4-Way Stretch Lycra/Spandex",
      printing: "Full-color 4K sublimation (fade-resistant)",
      compliance: "NFHS Uniform Rule Compliant & USA Wrestling Approved",
      moq: "15 pieces per design",
      shipping: "3-5 business days express delivery to USA",
      sizing: "Youth XS to Adult 4XL (detailed size guides available)"
    },
    featured: {
      name: 'Pro Wrestling Singlet Elite',
      image: '/images/slide1.jpg',
      description:
        'Four-way stretch fabric for maximum flexibility and freedom of movement, with reinforced stitching that withstands the most demanding matches.',
      details: [
        'Four-way stretch fabric for flexibility',
        'Moisture-wicking and quick-dry technology',
        'Reinforced flatlock seams',
        'Compression fit for muscle support',
        'Sublimation printing that will not fade',
        'Anti-microbial fabric treatment',
        'Custom team colors and logos',
        'Competition-approved design',
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    },
    products: [
      { name: 'Wrestling Singlet A', image: '/images/slide1.jpg' },
      { name: 'Wrestling Singlet B', image: '/images/slide2.jpg' },
      { name: 'Training Gear', image: '/images/slide1.jpg' },
      { name: 'Competition Set', image: '/images/slide2.jpg' },
      { name: 'Practice Singlet', image: '/images/slide1.jpg' },
      { name: 'Team Bundle', image: '/images/slide2.jpg' },
      { name: 'Youth Singlet', image: '/images/slide1.jpg' },
      { name: 'Pro Kit', image: '/images/slide2.jpg' },
    ],
  },
  hockey: {
    name: 'Hockey Kits & Apparel',
    heroDescription: 'Durable, flexible uniforms engineered for fast-paced play.',
    gradient: defaultGradient,
    accent: { ...defaultAccent },
    featured: {
      name: 'Pro Hockey Kit Elite',
      image: '/images/slide2.jpg',
      description:
        'Durable fabrics with flexible panels keep you agile on the ice while resisting wear and tear.',
      details: [
        'Abrasion-resistant fabric',
        'Mesh ventilation zones for cooling',
        'Reinforced stitching at stress points',
        'Moisture-wicking, quick-dry properties',
        'Custom team colors and branding',
        'Lightweight for unrestricted movement',
        'Sublimated graphics that never fade',
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    },
    products: [
      { name: 'Hockey Kit A', image: '/images/slide2.jpg' },
      { name: 'Hockey Kit B', image: '/images/slide1.jpg' },
      { name: 'Training Jersey', image: '/images/slide2.jpg' },
      { name: 'Goalie Set', image: '/images/slide1.jpg' },
      { name: 'Practice Kit', image: '/images/slide2.jpg' },
      { name: 'Match Bundle', image: '/images/slide1.jpg' },
    ],
  },
  rugby: {
    name: 'Rugby Kits & Apparel',
    heroDescription: 'Tough, breathable jerseys built for the hardest hits and scrums.',
    gradient: defaultGradient,
    accent: { ...defaultAccent },
    featured: {
      name: 'Rugby Kit Elite',
      image: '/images/slide1.jpg',
      description:
        'Reinforced seams and resilient fabrics provide ultimate durability on the pitch, with breathable panels for comfort.',
      details: [
        'High-strength fabric with reinforced seams',
        'Breathable mesh ventilation',
        'Moisture control technology',
        'Customizable colors and graphics',
        'Elastic panels for full range of motion',
        'Available as full kit or separates',
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    },
    products: [
      { name: 'Rugby Kit A', image: '/images/slide1.jpg' },
      { name: 'Rugby Kit B', image: '/images/slide2.jpg' },
      { name: 'Training Jersey', image: '/images/slide1.jpg' },
      { name: 'Match Bundle', image: '/images/slide2.jpg' },
      { name: 'Youth Kit', image: '/images/slide1.jpg' },
      { name: 'Forward Pack', image: '/images/slide2.jpg' },
    ],
  },
  tennis: {
    name: 'Tennis Kits & Apparel',
    heroDescription: 'Lightweight polos, skirts, and shorts designed for agility on the court.',
    gradient: defaultGradient,
    accent: { ...defaultAccent },
    featured: {
      name: 'Performance Tennis Set',
      image: '/images/slide2.jpg',
      description:
        'Quick-drying fabrics keep you cool and confident, while ergonomic cuts allow full range of motion for baseline rallies and volleys.',
      details: [
        'Ultra-light performance fabric',
        'Moisture management with quick evaporation',
        'Ergonomic stretch panels',
        'Customizable colors and trims',
        'UPF protection for outdoor matches',
        'Breathable mesh inserts',
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    },
    products: [
      { name: 'Tennis Polo Set', image: '/images/slide2.jpg' },
      { name: 'Baseline Dress', image: '/images/slide1.jpg' },
      { name: 'Training Tee', image: '/images/slide2.jpg' },
      { name: 'Match Shorts', image: '/images/slide1.jpg' },
      { name: 'Warm-up Jacket', image: '/images/slide2.jpg' },
      { name: 'Youth Tennis Kit', image: '/images/slide1.jpg' },
    ],
  },
  running: {
    name: 'Running Apparel & Accessories',
    heroDescription: 'Lightweight, breathable kits to keep you moving through every mile.',
    gradient: defaultGradient,
    accent: { ...defaultAccent },
    featured: {
      name: 'Pro Running Kit',
      image: '/images/slide1.jpg',
      description:
        'Breathable singlets and shorts engineered with sweat-wicking technology to keep pace with your training.',
      details: [
        'Feather-light technical fabric',
        'Laser-cut ventilation zones',
        'Flatlock seams to prevent chafing',
        'Reflective detailing for low-light runs',
        'Compression-ready options',
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    },
    products: [
      { name: 'Performance Singlet', image: '/images/slide1.jpg' },
      { name: 'Distance Shorts', image: '/images/slide2.jpg' },
      { name: 'Warm-Up Jacket', image: '/images/slide1.jpg' },
      { name: 'Race Day Kit', image: '/images/slide2.jpg' },
      { name: 'Lightweight Hoodie', image: '/images/slide1.jpg' },
    ],
  },
  gym: {
    name: 'Gym & Training Gear',
    heroDescription: 'Versatile training apparel that moves with you through every workout.',
    gradient: defaultGradient,
    accent: { ...defaultAccent },
    seoTitle: "OEM Private Label Activewear & Gym Wear Manufacturer | Zarko",
    seoDescription: "Direct-factory OEM activewear & private label gym wear manufacturer. Low MOQ, custom woven tags, custom branding, and premium fabrics for apparel brands.",
    seoKeywords: "private label activewear manufacturer, oem gym wear supplier, custom activewear manufacturer low MOQ, sportswear direct factory, custom gym clothing wholesale, activewear direct manufacturer",
    technicalSpecs: {
      fabric: "Nylon-Spandex blends, premium French Terry, Flex Fleece",
      printing: "Silicone print, 3D embroidery, heat-transfer, sublimation",
      compliance: "OEM Brand Standards & Private Label Customization",
      moq: "50 pieces per style/color",
      shipping: "Direct factory wholesale shipping worldwide",
      sizing: "Tailored fitments (Western sizing benchmarks)"
    },
    featured: {
      name: 'Hybrid Training Set',
      image: '/images/slide2.jpg',
      description:
        'Durable and flexible, our gym gear supports lifting, conditioning, and cross-training with modern aesthetics.',
      details: [
        '4-way stretch for unrestricted movement',
        'Sweat-wicking, quick-dry fabric',
        'Strategic mesh ventilation',
        'Ergonomic seams reduce chafing',
        'Custom branding available',
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'],
    },
    products: [
      { name: 'Training Tee', image: '/images/slide1.jpg' },
      { name: 'Compression Tights', image: '/images/slide2.jpg' },
      { name: 'Performance Hoodie', image: '/images/slide1.jpg' },
      { name: 'Workout Shorts', image: '/images/slide2.jpg' },
      { name: 'Training Tank', image: '/images/slide1.jpg' },
      { name: 'Athletic Joggers', image: '/images/slide2.jpg' },
    ],
  },
  shoes: {
    name: 'Shoes & Footwear',
    heroDescription: 'High-traction, supportive footwear for training, running, and competition.',
    gradient: defaultGradient,
    accent: { ...defaultAccent },
    featured: {
      name: 'Pro Traction Shoes',
      image: '/images/slide1.jpg',
      description:
        'Engineered midsoles and breathable uppers deliver stability and comfort whether you are training indoors or competing outdoors.',
      details: [
        'Responsive cushioning midsole',
        'High-traction outsole pattern',
        'Breathable mesh upper',
        'Reinforced toe and heel zones',
        'Available in men’s and women’s fits',
      ],
      sizes: ['US 6', 'US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
    },
    products: [
      { name: 'Speed Runner', image: '/images/slide1.jpg' },
      { name: 'Court Grip Shoe', image: '/images/slide2.jpg' },
      { name: 'Trail Trainer', image: '/images/slide1.jpg' },
      { name: 'Agility Cleat', image: '/images/slide2.jpg' },
      { name: 'Training Sneaker', image: '/images/slide1.jpg' },
    ],
  },
  gloves: {
    name: 'Gloves & Hand Protection',
    heroDescription: 'Grip-enhancing, impact-resistant gloves for football, gym, and training.',
    gradient: defaultGradient,
    accent: { ...defaultAccent },
    featured: {
      name: 'Grip Control Gloves',
      image: '/images/slide2.jpg',
      description:
        'Sticky palm technology and breathable backs make these gloves ideal for receivers and cross-training athletes alike.',
      details: [
        'Silicone grip palms',
        'Breathable stretch backing',
        'Velcro wrist closures',
        'Impact padding on knuckles',
        'Custom colors and logos',
      ],
      sizes: ['S', 'M', 'L', 'XL'],
    },
    products: [
      { name: 'Receiver Gloves', image: '/images/slide2.jpg' },
      { name: 'Training Gloves', image: '/images/slide1.jpg' },
      { name: 'Goalkeeper Gloves', image: '/images/slide2.jpg' },
      { name: 'Weightlifting Gloves', image: '/images/slide1.jpg' },
      { name: 'Winter Grip Gloves', image: '/images/slide2.jpg' },
    ],
  },
  caps: {
    name: 'Caps & Headwear',
    heroDescription: 'Snapbacks, visors, and fitted caps with premium embroidery and prints.',
    gradient: defaultGradient,
    accent: { ...defaultAccent },
    featured: {
      name: 'Classic Snapback Cap',
      image: '/images/slide1.jpg',
      description:
        'Structured crowns and custom embroidery options make our caps a staple for teams and promotional wear.',
      details: [
        'Structured 6-panel design',
        'Adjustable snapback closure',
        'Moisture-wicking sweatband',
        'Multiple brim shapes available',
        'Full-color embroidery or patches',
      ],
      sizes: ['One Size'],
    },
    products: [
      { name: 'Team Snapback', image: '/images/slide1.jpg' },
      { name: 'Performance Visor', image: '/images/slide2.jpg' },
      { name: 'Fitted Cap', image: '/images/slide1.jpg' },
      { name: 'Dad Hat', image: '/images/slide2.jpg' },
      { name: 'Bucket Hat', image: '/images/slide1.jpg' },
    ],
  },
  bags: {
    name: 'Bags & Gear Packs',
    heroDescription: 'Durable, spacious gear bags built for travel, training, and tournaments.',
    gradient: defaultGradient,
    accent: { ...defaultAccent },
    featured: {
      name: 'Pro Gear Bag',
      image: '/images/slide2.jpg',
      description:
        'Heavy-duty fabrics with reinforced straps and ventilated compartments keep your equipment organized and protected.',
      details: [
        'Water-resistant outer shell',
        'Ventilated shoe compartment',
        'Padded shoulder straps',
        'Multiple organizational pockets',
        'Custom branding and colors',
      ],
      sizes: ['30L', '45L', '60L'],
    },
    products: [
      { name: 'Team Duffel', image: '/images/slide2.jpg' },
      { name: 'Backpack Pack', image: '/images/slide1.jpg' },
      { name: 'Rolling Gear Bag', image: '/images/slide2.jpg' },
      { name: 'Equipment Tote', image: '/images/slide1.jpg' },
      { name: 'Travel Duffel', image: '/images/slide2.jpg' },
    ],
  },
  soccer: {
    name: 'Soccer Kits & Jerseys',
    heroDescription: 'Lightweight, aerated mesh soccer uniforms engineered for high-intensity movement and durability on the pitch.',
    gradient: defaultGradient,
    accent: { ...defaultAccent },
    seoTitle: "Custom Soccer Jerseys & Sublimated Uniforms Wholesale | Zarko",
    seoDescription: "Get premium custom soccer uniforms & sublimated soccer jerseys direct from Sialkot factory. High-density moisture-wicking interlock fabrics. Fast USA shipping!",
    seoKeywords: "custom soccer jerseys USA, sublimated soccer uniforms wholesale, soccer jerseys Sialkot direct factory, custom team soccer kits wholesale supplier, sublimated soccer uniforms Sialkot",
    technicalSpecs: {
      fabric: "160-180 GSM Moisture-Wicking Dri-FIT Interlock Polyester",
      printing: "Eco-friendly Italian ink 4K dye sublimation",
      compliance: "USSF and high school soccer uniform standards compliant",
      moq: "15 sets per design",
      shipping: "Express door-to-door delivery within 3-5 business days to US/Canada",
      sizing: "Comprehensive youth to adult custom fit charts"
    },
    featured: {
      name: 'Championship Soccer Kit',
      image: '/images/sports/soccer.webp',
      description: 'Engineered with double-knit, moisture-wicking interlock fabric, this kit is tailored for fluid mobility, slide-tackling resilience, and high breathability.',
      details: [
        'High-density moisture-wicking interlock fabric',
        'Mesh underarm ventilation panels for temperature regulation',
        'Athletic tailored fit for fluid player movement',
        'Fade-resistant 4K sublimation print processing',
        'Reinforced double-stitched flatlock seams for durability',
        'Custom name, squad number, and team crest options',
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'],
    },
    products: [
      { name: 'Classic Striped Soccer Jersey', image: '/images/sports/soccer.webp' },
      { name: 'Pro Match Day Uniform Set', image: '/images/sports/soccer.webp' },
      { name: 'Elite Goalkeeper Kit', image: '/images/sports/soccer.webp' },
      { name: 'Performance Training Jersey', image: '/images/sports/soccer.webp' },
    ],
  },
  volleyball: {
    name: 'Volleyball Uniforms & Gear',
    heroDescription: 'High-stretch, lightweight apparel designed for vertical agility, quick lateral dives, and exceptional breathability.',
    gradient: defaultGradient,
    accent: { ...defaultAccent },
    seoTitle: "Custom Volleyball Uniforms & Team Jerseys Wholesale | Zarko",
    seoDescription: "Order high-stretch custom volleyball jerseys and uniforms wholesale direct from factory. Lycra blend fabrics, flatlock stitching, low MOQ.",
    seoKeywords: "custom volleyball uniforms, wholesale volleyball jerseys, volleyball jersey manufacturer, sublimated volleyball apparel",
    technicalSpecs: {
      fabric: "190-220 GSM Premium Elastane-Polyester Blend",
      printing: "4K fade-resistant dye sublimation",
      compliance: "USAV and NFHS volleyball uniform compliant",
      moq: "15 sets per design",
      shipping: "Direct factory express shipping worldwide",
      sizing: "Tailored athletic compression sizes"
    },
    featured: {
      name: 'Apex Volleyball Uniform Set',
      image: '/images/sports/volleyball.webp',
      description: 'Constructed with premium elastane-polyester blend, offering uninhibited overhead range of motion and sweat-wicking comfort for long rallies.',
      details: [
        'Premium elastane-polyester fabric blend for maximum elasticity',
        'Sweat-wicking and quick-drying technology to keep players cool',
        'Friction-resistant flat seams to prevent chafing during floor dives',
        'Ergonomic athletic compression fit supporting muscle stamina',
        'Custom dye-sublimated graphics that resist fading and cracking',
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    },
    products: [
      { name: 'Elite Sleeveless Jersey', image: '/images/sports/volleyball.webp' },
      { name: 'Active Long Sleeve Game Jersey', image: '/images/sports/volleyball.webp' },
      { name: 'Pro Volleyball Team Shorts', image: '/images/sports/volleyball.webp' },
      { name: 'Training Compression Tops', image: '/images/sports/volleyball.webp' },
    ],
  },
  baseball: {
    name: 'Baseball Kits & Jerseys',
    heroDescription: 'Classic double-knit jerseys and custom pants engineered for base-running velocity and durable play.',
    gradient: defaultGradient,
    accent: { ...defaultAccent },
    seoTitle: "Custom Baseball Jerseys & Team Uniforms Wholesale | Zarko",
    seoDescription: "Order custom baseball jerseys and uniforms wholesale direct from Sialkot factory. Heavy-duty double-knit polyester, 3D embroidery options, low MOQ.",
    seoKeywords: "custom baseball jerseys, wholesale baseball uniforms, baseball jersey manufacturer, sublimated baseball uniforms USA",
    technicalSpecs: {
      fabric: "250-280 GSM Heavy-Duty Double-Knit Polyester",
      printing: "Tackle twill, custom embroidery, or dye-sublimation",
      compliance: "USSSA and high school baseball compliance guidelines",
      moq: "15 pieces per style",
      shipping: "3-5 business days express delivery to US/Canada",
      sizing: "Traditional baseball fit sizes (Youth & Adult)"
    },
    featured: {
      name: 'Legend Baseball Jersey Pro',
      image: '/images/sports/baseball.webp',
      description: 'Features heavy-duty breathable fabric with a button-down front design, built to withstand sliding friction and heat during long summer innings.',
      details: [
        'Durable double-knit polyester built for sliding resilience',
        'Classic full button-down jersey design with custom piping',
        'Moisture-control fibers to maintain player comfort',
        'Reinforced panels at high-stress wear zones',
        'Custom 3D embroidery and tackle twill branding options',
      ],
      sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL'],
    },
    products: [
      { name: 'Classic Full-Button Jersey', image: '/images/sports/baseball.webp' },
      { name: 'Youth League Baseball Uniform', image: '/images/sports/baseball.webp' },
      { name: 'Piped Baseball Game Pants', image: '/images/sports/baseball.webp' },
      { name: 'Breathable Batter Warm-Up Tee', image: '/images/sports/baseball.webp' },
    ],
  },
  softball: {
    name: 'Softball Uniforms & Jerseys',
    heroDescription: 'Ergonomic, lightweight team uniforms tailored for fastpitch mobility and sliding protection.',
    gradient: defaultGradient,
    accent: { ...defaultAccent },
    seoTitle: "Custom Softball Uniforms & Fastpitch Jerseys Wholesale | Zarko",
    seoDescription: "Order premium fastpitch custom softball uniforms direct from Sialkot manufacturer. Moisture-wicking flex-knit fabrics, low MOQ, express shipping.",
    seoKeywords: "custom softball jerseys, wholesale fastpitch uniforms, softball apparel manufacturer, sublimated softball uniforms",
    technicalSpecs: {
      fabric: "180-220 GSM High-Flex Polyester & Stretch Mesh",
      printing: "Premium digital sublimation or tackle-twill embroidery",
      compliance: "NCAA and high school softball uniform compliant",
      moq: "15 pieces per style",
      shipping: "Direct door-to-door express delivery to US",
      sizing: "Youth & womens tailored fastpitch sizes"
    },
    featured: {
      name: 'Fastpitch Elite Jersey',
      image: '/images/sports/softball.webp',
      description: 'Moisture-wicking, flexible softball uniforms with professional piping and premium breathability.',
      details: [
        'Lightweight, high-flex performance fabric',
        'Moisture-wicking mesh back paneling',
        'Full button-down and two-button configurations available',
        'Reinforced construction built for sliding action',
        'Custom team logos and player name/number options',
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    },
    products: [
      { name: 'Pro Fastpitch Jersey', image: '/images/sports/softball.webp' },
      { name: 'Sleeveless Game Jersey', image: '/images/sports/softball.webp' },
      { name: 'Sliding Shorts with Padding', image: '/images/sports/softball.webp' },
    ],
  },
  'ice-hockey': {
    name: 'Ice Hockey Jerseys & Gear',
    heroDescription: 'Heavyweight, oversized jerseys built to wear over protective padding while ensuring full range of motion.',
    gradient: defaultGradient,
    accent: { ...defaultAccent },
    seoTitle: "Custom Ice Hockey Jerseys & Team Uniforms Wholesale | Zarko",
    seoDescription: "Order premium heavyweight custom ice hockey jerseys wholesale direct from factory. Double-layer elbows, heavy knit polyester, low MOQ.",
    seoKeywords: "custom ice hockey jerseys, wholesale hockey jerseys, hockey uniform manufacturer, sublimated hockey jerseys USA",
    technicalSpecs: {
      fabric: "220-250 GSM Heavyweight Pro-Knit Polyester",
      printing: "Full 4K sublimation or tackle-twill embroidery",
      compliance: "USA Hockey uniform dimensions and padding specifications",
      moq: "15 pieces per style",
      shipping: "Express shipping within 3-5 business days to US/Canada",
      sizing: "Oversized pad-compliant sizing (S to 3XL, Goalie styles)"
    },
    featured: {
      name: 'Championship Ice Hockey Jersey',
      image: '/images/sports/ice-hockey.webp',
      description: 'Heavy-duty knit polyester with double elbows and shoulders, designed to withstand rigorous physical play on the ice.',
      details: [
        'Oversized cut designed to fit comfortably over pads',
        'Heavyweight knit polyester for ultimate durability',
        'Double-layered shoulders and elbow sections',
        'Fight strap integration available for professional orders',
        'Fully sublimated team colors, names, and numbers',
      ],
      sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL', 'Golee-Style'],
    },
    products: [
      { name: 'Elite Ice Hockey Jersey', image: '/images/sports/ice-hockey.webp' },
      { name: 'Practice Mesh Hockey Jersey', image: '/images/sports/ice-hockey.webp' },
      { name: 'Pro Player Socks', image: '/images/sports/ice-hockey.webp' },
    ],
  },
  lacrosse: {
    name: 'Lacrosse Kits & Teamwear',
    heroDescription: 'Engineered for high-intensity field performance. Custom lacrosse jerseys, shorts, skorts, and racerback tank tops crafted with moisture-wicking pinhole mesh and reinforced seams.',
    gradient: defaultGradient,
    accent: { ...defaultAccent },
    seoTitle: "Custom Lacrosse Uniforms & Sublimated Jerseys Wholesale | Zarko Sportswear",
    seoDescription: "Direct factory manufacturer of custom lacrosse jerseys, shorts, skorts, and reversible pinnies for USA high schools, colleges, and clubs. Low 15-set MOQ.",
    seoKeywords: "custom lacrosse uniforms, wholesale lacrosse jerseys, sublimated lacrosse pinnies, women lacrosse skorts, men lacrosse shorts, USA lacrosse apparel manufacturer",
    technicalSpecs: {
      fabric: "160-220 GSM Breathable Pinhole Mesh & 4-Way Stretch Interlock",
      printing: "High-definition full digital dye-sublimation with Japanese inks",
      compliance: "USA Lacrosse & NFHS equipment clearance compliant",
      moq: "15 sets per design",
      shipping: "Door-to-Door DDP Air Express (4-6 business days to USA/Canada)",
      sizing: "Youth S-XL and Adult XS-4XL (Athletic pad-compatible cuts)"
    },
    featured: {
      name: 'Pro Lacrosse Championship Game Uniform',
      image: '/uploads/products/lacrosse/jerseys/1.jpg',
      description: 'Engineered with lightweight pinhole mesh for maximum pad ventilation and 4-way stretch interlock body. Built to withstand stick checks and high-velocity gameplay.',
      details: [
        'Breathable 180 GSM eyelet mesh with reinforced pad clearance',
        'Raglan athletic cut for full-velocity cradling and shooting motion',
        'Reinforced double-ply collar and bar-tacked stress zones',
        '4K Full dye-sublimation with non-fading Japanese inks',
        'Includes custom game jerseys, motion shorts, and fastpitch skorts',
        'Complete team roster customization with names and numbers'
      ],
      sizes: ['YS', 'YM', 'YL', 'XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL']
    },
    products: []
  },
  streetwear: {
    name: 'Sports Wear & Athleisure Streetwear',
    heroDescription: 'Premium export-grade lifestyle activewear and cut & sew teamwear. Heavyweight French terry hoodies, crewneck sweatshirts, technical pullovers, polo shirts, and tracksuits.',
    gradient: defaultGradient,
    accent: { ...defaultAccent },
    seoTitle: "Custom Sportswear & Streetwear Manufacturer Wholesale | Zarko Sportswear",
    seoDescription: "OEM private label manufacturer of heavyweight French terry hoodies, sweatshirts, polo shirts, tracksuits, and activewear for USA brands and sports clubs.",
    seoKeywords: "custom hoodies manufacturer Sialkot, wholesale streetwear supplier, private label tracksuits, custom embroidered sweatshirts, athletic polo shirts wholesale",
    technicalSpecs: {
      fabric: "300-380 GSM Heavyweight Cotton/Poly Fleece, French Terry & Pique Poly",
      printing: "Screen printing, 3D puff embroidery, high-density silicone & sublimation",
      compliance: "OEKO-TEX Standard 100 eco-friendly certified dyes",
      moq: "15 pieces per style",
      shipping: "Door-to-Door DDP Air Express (4-6 business days to USA/Canada)",
      sizing: "Unisex XS to 4XL (Oversized, regular, and slim athletic fits available)"
    },
    featured: {
      name: 'Heavyweight French Terry Streetwear Hoodie',
      image: '/uploads/products/streetwear/hoodies/1.jpg',
      description: 'Constructed from luxurious 380 GSM combed cotton-rich fleece with a double-layered structured hood, front kangaroo pocket, and heavy 2x2 lycra ribbing.',
      details: [
        '380 GSM ultra-heavyweight combed cotton fleece',
        'Double-layered structured hood without synthetic drawcord fraying',
        'Drop-shoulder modern athletic streetwear silhouette',
        'Pre-shrunk premium yarn to prevent post-wash shrinkage',
        'Available with 3D high-density embroidery, screen print, or silicone patch',
        'Low 15-piece factory direct MOQ with rapid international dispatch'
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL']
    },
    products: []
  }
};

// Automatically sync live Cloudinary products from products.json into fallbacks
(ingestedCategories || []).forEach((c) => {
  if (categoryConfigs[c.slug]) {
    if (Array.isArray(c.products) && c.products.length > 0) {
      categoryConfigs[c.slug].products = c.products;
    }
    if (c.featured?.image && categoryConfigs[c.slug].featured) {
      categoryConfigs[c.slug].featured.image = c.featured.image;
    }
  }
});


