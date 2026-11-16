"""Modul pengelolaan koleksi item dan anggota perpustakaan."""

from library_item import LibraryItem
from member import Member


class Library:
    """Mengelola item, anggota, katalog, pencarian, dan transaksi pinjam."""

    def __init__(self, nama: str):
        """Membuat perpustakaan dengan koleksi dan daftar anggota privat."""
        self.nama = nama
        self.__koleksi: dict[str, LibraryItem] = {}
        self.__anggota: dict[str, Member] = {}

    def tambah_item(self, item: LibraryItem):
        """Menambahkan item baru ke koleksi setelah memvalidasi tipe dan ID."""
        if not isinstance(item, LibraryItem):
            raise TypeError("Item harus merupakan turunan dari LibraryItem.")
        if item.id in self.__koleksi:
            raise ValueError(f"ID item {item.id} sudah terdaftar.")
        self.__koleksi[item.id] = item
        print(f'Item "{item.judul}" berhasil ditambahkan.')

    def tambah_anggota(self, anggota: Member):
        """Mendaftarkan anggota baru ke perpustakaan."""
        if not isinstance(anggota, Member):
            raise TypeError("Anggota harus berupa objek Member.")
        if anggota.id in self.__anggota:
            raise ValueError(f"ID anggota {anggota.id} sudah terdaftar.")
        self.__anggota[anggota.id] = anggota
        print(f'Anggota "{anggota.nama}" berhasil didaftarkan.')

    def tampilkan_katalog(self, hanya_tersedia: bool = True):
        """Menampilkan daftar item; secara default hanya item yang tersedia."""
        judul = "KATALOG ITEM TERSEDIA" if hanya_tersedia else "SELURUH KATALOG"
        print(f"\n=== {self.nama.upper()} | {judul} ===")
        daftar = list(self.__koleksi.values())
        if hanya_tersedia:
            daftar = [item for item in daftar if item.is_tersedia]
        if not daftar:
            print("Tidak ada item untuk ditampilkan.")
            return

        for nomor, item in enumerate(daftar, start=1):
            status = "Tersedia" if item.is_tersedia else "Sedang dipinjam"
            # Polymorphism: tiap subclass menyediakan implementasi get_detail sendiri.
            print(f"{nomor}. {item.get_detail()} | Status: {status}")

    def cari_item(self, kata_kunci: str) -> list[LibraryItem]:
        """Mencari item berdasarkan ID yang tepat atau potongan judul."""
        if not isinstance(kata_kunci, str) or not kata_kunci.strip():
            return []
        kunci = kata_kunci.strip().casefold()
        return [
            item for item in self.__koleksi.values()
            if item.id.casefold() == kunci or kunci in item.judul.casefold()
        ]

    def cari_anggota(self, member_id: str) -> Member:
        """Mengambil anggota terdaftar atau menghasilkan pesan jika tidak ditemukan."""
        anggota = self.__anggota.get(member_id)
        if anggota is None:
            raise ValueError(f"Anggota dengan ID {member_id} tidak ditemukan.")
        return anggota

    def pinjam_item(self, item_id: str, member_id: str):
        """Memproses peminjaman item dan mencatatnya pada data anggota."""
        item = self.__koleksi.get(item_id)
        if item is None:
            raise ValueError(f"Item dengan ID {item_id} tidak ditemukan.")
        anggota = self.cari_anggota(member_id)
        item.pinjam()
        anggota.catat_peminjaman(item_id)
        print(f'Item "{item.judul}" berhasil dipinjam oleh {anggota.nama}.')

    def kembalikan_item(self, item_id: str, member_id: str):
        """Memproses pengembalian item oleh anggota yang meminjamnya."""
        item = self.__koleksi.get(item_id)
        if item is None:
            raise ValueError(f"Item dengan ID {item_id} tidak ditemukan.")
        anggota = self.cari_anggota(member_id)
        if not anggota.memiliki_pinjaman(item_id):
            raise ValueError("Anggota tersebut tidak tercatat meminjam item ini.")
        item.kembalikan()
        anggota.catat_pengembalian(item_id)
        print(f'Item "{item.judul}" berhasil dikembalikan oleh {anggota.nama}.')

    def hitung_denda_item(self, item_id: str, hari_terlambat: int) -> int:
        """Menghitung denda dengan memanggil implementasi subclass terkait."""
        item = self.__koleksi.get(item_id)
        if item is None:
            raise ValueError(f"Item dengan ID {item_id} tidak ditemukan.")
        # Polymorphism: tarif denda mengikuti jenis item (Book atau Magazine).
        return item.hitung_denda(hari_terlambat)

    def tampilkan_anggota(self):
        """Menampilkan seluruh anggota yang sudah terdaftar."""
        print(f"\n=== DAFTAR ANGGOTA {self.nama.upper()} ===")
        if not self.__anggota:
            print("Belum ada anggota terdaftar.")
            return
        for anggota in self.__anggota.values():
            print(anggota.get_detail())
