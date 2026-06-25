# Azizan Travel — Project Instructions

## Project Overview

Website profil dan booking untuk **Azizan Travel**, agen wisata & transportasi di Lombok.  
Tech: HTML5, CSS3 (vanilla), JavaScript (vanilla). No framework. No build step.

## Code Conventions

### HTML
- Bahasa Indonesia (`lang="id"`)
- Semantic HTML5 (`nav`, `section`, `footer`, `form`)
- Emoji sebagai icon utilities (bukan font icons)
- Modal booking dengan form → submit ke WhatsApp API (`wa.me`)
- Lazy loading pada gambar (`loading="lazy"`)

### CSS (`css/style.css`)
- Design System via CSS Custom Properties (`:root` variables)
- Naming convention: BEM-like (`.block__element--modifier` seperlunya)
- Mobile-first responsive dengan `max-width` breakpoints: 768px, 1024px
- Animasi: `@keyframes` + class `.reveal` / `.visible` untuk scroll reveal
- WA float button + bottom nav (mobile) — dua mekanisme kontak

### JavaScript (`js/main.js` + `js/blog.js` + `js/seo-config.js`)
- No framework. Vanilla JS (`querySelector`, `addEventListener`, `IntersectionObserver`)
- `CONFIG` object di `main.js:6` — ganti nomor WA dan kontak di sini
- `SEO_CONFIG` object di `js/seo-config.js` — ganti semua setting SEO di sini
- Booking form submit → encode ke URL → `window.open` WhatsApp
- Gallery lightbox: inline DOM creation (bukan library)
- Scroll reveal via `IntersectionObserver`

## File Structure

```
/
├── index.html          # Landing page (hero, paket, galeri, testimoni, blog, footer)
├── paket.html          # Halaman detail paket wisata lengkap
├── blog.html           # Daftar artikel blog
├── blog-detail.html    # Template detail artikel
├── kontak.html         # Halaman kontak + form
├── css/
│   └── style.css       # Single stylesheet (1748 lines)
├── js/
│   ├── main.js         # Navigasi, modal, filter, scroll, gallery, booking
│   ├── blog.js         # Data & rendering blog
│   └── seo-config.js   # Konfigurasi SEO terpusat (meta, OG, JSON-LD)
├── img/                # Gambar (hero, destinasi, transportasi)
├── WORKFLOW.md         # Development workflow end-to-end
├── DEPLOYMENT.md       # Panduan deploy ke production
├── QA-CHECKLIST.md     # Checklist quality assurance
├── GIT-WORKFLOW.md     # Strategi branching & commit
├── AGENTS.md           # THIS FILE — AI instructions
└── opencode.json       # opencode config
```

## Design Tokens (from `:root`)

| Token | Value | Usage |
|-------|-------|-------|
| `--primary` | `#0d9488` | Teal — brand utama, tombol, link |
| `--secondary` | `#f59e0b` | Amber — badge, highlight |
| `--accent` | `#06b6d4` | Cyan — gradient aksen |
| `--cream` | `#faf7f2` | Background section |
| `--dark` | `#0f2027` | Dark teal — footer, hero overlay |
| Typography | Poppins (heading) + Inter (body) | |

## Common Tasks

### Adding a new package
1. Tambah card di `index.html` dalam `.packages-grid` — ikuti struktur `.package-card`
2. Tambah opsi di `<select id="paketSelect">` dalam modal
3. (Opsional) update `paket.html`

### Adding a blog post
1. Tambah objek di array `blogPosts` dalam `js/blog.js` — ikuti struktur yang ada
2. Untuk gambar, gunakan `/img/` dengan format JPG/WebP

### Updating WhatsApp number
Edit `CONFIG.waNumber` di `js/main.js:7` — format 62xxx tanpa `+`

### Adding a new page
1. Copy struktur dari halaman existing
2. Gunakan class `.page-hero` untuk header halaman
3. Link di navbar (`index.html:34-38`) dan footer (`index.html:464-471`)
4. Tambah item di `.bottom-nav` (mobile)
5. Tambah entry SEO di `js/seo-config.js` dalam `SEO_CONFIG.pages`

### Updating SEO
1. Buka `js/seo-config.js` — semua setting SEO ada di object `SEO_CONFIG`
2. Edit `pages.{pageKey}.title` / `.description` / `.keywords` / `.ogTitle` / `.ogDescription`
3. Setiap halaman otomatis membaca config ini saat dimuat
4. Untuk JSON-LD structured data, edit `SEO_CONFIG.organization`

## SEO Guidelines
- `meta description` dan `meta keywords` di setiap halaman — via `js/seo-config.js`
- `og:title` / `og:description` untuk social sharing — via `js/seo-config.js`
- JSON-LD structured data (LocalBusiness + BreadcrumbList) — otomatis dari `seo-config.js`
- Canonical URL — otomatis dari `seo-config.js`
- URL WhatsApp dengan `utm_source=website` di parameter
- Alt text pada semua gambar
- Breadcrumb di halaman dalam (`.breadcrumb`)

## Performance
- `loading="lazy"` pada semua gambar non-hero
- CSS single file (tidak split)
- Hero image jangan dilazy-load (critical above fold)
- Gunakan format WebP jika memungkinkan

## opencode Workflow
- Selalu baca file terkait sebelum mengedit
- Ikuti pola kode yang sudah ada — jangan perkenalkan library baru tanpa diskusi
- Setelah membuat perubahan, verifikasi dengan buka file di browser
- Nomor WA di CONFIG adalah dummy — jangan commit nomor riil tanpa izin

## opencode Agents

Gunakan agent berikut via `@nama-agent` atau `Task` tool:

| Agent | Fungsi | File Utama |
|-------|--------|------------|
| `@content-writer` | Menulis artikel blog & konten | `js/blog.js` |
| `@package-manager` | Menambah paket wisata | `index.html`, `paket.html` |
| `@ui-polisher` | Memoles CSS & responsive design | `css/style.css` |
| `@seo-auditor` | SEO on-page optimization | `js/seo-config.js`, seluruh HTML |

### Workflow Files

Gunakan workflow files berikut sebagai referensi:

| File | Untuk |
|------|-------|
| `WORKFLOW.md` | Alur development dari planning → deploy |
| `DEPLOYMENT.md` | Cara deploy ke Netlify/GitHub Pages |
| `QA-CHECKLIST.md` | Checklist testing sebelum deploy |
| `GIT-WORKFLOW.md` | Branching & commit convention |

> **Urutan baca:** `AGENTS.md` → `WORKFLOW.md` → `QA-CHECKLIST.md` → `DEPLOYMENT.md`

Juga tersedia di `opencode.json` sebagai inline agents yang bisa dipanggil via Task tool.

## Constraints
- JANGAN tambahkan framework (React, Vue, Tailwind, Bootstrap, dll)
- JANGAN ubah struktur file tanpa diskusi
- JANGAN commit perubahan — hanya edit file
- JANGAN hapus emoji icon — itu bagian dari desain
- Pertahankan bahasa Indonesia untuk semua konten
