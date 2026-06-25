// ============================================
// AZIZAN TRAVEL - Blog Data
// Cara update: tambah objek baru di array blogPosts
// ============================================

const blogPosts = [
  {
    id: 1,
    title: "10 Destinasi Wisata Terbaik di Lombok yang Wajib Dikunjungi 2025",
    slug: "10-destinasi-terbaik-lombok-2025",
    category: "Panduan Wisata",
    date: "10 Juni 2025",
    image: "img/hero-lombok.jpg",
    excerpt: "Lombok menyimpan keajaiban alam yang tak kalah indah dari Bali. Mulai dari pantai eksotis hingga puncak Rinjani, inilah 10 destinasi yang harus masuk list perjalanan Anda.",
    content: `
      <p>Lombok adalah surga tersembunyi di Indonesia yang menawarkan keindahan alam luar biasa. Dengan pantai-pantai yang masih alami, gunung berapi aktif, dan pulau-pulau kecil yang menakjubkan, Lombok menjadi destinasi favorit wisatawan dari seluruh dunia.</p>
      <h2>1. Gili Trawangan</h2>
      <p>Pulau kecil dengan air jernih, terumbu karang yang indah, dan suasana santai yang tak tertandingi. Cocok untuk snorkeling, diving, dan menikmati sunset.</p>
      <h2>2. Pink Beach (Pantai Tangsi)</h2>
      <p>Salah satu dari sedikit pantai berpasir merah muda di dunia. Warna uniknya berasal dari campuran butiran karang merah dan pasir putih.</p>
      <h2>3. Gunung Rinjani</h2>
      <p>Gunung berapi tertinggi kedua di Indonesia (3.726 mdpl) dengan danau kawah Segara Anak yang memesona. Trekking ke sini adalah pengalaman seumur hidup.</p>
      <h2>4. Senggigi</h2>
      <p>Kawasan pantai utama di Lombok Barat dengan resort, restoran seafood, dan pemandangan sunset yang indah.</p>
      <h2>5. Mandalika</h2>
      <p>Kawasan pariwisata premium dengan Pantai Kuta Lombok yang terkenal, sirkuit MotoGP, dan resort bintang lima.</p>
    `,
    tags: ["wisata", "panduan", "lombok"]
  },
  {
    id: 2,
    title: "Tips Hemat Wisata ke Lombok: Budget 3 Hari 2 Malam All-In",
    slug: "tips-hemat-wisata-lombok-3d2n",
    category: "Tips Perjalanan",
    date: "5 Juni 2025",
    image: "img/paket-wisata.jpg",
    excerpt: "Siapa bilang wisata ke Lombok itu mahal? Dengan perencanaan yang tepat, Anda bisa menikmati Lombok selama 3 hari 2 malam dengan budget yang sangat terjangkau.",
    content: `
      <p>Banyak orang mengira wisata ke Lombok membutuhkan biaya yang besar. Padahal dengan perencanaan yang matang dan memilih paket yang tepat, Anda bisa menikmati Lombok tanpa menguras kantong.</p>
      <h2>Estimasi Budget 3D2N Lombok</h2>
      <ul>
        <li>Transportasi lokal (paket): Rp 400.000 - 600.000/orang</li>
        <li>Akomodasi (homestay): Rp 150.000 - 300.000/malam</li>
        <li>Makan 3x sehari: Rp 50.000 - 100.000/hari</li>
        <li>Tiket masuk destinasi: Rp 50.000 - 150.000</li>
      </ul>
      <h2>Tips Menghemat Biaya</h2>
      <p>1. Pesan paket wisata group untuk mendapatkan harga yang lebih murah</p>
      <p>2. Pilih akomodasi di Senggigi atau Mataram yang lebih terjangkau</p>
      <p>3. Makan di warung lokal yang menyajikan makanan lezat dengan harga bersahabat</p>
      <p>4. Gunakan jasa travel lokal seperti Azizan Travel yang harganya lebih transparan</p>
    `,
    tags: ["tips", "budget", "hemat"]
  },
  {
    id: 3,
    title: "Panduan Lengkap Trekking Gunung Rinjani untuk Pemula",
    slug: "panduan-trekking-rinjani-pemula",
    category: "Petualangan",
    date: "28 Mei 2025",
    image: "img/rinjani-trekking.jpg",
    excerpt: "Bermimpi mendaki Gunung Rinjani tapi takut karena pemula? Jangan khawatir! Panduan lengkap ini akan membantu Anda mempersiapkan pendakian Rinjani dengan aman dan menyenangkan.",
    content: `
      <p>Gunung Rinjani adalah salah satu pendakian paling epik di Indonesia. Meskipun tergolong pendakian yang menantang, dengan persiapan yang tepat, pemula pun bisa menaklukkannya.</p>
      <h2>Rute Trekking Rinjani</h2>
      <p>Ada beberapa rute pendakian Rinjani, yang paling populer adalah melalui Sembalun dan Senaru. Rute Sembalun lebih pendek tapi lebih terjal, sedangkan rute Senaru lebih panjang tapi pemandangannya lebih indah.</p>
      <h2>Persiapan Fisik</h2>
      <p>Latihan cardio minimal 1 bulan sebelum pendakian. Jogging, bersepeda, atau hiking di bukit-bukit kecil sangat disarankan.</p>
      <h2>Perlengkapan Wajib</h2>
      <ul>
        <li>Sepatu hiking yang sudah di-break-in</li>
        <li>Jaket tebal (suhu puncak bisa 0-5°C)</li>
        <li>Sleeping bag</li>
        <li>Headlamp dengan baterai cadangan</li>
        <li>Snack energi tinggi</li>
      </ul>
      <h2>Mengapa Pilih Guide Lokal?</h2>
      <p>Guide lokal Rinjani tidak hanya menunjukkan jalan, tapi juga memastikan keselamatan dan menceritakan kisah legendaris Gunung Rinjani yang akan membuat pendakian Anda semakin berkesan.</p>
    `,
    tags: ["rinjani", "trekking", "petualangan"]
  },
  {
    id: 4,
    title: "Kuliner Khas Lombok yang Wajib Dicoba: Pedas Nikmat!",
    slug: "kuliner-khas-lombok-wajib-dicoba",
    category: "Kuliner",
    date: "20 Mei 2025",
    image: "img/hero-lombok.jpg",
    excerpt: "Lombok bukan hanya soal pantai dan gunung. Kuliner Lombok juga tak kalah menggoda! Dari Ayam Taliwang yang pedas hingga Plecing Kangkung yang segar, ini dia makanan wajib coba!",
    content: `
      <p>Kuliner Lombok terkenal dengan cita rasa pedas yang khas. Masyarakat Sasak (suku asli Lombok) memiliki warisan kuliner yang sangat kaya dan lezat.</p>
      <h2>1. Ayam Taliwang</h2>
      <p>Makanan ikonik Lombok! Ayam kampung yang dibakar dengan sambal khas yang pedas dan gurih. Harus dicoba!</p>
      <h2>2. Plecing Kangkung</h2>
      <p>Kangkung rebus dengan sambal tomat segar yang pedas. Sederhana tapi luar biasa enak.</p>
      <h2>3. Beberuk Terong</h2>
      <p>Terong goreng dengan sambal segar yang kaya rempah. Cocok sebagai lauk pendamping nasi.</p>
      <h2>4. Sate Bulayak</h2>
      <p>Sate khas Sasak dengan bumbu kacang dan disajikan dengan lontong dari daun aren.</p>
    `,
    tags: ["kuliner", "makanan", "lombok"]
  },
  {
    id: 5,
    title: "Gili Islands: Surga Tersembunyi di Lombok Utara",
    slug: "gili-islands-surga-tersembunyi",
    category: "Destinasi",
    date: "15 Mei 2025",
    image: "img/gili-trawangan.jpg",
    excerpt: "Tiga pulau kecil yang menakjubkan: Gili Trawangan, Gili Meno, dan Gili Air. Masing-masing punya karakter unik yang memikat. Mana yang cocok untuk Anda?",
    content: `
      <p>Kepulauan Gili terdiri dari tiga pulau: Trawangan (paling ramai), Meno (paling romantis), dan Air (paling tenang). Ketiganya terletak di barat laut Lombok dan dapat dijangkau dengan speedboat atau slow boat.</p>
      <h2>Gili Trawangan</h2>
      <p>Cocok untuk backpacker dan mereka yang suka suasana ramai. Ada banyak bar, restoran, dan kegiatan seru seperti diving, snorkeling, dan bersepeda keliling pulau.</p>
      <h2>Gili Meno</h2>
      <p>Pilihan terbaik untuk pasangan yang mencari ketenangan. Lebih sepi, pantainya lebih bersih, dan nuansanya sangat romantis.</p>
      <h2>Gili Air</h2>
      <p>Perpaduan sempurna antara Trawangan dan Meno. Tidak seramai Trawangan, tapi tidak sesepi Meno. Ada restoran dan fasilitas yang cukup lengkap.</p>
    `,
    tags: ["gili", "pulau", "destinasi"]
  },
  {
    id: 6,
    title: "Pink Beach Lombok: Keajaiban Alam yang Langka di Dunia",
    slug: "pink-beach-lombok-keajaiban-alam",
    category: "Destinasi",
    date: "10 Mei 2025",
    image: "img/pink-beach.jpg",
    excerpt: "Hanya ada 7 pantai berpasir merah muda di seluruh dunia, dan satu di antaranya ada di Lombok! Inilah Pink Beach, permata tersembunyi di Lombok Timur yang wajib Anda kunjungi.",
    content: `
      <p>Pink Beach atau Pantai Tangsi terletak di Kecamatan Jerowaru, Lombok Timur. Pantai ini berjarak sekitar 80 km dari Mataram dan memerlukan waktu sekitar 2 jam perjalanan darat.</p>
      <h2>Kenapa Pasirnya Pink?</h2>
      <p>Warna merah muda pada pasir berasal dari mikroorganisme laut bernama Foraminifera yang memiliki pigmen merah. Saat mati, cangkang mereka hancur dan bercampur dengan pasir putih, menciptakan gradasi warna merah muda yang unik.</p>
      <h2>Waktu Terbaik Berkunjung</h2>
      <p>Datanglah pagi hari (07.00-09.00) untuk mendapatkan cahaya pagi yang ideal untuk foto dan pantai yang masih sepi.</p>
      <h2>Tips Perjalanan</h2>
      <p>Jalan menuju Pink Beach cukup menantang. Sangat disarankan menggunakan kendaraan dengan driver berpengalaman yang hafal medannya, seperti layanan yang kami sediakan di Azizan Travel.</p>
    `,
    tags: ["pink beach", "destinasi", "alam"]
  }
];

