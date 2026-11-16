
# ==============================================================================
# Berkas: latihan_karyawan.py
# Deskripsi: Implementasi Encapsulation pada Sistem Penggajian Karyawan
# ==============================================================================

class Karyawan:
    # Constructor
    def __init__(self, nama: str, jabatan: str, gaji_pokok: float):
        # Atribut Public
        self.nama = nama
        self.jabatan = jabatan

        # Atribut Private
        self.__gaji_pokok = 0.0

        # Mengatur gaji melalui setter agar tervalidasi
        self.gaji_pokok = gaji_pokok

    # PROPERTY GETTER
    @property
    def gaji_pokok(self) -> float:
        return self.__gaji_pokok

    # PROPERTY SETTER
    @gaji_pokok.setter
    def gaji_pokok(self, gaji_baru: float):
        UMR = 3200000

        if not isinstance(gaji_baru, (int, float)):
            raise TypeError("Gaji harus berupa angka!")

        if gaji_baru < UMR:
            raise ValueError(
                f"Gaji pokok tidak boleh di bawah Rp{UMR:,.0f}!"
            )

        self.__gaji_pokok = float(gaji_baru)
        print(f"Gaji pokok berhasil diatur: Rp{self.__gaji_pokok:,.0f}")

    # METHOD MENGHITUNG GAJI BERSIH
    def hitung_gaji_bersih(self, pajak_persen: float):
        if not 0 <= pajak_persen <= 100:
            print("Persentase pajak tidak valid!")
            return None

        pajak = self.__gaji_pokok * (pajak_persen / 100)
        gaji_bersih = self.__gaji_pokok - pajak

        return gaji_bersih


# PROGRAM UTAMA
if __name__ == "__main__":

    # Membuat objek karyawan
    karyawan1 = Karyawan(
        "Jundi Lamtara",
        "Software Developer",
        5000000
    )

    # Menampilkan informasi karyawan
    print("\n--- DATA KARYAWAN ---")
    print("Nama       :", karyawan1.nama)
    print("Jabatan    :", karyawan1.jabatan)
    print(f"Gaji Pokok : Rp{karyawan1.gaji_pokok:,.0f}")

    # Menghitung gaji bersih dengan pajak 5%
    print("\n--- PERHITUNGAN GAJI ---")
    pajak = 5
    gaji_bersih = karyawan1.hitung_gaji_bersih(pajak)

    print(f"Pajak      : {pajak}%")
    print(f"Gaji Bersih: Rp{gaji_bersih:,.0f}")

    # Menguji validasi setter
    print("\n--- UJI VALIDASI GAJI ---")
    try:
        karyawan1.gaji_pokok = 2500000
    except ValueError as err:
        print("Validasi Tertangkap:", err)

    # Memastikan gaji tidak berubah
    print(f"Gaji Pokok Saat Ini: Rp{karyawan1.gaji_pokok:,.0f}")
