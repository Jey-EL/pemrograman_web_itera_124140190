# ===================================================
# Berkas: tugas1_bmi.py
# Deskripsi: Program penghitung BMI (Body Mass Index) sederhana
# ===================================================


def tentukan_kategori_bmi(bmi: float) -> str:
    """Menentukan kategori status berat badan berdasarkan nilai BMI.

    Parameter:
        bmi (float): Nilai Body Mass Index.

    Nilai kembali:
        str: Kategori status berat badan.
    """
    if bmi < 18.5:
        return "Berat badan kurang"
    elif bmi < 25:
        return "Berat badan normal"
    elif bmi < 30:
        return "Berat badan berlebih"
    else:
        return "Obesitas"


def hitung_bmi(berat: float, tinggi: float) -> float:
    """Menghitung nilai BMI dengan rumus berat / (tinggi * tinggi).

    Parameter:
        berat (float): Berat badan dalam kilogram (kg).
        tinggi (float): Tinggi badan dalam meter (m).

    Nilai kembali:
        float: Nilai BMI.
    """
    return berat / (tinggi * tinggi)


print("=== PENGHITUNG BMI ===")
berat_badan = float(input("Masukkan berat badan (kg): "))
tinggi_badan = float(input("Masukkan tinggi badan (m): "))

nilai_bmi = hitung_bmi(berat_badan, tinggi_badan)
kategori = tentukan_kategori_bmi(nilai_bmi)

print(f"\nNilai BMI Anda : {nilai_bmi:.2f}")
print(f"Status         : {kategori}")
