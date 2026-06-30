# Rencana Migrasi Website Azizan Travel ke Astro SSG

**Status:** BELUM DIEKSEKUSI - Menunggu eksekusi per phase

---

## Goal

Migrasi website Azizan Travel dari vanilla HTML/CSS/JS ke **Astro Static Site Generator** dengan:

1. **Pemisahan konten** — Layanan Transportasi dan Paket Wisata dikelola terpisah
2. **Halaman Transportasi** — `/transportasi/` khusus kendaraan (Avanza, Xenia, Innova)
3. **6 paket wisata di halaman depan** — Paket Unggulan hanya tampilkan wisata
4. **Admin dashboard** — Decap CMS untuk edit konten tanpa edit HTML
5. **Routing berbasis slug** — Blog detail pakai `/blog/[slug]/` bukan `?id=N`

---

## Struktur File Target

```
azizantravel/
├── public/
│   ├── img/                          # Gambar dipindah ke sini
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── content/
│   │   ├── packages/                 # 1 file .md per paket wisata
│   │   │   ├── gili-trawangan.md
│   │   │   ├── pink-beach.md
│   │   │   ├── rinjani-trekking.md
│   │   │   ├── lombok-explorer.md
│   │   │   ├── senggigi-sunset.md
│   │   │   ├── honeymoon.md
│   │   │   └── custom-trip.md
│   │   ├── transportasi/             # 1 file .md per kendaraan
│   │   │   ├── avanza.md
│   │   │   ├── xenia.md
│   │   │   └── innova.md
│   │   └── blog/                     # 1 file .md per artikel
│   │       ├── panduan-gili-trawangan.md
│   │       ├── tips-trekking-rinjani.md
│   │       ├── pantai-pink-beach.md
│   │       ├── kuliner-lombok.md
│   │       ├── transportasi-lombok.md
│   │       └── hidden-gems-lombok.md
│   ├── layouts/
│   │   └── Base.astro                # Layout utama (navbar, footer, modal, bottom-nav)
│   ├── components/
│   │   ├── PackageCard.astro         # Komponen kartu paket wisata
│   │   ├── TransportCard.astro       # Komponen kartu kendaraan
│   │   ├── BlogCard.astro            # Komponen kartu blog
│   │   ├── TestimonialCard.astro     # Komponen testimoni
│   │   ├── BookingModal.astro        # Modal booking form
│   │   ├── WaFloat.astro             # WA float button
│   │   ├── ToTop.astro               # Tombol ke atas
│   │   └── BottomNav.astro           # Navigasi mobile
│   ├── data/
│   │   ├── config.js                 # CONFIG object (WA number, nama bisnis, alamat)
│   │   ├── seo.js                    # SEO config per halaman
│   │   └── testimonials.js           # Data testimoni
│   ├── pages/
│   │   ├── index.astro               # Halaman depan
│   │   ├── transportasi.astro        # Halaman transportasi
│   │   ├── paket.astro               # Halaman paket wisata
│   │   ├── blog/
│   │   │   ├── index.astro           # Daftar blog
│   │   │   └── [slug].astro          # Detail blog (routing per slug)
│   │   ├── kontak.astro              # Halaman kontak
│   │   └── 404.astro                 # Halaman tidak ditemukan
│   ├── styles/
│   │   └── global.css                # style.css dipindah ke sini
│   └── js/
│       └── main.js                   # Interaktivitas (modal, filter, scroll, lightbox)
├── astro.config.mjs                  # Konfigurasi Astro
├── package.json                      # Dependencies: astro
└── tsconfig.json                     # TypeScript config (opsional)
```

---

## Schema Data

### Package (src/content/packages/*.md)

```yaml
---
title: "Gili Trawangan Full Day"
slug: "gili-trawangan"
category: "wisata"                    # wisata | petualangan
image: "gili-trawangan.jpg"
badge: "Populer"                      # opsional
duration: "1 Hari"
maxGroup: 8
price: "Rp 450rb"
pricePer: "orang"
includes:
  - "Transportasi PP + driver"
  - "Speedboat ke Gili Trawangan"
  - "Snorkeling equipment"
  - "Makan siang"
description: "Snorkeling, bersantai di pantai, menikmati sunset di Gili Trawangan yang ikonik."
featured: true                        # true = tampil di halaman depan
order: 1                              # urutan tampil
---
```

### Transportasi (src/content/transportasi/*.md)

