const homeSeo = {
  title: "Custom Sports Wear, Football Kits & Wrestling Gears | Zarko Sportswear",
  description:
    "Zarko Sportswear manufactures export-grade custom sports uniforms, football kits, wrestling gears, and hockey uniforms. Serving teams in the USA, UK, Australia, Italy, Saudi Arabia, and Europe with global delivery.",
  canonical: "https://www.zarkosportswear.com/",
  keywords:
    "custom sports uniforms USA, wrestling gears supplier, hockey uniforms UK, football kits Saudi Arabia, custom soccer jerseys Italy, sports apparel Europe, sportswear manufacturer, custom team wear, athletic jerseys, basketball uniforms USA, rugby gear Australia",
  author: "Atif Shahzad & Hurairah Shahzad",
  robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  themeColor: "#6366f1",
  image: "https://www.zarkosportswear.com/og-cover.jpg",
  siteName: "Zarko Sportswear",
  locale: "en_US",
  openGraph: {
    'og:title': 'Custom Sports Wear, Football Kits & Wrestling Gears | Zarko Sportswear',
    'og:description':
      'Premium custom sports uniforms, wrestling gears, hockey uniforms, and football kits. Serving teams across USA, UK, Australia, Italy, Saudi Arabia, and Europe with export-grade quality.',
    'og:url': 'https://www.zarkosportswear.com/',
    'og:image': 'https://www.zarkosportswear.com/og-cover.jpg',
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:type': 'website',
    'og:site_name': 'Zarko Sportswear',
    'og:locale': 'en_US',
  },
  twitter: {
    'twitter:title': 'Custom Sports Wear, Football Kits & Wrestling Gears | Zarko Sportswear',
    'twitter:description': 'Zarko Sportswear exports professional-grade custom sports uniforms, wrestling gears, and hockey uniforms to USA, UK, Australia, Italy, Saudi Arabia, and Europe.',
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
        { '@type': 'Offer', name: 'Football & Soccer Kits' },
        { '@type': 'Offer', name: 'Cricket Uniforms' },
        { '@type': 'Offer', name: 'Basketball Jerseys' },
        { '@type': 'Offer', name: 'Rugby Apparel' },
        { '@type': 'Offer', name: 'Wrestling Gears & Singlets' },
        { '@type': 'Offer', name: 'Hockey Uniforms & Wear' },
      ],
      areaServed: [
        { '@type': 'Country', name: 'United States' },
        { '@type': 'Country', name: 'United Kingdom' },
        { '@type': 'Country', name: 'Australia' },
        { '@type': 'Country', name: 'Italy' },
        { '@type': 'Country', name: 'Saudi Arabia' },
        { '@type': 'Country', name: 'Germany' },
        { '@type': 'Country', name: 'France' },
        { '@type': 'Country', name: 'Spain' }
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
        'Zarko Sportswear manufactures premium custom sports uniforms, wrestling gears, and hockey wear, exporting them to teams, academies, and clubs in the USA, UK, Australia, Italy, Saudi Arabia, and Europe.',
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
      description: 'Leading manufacturer and global exporter of custom sports uniforms, wrestling gears, hockey wear, and athletic apparel.',
      foundingDate: '2020',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+92-303-9200750',
        email: 'zarkosportswear@gmail.com',
        contactType: 'customer service',
        availableLanguage: ['English', 'Italian', 'Arabic']
      }
    }
  ]
};

export default homeSeo;
