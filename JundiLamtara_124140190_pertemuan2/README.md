# Deadline Board ITERA

Personal dashboard untuk mahasiswa: mencatat tugas kuliah per mata kuliah, melihat sisa hari menuju tenggat, dan memantau cuaca kampus serta kutipan harian dalam satu halaman.

## Identitas

- **Nama Lengkap:** Jundi Lamtara
- **NIM:** 124140190
- **Program Studi:** Teknik Informatika
- **Kelas Praktikum:** Pengembangan Aplikasi Web RB
- **Repository GitHub:** [Source Code Pertemuan 2](https://github.com/Jey-EL/pemrograman_web_itera_124140190/tree/main/JundiLamtara_124140190_pertemuan2)
- **GitHub Pages:** [Demo Pertemuan 2](https://jey-el.github.io/pemrograman_web_itera_124140190/pertemuan2/)

## Fitur
- Tambah, edit, hapus, dan tandai selesai tugas (judul, mata kuliah, tenggat).
- Penanda warna: hijau (aman), kuning (tenggat ≤ 2 hari), merah (terlambat).
- Filter Semua / Belum selesai / Selesai; daftar diurutkan berdasarkan tenggat.
- Jam & tanggal real-time, cuaca ITERA (Open-Meteo), kutipan harian (DummyJSON).
- Data tersimpan di `localStorage`; saat pertama dibuka, daftar awal diisi dari JSONPlaceholder.
- Tema terang/gelap otomatis mengikuti sistem, responsif untuk layar ponsel.

## Screenshot
![Antarmuka Aplikasi](<images/antarmuka-aplikasi.png>)

## Fitur ES6+ (file `script.js`)
| Fitur | Baris |
|---|---|
| `const` untuk konstanta, `let`/`const` sesuai kebutuhan | 4–13, 136–139 |
| Arrow functions (≥3) | 12, 13, 68, 109, 131–132, 138, 180, 191, 205, 214 |
| Template literals | 13, 39–41, 81, 89, 98–99, 139–147, 224 |
| Async/Await | 79, 85, 95, 106, 223 (`await` di 80–82, 88, 97, 108, 227) |
| Classes (`TaskItem`, `DashboardApp`) | 16, 46 |
| Getter di class | 26, 31, 37, 130 |
| Destructuring parameter & objek | 17, 88, 97, 109, 117, 141, 158, 167, 178, 191 |
| Spread operator (state immutable) | 118, 122 |
| Default parameter | 17 |
| Optional chaining `?.` & nullish `??` | 192, 227 |
| `localStorage` (load/save) | 64–76 (load: 67, save: 75) |

> Nomor baris dapat bergeser jika Anda mengubah kode; cek ulang sebelum dikumpulkan.

## Menjalankan
Buka `index.html` di browser (atau Live Server). Perlu internet untuk cuaca dan kutipan; tanpa internet, aplikasi tetap berfungsi dengan pesan cadangan.
