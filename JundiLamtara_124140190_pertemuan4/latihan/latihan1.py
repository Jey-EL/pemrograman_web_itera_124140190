# ===================================================
# Berkas: latihan1.py
# Deskripsi: Latihan Mandiri - Identitas Diri & Eksperimen Print
# ===================================================

nama = "Jundi Lamtara"
nim = 124140190
angkatan = 2024
minat_penelitian = "Web Development & Software Engineering"

# Eksperimen penggunaan parameter sep=' | '
print(nama, nim, angkatan, minat_penelitian, sep=" | ")

# Cetakan kartu identitas berbingkai karakter pagar (#) dengan escape character
print(
    "\n############################################################\n"
    "#\t\tKARTU IDENTITAS MAHASISWA\t\t   #\n"
    "############################################################\n"
    f"# Nama             : {nama}\t\t\t   #\n"
    f"# NIM              : {nim}\t\t\t\t   #\n"
    f"# Angkatan         : {angkatan}\t\t\t\t   #\n"
    f"# Minat Penelitian : {minat_penelitian} #\n"
    "############################################################"
)