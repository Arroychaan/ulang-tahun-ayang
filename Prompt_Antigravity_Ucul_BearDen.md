# 🐻💜 UCUL'S BEAR DEN — Prompt untuk Google Antigravity

> Cara pakai: copy semua isi di bawah header "PROMPT UNTUK ANTIGRAVITY" dan paste langsung ke agent-nya. Ganti bagian [FOTO: ...] dengan foto asli kalian nanti.

---

## PROMPT UNTUK ANTIGRAVITY

Kamu adalah frontend developer sekaligus creative/motion designer. Tugasmu: bikin website ucapan ulang tahun digital yang sangat personal, lucu, dan estetik untuk pacarku. Kerjakan sebagai single-page website, HTML + CSS + vanilla JS (jangan pakai framework berat, biar cepat di-deploy dan ringan di HP). Boleh pakai library via CDN untuk animasi.

### 1. KONSEP & NADA
Judul konsep: **"Ucul's Bear Den"** — seluruh web dibingkai seolah Ucul (panggilan sayangku ke pacarku) "masuk" ke rumah beruang lucu, dan tiap section adalah satu ruangan berbeda. Tone: kawaii, playful, pastel, banyak micro-interaction receh, TAPI tetap ada momen tulus/sentimental di bagian akhir. Beruang jadi motif visual berulang (dia suka banget sama beruang lucu).

Nama panggilan yang dipakai konsisten di seluruh copy: dia = **"Ucul"**, aku = **"Ayang"**. Tulis semua copy/teks dengan gaya bahasa gue: santai, ngeselin dikit, pede, banyak bercanda, bukan kaku/formal. Contoh nada: "aku emang lucu banget kok, cuma kamu aja yang gengsi ngakuin."

Dia ulang tahun ke-20, lahir 7 Juli 2006. Tanggal jadian kami: 13 Juli 2026.

### 2. DESIGN SYSTEM
**Warna** (favorit dia: lavender, ungu, biru):
- Base/background: `#FFF9FC` (cream putih kepink-pinkan)
- Lavender: `#E6D7F5`, aksen `#C9A7EB`
- Ungu utama: `#9B7EDE`, dark `#7B5FBF`
- Biru pastel: `#AEDFF7`
- Aksen pink lembut (buat heart/confetti): `#FFB6D9`
- Semua gradasi soft, jangan neon/tajem.

**Font** (Google Fonts, gratis):
- Heading/judul besar: `Fredoka` (bulat, playful)
- Body text: `Poppins`
- Aksen tulisan tangan (caption foto, quote personal): `Caveat` atau `Nanum Pen Script`

**Mascot beruang**: chibi kawaii bear, flat vector, warna lavender/ungu, pipi blush. Kalau butuh asset generate via AI image tool, pakai prompt: *"chibi kawaii bear mascot, flat vector illustration, pastel lavender and purple color palette, blush cheeks, cute sticker style, transparent background"*. Bear ini muncul berulang sebagai maskot pemandu di tiap section (pojok layar, watermark halus, atau karakter yang "ngomong" di speech bubble).

**Style elemen visual**: rounded corners besar (16-24px), soft drop shadow, sticker/washi-tape effect di foto (polaroid frame + tape miring di pojok), floating particle background (bear paw + heart kecil melayang pelan, subtle, jangan ganggu readability).

### 3. TECH & ANIMASI
- Scroll-triggered reveal pakai GSAP + ScrollTrigger (CDN), atau AOS.js kalau mau lebih ringan.
- Confetti pakai library `canvas-confetti` (CDN) — dipicu di section finale.
- Smooth scroll antar section.
- Mobile-first — 90% dia bakal buka ini dari HP via link WA. Test breakpoint 375px-430px dulu, baru desktop.
- Loading pertama: splash screen singkat dengan bear mascot animasi loading (2-3 detik max, jangan lama-lama).
- Struktur file: `index.html`, `style.css`, `script.js`, folder `/assets/photos/` dan `/assets/bear/`.
- Optimize gambar (lazy load foto di luar viewport pertama).

### 4. STRUKTUR SECTION (urutan scroll)

**A. Hero / Gerbang Den**
Full-screen, background gradient lavender→biru pastel animasi lambat, bear mascot besar di tengah melambai (subtle bounce animation loop). Particle bear-paw/heart melayang.
Headline (pakai efek typewriter): *"Buat Ucul-ku yang paling berisik, paling cerewet, tapi tetep yang paling disayang 💜"*
Sub: *"Selamat ulang tahun ke-20, sayangku."*
CTA button bounce: *"Masuk ke Den-nya →"*

**B. Widget "Hari Kita"**
Kecil, sticky atau di bawah hero. Hitung otomatis dari tanggal jadian `2026-07-13`:
- Kalau tanggal hari ini SUDAH lewat tanggal jadian → tampilkan "Hari ke-N bareng Ucul 💜" (hitung mundur/maju otomatis pakai JS Date, update tiap hari).
- Kalau tanggal hari ini BELUM sampai tanggal jadian → tampilkan "H-N menuju hari jadian kita 🎉" sebagai countdown.
- Logic ini harus otomatis via JS, jangan hardcode angka.

