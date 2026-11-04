# ===================================================
# Berkas: math_operations.py
# Deskripsi: Modul matematika berisi fungsi geometri dan konversi suhu
# ===================================================

PI = 3.14159


# ---------- Geometri ----------

def luas_persegi(sisi: float) -> float:
    """Menghitung luas persegi.

    Parameter:
        sisi (float): Panjang sisi persegi.

    Nilai kembali:
        float: Luas persegi.
    """
    return sisi * sisi


def keliling_persegi(sisi: float) -> float:
    """Menghitung keliling persegi.

    Parameter:
        sisi (float): Panjang sisi persegi.

    Nilai kembali:
        float: Keliling persegi.
    """
    return 4 * sisi


def luas_persegi_panjang(panjang: float, lebar: float) -> float:
    """Menghitung luas persegi panjang.

    Parameter:
        panjang (float): Panjang persegi panjang.
        lebar (float): Lebar persegi panjang.

    Nilai kembali:
        float: Luas persegi panjang.
    """
    return panjang * lebar


def keliling_persegi_panjang(panjang: float, lebar: float) -> float:
    """Menghitung keliling persegi panjang.

    Parameter:
        panjang (float): Panjang persegi panjang.
        lebar (float): Lebar persegi panjang.

    Nilai kembali:
        float: Keliling persegi panjang.
    """
    return 2 * (panjang + lebar)


def luas_lingkaran(jari_jari: float) -> float:
    """Menghitung luas lingkaran dengan rumus PI * r * r.

    Parameter:
        jari_jari (float): Jari-jari lingkaran.

    Nilai kembali:
        float: Luas lingkaran.
    """
    return PI * jari_jari * jari_jari


def keliling_lingkaran(jari_jari: float) -> float:
    """Menghitung keliling lingkaran dengan rumus 2 * PI * r.

    Parameter:
        jari_jari (float): Jari-jari lingkaran.

    Nilai kembali:
        float: Keliling lingkaran.
    """
    return 2 * PI * jari_jari


# ---------- Konversi Suhu ----------

def celsius_ke_fahrenheit(celsius: float) -> float:
    """Mengonversi suhu dari Celsius ke Fahrenheit.

    Parameter:
        celsius (float): Suhu dalam derajat Celsius.

    Nilai kembali:
        float: Suhu dalam derajat Fahrenheit.
    """
    return celsius * 9 / 5 + 32


def celsius_ke_kelvin(celsius: float) -> float:
    """Mengonversi suhu dari Celsius ke Kelvin.

    Parameter:
        celsius (float): Suhu dalam derajat Celsius.

    Nilai kembali:
        float: Suhu dalam Kelvin.
    """
    return celsius + 273.15
