# ===================================================
# Berkas: latihan2.py
# Deskripsi: Kalkulator konversi suhu Celcius ke Fahrenheit dan Kelvin
# ===================================================

print("=== KALKULATOR KONVERSI SUHU ===")
celsius = float(input("Masukkan suhu dalam derajat Celcius (°C): "))

fahrenheit = celsius * 9 / 5 + 32
kelvin = celsius + 273.15

print("\nHasil konversi:")
print(f"Fahrenheit : {fahrenheit:.2f} °F")
print(f"Kelvin     : {kelvin:.2f} K")