**C. Timeline "Perjalanan Kita (yang isinya receh doang)"**
Scroll-reveal vertikal, tiap milestone = card foto polaroid + caption tulisan tangan (font Caveat), muncul fade+slide-up saat di-scroll. Sediakan 8-12 slot foto placeholder `[FOTO 1]` sampai `[FOTO 12]` dengan caption kosong yang bisa diisi manual nanti (kasih contoh caption dummy yang lucu biar kebayang formatnya).

**D. "Peraturan Resmi Hubungan Kami"**
Grid card yang bisa di-flip (tap/hover) — depan: ikon + judul singkat, belakang: penjelasan lucu. Isi kartu:
1. 🍜 *"Jatah mie instan Ucul: MAKSIMAL 3x per minggu. Lebih dari itu = PELANGGARAN BERAT, sanksi traktir dimsum."*
2. 🎮 *"Wajib main Roblox bareng minimal sekali seminggu, gak ada alasan."*
3. 🚫 *"Dilarang keras bilang Ayang gak lucu. (Padahal Ayang tuh lucu banget, ganteng pula. Ucul aja yang lucunya cuma 1,5%.)"*
4. 🏭 *"Ucul sah manggil Ayang 'Jawa Hama', Ayang sah manggil Ucul 'Medan Besi Berkarat'. Resmi dan legal, gak bisa digugat."* (ini bercanda/inside joke kami, buat ringan aja jangan dibikin serius)

**E. "Fun Facts Tentang Ucul"**
Grid badge/achievement-style card:
- Warna favorit: swatch lavender/ungu/biru
- Hewan favorit: beruang lucu 🐻
- Hobi bareng: Roblox, makan dimsum
- Umur: 20 tahun (tapi jiwa masih bocah, boleh disindir dikit)

**F. Quiz Interaktif "Seberapa Ngerti Kamu Sama Ayang?"**
3-5 soal pilihan ganda, progress bar di atas, tiap jawaban trigger confetti kecil + transisi ke soal berikutnya. Contoh soal:
1. *"Berapa jatah mie instan Ucul per minggu?"* (1 / 3 / bebas)
2. *"Siapa yang lebih lucu?"* (Ucul 1,5% / Ayang 98,5% / Dua-duanya, jawaban aman)
3. *"Game favorit kita berdua?"* (Roblox / Valorant / Mobile Legend)
Hasil akhir SELALU positif apapun jawabannya: *"Selamat! Kamu emang paling ngerti Ayang, walau kadang pura-pura lupa 😏"*

**G. Galeri Foto**
Grid masonry responsif, tap-to-enlarge (lightbox), hover/tap tilt effect ringan, sticker kecil nempel di beberapa foto. Sediakan 10-15 slot placeholder.

**H. Finale — Surprise**
Kue ulang tahun animasi dengan lilin nyala. Button *"Tiup lilinnya 🕯️"* — pas ditekan: lilin padam (CSS animation) → confetti burst besar-besaran (canvas-confetti, banyak warna pastel + bentuk hati/bear kecil kalau bisa custom shape) → reveal pesan pribadi full-screen dengan efek typewriter, ditutup baris terakhir manual yang nanti aku isi sendiri.
Optional: toggle musik latar (siapkan elemen `<audio>` kosong, aku isi file mp3-nya sendiri nanti).

**I. Footer receh**
Kecil, satu baris: *"dibuat oleh Ayang, pake bantuan AI biar keliatan niat 😌"*

### 5. ASSET YANG PERLU DISIAPKAN (checklist)
- [ ] 10-15 foto (resolusi min. 1080px sisi terpendek, JPG/PNG asli — bukan hasil kompres WA)
- [ ] Ilustrasi/asset beruang (generate via AI image tool pakai prompt di section 2, simpan PNG transparent)
- [ ] File musik latar opsional (mp3, durasi bebas, loop)
- [ ] Isi caption asli di tiap slot `[FOTO]` di timeline & galeri
- [ ] Pesan personal final di section finale (tulis manual, jangan diserahkan ke AI — ini bagian paling penting)

### 6. DEPLOY CEPAT (karena mepet waktu)
Setelah agent selesai generate:
- Paling cepat: drag folder project ke **Netlify Drop** (app.netlify.com/drop) → langsung dapat link, gak perlu akun.
- Alternatif: `vercel --prod` via CLI kalau sudah familiar Vercel.
- Test dulu di HP sendiri sebelum kirim link ke Ucul.

---

*Catatan buat kamu (hapus sebelum kirim ke Ucul): kalau Antigravity generate hasil yang berantakan di section tertentu, minta dia perbaiki section itu aja satu-satu, jangan regenerate semua — biar konsisten dan gak buang waktu.*
