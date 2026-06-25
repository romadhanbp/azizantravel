// ============================================
// AZIZAN TRAVEL - SEO Configuration
// Admin: Edit nilai di SEO_CONFIG sesuai kebutuhan
// File ini digunakan oleh semua halaman HTML
// ============================================

const SEO_CONFIG = {
  // === SITE GLOBAL ===
  site: {
    name: 'Azizan Travel',
    tagline: 'Explore Lombok',
    url: 'https://azizantravel.com',
    language: 'id',
    defaultImage: 'img/hero-lombok.jpg',
    favicon: `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🧭</text></svg>`,
    twitterHandle: '@azizantravel'
  },

  // === ORGANISASI (JSON-LD Structured Data) ===
  organization: {
    name: 'Azizan Travel',
    description: 'Jasa wisata dan transportasi di Lombok Tengah. Melayani paket tour, airport transfer, sewa kendaraan, dan urusan bisnis.',
    url: 'https://azizantravel.com',
    telephone: '+6281999868882',
    email: 'azizantravellombok@gmail.com',
    address: {
      street: 'Jl. H Muhammad Umar, Telagawaru',
      city: 'Praya',
      region: 'Lombok Tengah',
      province: 'Nusa Tenggara Barat',
      country: 'Indonesia'
    },
    openingHours: 'Mo-Su 06:00-22:00',
    priceRange: 'Rp 100.000 - Rp 5.000.000'
  },

  // === PER-HALAMAN ===
  // Admin: edit title, description, keywords, og_title, og_description sesuai halaman
  pages: {
    home: {
      title: 'Azizan Travel - Paket Wisata & Transportasi Lombok Terpercaya',
      description: 'Azizan Travel melayani paket wisata Lombok, transportasi airport, urusan bisnis, dan keperluan perjalanan selama di Lombok. Profesional, nyaman, harga terjangkau.',
      keywords: 'travel Lombok, wisata Lombok, paket tour Lombok, transportasi Lombok, sewa mobil Lombok, airport transfer Lombok',
      ogTitle: 'Azizan Travel - Wisata & Transportasi Lombok',
      ogDescription: 'Jelajahi Lombok bersama kami. Paket wisata, airport transfer, dan transportasi terpercaya.',
      ogType: 'website',
      canonical: '/'
    },
    paket: {
      title: 'Paket Wisata Lombok - Azizan Travel | Tour, Transport & Airport Transfer',
      description: 'Temukan paket wisata Lombok terlengkap: tour Gili Islands, trekking Rinjani, Pink Beach, airport transfer, dan sewa kendaraan harian. Harga transparan, driver berpengalaman.',
      keywords: 'paket wisata Lombok, tour Lombok, paket Gili, trekking Rinjani, Pink Beach, sewa mobil Lombok',
      ogTitle: 'Paket Wisata Lombok - Azizan Travel',
      ogDescription: 'Paket tour, transportasi, dan airport transfer Lombok. Harga bersahabat, driver ramah, pengalaman tak terlupakan.',
      ogType: 'website',
      canonical: '/paket.html'
    },
    blog: {
      title: 'Blog Wisata Lombok - Tips & Panduan | Azizan Travel',
      description: 'Blog wisata Lombok: panduan destinasi, tips perjalanan hemat, kuliner khas Lombok, dan cerita seru dari pelanggan Azizan Travel.',
      keywords: 'blog wisata Lombok, tips perjalanan Lombok, panduan wisata Lombok, kuliner Lombok',
      ogTitle: 'Blog Wisata Lombok - Azizan Travel',
      ogDescription: 'Panduan lengkap wisata Lombok, tips hemat, destinasi wajib, dan inspirasi perjalanan seru.',
      ogType: 'website',
      canonical: '/blog.html'
    },
    blogDetail: {
      title: 'Artikel Blog - Azizan Travel',
      description: 'Baca artikel wisata Lombok lengkap dari Azizan Travel. Tips perjalanan, panduan destinasi, dan inspirasi wisata Lombok terkini.',
      keywords: 'artikel wisata Lombok, tips perjalanan Lombok',
      ogTitle: 'Azizan Travel Blog',
      ogDescription: 'Tips, panduan, dan cerita wisata Lombok dari Azizan Travel.',
      ogType: 'article',
      canonical: '/blog-detail.html'
    },
    kontak: {
      title: 'Kontak Azizan Travel - Hubungi Kami & Lokasi di Lombok',
      description: 'Hubungi Azizan Travel untuk pemesanan paket wisata Lombok, airport transfer, dan sewa kendaraan. WhatsApp, email, atau kunjungi kantor kami di Senggigi, Lombok.',
      keywords: 'kontak Azizan Travel, hubungi Azizan, WhatsApp Lombok travel, alamat travel Lombok',
      ogTitle: 'Kontak Azizan Travel',
      ogDescription: 'Hubungi kami via WhatsApp, email, atau kunjungi langsung kantor kami di Senggigi, Lombok.',
      ogType: 'website',
      canonical: '/kontak.html'
    }
  },

  // === SOSIAL MEDIA ===
  social: {
    whatsapp: '6281999868882',
    email: 'azizantravellombok@gmail.com',
    instagram: 'https://instagram.com/azizantravel',
    facebook: 'https://facebook.com/azizantravel',
    twitter: 'https://twitter.com/azizantravel',
    tiktok: 'https://tiktok.com/@azizantravel',
    youtube: 'https://youtube.com/@azizantravel'
  },

  // === GOOGLE SEARCH CONSOLE / ANALYTICS ===
  // Admin: masukkan verification code dari Google Search Console
  googleSiteVerification: '',
  googleAnalyticsId: '',

  // === ROBOTS & SITEMAP ===
  robots: {
    index: true,         // Izinkan indexing
    follow: true,        // Izinkan follow links
    sitemap: '/sitemap.xml'
  }
};

