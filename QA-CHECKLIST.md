# QA Checklist — Azizan Travel

> Checklist lengkap untuk quality assurance sebelum & setelah deploy.

---

## Cara Pakai

Centang item setelah diverifikasi. Format: `[ ]` → `[x]`

---

## A. HTML Validation

### Semua Halaman
- [ ] `<!DOCTYPE html>` di baris pertama
- [ ] `<html lang="id">`
- [ ] `<meta charset="UTF-8">`
- [ ] `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- [ ] Tidak ada tag yang tidak ditutup
- [ ] Semantic HTML: `<nav>`, `<section>`, `<article>`, `<footer>`, `<form>`
- [ ] Heading hierarchy: `h1` → `h2` → `h3` — tidak loncat
- [ ] Semua `<img>` punya `alt` text
- [ ] Semua `<a>` punya `href` atau fungsi yang valid
- [ ] Form input punya `<label>` atau `aria-label`

### Per Halaman

| Halaman | File | Item Spesifik |
|---------|------|---------------|
| Homepage | `index.html` | Hero section, packages grid, gallery, testimonials, blog preview |
| Paket | `paket.html` | Package filter, card grid, breadcrumb |
| Blog | `blog.html` | Article cards, search/filter |
| Blog Detail | `blog-detail.html` | Article content, related posts, breadcrumb |
| Kontak | `kontak.html` | Contact form, info cards, map embed, breadcrumb |

---

## B. CSS & Visual

### Design Consistency
- [ ] Warna konsisten dengan design system (`--primary`, `--secondary`, dll)
- [ ] Font sesuai: Poppins (heading) + Inter (body)
- [ ] Spacing antar section konsisten
- [ ] Shadow system konsisten (`--shadow-sm`, `--shadow-md`, `--shadow-lg`)
- [ ] Border radius konsisten
- [ ] Tidak ada font yang broken / fallback ke serif

### Animasi
- [ ] Scroll reveal: class `.reveal` → jadi `.visible` saat discroll
- [ ] Animasi tidak terlalu lambat/cepat
- [ ] Animasi tidak bikin layout shift
- [ ] Navbar: class `scrolled` nambah pas scroll > 50px
- [ ] Mobile nav toggle: `.nav-menu` slide in/out

### Responsive
- [ ] Mobile (375px): bottom nav muncul, navbar collapse
- [ ] Tablet (768px): grid 2 kolom, font size proporsional
- [ ] Desktop (1024px+): full layout, grid 3-4 kolom, WA float muncul
- [ ] Bottom nav: sembunyi di > 768px
- [ ] WA float button: muncul di > 768px
- [ ] Gallery grid: responsive, tidak broken
- [ ] Package cards: height konsisten, tidak ada overflow

---

## C. JavaScript Functionality

### Global
- [ ] Tidak ada error di console browser
- [ ] `CONFIG` object terdefinisi dengan benar
- [ ] Semua event listener aktif

### Navbar (`main.js`)
- [ ] Scroll: navbar tambah class `scrolled`
- [ ] Mobile toggle: click hamburger → nav menu muncul
- [ ] Click nav link → menu tertutup (mobile)
- [ ] Nav booking CTA: click → buka modal

### Booking Modal (`main.js`)
- [ ] Modal muncul saat tombol "Pesan Sekarang" diklik
- [ ] Overlay klik → modal tutup
- [ ] Tombol X → modal tutup
- [ ] `Esc` key → modal tutup
- [ ] Form submit:
  - [ ] Nama terisi → masuk ke URL WA
  - [ ] Paket terpilih → masuk ke URL WA
  - [ ] Tanggal terisi → masuk ke URL WA
  - [ ] Jumlah orang (angka) → masuk ke URL WA
  - [ ] Pesan tambahan → masuk ke URL WA
  - [ ] URL WA format: `https://wa.me/62xxx?text=...`
  - [ ] Ada parameter `utm_source=website`
  - [ ] Window terbuka dengan URL WA yang benar

### Gallery Lightbox (`main.js`)
- [ ] Click gambar gallery → lightbox terbuka
- [ ] Navigasi prev/next berfungsi
- [ ] Tombol close / klik luar → lightbox tutup
- [ ] Keyboard: arrow left/right navigasi, Escape tutup
- [ ] Gambar tidak broken

### Filter Paket (`main.js`)
- [ ] Filter by kategori: card show/hide
- [ ] Animasi transisi smooth
- [ ] "Semua" filter menampilkan semua card

### Scroll Reveal (`main.js`)
- [ ] Elements dengan class `.reveal` muncul saat discroll
- [ ] IntersectionObserver berfungsi di semua section
- [ ] Animasi tidak terjadi ulang (hanya sekali)

