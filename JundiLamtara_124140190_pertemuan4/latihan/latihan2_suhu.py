# ===================================================
# Berkas: latihan2_suhu.py
# Deskripsi: Kalkulator Konversi Suhu Interaktif
# ===================================================

print("=== KALKULATOR KONVERSI SUHU ===")
print("Praktikan: Jundi Lamtara (124140190)\n")

celcius = float(input("Masukkan nilai temperatur dalam derajat Celcius (°C): "))

fahrenheit = celcius * 9 / 5 + 32
kelvin = celcius + 273.15

print("\n--- HASIL KONVERSI ---")
print(f"Suhu Awal  : {celcius:.2f} °C")
print(f"Fahrenheit : {fahrenheit:.2f} °F")
print(f"Kelvin     : {kelvin:.2f} K")