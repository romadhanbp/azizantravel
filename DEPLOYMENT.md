# Deployment Guide — Azizan Travel (Astro SSG)

> Panduan deploy ke production via **GitHub + Netlify**.
> **Tech Stack:** Astro v5 — Output: `dist/`

---

## 1. Setup GitHub Repository

```bash
# 1. Buka github.com, login, klik "New repository"
#    Nama: azizantravel (atau terserah)
#    Jangan centang "Add a README" atau ".gitignore"

# 2. Jalankan di terminal:
git init
git add .
git commit -m "feat: initial Astro migration"
git branch -M main
git remote add origin https://github.com/[USERNAME]/azizantravel.git
git push -u origin main
```

> [!NOTE]
> Ganti `[USERNAME]` dengan username GitHub Anda.

---

## 2. Setup Netlify (dari GitHub)

```bash
# 1. Buka https://app.netlify.com, login (bisa pake GitHub)
# 2. Klik "Add new site" → "Import an existing project"
# 3. Pilih "GitHub" → Authorize jika diminta
# 4. Cari repo "azizantravel" → klik
# 5. Settings:
#    Build command:   npm run build
#    Publish directory: dist/
# 6. Klik "Deploy site"
```

> [!TIP]
> Setelah deploy pertama selesai, setiap `git push` ke `main` akan auto-deploy.

---

## 3. Setup Custom Domain (Optional)

1. Di Netlify: Site settings → Domain management
2. Klik "Add custom domain" → masukkan `azizantravel.com`
3. Ikuti instruksi untuk set DNS (ganti nameserver ke Netlify)
4. Tunggu propagasi DNS (5-30 menit)

---

## 4. Setup Decap CMS Auth (untuk admin panel)

Akses `/admin/` di production butuh Git Gateway + Netlify Identity:

1. Netlify dashboard → Site settings → Identity
2. Klik "Enable Identity"
3. Registration: pilih "Invite only" (keamanan)
4. Git Gateway: klik "Enable Git Gateway"
5. Buka `https://[site-name].netlify.app/admin/`
6. Buat akun admin via email (atau undang dari Identity tab)

> [!WARNING]
> Jangan set Registration ke "Open" — bisa diakses siapa saja.

---

## 5. Post-deployment Checklist

### Critical:
- [ ] Homepage: hero muncul, navbar berfungsi
- [ ] Navigasi: semua link internal jalan
- [ ] Paket: card muncul, filter tabs jalan
- [ ] Transportasi: 3 card armada muncul
- [ ] Blog: daftar artikel + detail jalan
- [ ] Kontak: form booking kirim ke WA
- [ ] Admin panel: bisa login di `/admin/`

### Mobile:
- [ ] Bottom nav berfungsi (Beranda, Paket, Pesan, Blog, Kontak)
- [ ] WA float button muncul
- [ ] Card grid jadi 1 kolom di HP

### SEO:
- [ ] Cek title & description di setiap halaman
- [ ] Cek Open Graph di Facebook Sharing Debugger
- [ ] Submit sitemap.xml ke Google Search Console

---

## 6. Rollback Plan

Jika deploy bermasalah:

1. Netlify → Deploys → Pilih deploy sebelumnya
2. Klik "Publish deploy"

Atau via Git:
```bash
git revert HEAD
git push origin main
```

---

## 7. Branch Strategy

| Branch | Tujuan | Deploy |
|--------|--------|--------|
| `main` | Production | Auto-deploy ke Netlify |
| `feat/*` | Fitur baru | Netlify Deploy Preview (otomatis) |

---

## Build Command Reference

```bash
npm run dev       # Development server (localhost:4321)
npm run dev:cms   # Development + Decap CMS proxy
npm run build     # Build production ke dist/
npm run preview   # Preview hasil build lokal
```
