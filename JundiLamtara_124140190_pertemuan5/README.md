# Sistem Manajemen Perpustakaan Sederhana (Python OOP)

## Identitas

- **Nama Lengkap:** Jundi Lamtara
- **NIM:** 124140190
- **Program Studi:** Teknik Informatika
- **Kelas Praktikum:** Pengembangan Aplikasi Web RB
- **Repository GitHub:** [Source Code Pertemuan 5](https://github.com/Jey-EL/pemrograman_web_itera_124140190/tree/main/JundiLamtara_124140190_pertemuan5)

## Deskripsi Program

Program ini merupakan sistem manajemen perpustakaan sederhana berbasis konsol yang dibangun menggunakan Python dan konsep Object-Oriented Programming (OOP). Aplikasi ini memodelkan interaksi antara perpustakaan (`Library`), koleksi pustaka (`LibraryItem`, `Book`, `Magazine`), dan anggota (`Member`) untuk menangani pendaftaran anggota, pengelolaan katalog, pencarian item berdasarkan judul atau ID, perhitungan denda keterlambatan, serta transaksi peminjaman dan pengembalian.

## Penerapan 4 Pilar OOP

1. **Class & Object:** Class `LibraryItem`, `Book`, `Magazine`, `Member`, dan `Library` berfungsi sebagai cetak biru (*blueprint*) untuk merepresentasikan entitas nyata di perpustakaan lengkap dengan atribut state dan metode perilakunya.
2. **Inheritance (Pewarisan):** `LibraryItem` dirancang sebagai *Abstract Base Class* (`ABC`) yang mendefinisikan kontrak dasar melalui `@abstractmethod` (`get_detail()` dan `hitung_denda()`). Subclass `Book` dan `Magazine` mewarisi atribut dan logika peminjaman dari `LibraryItem` menggunakan `super().__init__()`, serta mengimplementasikan kedua method abstrak tersebut sesuai karakteristik masing-masing.
3. **Encapsulation (Enkapsulasi):**
   - `LibraryItem` melindungi status peminjaman menggunakan atribut *private* `__dipinjam` serta atribut *protected* (`_id`, `_judul`, `_tahun_terbit`), yang diakses dan divalidasi secara terkontrol melalui dekorator `@property` dan `@tahun_terbit.setter`.
   - `Library` menyimpan data koleksi dan anggota secara terisolasi di dalam atribut *private* `__koleksi` dan `__anggota`.
   - `Member` menjaga integritas identitas (`__member_id`, `__nama`) serta daftar pinjaman (`__item_dipinjam`) dengan mengembalikan salinan *read-only* bertipe `tuple` pada properti `item_dipinjam`.
4. **Polymorphism (Polimorfisme):** `Book` dan `Magazine` meng-override method `get_detail()` dan `hitung_denda()` dengan perilaku yang berbeda (tarif denda buku `Rp2.000/hari`, sedangkan majalah `Rp1.000/hari`). Class `Library` dapat memproses tampilan katalog dan kalkulasi denda seluruh jenis item melalui satu antarmuka method yang seragam tanpa perlu memeriksa tipe class objek secara manual.

## Struktur Berkas

```text
JundiLamtara_124140190_pertemuan5/
│
├── hands-on/
│   ├── 01_everything_is_object.py
│   ├── 01_procedural_vs_oop.py
│   ├── 02_class_object.py
│   ├── 03_inheritance.py
│   ├── 04_encapsulation.py
│   ├── 05_polymorphism.py
│   └── 06_abstract_class.py
│
├── latihan/
│   ├── latihan1_kasir.py
│   ├── latihan2_buku.py
│   ├── latihan3_truk.py
│   ├── latihan4_karyawan.py
│   ├── latihan5_notifikasi.py
│   └── latihan6_storage.py
│
├── screenshot/
│   ├── output-program-1.png
│   └── output-program-2.png
│
├── tugas_perpustakaan/
│   ├── library_item.py
│   ├── member.py
│   ├── library.py
│   └── main.py
│
├── README.md
└── .gitignore
```

## Panduan Menjalankan Program

1. Pastikan **Python 3.10+** sudah terpasang pada sistem Anda (verifikasi dengan `python --version`).
2. Clone atau unduh repository ini ke komputer lokal:
   ```bash
   git clone https://github.com/Jey-EL/pemrograman_web_itera_124140190.git
   ```
3. Buka folder `JundiLamtara_124140190_pertemuan5` di **Visual Studio Code**, lalu buka integrated terminal (`Ctrl + \``).
4. Masuk ke direktori `tugas_perpustakaan`:
   ```bash
   cd JundiLamtara_124140190_pertemuan5/tugas_perpustakaan
   ```
5. Jalankan skrip utama sistem perpustakaan melalui terminal:
   ```bash
   python main.py
   ```
   *(Pada Windows, perintah `py main.py` juga dapat digunakan).*
6. *(Opsional)* Untuk menjalankan skrip percobaan pada folder `hands-on` atau `latihan`, arahkan terminal ke direktori terkait lalu eksekusi berkas yang diinginkan:
   ```bash
   # Contoh menjalankan hands-on
   cd ../hands-on
   python 06_abstract_class.py

   # Contoh menjalankan latihan mandiri
   cd ../latihan
   python latihan6_storage.py
   ```

## Daftar Fitur

- [x] **Registrasi & Manajemen Anggota (`Member` & `Library`):** Mendaftarkan anggota baru beserta validasi duplikasi ID dan menampilkan daftar anggota terdaftar.
- [x] **Pengelolaan Koleksi Pustaka (`LibraryItem`, `Book`, `Magazine`):** Menambahkan koleksi buku (dengan atribut penulis) dan majalah (dengan atribut nomor edisi) ke dalam sistem.
- [x] **Katalog Ketersediaan Dinamis:** Menampilkan daftar item yang sedang tersedia untuk dipinjam maupun seluruh katalog koleksi perpustakaan.
- [x] **Pencarian Pustaka *Case-Insensitive*:** Mencari item berdasarkan kecocokan ID persis atau potongan kata pada judul secara tidak peka huruf besar/kecil.
- [x] **Transaksi Peminjaman & Pengembalian:** Memperbarui status `is_dipinjam` dan `is_tersedia` pada item sekaligus mencatat atau menghapus riwayat pinjaman pada profil anggota terkait.
- [x] **Kalkulator Denda Polimorfik:** Menghitung nominal denda keterlambatan sesuai jenis item (`Rp2.000/hari` untuk `Book` dan `Rp1.000/hari` untuk `Magazine`) disertai validasi hari keterlambatan nonnegatif.
- [x] **Konvensi PEP 8 & Dokumentasi Kode:** Seluruh berkas dilengkapi *type hints* serta *docstring* pada setiap modul, class, dan method.

## Penjelasan Teknis Singkat

1. **`library_item.py`:** Mendefinisikan *Abstract Base Class* `LibraryItem(ABC)` dengan validasi input constructor, properti *read-only* (`id`, `judul`, `is_dipinjam`, `is_tersedia`), properti dengan *setter* (`tahun_terbit`), serta kontrak `@abstractmethod` (`get_detail()` dan `hitung_denda()`). Class `Book` dan `Magazine` mewarisi `LibraryItem` dan menetapkan konstanta `TARIF_DENDA_PER_HARI` masing-masing.
2. **`member.py`:** Mendefinisikan class `Member` untuk menyimpan identitas anggota (`__member_id`, `__nama`) dan daftar ID item yang sedang dipinjam (`__item_dipinjam`). Properti `item_dipinjam` mengembalikan `tuple` agar daftar pinjaman tidak dapat dimodifikasi langsung dari luar class.
3. **`library.py`:** Mendefinisikan class `Library` sebagai pengelola utama yang menyimpan objek `LibraryItem` dan `Member` dalam dictionary *private* (`__koleksi` dan `__anggota`), serta menyediakan antarmuka untuk menambah data, menampilkan katalog, mencari item, memproses peminjaman/pengembalian, dan menghitung denda.
4. **`main.py`:** Berperan sebagai *entry point* pengujian end-to-end mulai dari pendaftaran anggota (`Jundi Lamtara` dan `Nabila Putri`), penambahan 4 item koleksi (`Book` dan `Magazine`), pengujian pencarian kata kunci, simulasi denda keterlambatan 3 hari, hingga siklus peminjaman dan pengembalian buku.

## Tangkapan Layar (Screenshot)

### 1. Penambahan Item, Katalog, Pencarian, dan Denda
![Screenshot output program 1](screenshot/output-program-1.png)

### 2. Status Peminjaman dan Pengembalian Item
![Screenshot output program 2](screenshot/output-program-2.png)

## Catatan

Program ini menggunakan struktur data `dict` di memori sebagai penyimpanan sementara sehingga seluruh data transaksi akan kembali ke kondisi awal setelah eksekusi program berakhir.