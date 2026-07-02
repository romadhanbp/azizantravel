# Changelog — Azizan Travel Website

## 2026-07-02

### Multi-Language Support (ID/EN)

**New Files:**
- `src/components/LanguageSwitcher.astro` — ID/EN toggle button di navbar
- `src/pages/en/index.astro` — Homepage versi EN
- `src/pages/en/paket.astro` — Paket wisata versi EN
- `src/pages/en/transportasi.astro` — Transportasi versi EN
- `src/pages/en/blog/index.astro` — Blog listing versi EN
- `src/pages/en/blog/[slug].astro` — Blog detail versi EN
- `src/pages/en/kontak.astro` — Kontak versi EN
- `src/content/blog-en/*.md` — 9 artikel blog EN (6 auto-sync + 3 manual)
- `src/content/packages-en/*.md` — 7 paket EN
- `src/content/transportasi-en/*.md` — 3 kendaraan EN
- `src/content/homepage-en/*.md` — 7 homepage sections EN
- `src/content/testimonials-en/*.md` — 4 testimoni EN
- `src/content/categories-en/*.md` — 4 kategori EN
- `scripts/sync-all.js` — Master sync script (ID → EN)
- `scripts/sync-blog-en.js` — Sync blog ID → EN
- `scripts/sync-packages-en.js` — Sync packages ID → EN
- `scripts/sync-transport-en.js` — Sync transport ID → EN

**Modified Files:**
- `src/content.config.ts` — Tambah 6 collection schemas EN
- `public/admin/config.yml` — Tambah 7 collection entries EN
- `src/layouts/Base.astro` — Tambah `lang` prop, translations, language-aware routing
- `src/pages/404.astro` — Language detection dari URL path
- `package.json` — Tambah script `sync`, `sync:blog`, `sync:transport`, `sync:packages`
- `public/css/style.css` — Responsive styles untuk language switcher

**How Auto-Sync Works:**
1. Buat artikel ID di admin → publish
2. `npm run build` otomatis jalankan `scripts/sync-all.js`
3. Script buat file EN di `blog-en/` dengan tag `[AUTO-SYNC]` & `published: false`
4. Buka admin → Blog (EN) → translate → set `published: true`
5. Artikel EN tampil di website

**Commands:**
- `npm run sync` — Sync semua collections
- `npm run sync:blog` — Sync blog saja
- `npm run sync:transport` — Sync transport saja
- `npm run sync:packages` — Sync packages saja
- `npm run build` — Sync + build otomatis

---

### Performance Optimizations

**CSS:**
- Google Fonts dipindah dari CSS `@import` ke HTML `<link>` dengan `preconnect`
- Font loading lebih cepat, tidak render-blocking

**Images:**
- `width`/`height` ditambahkan ke semua card components (PackageCard, TransportCard, BlogCard)
- Mencegah Cumulative Layout Shift (CLS)

**JavaScript:**
- `revealElements()` menggunakan `DOMContentLoaded` bukan `setTimeout`
- Scroll listener dikonsolidasi (navbar + to-top button)
- Mengurangi redundant event listeners

**SEO:**
- BlogCard menggunakan semantic `<article>` tag
- `datetime` attribute pada `<time>` elements
- Date localization (EN/ID)

**Accessibility:**
- Skip-to-content link untuk keyboard navigation
- `<main>` tag sebagai content wrapper
- ARIA labels pada tombol interaktif
- `aria-label="Pesan {title}"` pada card buttons

---

### Content Status

**Homepage EN:** ✅ Terisi (hero, why-us, cta, gallery, headers)
**Testimonials EN:** ✅ Terisi (4 artikel)
**Categories EN:** ✅ Terisi (4 kategori)
**Blog EN:** ⚠️ 3 artikel terjemahan manual, 6 auto-sync perlu diterjemahkan
**Packages EN:** ⚠️ Belum terjemahkan (auto-sync dengan placeholder)
**Transport EN:** ⚠️ Belum terjemahkan (auto-sync dengan placeholder)

---

### Known Issues
- Slug auto-sync blog masih kurang natural (word-by-word translation)
- `Generated an empty chunk: "Base.astro_astro_type_script_index_0_lang"` — non-critical warning
- EN blog articles yang auto-synced masih perlu diterjemahkan via admin

---

### Build Stats
- Total pages: 26 (12 ID + 13 EN + 1 404)
- Build time: ~7 detik
- CSS: ~36KB
- JS: ~10KB