```yaml
---
title: "Toyota Avanza / Calya"
slug: "avanza"
image: "transport-bisnis.jpg"
badge: "Ekonomis"
category: "MPV Mini"
capacity: "7 Orang"
luggage: "2-3 Koper"
price: "Rp 300rb"
pricePer: "hari"
includes:
  - "Driver profesional"
  - "BBM termasuk"
  - "AC dingin & terawat"
  - "Antar jemput hotel"
description: "Mobil keluarga irit bahan bakar, cocok untuk perjalanan singkat & city tour di Lombok."
order: 1
---
```

### Blog (src/content/blog/*.md)

```yaml
---
title: "Panduan Lengkap ke Gili Trawangan"
slug: "panduan-lengkap-gili-trawangan"
category: "Panduan Wisata"
date: 2025-06-10
image: "hero-lombok.jpg"
excerpt: "Tips dan panduan lengkap untuk perjalanan ke Gili Trawangan."
tags: ["wisata", "panduan", "lombok"]
---
Isi artikel dalam Markdown...
```

---

## Index.html Section Order

```
1. Hero
2. Mengapa Kami (Why Choose Us)
3. Layanan Transportasi (3 kartu kendaraan)
   → Tombol "Lihat Transportasi" → /transportasi/
4. Paket Wisata Unggulan (6 paket cards)
   → Tombol "Lihat Semua Paket" → /paket/
5. Galeri
6. Testimoni
7. CTA Booking
8. Blog (3 artikel terbaru)
9. Footer
```

---

## 6 Paket Wisata di Halaman Depan

| No | Paket | Kategori | Harga |
|----|-------|----------|-------|
| 1 | Gili Trawangan Full Day | Wisata Alam | Rp 450rb/orang |
| 2 | Pink Beach & Tanjung Ringgit | Wisata Pantai | Rp 350rb/orang |
| 3 | Trekking Gunung Rinjani | Petualangan | Rp 1.2jt/orang |
| 4 | Lombok Explorer 3D2N | Paket Lengkap | Rp 1.5jt/orang |
| 5 | Senggigi Sunset & Seafood Tour | Wisata Sore | Rp 280rb/orang |
| 6 | Paket Honeymoon Lombok 4D3N | Romantis | Rp 3.5jt/pasangan |

---

## Halaman Transportasi (`/transportasi/`)

- **Page Hero:** "Kendaraan & Rental Mobil Kami"
- **Grid kartu kendaraan:** Avanza, Xenia, Innova
  - Info lengkap: kapasitas, koper, harga
  - Include list
  - Tombol "Pesan via WhatsApp"
- **Section CTA:** "Butuh Kendaraan Lain? Hubungi Kami"

---

## Admin Dashboard (Decap CMS)

- Akses via `/admin/`
- Form-based editing untuk paket, transportasi, blog
- Preview langsung sebelum publish
- Commit ke Git → auto deploy ke Netlify

---

## Deployment

```
Build command: npm run build
Publish directory: dist/
```

Netlify auto-deploy dari Git push.

---

## Phase Pengerjaan

| No | Phase | Deskripsi | Estimasi Sesi |
|----|-------|-----------|---------------|
| 1 | Init Astro + migrate CSS & shared components | Setup project, pindah CSS, buat layout Base.astro, navbar, footer, modal, bottom-nav | 1-2 sesi |
| 2 | Migrate data & content collections | Extract config, SEO, testimonials ke data files. Buat content schema untuk packages, transportasi, blog | 1 sesi |
| 3 | Build halaman | Build index, transportasi, paket, blog, kontak, 404 | 2-3 sesi |
| 4 | Admin dashboard + testing | Setup Decap CMS, testing semua halaman, deploy | 1 sesi |

---

## Context Estimation

| Item | Estimasi |
|------|----------|
| File existing yang perlu dibaca | ~4.300 baris |
| File baru yang ditulis | ~3.400 baris |
| Dokumentasi Astro | ~2.000 baris |
| Total estimasi | ~10.000 baris / ~30-40K token |

**Model rekomendasi:** Claude Sonnet 4 (200K context) atau Gemini 2.5 Pro (1M context)

---

## Catatan Penting

- Semua konten hardcoded saat ini perlu di-extract ke data files
- Blog routing ganti dari `?id=N` ke slug-based `/blog/[slug]/`
- CSS single file (1.835 baris) dipertahankan, tidak dipecah
- Deploy tetap ke Netlify
- Image optimization bisa ditambahkan后期 dengan Astro Image component
