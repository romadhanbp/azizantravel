// ============================================
// AZIZAN TRAVEL - Main JavaScript
// ============================================

// ============================================
// NAVBAR: Scroll behavior & mobile toggle
// ============================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
});

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    navToggle.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.classList.remove('active');
    });
  });
}

// ============================================
// HERO: Ken Burns effect
// ============================================
window.addEventListener('load', () => {
  const hero = document.querySelector('.hero');
  if (hero) hero.classList.add('loaded');
});

// ============================================
// SCROLL REVEAL (IntersectionObserver)
// ============================================
const revealElements = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
};

// Run after a short delay to ensure all content is rendered
setTimeout(revealElements, 100);

// ============================================
// PACKAGE FILTER
// ============================================
const filterTabs = document.querySelectorAll('.filter-tab');
const packageCards = document.querySelectorAll('.package-card');

filterTabs.forEach(tab => {
  tab.addEventListener('click', () => {
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
    const select = document.getElementById('paketSelect');
    if (select && packageName) {
      select.value = packageName;
    }
    // Set min date to today
    const tanggalInput = document.getElementById('tanggalInput');
    if (tanggalInput) {
      const today = new Date().toISOString().split('T')[0];
      tanggalInput.setAttribute('min', today);
    }
  }
}

function closeModal() {
  if (bookingModal) {
    bookingModal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

if (openModalBtns) {
  openModalBtns.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
      });
    }
  });
}

if (closeModalBtn) {
  closeModalBtn.addEventListener('click', closeModal);
}

if (bookingModal) {
  bookingModal.addEventListener('click', (e) => {
    if (e.target === bookingModal) closeModal();
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// Booking buttons on cards
document.querySelectorAll('.book-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const pkg = btn.dataset.package || '';
    openModal(pkg);
  });
});

// ============================================
// BOOKING FORM -> WhatsApp
// ============================================
if (bookingForm) {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nama = document.getElementById('namaInput').value.trim();
    const hp = document.getElementById('hpInput').value.trim();
    const jumlah = document.getElementById('jumlahInput').value.trim();
    const paket = document.getElementById('paketSelect').value;
    const tanggal = document.getElementById('tanggalInput').value;
    const penjemputan = document.getElementById('penjemputanInput').value.trim();
    const pesan = document.getElementById('pesanInput').value.trim();

    if (!nama || !hp || !paket || !tanggal) {
      alert('Mohon lengkapi data yang diperlukan.');
      return;
    }

    const tglFormatted = tanggal ? new Date(tanggal + 'T00:00:00').toLocaleDateString('id-ID', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    }) : '-';

    const msg = `Halo ${CONFIG.businessName} 🙋\n\nSaya *${nama}* ingin booking:\n\n📦 *Paket:* ${paket}\n👥 *Jumlah:* ${jumlah} orang\n📅 *Tanggal:* ${tglFormatted}\n📍 *Penjemputan:* ${penjemputan || '-'}\n📱 *Kontak:* ${hp}\n\n📝 *Pesan:* ${pesan || '-'}\n\nMohon info ketersediaan & biaya 🙏`;

    const url = `https://wa.me/${CONFIG.waNumber}?text=${encodeURIComponent(msg)}&utm_source=website`;
    window.open(url, '_blank');

    closeModal();
    bookingForm.reset();
  });
}

// ============================================
// SMOOTH SCROLL for anchor links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#' || href === '#booking') return;

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ============================================
// GALLERY LIGHTBOX
// ============================================
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    if (!img) return;

    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position:fixed;inset:0;background:rgba(0,0,0,0.92);z-index:9999;
      display:flex;align-items:center;justify-content:center;cursor:pointer;
      padding:20px;
    `;

    const enlargedImg = document.createElement('img');
    enlargedImg.src = img.src;
    enlargedImg.alt = img.alt;
    enlargedImg.style.cssText = `
      max-width:90%;max-height:90vh;border-radius:12px;object-fit:contain;
      box-shadow:0 20px 60px rgba(0,0,0,0.5);
    `;

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✕';
    closeBtn.style.cssText = `
      position:absolute;top:24px;right:24px;background:rgba(255,255,255,0.15);
      color:white;border:none;width:44px;height:44px;border-radius:50%;
      font-size:1.3rem;cursor:pointer;transition:0.2s;
    `;
    closeBtn.onmouseenter = () => closeBtn.style.background = 'rgba(255,255,255,0.3)';
    closeBtn.onmouseleave = () => closeBtn.style.background = 'rgba(255,255,255,0.15)';

    overlay.appendChild(enlargedImg);
    overlay.appendChild(closeBtn);
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    const removeOverlay = () => {
      overlay.remove();
      document.body.style.overflow = '';
    };

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) removeOverlay();
    });
    closeBtn.addEventListener('click', removeOverlay);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') removeOverlay();
    }, { once: true });
  });
});

// ============================================
// BLOG CATEGORY FILTER
// ============================================
const blogFilterTabs = document.querySelectorAll('.blog-filter-tab');

blogFilterTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    blogFilterTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const filter = tab.dataset.filter;
    document.querySelectorAll('.blog-card').forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.display = 'flex';
        card.style.animation = 'fadeIn 0.4s ease';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ============================================
// TO TOP BUTTON
// ============================================
const toTop = document.getElementById('toTop');

window.addEventListener('scroll', () => {
  if (toTop) {
    toTop.style.display = window.scrollY > 400 ? 'block' : 'none';
  }
});

if (toTop) {
  toTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ============================================
// FOOTER COPYRIGHT YEAR
// ============================================
const yearEl = document.getElementById('copyrightYear');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