### Blog (`blog.js`)
- [ ] Blog posts ter-render dari array `blogPosts`
- [ ] Gambar muncul dengan benar
- [ ] Link ke `blog-detail.html` dengan query params
- [ ] `blog-detail.html` membaca URL params & render konten
- [ ] Related posts berfungsi

---

## D. Booking Flow (End-to-End)

Test seluruh flow booking:

```
Homepage → Klik "Pesan Sekarang" → Modal muncul
→ Isi form: Nama, Paket, Tanggal, Jumlah Orang, Pesan
→ Klik "Kirim via WhatsApp"
→ Terbuka tab baru ke wa.me/62xxx?text=...
→ Text WA berisi:
   * Nama customer
   * Paket yang dipilih
   * Tanggal booking
   * Jumlah orang
   * Pesan tambahan
```

- [ ] Flow di atas jalan tanpa error
- [ ] Format text WA rapi & informatif
- [ ] Nomor WA yang dituju benar

---

## E. SEO Check

### Per Halaman
- [ ] `<title>` unik, max 60 karakter
- [ ] `<meta name="description">` unik, max 160 karakter, mengandung keyword
- [ ] `<meta name="keywords">` relevan
- [ ] `og:title` dan `og:description` terisi
- [ ] `og:type="website"` (untuk homepage) / `og:type="article"` (untuk blog)
- [ ] `og:image` ada
- [ ] Canonical URL (optional)

### Global
- [ ] Semua gambar punya `alt` text deskriptif
- [ ] Internal links: navbar, footer, breadcrumb, blog → paket
- [ ] URL WA pake `utm_source=website`
- [ ] Breadcrumb di halaman dalam
- [ ] Favicon ada

---

## F. Performance

### Image Optimization
- [ ] Semua gambar pake format WebP
- [ ] Ukuran gambar: hero max 200KB, sisanya max 100KB
- [ ] `loading="lazy"` di semua gambar non-hero
- [ ] Hero image: loading normal (eager)

### Load Time
- [ ] First Contentful Paint (FCP) < 2 detik
- [ ] Largest Contentful Paint (LCP) < 3 detik
- [ ] Total page size < 1.5 MB (idealnya < 1 MB)
- [ ] Cek di Chrome DevTools → Network tab → Disable cache

### Best Practices
- [ ] CSS single file (tidak split)
- [ ] JS 2 file: `main.js` + `blog.js`
- [ ] Tidak ada render-blocking resources yang berat
- [ ] Google Fonts di-load dengan `display=swap`

---

## G. Accessibility

- [ ] Skip to content link (opsional)
- [ ] Warna kontras cukup (cek dengan Chrome DevTools)
- [ ] Semua interactive elements bisa di-focus
- [ ] `aria-label` di button icon-only (nav toggle, close modal)
- [ ] Form error handling: validation message
- [ ] Font size readable (min 16px body text)

---

## H. Cross-browser

- [ ] Google Chrome (latest)
- [ ] Mozilla Firefox (latest)
- [ ] Microsoft Edge (latest)
- [ ] Safari (latest)
- [ ] Chrome Mobile Android
- [ ] Safari Mobile iOS

---

## I. Security

- [ ] Nomor WA di CONFIG bukan dummy
- [ ] Tidak ada credentials / API keys di source code
- [ ] Tidak ada link mencurigakan / redirect aneh
- [ ] Form booking open new tab (bukan redirect)
- [ ] WhatsApp URL: domain adalah `wa.me` (bukan fake domain)

---

## J. Final Sign-off

Semua checklist terpenuhi:
- [ ] **HTML Validation** — ✅ / ❌
- [ ] **CSS & Visual** — ✅ / ❌
- [ ] **JavaScript** — ✅ / ❌
- [ ] **Booking Flow** — ✅ / ❌
- [ ] **SEO** — ✅ / ❌
- [ ] **Performance** — ✅ / ❌
- [ ] **Accessibility** — ✅ / ❌
- [ ] **Cross-browser** — ✅ / ❌
- [ ] **Security** — ✅ / ❌

**Status: ** ✅ **READY TO DEPLOY** / ❌ **PERLU PERBAIKAN**

---

## Referensi

| File | Isi |
|------|-----|
| `WORKFLOW.md` | Alur development end-to-end |
| `DEPLOYMENT.md` | Panduan deploy lengkap |
| `GIT-WORKFLOW.md` | Strategi branching & commit |
| `AGENTS.md` | Konvensi kode & setup project |