// Mapping kategori display → value filter
function getCategorySlug(category) {
  const map = {
    'Panduan Wisata': 'panduan',
    'Tips Perjalanan': 'tips',
    'Petualangan': 'petualangan',
    'Kuliner': 'kuliner',
    'Destinasi': 'destinasi'
  };
  return map[category] || '';
}

// Render blog cards (home page - only 3 latest)
function renderBlogHome() {
  const grid = document.getElementById('blogGrid');
  if (!grid) return;

  const latestPosts = blogPosts.slice(0, 3);
  grid.innerHTML = latestPosts.map(post => `
    <div class="blog-card reveal">
      <div class="blog-thumb">
        <img src="${post.image}" alt="${post.title}" loading="lazy" />
      </div>
      <div class="blog-body">
        <div class="blog-meta">
          <span class="blog-tag">${post.category}</span>
          <span class="blog-date">📅 ${post.date}</span>
        </div>
        <h3 class="blog-title">${post.title}</h3>
        <p class="blog-excerpt">${post.excerpt}</p>
        <a href="blog-detail.html?id=${post.id}" class="blog-link">Baca Selengkapnya →</a>
      </div>
    </div>
  `).join('');
}

// Render blog list page (all posts)
function renderBlogList() {
  const grid = document.getElementById('blogListGrid');
  if (!grid) return;

  grid.innerHTML = blogPosts.map(post => `
    <div class="blog-card reveal" data-category="${getCategorySlug(post.category)}">
      <div class="blog-thumb">
        <img src="${post.image}" alt="${post.title}" loading="lazy" />
      </div>
      <div class="blog-body">
        <div class="blog-meta">
          <span class="blog-tag">${post.category}</span>
          <span class="blog-date">📅 ${post.date}</span>
        </div>
        <h3 class="blog-title">${post.title}</h3>
        <p class="blog-excerpt">${post.excerpt}</p>
        <a href="blog-detail.html?id=${post.id}" class="blog-link">Baca Selengkapnya →</a>
      </div>
    </div>
  `).join('');
}

