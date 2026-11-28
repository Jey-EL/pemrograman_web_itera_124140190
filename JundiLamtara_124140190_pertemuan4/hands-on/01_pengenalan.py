# ===================================================
# Berkas: 01_pengenalan.py
# Deskripsi: Mengenal sintaks dasar dan fungsi print()
# ===================================================

# 1. Output string sederhana
print("Hello, World!")
print("Selamat datang di Praktikum Pemrograman Web ITERA!")

# 2. Mencetak beberapa argumen sekaligus (dipisahkan spasi secara default)
nama_praktikan = "Ahmad Fadhilah"
nim_praktikan = 121140001
print("Nama:", nama_praktikan, "| NIM:", nim_praktikan)

# 3. Kustomisasi pemisah (separator) dengan parameter sep
print("Teknik", "Informatika", "ITERA", sep=" -> ")

# 4. Kustomisasi karakter akhir baris dengan parameter end
print("Memuat data", end="... ")
print("Selesai!")

# 5. Menggunakan karakter escape (\n untuk baris baru, \t untuk tabulasi)
print("\nDaftar Mata Kuliah:\n\t1. Pemrograman Web\n\t2. Basis Data")