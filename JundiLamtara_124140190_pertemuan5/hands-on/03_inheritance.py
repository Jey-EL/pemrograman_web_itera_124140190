# ==============================================================================
# Berkas: 03_inheritance.py
# Deskripsi: Implementasi Superclass, Subclass, super(), Overriding & MRO
# ==============================================================================

# ------------------------------------------------------------------------------
# 1. SUPERCLASS (BASE CLASS)
# ------------------------------------------------------------------------------
class Kendaraan:
    def __init__(self, merek: str, model: str, tahun: int):
        self.merek = merek
        self.model = model
        self.tahun = tahun
        self.odometer = 0  # Kilometer tempuh awal

    def deskripsi(self) -> str:
        return f"{self.merek} {self.model} ({self.tahun})"

    def tambah_jarak(self, km: float):
        if km > 0:
            self.odometer += km
            print(f"[{self.merek}] Menempuh perjalanan +{km} km. Total Odo: {self.odometer} km")
        else:
            print("Nilai kilometer tambahan tidak valid!")

    def klakson(self) -> str:
        return "Tin tin!"


# ------------------------------------------------------------------------------
# 2. SUBCLASS MOBIL (Single Inheritance dari Kendaraan)
# ------------------------------------------------------------------------------
class Mobil(Kendaraan):
    def __init__(self, merek: str, model: str, tahun: int, jumlah_pintu: int, kapasitas_tangki: float):
        # Memanggil constructor parent class Kendaraan via super()
        super().__init__(merek, model, tahun)
        # Atribut spesifik Mobil
        self.jumlah_pintu = jumlah_pintu
        self.kapasitas_tangki = kapasitas_tangki
        self.sisa_bensin = kapasitas_tangki

    # METHOD OVERRIDING: Memperluas deskripsi milik Kendaraan
    def deskripsi(self) -> str:
        deskripsi_dasar = super().deskripsi()
        return f"{deskripsi_dasar} [Mobil {self.jumlah_pintu} Pintu, Tangki: {self.kapasitas_tangki}L]"

    # OVERRIDING KLAKSON
    def klakson(self) -> str:
        return "Telolet! Telolet! (Klakson Mobil)"

    def isi_bensin(self, liter: float):
        if self.sisa_bensin + liter <= self.kapasitas_tangki:
            self.sisa_bensin += liter
            print(f"[{self.merek} {self.model}] Diisi bensin {liter}L. Sisa bahan bakar: {self.sisa_bensin}L")
        else:
            print("Kapasitas tangki bensin akan meluap!")


# ------------------------------------------------------------------------------
# 3. SUBCLASS MOTOR (Mewarisi Kendaraan)
# ------------------------------------------------------------------------------
class Motor(Kendaraan):
    def __init__(self, merek: str, model: str, tahun: int, kapasitas_cc: int):
        super().__init__(merek, model, tahun)
        self.kapasitas_cc = kapasitas_cc

    def deskripsi(self) -> str:
        return f"{super().deskripsi()} [Motor Sport {self.kapasitas_cc}cc]"

    def klakson(self) -> str:
        return "Bip bip! (Klakson Motor)"

    def wheelie(self):
        print(f"[{self.merek} {self.model}] Melakukan atraksi wheelie satu roda!")


# ------------------------------------------------------------------------------
# 4. MULTIPLE INHERITANCE: KENDARAAN LISTRIK & MOBIL LISTRIK
# ------------------------------------------------------------------------------
class KomponenBaterai:
    def __init__(self, kapasitas_kwh: float):
        self.kapasitas_kwh = kapasitas_kwh
        self.daya_tersisa = 100.0  # Persen baterai

    def isi_daya(self, persen: float):
        self.daya_tersisa = min(100.0, self.daya_tersisa + persen)
        print(f"Baterai diisi ulang. Kapasitas daya: {self.daya_tersisa}%")


class MobilListrik(Mobil, KomponenBaterai):
    """Mewarisi Mobil (yang mewarisi Kendaraan) dan KomponenBaterai"""
    def __init__(self, merek: str, model: str, tahun: int, kapasitas_kwh: float):
        Mobil.__init__(self, merek, model, tahun, jumlah_pintu=4, kapasitas_tangki=0.0)
        KomponenBaterai.__init__(self, kapasitas_kwh)

    def deskripsi(self) -> str:
        return f"{self.merek} {self.model} ({self.tahun}) [EV Baterai {self.kapasitas_kwh} kWh, Daya: {self.daya_tersisa}%]"


# --- PROGRAM UTAMA ---
if __name__ == "__main__":
    avanza = Mobil("Toyota", "Avanza Veloz", 2023, jumlah_pintu=5, kapasitas_tangki=45.0)
    cbr = Motor("Honda", "CBR250RR", 2022, kapasitas_cc=250)
    ioniq = MobilListrik("Hyundai", "Ioniq 5", 2024, kapasitas_kwh=72.6)

    print("--- Deskripsi Kendaraan ---")
    print(avanza.deskripsi())
    print(cbr.deskripsi())
    print(ioniq.deskripsi())

    print("\n--- Uji Coba Suara Klakson (Polymorphic Overriding) ---")
    print(f"{avanza.model} : {avanza.klakson()}")
    print(f"{cbr.model}    : {cbr.klakson()}")

    print("\n--- Perjalanan & Konsumsi Energi ---")
    avanza.tambah_jarak(120.5)
    avanza.isi_bensin(15)
    cbr.wheelie()
    ioniq.isi_daya(30)

    print("\n--- Pemeriksaan Relasi Pewarisan (isinstance & issubclass) ---")
    print("Apakah avanza adalah instance dari Mobil?    :", isinstance(avanza, Mobil))
    print("Apakah avanza adalah instance dari Kendaraan?:", isinstance(avanza, Kendaraan))
    print("Apakah cbr adalah instance dari Mobil?       :", isinstance(cbr, Mobil))
    print("Apakah Mobil subclass dari Kendaraan?        :", issubclass(Mobil, Kendaraan))
    print("\nMRO MobilListrik:", [c.__name__ for c in MobilListrik.__mro__])