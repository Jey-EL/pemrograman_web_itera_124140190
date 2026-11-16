# ==============================================================================
# Berkas: 01_everything_is_object.py
# Deskripsi: Eksplorasi objek bawaan Python menggunakan type(), id(), dan dunder class
# ==============================================================================

# 1. Nilai primitif sesungguhnya adalah instance dari class bawaan
angka = 42
pesan = "Praktikum Pemrograman Web ITERA"
daftar_nilai = [85, 90, 78]

print("Tipe objek 'angka'        :", type(angka), "| Class:", angka.__class__)
print("Tipe objek 'pesan'        :", type(pesan), "| Class:", pesan.__class__)
print("Tipe objek 'daftar_nilai' :", type(daftar_nilai), "| Class:", daftar_nilai.__class__)

# 2. Objek memiliki metode bawaan yang melekat pada dirinya
print("\nManipulasi string via method class str:")
print("Versi Huruf Besar :", pesan.upper())
print("Pecah Kata        :", pesan.split(" "))

# 3. Bahkan fungsi juga merupakan objek tingkat pertama (first-class object)!
def salam():
    return "Halo dari fungsi!"

print("\nTipe objek fungsi 'salam' :", type(salam))
print("Identitas memori (id)     :", hex(id(salam)))