// ============================================
// FUNGSI: Memasang meta tag SEO ke halaman
// ============================================

function getPageKey() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  if (path === 'index.html' || path === '') return 'home';
  if (path === 'paket.html') return 'paket';
  if (path === 'blog.html') return 'blog';
  if (path === 'blog-detail.html') return 'blogDetail';
  if (path === 'kontak.html') return 'kontak';
  return 'home';
}

function setMeta(name, content) {
  if (!content) return;
  let el = document.querySelector(`meta[name="${name}"]`);
  if (el) { el.setAttribute('content', content); return; }
  el = document.createElement('meta');
  el.setAttribute('name', name);
  el.setAttribute('content', content);
  document.head.appendChild(el);
}

function setMetaProperty(property, content) {
  if (!content) return;
  let el = document.querySelector(`meta[property="${property}"]`);
  if (el) { el.setAttribute('content', content); return; }
  el = document.createElement('meta');
  el.setAttribute('property', property);
  el.setAttribute('content', content);
  document.head.appendChild(el);
}

function setCanonical(url) {
  let el = document.querySelector('link[rel="canonical"]');
  if (el) { el.setAttribute('href', url); return; }
  el = document.createElement('link');
  el.setAttribute('rel', 'canonical');
  el.setAttribute('href', url);
  document.head.appendChild(el);
}

