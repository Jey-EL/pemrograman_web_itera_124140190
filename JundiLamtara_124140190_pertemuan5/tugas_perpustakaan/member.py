"""Modul yang berisi class Member untuk data dan aktivitas anggota."""


class Member:
    """Menyimpan identitas anggota dan daftar ID item yang sedang dipinjam."""

    def __init__(self, member_id: str, nama: str):
        """Membuat anggota baru dengan daftar pinjaman kosong."""
        if not isinstance(member_id, str) or not member_id.strip():
            raise ValueError("ID anggota tidak boleh kosong.")
        if not isinstance(nama, str) or not nama.strip():
            raise ValueError("Nama anggota tidak boleh kosong.")

        self.__member_id = member_id.strip()
        self.__nama = nama.strip()
        self.__item_dipinjam: list[str] = []

    @property
    def id(self) -> str:
        """Mengambil ID anggota."""
        return self.__member_id

    @property
    def nama(self) -> str:
        """Mengambil nama anggota."""
        return self.__nama

    @property
    def item_dipinjam(self) -> tuple[str, ...]:
        """Memberikan salinan read-only dari daftar ID pinjaman anggota."""
        return tuple(self.__item_dipinjam)

    def catat_peminjaman(self, item_id: str):
        """Mencatat ID item yang dipinjam oleh anggota."""
        if item_id in self.__item_dipinjam:
            raise ValueError("Item tersebut sudah tercatat sebagai pinjaman anggota.")
        self.__item_dipinjam.append(item_id)

    def catat_pengembalian(self, item_id: str):
        """Menghapus ID item dari daftar pinjaman anggota."""
        if item_id not in self.__item_dipinjam:
            raise ValueError("Item tersebut tidak tercatat sebagai pinjaman anggota.")
        self.__item_dipinjam.remove(item_id)

    def memiliki_pinjaman(self, item_id: str) -> bool:
        """Memeriksa apakah anggota sedang meminjam item tertentu."""
        return item_id in self.__item_dipinjam

    def get_detail(self) -> str:
        """Menghasilkan ringkasan data anggota."""
        return f"ID Anggota: {self.id} | Nama: {self.nama} | Jumlah pinjaman: {len(self.__item_dipinjam)}"
