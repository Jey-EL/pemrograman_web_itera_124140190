# ===================================================
# Berkas: tugas2_nilai_mahasiswa.py
# Deskripsi: Pengelolaan data nilai mahasiswa, grade, dan nilai tertinggi/terendah
# ===================================================

BOBOT_UTS = 0.30
BOBOT_UAS = 0.40
BOBOT_TUGAS = 0.30

data_mahasiswa = [
    {"nama": "GALIH SIGIT SATRIO", "nim": "124140001", "nilai_uts": 78, "nilai_uas": 85, "nilai_tugas": 90},
    {"nama": "MOCHAMAD RASYA KHAIRIZA", "nim": "124140002", "nilai_uts": 65, "nilai_uas": 70, "nilai_tugas": 75},
    {"nama": "Budi Laksana", "nim": "124140003", "nilai_uts": 55, "nilai_uas": 60, "nilai_tugas": 58},
    {"nama": "Imam Faris Rasyid", "nim": "124140004", "nilai_uts": 90, "nilai_uas": 88, "nilai_tugas": 95},
    {"nama": "NASYWA PUTRI SALSABILA", "nim": "124140005", "nilai_uts": 40, "nilai_uas": 45, "nilai_tugas": 50},
    {"nama": "Raisa Fazila Faisal", "nim": "124140006", "nilai_uts": 72, "nilai_uas": 68, "nilai_tugas": 80},
]


def hitung_nilai_akhir(nilai_uts: float, nilai_uas: float, nilai_tugas: float) -> float:
    """Menghitung nilai akhir dengan bobot 30% UTS, 40% UAS, dan 30% Tugas.

    Parameter:
        nilai_uts (float): Nilai Ujian Tengah Semester.
        nilai_uas (float): Nilai Ujian Akhir Semester.
        nilai_tugas (float): Nilai rata-rata tugas.

    Nilai kembali:
        float: Nilai akhir mahasiswa.
    """
    return (BOBOT_UTS * nilai_uts) + (BOBOT_UAS * nilai_uas) + (BOBOT_TUGAS * nilai_tugas)


def tentukan_grade(nilai_akhir: float) -> str:
    """Menentukan grade huruf berdasarkan nilai akhir.

    Parameter:
        nilai_akhir (float): Nilai akhir mahasiswa.

    Nilai kembali:
        str: Grade huruf A, B, C, D, atau E.
    """
    if nilai_akhir >= 80:
        return "A"
    elif nilai_akhir >= 70:
        return "B"
    elif nilai_akhir >= 60:
        return "C"
    elif nilai_akhir >= 50:
        return "D"
    else:
        return "E"


# Menghitung nilai akhir dan grade setiap mahasiswa
for mhs in data_mahasiswa:
    mhs["nilai_akhir"] = hitung_nilai_akhir(
        mhs["nilai_uts"], mhs["nilai_uas"], mhs["nilai_tugas"]
    )
    mhs["grade"] = tentukan_grade(mhs["nilai_akhir"])

# Menentukan lebar kolom secara dinamis agar nama terpanjang tetap rapi
lebar_no = 4
lebar_nama = max(len("Nama"), max(len(m["nama"]) for m in data_mahasiswa)) + 2
lebar_nim = 14
lebar_nilai = 14
lebar_grade = 8
lebar_total = lebar_no + lebar_nama + lebar_nim + lebar_nilai + lebar_grade

# Menampilkan tabel data mahasiswa
garis = "-" * lebar_total
print("=== DATA NILAI MAHASISWA ===")
print(garis)
print(
    f"{'No':<{lebar_no}}{'Nama':<{lebar_nama}}{'NIM':<{lebar_nim}}"
    f"{'Nilai Akhir':>{lebar_nilai}}{'Grade':>{lebar_grade}}"
)
print(garis)
for nomor, mhs in enumerate(data_mahasiswa, start=1):
    print(
        f"{nomor:<{lebar_no}}{mhs['nama']:<{lebar_nama}}{mhs['nim']:<{lebar_nim}}"
        f"{mhs['nilai_akhir']:>{lebar_nilai}.2f}{mhs['grade']:>{lebar_grade}}"
    )
print(garis)

# Mencari nilai tertinggi dan terendah
mhs_tertinggi = max(data_mahasiswa, key=lambda m: m["nilai_akhir"])
mhs_terendah = min(data_mahasiswa, key=lambda m: m["nilai_akhir"])

print("\nNilai akhir tertinggi:")
print(f"  Nama  : {mhs_tertinggi['nama']} ({mhs_tertinggi['nim']})")
print(f"  Nilai : {mhs_tertinggi['nilai_akhir']:.2f} (Grade {mhs_tertinggi['grade']})")

print("\nNilai akhir terendah:")
print(f"  Nama  : {mhs_terendah['nama']} ({mhs_terendah['nim']})")
print(f"  Nilai : {mhs_terendah['nilai_akhir']:.2f} (Grade {mhs_terendah['grade']})")