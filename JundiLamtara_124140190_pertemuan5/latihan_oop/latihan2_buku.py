
# ==============================================================================
# Berkas: latihan_buku.py
# Deskripsi: Implementasi Class Buku dengan Diskon dan Dunder Length
# ==============================================================================

class Buku:
    # Constructor
    def __init__(self, judul: str, penulis: str, harga_asli: float, jumlah_halaman: int):
        self.judul = judul
        self.penulis = penulis
        self.harga_asli = harga_asli
        self.jumlah_halaman = jumlah_halaman

    # Method menghitung harga setelah diskon
    def hitung_harga_diskon(self, persen: float):
        if 0 <= persen <= 100:
            diskon = self.harga_asli * (persen / 100)
            harga_akhir = self.harga_asli - diskon
            return harga_akhir
        else:
            print("Persentase diskon tidak valid!")
            return self.harga_asli

    # Dunder method untuk menampilkan informasi buku
    def __str__(self):
        return (
            f"========== KARTU BUKU ==========\n"
            f"Judul          : {self.judul}\n"
            f"Penulis        : {self.penulis}\n"
            f"Harga Asli     : Rp{self.harga_asli:,.0f}\n"
            f"Jumlah Halaman : {self.jumlah_halaman} halaman\n"
            f"================================"
        )

    # Dunder method untuk fungsi len()
    def __len__(self):
        return self.jumlah_halaman


# PROGRAM UTAMA
if __name__ == "__main__":

    # Membuat objek buku
    buku1 = Buku(
        "Pemrograman Python",
        "Jundi Lamtara",
        150000,
        250
    )

    # Menampilkan kartu buku
    print(buku1)

    # Menghitung harga setelah diskon 20%
    print("\n--- INFORMASI DISKON ---")
    harga_diskon = buku1.hitung_harga_diskon(20)

    print("Diskon               : 20%")
    print(f"Harga Setelah Diskon : Rp{harga_diskon:,.0f}")

    # Menguji dunder method __len__()
    print("\n--- UJI DUNDER LENGTH ---")
    print("Jumlah halaman buku:", len(buku1))
