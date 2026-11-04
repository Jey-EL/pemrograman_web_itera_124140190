# ===================================================
# Berkas: latihan1.py
# Deskripsi: Mencetak identitas diri dengan print(), sep, dan escape character
# ===================================================

nama = "Jundi Lamtara"
nim = "124140190"
angkatan = "2024"
minat_penelitian = "Fullstack"

# Eksperimen parameter sep
print("Nama", "NIM", "Angkatan", "Minat Penelitian", sep=" | ")
print(nama, nim, angkatan, minat_penelitian, sep=" | ")

# Kartu identitas berbingkai karakter pagar
lebar = 44
print("#" * lebar)
print("#" + "KARTU IDENTITAS MAHASISWA".center(lebar - 2) + "#")
print("#" + " " * (lebar - 2) + "#")
print("#" + f"  Nama     : {nama}".ljust(lebar - 2) + "#")
print("#" + f"  NIM      : {nim}".ljust(lebar - 2) + "#")
print("#" + f"  Angkatan : {angkatan}".ljust(lebar - 2) + "#")
print("#" + f"  Minat    : {minat_penelitian}".ljust(lebar - 2) + "#")
print("#" * lebar)

# Escape character
print("\nData ini dicetak dengan\tkarakter escape \\t (tab)\ndan \\n (baris baru).")
