
# ==========================================================
# LATIHAN MANDIRI: PEMODELAN ENTITAS SISTEM KASIR TOKO ONLINE
# ==========================================================

# 1. ENTITAS: PRODUK (Product)
# Atribut:
# - nama_produk : Nama produk
# - harga       : Harga jual produk
# - stok        : Jumlah persediaan produk
#
# Metode:
# - update_stok()    : Memperbarui jumlah stok produk
# - hitung_diskon()  : Menghitung harga setelah diskon


# 2. ENTITAS: KERANJANG (Cart)
# Atribut:
# - daftar_produk : Kumpulan produk dalam keranjang
# - jumlah_item   : Total barang dalam keranjang
# - total_harga   : Total harga seluruh produk
#
# Metode:
# - tambah_produk() : Menambahkan produk ke keranjang
# - hapus_produk()  : Menghapus produk dari keranjang


# 3. ENTITAS: PENGGUNA (User)
# Atribut:
# - nama   : Nama pengguna
# - email  : Alamat email pengguna
# - alamat : Alamat pengiriman pengguna
#
# Metode:
# - login()    : Memproses autentikasi pengguna
# - checkout() : Melakukan pemesanan produk
