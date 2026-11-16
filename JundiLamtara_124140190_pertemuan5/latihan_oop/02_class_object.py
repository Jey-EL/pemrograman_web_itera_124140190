# ==============================================================================
# Berkas: 02_class_object.py
# Deskripsi: Implementasi Class Mahasiswa dengan Atribut Class, Instance & Dunder
# ==============================================================================

class Mahasiswa:
    # 1. ATRIBUT CLASS (Milik bersama seluruh instance)
    universitas = "Institut Teknologi Sumatera"
    prodi = "Teknik Informatika"
    total_mahasiswa_terdaftar = 0

    # 2. CONSTRUCTOR / INITIALIZER
    def __init__(self, nama: str, nim: str, ipk: float = 0.0):
        # ATRIBUT INSTANCE (Unik milik setiap objek masing-masing)
        self.nama = nama
        self.nim = nim
        self.ipk = ipk
        self.daftar_matkul = []
        
        # Setiap kali objek baru diciptakan, hitung total mahasiswa
        Mahasiswa.total_mahasiswa_terdaftar += 1

    # 3. INSTANCE METHODS
    def tambah_matkul(self, mata_kuliah: str):
        self.daftar_matkul.append(mata_kuliah)
        print(f"[{self.nama}] Berhasil mengambil mata kuliah: {mata_kuliah}")

    def update_ipk(self, ipk_baru: float):
        if 0.0 <= ipk_baru <= 4.0:
            self.ipk = ipk_baru
        else:
            print(f"Nilai IPK {ipk_baru} tidak valid!")

    def evaluasi_status(self) -> str:
        if self.ipk >= 3.50:
            return "Cumlaude / Sangat Memuaskan"
        elif self.ipk >= 3.00:
            return "Memuaskan"
        elif self.ipk >= 2.00:
            return "Cukup"
        else:
            return "Perlu Bimbingan Khusus"

    # 4. SPECIAL (DUNDER) METHODS
    def __str__(self) -> str:
        """Representasi string yang dibaca pengguna akhir saat print(objek)"""
        return f"Mahasiswa: {self.nama} (NIM: {self.nim}) | IPK: {self.ipk:.2f} | Kampus: {self.universitas}"

    def __repr__(self) -> str:
        """Representasi teknis untuk keperluan logging dan debugging developer"""
        return f"Mahasiswa(nama='{self.nama}', nim='{self.nim}', ipk={self.ipk})"


# --- PROGRAM UTAMA (INSTANSIASI & UJI COBA) ---
if __name__ == "__main__":
    print("Total mahasiswa awal:", Mahasiswa.total_mahasiswa_terdaftar)

    # Instansiasi 2 objek mahasiswa berbeda
    mhs1 = Mahasiswa("Ahmad Fadhil", "121140001", 3.72)
    mhs2 = Mahasiswa("Nabila Putri", "121140002", 3.40)

    print("Total mahasiswa sekarang:", Mahasiswa.total_mahasiswa_terdaftar)

    # Uji coba penambahan mata kuliah (instance attribute terisolasi)
    mhs1.tambah_matkul("Pemrograman Web")
    mhs1.tambah_matkul("Basis Data")
    mhs2.tambah_matkul("Kecerdasan Buatan")

    print(f"\nMatkul {mhs1.nama}: {mhs1.daftar_matkul}")
    print(f"Matkul {mhs2.nama}: {mhs2.daftar_matkul}")

    # Uji evaluasi status akademik
    print(f"Predikat {mhs1.nama}: {mhs1.evaluasi_status()}")
    print(f"Predikat {mhs2.nama}: {mhs2.evaluasi_status()}")

    # Uji representasi dunder method __str__ dan __repr__
    print("\nCetak objek mhs1 langsung (memanggil __str__):")
    print(mhs1)

    print("Representasi teknis mhs2 (memanggil __repr__):")
    print(repr(mhs2))

    # Bukti perubahan atribut class berdampak ke seluruh instance
    print("\n--- Modifikasi Atribut Class ---")
    Mahasiswa.universitas = "ITERA Kampus Mandiri"
    print("Kampus mhs1 setelah modifikasi:", mhs1.universitas)
    print("Kampus mhs2 setelah modifikasi:", mhs2.universitas)