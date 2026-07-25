# Portfolio Mascot Animation

Maskot portfolio adalah foreground visual guide berbasis SVG dan Framer Motion. Maskot tidak ditempatkan pada background global, tidak menerima pointer event, dan memiliki ruang layout atau posisi absolut yang terkontrol agar tidak menutup konten interaktif.

## Lokasi komponen

- `src/components/portfolio/mascot-guide.tsx`: API utama `PortfolioMascot`, deteksi viewport, reduced motion, dan scroll tracking milestones.
- `src/components/portfolio/mascot-character.tsx`: renderer gambar lokal dan fallback robot SVG.
- `src/components/portfolio/mascot-speech-bubble.tsx`: speech bubble yang dapat dibaca screen reader.
- `src/components/portfolio/use-mascot-animation.ts`: sequence per section, random blink, dan session storage.
- `src/components/portfolio/use-mascot-gaze.ts`: pergerakan pupil berbasis cursor dengan spring dan `requestAnimationFrame`.

Integrasi saat ini berada di:

- `src/components/AnimatedHero.tsx`
- `src/components/ProjectSection.tsx`
- `src/components/ResumeSection.tsx`
- `src/components/ContactSection.tsx`

## Mengganti gambar maskot

Fallback SVG digunakan secara otomatis saat `imageSrc` tidak diberikan atau gambar gagal dimuat. Untuk menggunakan ilustrasi sendiri:

1. Simpan gambar di `public/images/portfolio-mascot.png`.
2. Berikan path publik melalui prop `imageSrc`.

```tsx
<PortfolioMascot
  imageSrc="/images/portfolio-mascot.png"
  alt="Zidan's portfolio guide mascot"
  section="hero"
  size={120}
  mobileSize={72}
/>
```

Jangan menggunakan URL internet langsung. PNG transparan, WebP, atau SVG lokal direkomendasikan.

## State animasi

- `idle`: floating vertikal ringan.
- `wave`: tangan kanan melambai.
- `blink`: mata menutup singkat.
- `point`: tangan menunjuk ke konten.
- `walk`: badan dan kaki bergerak ringan.
- `sleep`: karakter diam dalam pose tidur.
- `celebrate`: lompatan dan gerakan tangan singkat.

State dapat dikontrol secara eksplisit:

```tsx
<PortfolioMascot section="custom" state="celebrate" size={100} />
```

Jika `state` tidak diberikan, hook memilih sequence berdasarkan `section`.

## Ukuran dan posisi

- `size`: ukuran desktop dalam pixel.
- `mobileSize`: ukuran layar di bawah breakpoint `md`.
- `position`: alignment internal `left`, `center`, atau `right`.
- `className`: posisi layout/absolute dari pemanggil.
- `speechPosition`: posisi bubble `left`, `right`, atau `top`.

Contoh posisi absolut yang tetap memiliki boundary:

```tsx
<div className="relative overflow-hidden">
  <PortfolioMascot
    section="contact"
    size={108}
    mobileSize={72}
    className="absolute bottom-4 right-4"
  />
</div>
```

## Perilaku responsive

- Hero dan Contact menampilkan maskot di semua ukuran layar.
- Projects disembunyikan di mobile dan tampil mulai breakpoint `md`.
- Milestones disembunyikan di mobile/tablet kecil dan tampil mulai breakpoint `lg`.
- Speech bubble disembunyikan di viewport sempit.
- Maskot tidak menggunakan sticky positioning di mobile.
- Wrapper menggunakan ukuran tetap sehingga animasi masuk tidak menimbulkan layout shift.
- Pupil fallback SVG mengikuti cursor hanya pada perangkat dengan pointer presisi; fitur ini otomatis nonaktif pada touch device.

## Perilaku per section

- Hero: fade/slide masuk, wave sekali, lalu idle dan random blink.
- Projects: point dan bubble maksimal tiga detik. Key `portfolio-mascot-project-bubble-seen` di `sessionStorage` mencegah pengulangan dalam satu sesi.
- Milestones: `useScroll` dan `useTransform` menggerakkan maskot di dalam boundary section. Progress terakhir memicu celebrate sekali.
- Contact: wave ketika masuk viewport. `interactionSignal` dari hover tombol memicu bounce/celebrate satu kali.

## Menonaktifkan animasi

Gunakan `disableMotion` untuk membuat satu instance statis:

```tsx
<PortfolioMascot section="hero" disableMotion size={120} />
```

Untuk menonaktifkan sequence section tertentu, berikan `state` secara eksplisit. Untuk menghapus maskot dari section, hapus pemanggilan `PortfolioMascot` pada section tersebut tanpa mengubah komponen lainnya.

Pengguna dengan `prefers-reduced-motion: reduce` otomatis mendapatkan fade sederhana tanpa floating, scroll tracking, bounce, walk, atau celebrate.
Cursor gaze juga dinonaktifkan dalam mode reduced motion dan ketika karakter berada pada state `sleep`.

## Accessibility dan keamanan browser API

- `alt` digunakan saat karakter membawa konteks; instance dekoratif menggunakan `aria-hidden`.
- Speech bubble memakai `role="status"` dan `aria-live="polite"`.
- `sessionStorage`, `ResizeObserver`, dan Motion hooks hanya berjalan pada client component.
- Kegagalan akses `sessionStorage` ditangani dengan fallback tanpa memblokir render.

## Dependency

Implementasi menggunakan dependency yang sudah tersedia:

- `framer-motion`
- `next/image`
- React dan TypeScript

Tidak ada GIF, canvas, atau dependency animasi tambahan.
