// ============================================
// AZIZAN TRAVEL - Main JavaScript
// ============================================

// === CONFIG: Ganti nomor WA dan info kontak di sini ===
const CONFIG = {
  waNumber: '6281999868882',   // Ganti dengan nomor WA Anda (format: 62xxx tanpa +)
  businessName: 'Azizan Travel',
  address: 'Jl. H Muhammad Umar Telagawaru, desa Jago, Praya, Lombok Tengah, NTB',
  email: 'azizantravellombok@gmail.com'
};

// ============================================
// NAVBAR: Scroll behavior & mobile toggle
// ============================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar?.classList.add('scrolled');
  } else {
    navbar?.classList.remove('scrolled');
  }
});

navToggle?.addEventListener('click', () => {
  navMenu?.classList.toggle('open');
  navToggle.classList.toggle('active');
});

// Close menu on nav link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu?.classList.remove('open');
    navToggle?.classList.remove('active');
  });
});

// ============================================
// HERO: Ken Burns effect
// ============================================
window.addEventListener('load', () => {
  document.querySelector('.hero')?.classList.add('loaded');
});

// ============================================
// SCROLL REVEAL ANIMATION
// ============================================
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Staggered delay for grid items
        const delay = (entry.target.dataset.delay || 0) * 100;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  // Add staggered delays to grid items
  document.querySelectorAll('.packages-grid .reveal, .blog-grid .reveal, .testi-slider .reveal').forEach((el, i) => {
    el.dataset.delay = i % 3;
  });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// Re-run after blog posts are rendered
setTimeout(initScrollReveal, 100);

// ============================================
// PACKAGE FILTER
// ============================================
const filterTabs = document.querySelectorAll('.filter-tab');
const packageCards = document.querySelectorAll('.package-card');

filterTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Active state
    filterTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const filter = tab.dataset.filter;

    packageCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeIn 0.4s ease';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ============================================
// BOOKING MODAL
// ============================================
const bookingModal = document.getElementById('bookingModal');
const openModalBtns = document.querySelectorAll('#openBookingModal, #navBooking, #heroBooking, #bottomNavBooking');
const closeModalBtn = document.getElementById('closeModal');
const bookingForm = document.getElementById('bookingForm');

function openModal(packageName = '') {
  if (bookingModal) {
    bookingModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    // Pre-select package if provided
    const select = document.getElementById('paketSelect');
    if (select && packageName) {
      const option = [...select.options].find(o => o.value === packageName);
      if (option) select.value = packageName;
    }
    // Set min date to today
    const dateInput = document.getElementById('tanggalInput');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.min = today;
    }
  }
}

function closeModal() {
  if (bookingModal) {
    bookingModal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

openModalBtns.forEach(btn => {
  btn?.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  });
});

closeModalBtn?.addEventListener('click', closeModal);

bookingModal?.addEventListener('click', (e) => {
  if (e.target === bookingModal) closeModal();
});

// Book buttons on cards
document.querySelectorAll('.book-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const packageName = btn.dataset.package || '';
    openModal(packageName);
  });
});

// ============================================
// BOOKING FORM: Send to WhatsApp
// ============================================
bookingForm?.addEventListener('submit', (e) => {
  e.preventDefault();

  const nama = document.getElementById('namaInput')?.value.trim();
  const hp = document.getElementById('hpInput')?.value.trim();
  const jumlah = document.getElementById('jumlahInput')?.value;
  const paket = document.getElementById('paketSelect')?.value;
  const tanggal = document.getElementById('tanggalInput')?.value;
  const penjemputan = document.getElementById('penjemputanInput')?.value.trim();
  const pesan = document.getElementById('pesanInput')?.value.trim();

  // Format tanggal ke bahasa Indonesia
  const tgl = tanggal ? new Date(tanggal).toLocaleDateString('id-ID', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  }) : '-';

  const message = `
Halo ${CONFIG.businessName}! 👋

Saya ingin memesan paket wisata:

📋 *Detail Pemesanan:*
• Nama: ${nama}
• No. HP: ${hp}
• Paket: ${paket || '-'}
• Tanggal: ${tgl}
• Jumlah Orang: ${jumlah || '-'} orang
• Penjemputan: ${penjemputan || '-'}
• Pesan: ${pesan || '-'}

Mohon konfirmasi ketersediaan dan info lebih lanjut. Terima kasih! 🙏
  `.trim();

  const encodedMessage = encodeURIComponent(message);
  const waUrl = `https://wa.me/${CONFIG.waNumber}?text=${encodedMessage}&utm_source=website`;

  window.open(waUrl, '_blank');
  closeModal();
  bookingForm.reset();
});

// ============================================
// SMOOTH SCROLL for anchor links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#' || href === '#booking') return; // Let modal handle
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ============================================
// ACTIVE NAV LINK on scroll (index page only)
// ============================================
if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.pageYOffset >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href && href.includes(current)) {
        link.classList.add('active');
      }
    });
  });
}

// ============================================
// GALLERY LIGHTBOX (simple)
// ============================================
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    if (!img) return;

    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position:fixed; inset:0; background:rgba(0,0,0,0.92);
      z-index:9999; display:flex; align-items:center; justify-content:center;
      cursor:pointer; padding:20px;
    `;

    const image = document.createElement('img');
    image.src = img.src;
    image.style.cssText = `
      max-width:90vw; max-height:90vh; border-radius:12px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.5);
    `;

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✕';
    closeBtn.style.cssText = `
      position:absolute; top:20px; right:20px; background:rgba(255,255,255,0.15);
      border:none; color:white; font-size:1.5rem; width:44px; height:44px;
      border-radius:50%; cursor:pointer; display:flex; align-items:center; justify-content:center;
    `;

    overlay.appendChild(image);
    overlay.appendChild(closeBtn);
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    const closeLightbox = () => {
      overlay.remove();
      document.body.style.overflow = '';
    };

    overlay.addEventListener('click', closeLightbox);
    closeBtn.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); }, { once: true });
  });
});

// ============================================
// PAGE-SPECIFIC: Blog List filter
// ============================================
const blogFilterTabs = document.querySelectorAll('.blog-filter-tab');
blogFilterTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    blogFilterTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const filter = tab.dataset.filter;
    document.querySelectorAll('.blog-card').forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ============================================
// TO TOP BUTTON: show/hide on scroll + click
// ============================================
const toTopBtn = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  if (!toTopBtn) return;
  if (window.scrollY > 400) {
    toTopBtn.classList.add('visible');
  } else {
    toTopBtn.classList.remove('visible');
  }
});
toTopBtn?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================================
// FOOTER: Auto-update copyright year
// ============================================
document.querySelectorAll('.footer-bottom p').forEach(p => {
  p.innerHTML = p.innerHTML.replace(/\d{4}/, new Date().getFullYear().toString());
});

console.log('✅ Azizan Travel - Website loaded successfully');
console.log(`📱 WhatsApp: ${CONFIG.waNumber}`);
