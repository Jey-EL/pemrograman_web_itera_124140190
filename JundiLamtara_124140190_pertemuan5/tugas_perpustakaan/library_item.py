"""Abstract class dan implementasi jenis item perpustakaan."""

from abc import ABC, abstractmethod


class LibraryItem(ABC):
    """Kontrak dasar untuk semua item yang dapat dikelola perpustakaan."""

    def __init__(self, item_id: str, judul: str, tahun_terbit: int):
        """Inisialisasi identitas item dan status peminjaman."""
        if not isinstance(item_id, str) or not item_id.strip():
            raise ValueError("ID item tidak boleh kosong.")
        if not isinstance(judul, str) or not judul.strip():
            raise ValueError("Judul item tidak boleh kosong.")

        self._id = item_id.strip()
        self._judul = judul.strip()
        self.tahun_terbit = tahun_terbit
        self.__dipinjam = False

    @property
    def id(self) -> str:
        """ID item yang hanya dapat dibaca dari luar class."""
        return self._id

    @property
    def judul(self) -> str:
        """Judul item yang hanya dapat dibaca dari luar class."""
        return self._judul

    @property
    def tahun_terbit(self) -> int:
        """Tahun terbit item."""
        return self._tahun_terbit

    @tahun_terbit.setter
    def tahun_terbit(self, nilai: int):
        """Memvalidasi dan mengubah tahun terbit."""
        if not isinstance(nilai, int) or isinstance(nilai, bool) or nilai <= 0:
            raise ValueError("Tahun terbit harus bilangan bulat positif.")
        self._tahun_terbit = nilai

    @property
    def is_dipinjam(self) -> bool:
        """Status pinjam item tanpa membuka atribut private secara langsung."""
        return self.__dipinjam

    @property
    def is_tersedia(self) -> bool:
        """Bernilai True jika item belum dipinjam."""
        return not self.__dipinjam

    def pinjam(self):
        """Tandai item sebagai dipinjam jika masih tersedia."""
        if self.__dipinjam:
            raise ValueError(f'Item "{self.judul}" sedang dipinjam.')
        self.__dipinjam = True

    def kembalikan(self):
        """Tandai item sebagai tersedia kembali."""
        if not self.__dipinjam:
            raise ValueError(f'Item "{self.judul}" belum dipinjam.')
        self.__dipinjam = False

    @staticmethod
    def _validasi_hari_terlambat(hari_terlambat: int):
        """Pastikan jumlah hari keterlambatan berupa bilangan nonnegatif."""
        if (
            not isinstance(hari_terlambat, int)
            or isinstance(hari_terlambat, bool)
            or hari_terlambat < 0
        ):
            raise ValueError("Hari keterlambatan harus bilangan bulat nonnegatif.")

    @abstractmethod
    def get_detail(self) -> str:
        """Menghasilkan detail item sesuai jenisnya."""
        pass

    @abstractmethod
    def hitung_denda(self, hari_terlambat: int) -> int:
        """Menghitung denda keterlambatan sesuai jenis item."""
        pass


class Book(LibraryItem):
    """Representasi buku, lengkap dengan penulis dan tarif dendanya."""

    TARIF_DENDA_PER_HARI = 2000

    def __init__(self, item_id: str, judul: str, penulis: str, tahun_terbit: int):
        """Membuat objek buku."""
        super().__init__(item_id, judul, tahun_terbit)
        if not isinstance(penulis, str) or not penulis.strip():
            raise ValueError("Nama penulis tidak boleh kosong.")
        self._penulis = penulis.strip()

    def get_detail(self) -> str:
        """Mengembalikan informasi buku untuk katalog."""
        return (
            f"[Buku] ID: {self.id} | Judul: {self.judul} | "
            f"Penulis: {self._penulis} | Tahun: {self.tahun_terbit}"
        )

    def hitung_denda(self, hari_terlambat: int) -> int:
        """Denda buku adalah Rp2.000 untuk setiap hari keterlambatan."""
        self._validasi_hari_terlambat(hari_terlambat)
        return hari_terlambat * self.TARIF_DENDA_PER_HARI


class Magazine(LibraryItem):
    """Representasi majalah, lengkap dengan edisi dan tarif dendanya."""

    TARIF_DENDA_PER_HARI = 1000

    def __init__(self, item_id: str, judul: str, nomor_edisi: str, tahun_terbit: int):
        """Membuat objek majalah."""
        super().__init__(item_id, judul, tahun_terbit)
        if not isinstance(nomor_edisi, str) or not nomor_edisi.strip():
            raise ValueError("Nomor edisi tidak boleh kosong.")
        self._nomor_edisi = nomor_edisi.strip()

    def get_detail(self) -> str:
        """Mengembalikan informasi majalah untuk katalog."""
        return (
            f"[Majalah] ID: {self.id} | Judul: {self.judul} | "
            f"Edisi: {self._nomor_edisi} | Tahun: {self.tahun_terbit}"
        )

    def hitung_denda(self, hari_terlambat: int) -> int:
        """Denda majalah adalah Rp1.000 untuk setiap hari keterlambatan."""
        self._validasi_hari_terlambat(hari_terlambat)
        return hari_terlambat * self.TARIF_DENDA_PER_HARI
