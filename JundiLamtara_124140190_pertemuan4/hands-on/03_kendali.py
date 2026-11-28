# ===================================================
# Berkas: 03_kendali.py
# Deskripsi: Percabangan bertingkat, ternary operator, for-loop, dan while-loop
# ===================================================

# 1. Percabangan Nilai Akademik (if - elif - else)
nilai_ujian = 82
kehadiran_persen = 85

print("--- EVALUASI AKADEMIK ---")
if nilai_ujian >= 80 and kehadiran_persen >= 75:
    grade = "A"
    keterangan = "Lulus dengan Pujian (Sangat Memuaskan)"
elif nilai_ujian >= 70 and kehadiran_persen >= 70:
    grade = "B"
    keterangan = "Lulus Memuaskan"
elif nilai_ujian >= 60 and kehadiran_persen >= 65:
    grade = "C"
    keterangan = "Lulus Cukup"
else:
    grade = "E / D"
    keterangan = "Tidak Memenuhi Syarat Kelulusan"

print(f"Skor: {nilai_ujian} | Presensi: {kehadiran_persen}%")
print(f"Hasil Akhir: Grade {grade} ({keterangan})")

# 2. Ternary Operator (Conditional Expression Ringkas)
status_registrasi = "Aktif" if kehadiran_persen >= 75 else "Nonaktif"
print(f"Status Mahasiswa: {status_registrasi}")

# 3. For Loop: Iterasi Rentang Angka dan Bilangan Ganjil/Genap
print("\n--- DERET BILANGAN GANJIL (1 - 15) DENGAN CONTINUE ---")
for angka in range(1, 16):
    if angka % 2 == 0:
        continue  # Lewati bilangan genap
    print(angka, end=" ")
print()  # Ganti baris

# 4. For Loop dengan Enumerate pada Daftar Framework
frameworks = ["Pyramid", "FastAPI", "Django", "Flask"]
print("\n--- DAFTAR FRAMEWORK PYTHON POPULER ---")
for urutan, item in enumerate(frameworks, start=1):
    print(f"{urutan}. {item}")

# 5. While Loop Interaktif dengan Break dan Pencarian Data
print("\n--- PENCARIAN TARGET ANGKA (WHILE + BREAK + ELSE) ---")
target = 7
hitung = 1

while hitung <= 10:
    print(f"Memeriksa nilai: {hitung}...")
    if hitung == target:
        print(f"--> Target {target} BERHASIL DITEMUKAN pada langkah ke-{hitung}!")
        break
    hitung += 1
else:
    print("Pencarian selesai: Target tidak ditemukan.")

# 6. Nested Loop: Membuat Pola Segitiga Bintang
print("\n--- GENERATOR POLA SEGITIGA SIKU-SIKU ---")
tinggi_segitiga = 5

for baris in range(1, tinggi_segitiga + 1):
    for bintang in range(baris):
        print("* ", end="")
    print()  # Newline untuk baris berikutnya