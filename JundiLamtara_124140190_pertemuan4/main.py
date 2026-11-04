# ===================================================
# Berkas: main.py
# Deskripsi: Program utama yang memakai modul math_operations
# ===================================================

# Cara 1: mengimpor seluruh modul
import math_operations

# Cara 2: mengimpor konstanta dan fungsi tertentu secara langsung
from math_operations import PI, luas_lingkaran, celsius_ke_kelvin

print("=== GEOMETRI (import math_operations) ===")
sisi = 5
print(f"Persegi (sisi {sisi})               : luas = {math_operations.luas_persegi(sisi):.2f}, "
      f"keliling = {math_operations.keliling_persegi(sisi):.2f}")

panjang, lebar = 8, 3
print(f"Persegi panjang ({panjang} x {lebar})          : luas = {math_operations.luas_persegi_panjang(panjang, lebar):.2f}, "
      f"keliling = {math_operations.keliling_persegi_panjang(panjang, lebar):.2f}")

jari = 7
print(f"Lingkaran (r = {jari})                : luas = {luas_lingkaran(jari):.2f}, "
      f"keliling = {math_operations.keliling_lingkaran(jari):.2f}")

print(f"\nKonstanta PI yang digunakan: {PI}")

print("\n=== KONVERSI SUHU ===")
for suhu in [0, 25, 100]:
    f = math_operations.celsius_ke_fahrenheit(suhu)
    k = celsius_ke_kelvin(suhu)
    print(f"{suhu:>5} °C -> {f:>7.2f} °F | {k:>8.2f} K")
