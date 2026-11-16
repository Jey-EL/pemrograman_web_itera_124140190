
# ==============================================================================
# Berkas: latihan_truk.py
# Deskripsi: Implementasi Subclass Truk dengan Inheritance dan Method Overriding
# ==============================================================================

# PARENT CLASS
class Kendaraan:
    def __init__(self, merek: str, model: str, tahun: int):
        self.merek = merek
        self.model = model
        self.tahun = tahun
        self.odometer = 0

    def deskripsi(self) -> str:
        return f"{self.merek} {self.model} ({self.tahun})"

    def tambah_jarak(self, km: float):
        if km > 0:
            self.odometer += km
            print(f"Total jarak tempuh: {self.odometer} km")


# SUBCLASS TRUK
class Truk(Kendaraan):
    def __init__(
        self,
        merek: str,
        model: str,
        tahun: int,
        kapasitas_maksimal_ton: float
    ):
        # Memanggil constructor parent class
        super().__init__(merek, model, tahun)

        # Atribut khusus Truk
        self.kapasitas_maksimal_ton = kapasitas_maksimal_ton
        self.muatan_saat_ini = 0.0

    # Method untuk memuat barang
    def muat_barang(self, berat_ton: float):
        if berat_ton <= 0:
            print("Berat barang harus lebih dari 0 ton!")
        elif self.muatan_saat_ini + berat_ton <= self.kapasitas_maksimal_ton:
            self.muatan_saat_ini += berat_ton
            print(
                f"Berhasil memuat {berat_ton} ton barang. "
                f"Total muatan: {self.muatan_saat_ini} ton"
            )
        else:
            print("Gagal! Muatan melebihi kapasitas maksimal truk.")

    # Method Overriding
    def deskripsi(self) -> str:
        return (
            f"{super().deskripsi()} | "
            f"Kapasitas Maksimal: {self.kapasitas_maksimal_ton} ton | "
            f"Muatan Saat Ini: {self.muatan_saat_ini} ton"
        )


# PROGRAM UTAMA
if __name__ == "__main__":

    # Membuat objek Truk
    truk1 = Truk(
        "Mitsubishi",
        "Fuso Fighter",
        2024,
        kapasitas_maksimal_ton=10.0
    )

    # Menampilkan deskripsi awal
    print("--- INFORMASI TRUK ---")
    print(truk1.deskripsi())

    # Menguji proses pemuatan barang
    print("\n--- PROSES PEMUATAN BARANG ---")
    truk1.muat_barang(4.5)
    truk1.muat_barang(3.0)
    truk1.muat_barang(4.0)

    # Menampilkan deskripsi setelah pemuatan
    print("\n--- INFORMASI TRUK TERBARU ---")
    print(truk1.deskripsi())
