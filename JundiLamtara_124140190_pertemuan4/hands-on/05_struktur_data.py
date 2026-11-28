# ===================================================
# Berkas: 05_struktur_data.py
# Deskripsi: Operasi lanjutan List, Comprehension, Tuple, Dict, dan Set
# ===================================================

# ---------------------------------------------------
# 1. LIST: Operasi Manipulasi dan List Comprehension
# ---------------------------------------------------
hobi = ["Membaca", "Ngoding", "Bermain Game"]
print("--- 1. EKSPLORASI LIST ---")
hobi.append("Sepak Bola")             # Menambah di akhir
hobi.insert(1, "Berenang")             # Menyisipkan di indeks ke-1
hobi.remove("Membaca")                 # Menghapus berdasarkan nilai
item_dihapus = hobi.pop()              # Menghapus dan mengambil item terakhir

print(f"List setelah operasi : {hobi}")
print(f"Item yang di-pop     : {item_dihapus}")

# List Comprehension: Membuat list baru dengan sintaks satu baris yang elegan
# Format: [ekspresi for item in koleksi if kondisi]
angka_mentah = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
kuadrat_genap = [x ** 2 for x in angka_mentah if x % 2 == 0]
print(f"Kuadrat bilangan genap : {kuadrat_genap}")  # [4, 16, 36, 64, 100]

# ---------------------------------------------------
# 2. TUPLE: Koleksi Immutable yang Aman
# ---------------------------------------------------
print("\n--- 2. EKSPLORASI TUPLE ---")
titik_koordinat = (-5.3644, 105.3175)  # Koordinat Kampus ITERA (lat, long)
print(f"Latitude ITERA  : {titik_koordinat[0]}")
print(f"Longitude ITERA : {titik_koordinat[1]}")
# titik_koordinat[0] = 0.0  # Ini akan TypeError karena tuple tidak dapat diubah (immutable)!

# ---------------------------------------------------
# 3. DICTIONARY: Pemetaan Pasangan Kunci-Nilai (Key-Value)
# ---------------------------------------------------
print("\n--- 3. EKSPLORASI DICTIONARY ---")
profil_mahasiswa = {
    "nim": "121140001",
    "nama": "Ahmad Fadhilah",
    "program_studi": "Teknik Informatika",
    "ipk": 3.85,
    "matkul_diambil": ["Pemrograman Web", "Struktur Data", "Jaringan Komputer"]
}

# Mengakses nilai dengan key atau method .get() (lebih aman dari KeyError)
print(f"Nama Mahasiswa : {profil_mahasiswa['nama']}")
print(f"Status Beasiswa: {profil_mahasiswa.get('beasiswa', 'Tidak Menerima')}")

# Menambah key baru dan memperbarui nilai
profil_mahasiswa["semester"] = 5
profil_mahasiswa["ipk"] = 3.90

# Iterasi pasangan key dan value menggunakan .items()
print("\nRincian Data Profil Mahasiswa:")
for key, value in profil_mahasiswa.items():
    print(f"  * {key.replace('_', ' ').capitalize()}: {value}")

# ---------------------------------------------------
# 4. SET: Himpunan Elemen Unik dan Operasi Matematika
# ---------------------------------------------------
print("\n--- 4. EKSPLORASI SET ---")
# Eliminasi duplikasi otomatis dari list
daftar_nim_presensi = ["IF01", "IF02", "IF01", "IF03", "IF02", "IF04"]
nim_unik = set(daftar_nim_presensi)
print(f"NIM unik yang hadir : {nim_unik}")

# Operasi Himpunan Matematika
mahasiswa_web = {"Budi", "Siti", "Andi", "Dewi"}
mahasiswa_ai = {"Andi", "Dewi", "Rian", "Eko"}

print(f"\nMahasiswa Web : {mahasiswa_web}")
print(f"Mahasiswa AI  : {mahasiswa_ai}")

# Union (Gabungan seluruh mahasiswa yang ikut salah satu/kedua kelas)
print(f"Gabungan (Union |)     : {mahasiswa_web | mahasiswa_ai}")

# Intersection (Irisan mahasiswa yang mengambil KEDUA kelas)
print(f"Irisan (Intersection &): {mahasiswa_web & mahasiswa_ai}")

# Difference (Mahasiswa yang HANYA mengambil kelas Web)
print(f"Selisih (Difference -) : {mahasiswa_web - mahasiswa_ai}")