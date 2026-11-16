"""Skrip utama untuk menjalankan dan menguji sistem perpustakaan."""

from library import Library
from library_item import Book, Magazine
from member import Member


def tampilkan_hasil_pencarian(perpustakaan: Library, kata_kunci: str):
    """Menampilkan hasil pencarian item berdasarkan judul atau ID."""
    print(f"\nPencarian: {kata_kunci}")
    hasil = perpustakaan.cari_item(kata_kunci)
    if not hasil:
        print("Item tidak ditemukan.")
        return
    for item in hasil:
        status = "Tersedia" if item.is_tersedia else "Sedang dipinjam"
        print(f"- {item.get_detail()} | Status: {status}")


def main():
    """Menguji pendaftaran anggota, tambah item, katalog, pencarian, dan pinjam."""
    perpustakaan = Library("Perpustakaan ITERA")

    # Membuat dan mendaftarkan anggota.
    anggota1 = Member("A001", "Jundi Lamtara")
    anggota2 = Member("A002", "Nabila Putri")

    print("=== PENDAFTARAN ANGGOTA ===")
    perpustakaan.tambah_anggota(anggota1)
    perpustakaan.tambah_anggota(anggota2)
    perpustakaan.tampilkan_anggota()

    # Membuat koleksi yang terdiri dari dua subclass LibraryItem.
    item_koleksi = [
        Book("B001", "Belajar Python OOP", "Jundi Lamtara", 2025),
        Book("B002", "Dasar-Dasar Pemrograman Web", "Andi Pratama", 2024),
        Magazine("M001", "Teknologi Masa Kini", "Edisi 12", 2026),
        Magazine("M002", "Info Sains dan Komputer", "Edisi 08", 2025),
    ]

    print("\n=== MENAMBAHKAN ITEM ===")
    for item in item_koleksi:
        perpustakaan.tambah_item(item)

    # Menampilkan katalog item yang tersedia.
    perpustakaan.tampilkan_katalog()

    # Menguji pencarian berdasarkan potongan judul dan ID.
    print("\n=== PENCARIAN ITEM ===")
    tampilkan_hasil_pencarian(perpustakaan, "Python")
    tampilkan_hasil_pencarian(perpustakaan, "M002")

    # Polymorphism: method hitung_denda sama, tarif berbeda pada tiap subclass.
    print("\n=== DENDA TERLAMBAT 3 HARI ===")
    for item_id in ("B001", "M001"):
        item = perpustakaan.cari_item(item_id)[0]
        denda = perpustakaan.hitung_denda_item(item_id, 3)
        print(f"{item.judul}: Rp{denda:,.0f}".replace(",", "."))

    # Menguji status item sebelum dan sesudah peminjaman.
    buku = perpustakaan.cari_item("B001")[0]
    print("\n=== STATUS DAN PEMINJAMAN ===")
    print(f'Sebelum dipinjam, "{buku.judul}" tersedia: {buku.is_tersedia}')
    perpustakaan.pinjam_item("B001", "A001")
    print(f"Status is_dipinjam setelah peminjaman: {buku.is_dipinjam}")
    print(f"Pinjaman {anggota1.nama}: {anggota1.item_dipinjam}")

    # Katalog hanya menampilkan item yang belum dipinjam.
    perpustakaan.tampilkan_katalog()

    print("\n=== PENGEMBALIAN ITEM ===")
    perpustakaan.kembalikan_item("B001", "A001")
    print(f'Setelah dikembalikan, "{buku.judul}" tersedia: {buku.is_tersedia}')
    perpustakaan.tampilkan_katalog()


if __name__ == "__main__":
    main()