function injectJSONLD(data) {
  const script = document.createElement('script');
  script.setAttribute('type', 'application/ld+json');
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

function applySEO() {
  const config = SEO_CONFIG;
  const site = config.site;
  const pageKey = getPageKey();
  const page = config.pages[pageKey];

  if (!page) return;

  // Title
  document.title = page.title || site.name;

  // Meta tags
  setMeta('description', page.description);
  setMeta('keywords', page.keywords);

  // Robots
  const robots = config.robots;
  const robotsContent = `${robots.index ? 'index' : 'noindex'}, ${robots.follow ? 'follow' : 'nofollow'}`;
  setMeta('robots', robotsContent);

  // Google verification
  if (config.googleSiteVerification) {
    setMeta('google-site-verification', config.googleSiteVerification);
  }

  // Open Graph
  setMetaProperty('og:title', page.ogTitle || page.title);
  setMetaProperty('og:description', page.ogDescription || page.description);
  setMetaProperty('og:type', page.ogType || 'website');
  setMetaProperty('og:url', site.url + page.canonical);
  setMetaProperty('og:image', site.url + '/' + site.defaultImage);
  setMetaProperty('og:site_name', site.name);
  setMetaProperty('og:locale', 'id_ID');

  // Twitter Card
  setMeta('twitter:card', 'summary_large_image');
  setMeta('twitter:title', page.ogTitle || page.title);
  setMeta('twitter:description', page.ogDescription || page.description);
  setMeta('twitter:image', site.url + '/' + site.defaultImage);
  if (site.twitterHandle) {
    setMeta('twitter:site', site.twitterHandle);
  }

  // Canonical URL
  setCanonical(site.url + page.canonical);

  // JSON-LD Structured Data
  const org = config.organization;
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: org.name,
    description: org.description,
    url: org.url,
    telephone: org.telephone,
    email: org.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: org.address.street,
      addressLocality: org.address.city,
      addressRegion: org.address.region,
      addressCountry: org.address.country
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: org.openingHours.split(' ')[0].split('-').map(d => d === 'Mo' ? 'Monday' : d === 'Tu' ? 'Tuesday' : d === 'We' ? 'Wednesday' : d === 'Th' ? 'Thursday' : d === 'Fr' ? 'Friday' : d === 'Sa' ? 'Saturday' : 'Sunday').join(','),
      opens: org.openingHours.split(' ')[1].split('-')[0],
      closes: org.openingHours.split(' ')[1].split('-')[1]
    },
    priceRange: org.priceRange,
    image: site.url + '/' + site.defaultImage
  };

  // Breadcrumb structured data
  const bc = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Beranda', item: site.url + '/' }
    ]
  };

  if (pageKey !== 'home') {
    const pageNames = {
      paket: 'Paket Wisata',
      blog: 'Blog',
      blogDetail: 'Blog',
      kontak: 'Kontak'
    };
    bc.itemListElement.push({
      '@type': 'ListItem',
      position: 2,
      name: pageNames[pageKey] || page.title,
      item: site.url + page.canonical
    });
  }

  injectJSONLD(ld);
  injectJSONLD(bc);
}

// ============================================
// FUNGSI: Update SEO untuk artikel blog (dinamis)
// Panggil dari blog.js saat render blog detail
// Contoh: updateArticleSEO(blogPosts[0])
// ============================================
function updateArticleSEO(post) {
  if (!post) return;
  const site = SEO_CONFIG.site;
  const page = SEO_CONFIG.pages.blogDetail;

  document.title = `${post.title} - ${site.name}`;

  const desc = post.excerpt.substring(0, 160);
  setMeta('description', desc);
  setMeta('keywords', post.tags.join(', '));

  setMetaProperty('og:title', `${post.title} - ${site.name}`);
  setMetaProperty('og:description', desc);
  setMetaProperty('og:type', 'article');
  setMetaProperty('og:url', site.url + '/blog-detail.html?id=' + post.id);
  setMetaProperty('og:image', site.url + '/' + post.image);

  setMeta('twitter:title', `${post.title} - ${site.name}`);
  setMeta('twitter:description', desc);
  setMeta('twitter:image', site.url + '/' + post.image);

  setCanonical(site.url + '/blog-detail.html?id=' + post.id);

  // Article structured data
  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: site.url + '/' + post.image,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: SEO_CONFIG.organization.name
    },
    publisher: {
      '@type': 'Organization',
      name: SEO_CONFIG.organization.name
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': site.url + '/blog-detail.html?id=' + post.id
    }
  };
  injectJSONLD(article);
}

// Auto-apply SEO when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', applySEO);
} else {
  applySEO();
}
