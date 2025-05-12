# Kedjora - Layanan Web, Aplikasi & Akademik

![Kedjora Banner](https://placehold.co/1200x300/3b82f6/ffffff?text=Kedjora+Digital+Agency)

Kedjora adalah platform digital agency yang menawarkan layanan pembuatan website, pengembangan aplikasi, serta bantuan akademik dengan standar kualitas tertinggi. Dibangun dengan Next.js dan Prisma, aplikasi ini menghadirkan pengalaman modern dan responsif untuk manajemen bisnis digital.

## 🌟 Fitur Utama

### 💼 Layanan Beragam
- **Web Development**: Pembuatan website responsif dan modern
- **App Development**: Pengembangan aplikasi mobile dan web
- **Bantuan Akademik**: Joki tugas, skripsi, dan layanan akademik lainnya
- **Custom Solutions**: Solusi teknologi sesuai kebutuhan spesifik klien

### 🛠️ Panel Admin
- Manajemen layanan (CRUD)
- Pengelolaan portfolio proyek
- Pengelolaan testimonial klien
- Pengaturan content marketing
- Dashboard statistik dan analitik
- Manajemen pesanan dari klien

### 🎨 Tampilan Frontend
- Halaman beranda responsif dan informatif
- Showcase layanan dan portfolio
- Halaman tentang kami dan contact
- Halaman testimonial
- Blog dengan konten terkini
- Form pemesanan layanan

### 🔐 Keamanan & Autentikasi
- Login admin dengan NextAuth.js
- Proteksi rute untuk area admin
- Validasi form dengan Zod

## 🚀 Tech Stack

- **Framework**: Next.js 14 dengan App Router
- **Database**: MySQL dengan Prisma ORM
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS & ShadCN UI
- **Form Handling**: React Hook Form dengan Zod validation
- **State Management**: Zustand
- **Animation**: Framer Motion
- **Notifikasi**: Sonner Toast
- **Icons**: Lucide React

## 📷 Screenshot

<div style="display:grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
  <img src="https://placehold.co/600x400/e2e8f0/1e293b?text=Homepage" alt="Homepage" width="100%">
  <img src="https://placehold.co/600x400/e2e8f0/1e293b?text=Admin+Dashboard" alt="Admin Dashboard" width="100%">
  <img src="https://placehold.co/600x400/e2e8f0/1e293b?text=Services+Page" alt="Services Page" width="100%">
  <img src="https://placehold.co/600x400/e2e8f0/1e293b?text=Order+Management" alt="Order Management" width="100%">
</div>

## 🛠️ Instalasi & Setup

### Prasyarat
- Node.js 18+ dan npm/yarn
- MySQL Database
- Git

### Langkah Instalasi

1. Clone repositori
   ```bash
   git clone https://github.com/yourusername/kedjora.git
   cd kedjora
   ```

2. Install dependensi
   ```bash
   npm install
   # atau
   yarn install
   ```

3. Konfigurasi environment
   - Salin `.env.example` ke `.env`
   - Sesuaikan variabel database dan NextAuth

   ```env
   # Database
   DATABASE_URL="mysql://user:password@localhost:3306/kedjora"

   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key"
   ```

4. Setup dan seed database
   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```

5. Jalankan server pengembangan
   ```bash
   npm run dev
   # atau
   yarn dev
   ```

6. Buka [http://localhost:3000](http://localhost:3000) di browser

## 👨‍💼 Akses Admin

Gunakan kredensial ini untuk mengakses panel admin:

- URL: [http://localhost:3000/admin](http://localhost:3000/admin)
- Email: admin@example.com
- Password: Admin123!

## 📋 Struktur Utama Proyek

```
kedjora/
├── prisma/             # Database schema dan migrations
├── public/             # Static assets
├── src/
│   ├── app/            # Next.js App router
│   │   ├── (marketing) # Public pages
│   │   ├── admin/      # Admin dashboard
│   │   ├── api/        # API endpoints
│   │   └── auth/       # Authentication pages
│   ├── components/     # Reusable components
│   │   ├── admin/      # Admin-specific components
│   │   ├── marketing/  # Marketing site components
│   │   └── ui/         # Shared UI components
│   ├── lib/            # Shared libraries & utilities
│   └── providers/      # React context providers
├── tailwind.config.ts  # Tailwind CSS configuration
└── next.config.mjs     # Next.js configuration
```

## 📱 Mobile Responsive

Aplikasi ini didesain dengan pendekatan mobile-first dan sepenuhnya responsif untuk berbagai ukuran perangkat, dari smartphone hingga desktop.

## 📄 API Routes

Aplikasi ini menyediakan berbagai API endpoints:

- `/api/services` - Endpoints untuk layanan
- `/api/portfolio` - Endpoints untuk portfolio
- `/api/testimonials` - Endpoints untuk testimonial
- `/api/orders` - Endpoints untuk pesanan klien
- `/api/settings` - Endpoints untuk pengaturan

## 🔄 Pengembangan Berkelanjutan

Proyek ini dalam pengembangan aktif dengan fitur yang direncanakan:

- [ ] Integrasi pembayaran
- [ ] Sistem notifikasi email
- [ ] Integrasi live chat
- [ ] Pemantauan progres proyek
- [ ] Sistem multi-role yang lebih lengkap
- [ ] Localization/multi-bahasa

## 🤝 Kontribusi

Kontribusi selalu diterima dengan senang hati! Jika Anda ingin berkontribusi:

1. Fork repositori
2. Buat branch fitur (`git checkout -b feature/amazing-feature`)
3. Commit perubahan Anda (`git commit -m 'Add amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Buka Pull Request

## 📜 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE)

## 📞 Kontak

Jika Anda memiliki pertanyaan atau membutuhkan bantuan, silakan kontak:

- Email: [pras.ari69@gmail.com](mailto:pras.ari69@gmail.com)

---

Dibuat dengan ❤️ menggunakan Next.js & Prisma