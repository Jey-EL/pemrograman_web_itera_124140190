# ===================================================
# Berkas: 02_variabel.py
# Deskripsi: Eksplorasi tipe data, f-string, casting, dan operator
# ===================================================

# 1. Deklarasi variabel berbagai tipe data
nama_produk = "Mechanical Keyboard RGB"  # str
stok = 25                                # int
harga_satuan = 450000.75                 # float
sedang_diskon = True                     # bool
catatan_khusus = None                    # NoneType

# 2. Memeriksa tipe data dengan fungsi type()
print("Tipe data stok:", type(stok))
print("Tipe data harga:", type(harga_satuan))

# 3. Operasi aritmatika & f-string modern dengan format specifier
diskon_persen = 0.10
harga_setelah_diskon = harga_satuan * (1 - diskon_persen)

print(f"\n--- INFORMASI PRODUK ---")
print(f"Nama Barang   : {nama_produk}")
print(f"Stok Tersedia : {stok} unit")
print(f"Harga Asli    : Rp {harga_satuan:,.2f}")
print(f"Harga Diskon  : Rp {harga_setelah_diskon:,.2f}")

# 4. Operasi String: Indexing, Slicing, dan Methods
kata = "Teknik Informatika"
print(f"\nPanjang string : {len(kata)} karakter")
print(f"Huruf pertama  : {kata[0]}")
print(f"Slicing [0:6]  : {kata[0:6]}")     # Mengambil indeks 0 sampai 5 ("Teknik")
print(f"Huruf kapital  : {kata.upper()}")
print(f"Replace string : {kata.replace('Informatika', 'Komputer')}")

# 5. Type Casting (Konversi Tipe Data)
angka_str = "150"
angka_int = int(angka_str)     # Konversi str ke int
print(f"Hasil konversi string ke angka: {angka_int + 50}")  # 200

# 6. Menerima Input dari Pengguna
print("\n--- SIMULASI TRANSAKSI ---")
nama_pembeli = input("Masukkan nama pembeli: ")
jumlah_beli_str = input("Masukkan jumlah item yang ingin dibeli: ")
jumlah_beli = int(jumlah_beli_str)  # Wajib di-casting karena input() selalu menghasilkan str!

total_bayar = jumlah_beli * harga_setelah_diskon
print(f"Terima kasih {nama_pembeli}, total tagihan Anda: Rp {total_bayar:,.2f}")