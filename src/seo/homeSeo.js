const homeSeo = {
  title: "Custom Sports Uniforms | Zarko Sportswear - Export Grade Football, Cricket Kits",
  description:
    "Zarko Sportswear manufactures premium custom sports uniforms including football kits, cricket wear, and basketball jerseys with worldwide shipping. Export-grade quality sports apparel for teams and athletes.",
  canonical: "https://www.zarkosportswear.com/",
  keywords:
    "custom sports uniforms, football kits, cricket uniforms, basketball jerseys, team wear, sportswear manufacturer, export quality, custom team kits, athletic apparel, sports clothing",
  author: "Atif Shahzad & Hurairah Shahzad",
  robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  themeColor: "#6366f1",
  image: "https://www.zarkosportswear.com/og-cover.jpg",
  siteName: "Zarko Sportswear",
  locale: "en_US",
  openGraph: {
    'og:title': 'Custom Sports Uniforms | Zarko Sportswear - Professional Team Kits',
    'og:description':
      'Premium custom sports uniforms for football, cricket, basketball and more. Export-grade quality with global delivery. Custom team kits and athletic apparel.',
    'og:url': 'https://www.zarkosportswear.com/',
    'og:image': 'https://www.zarkosportswear.com/og-cover.jpg',
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:type': 'website',
    'og:site_name': 'Zarko Sportswear',
    'og:locale': 'en_US',
  },
  twitter: {
    'twitter:title': 'Custom Sports Uniforms | Zarko Sportswear - Professional Team Kits',
    'twitter:description': "WearConnect's Zarko Sportswear designs and exports professional-grade sports uniforms and accessories.",
    'twitter:card': 'summary_large_image',
    'twitter:image': 'https://www.zarkosportswear.com/og-cover.jpg',
    'twitter:site': '@zarkosportswear',
    'twitter:creator': '@atifshahzad',
  },
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Zarko Sportswear',
      image: 'https://www.zarkosportswear.com/logo.png',
      url: 'https://www.zarkosportswear.com/',
      telephone: '+92-303-9200750',
      email: 'zarkosportswear@gmail.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '123 Export Avenue',
        addressLocality: 'Sialkot',
        addressRegion: 'Punjab',
        postalCode: '51310',
        addressCountry: 'PK',
      },
      openingHours: ['Mo-Sa 09:00-18:00'],
      sameAs: [
        'https://www.facebook.com/zarkosportswear',
        'https://www.instagram.com/zarko_sports.wear/',
        'https://www.linkedin.com/in/atif-shahzad903/'
      ],
      makesOffer: [
        { '@type': 'Offer', name: 'Football Kits' },
        { '@type': 'Offer', name: 'Cricket Uniforms' },
        { '@type': 'Offer', name: 'Basketball Jerseys' },
        { '@type': 'Offer', name: 'Rugby Apparel' },
      ],
      founder: [
        {
          '@type': 'Person',
          name: 'Atif Shahzad',
          jobTitle: 'Co-Founder',
          url: 'https://www.linkedin.com/in/atif-shahzad903/'
        },
        {
          '@type': 'Person',
          name: 'Hurairah Shahzad',
          jobTitle: 'Co-Founder'
        }
      ],
      description:
        'Zarko Sportswear manufactures premium custom sports uniforms including football kits, cricket wear, and basketball jerseys with worldwide shipping.',
      priceRange: '$$',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '150'
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Zarko Sportswear',
      url: 'https://www.zarkosportswear.com/',
      logo: 'https://www.zarkosportswear.com/logo.png',
      description: 'Leading manufacturer of custom sports uniforms and athletic apparel.',
      foundingDate: '2020',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+92-303-9200750',
        email: 'zarkosportswear@gmail.com',
        contactType: 'customer service'
      }
    }
  ]
};

export default homeSeo;