// Render single blog detail
function renderBlogDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = parseInt(urlParams.get('id'));
  const post = blogPosts.find(p => p.id === postId);
  if (!post) return;

  // Update SEO dinamis (title, meta, OG, JSON-LD Article)
  if (typeof updateArticleSEO === 'function') {
    updateArticleSEO(post);
  }

  const detailEl = document.getElementById('blogDetailContent');
  if (detailEl) {
    detailEl.innerHTML = `
      <div class="blog-detail-header">
        <span class="blog-tag">${post.category}</span>
        <span class="blog-date" style="margin-left:12px;">📅 ${post.date}</span>
        <h1 class="blog-detail-title">${post.title}</h1>
        <p class="blog-detail-excerpt">${post.excerpt}</p>
      </div>
      <img src="${post.image}" alt="${post.title}" class="blog-detail-img" />
      <div class="blog-detail-body">
        ${post.content}
      </div>
      <div class="blog-tags">
        ${post.tags.map(tag => `<span class="tag-pill">#${tag}</span>`).join('')}
      </div>
    `;
  }

  // Render related posts
  const relatedGrid = document.getElementById('relatedGrid');
  if (relatedGrid) {
    const related = blogPosts.filter(p => p.id !== postId).slice(0, 3);
    relatedGrid.innerHTML = related.map(p => `
      <div class="blog-card">
        <div class="blog-thumb">
          <img src="${p.image}" alt="${p.title}" loading="lazy" />
        </div>
        <div class="blog-body">
          <div class="blog-meta">
            <span class="blog-tag">${p.category}</span>
          </div>
          <h3 class="blog-title">${p.title}</h3>
          <a href="blog-detail.html?id=${p.id}" class="blog-link">Baca →</a>
        </div>
      </div>
    `).join('');
  }
}

// Auto-run on DOM ready
document.addEventListener('DOMContentLoaded', function() {
  renderBlogHome();
  renderBlogList();
  renderBlogDetail();
});
