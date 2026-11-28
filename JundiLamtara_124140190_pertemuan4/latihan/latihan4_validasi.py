# ===================================================
# Berkas: latihan4_validasi.py
# Deskripsi: Fungsi Validator Password
# ===================================================

def validasi_password(password: str) -> bool:
    """
    Memvalidasi password:
    - Panjang minimal 8 karakter
    - Mengandung setidaknya satu angka
    """
    panjang_valid = len(password) >= 8
    ada_angka = any(karakter.isdigit() for karakter in password)
    return panjang_valid and ada_angka


print("=== VALIDATOR PASSWORD ===")
print("Praktikan: Jundi Lamtara (124140190)\n")

daftar_password_uji = [
    "jundi123",          # Valid (8 karakter & ada angka)
    "JundiITERA2024",    # Valid (14 karakter & ada angka)
    "jundi",             # Tidak valid (kurang dari 8 karakter)
    "JundiLamtara",      # Tidak valid (tidak ada angka)
    "1234567"            # Tidak valid (kurang dari 8 karakter)
]

for pwd in daftar_password_uji:
    status = "VALID" if validasi_password(pwd) else "TIDAK VALID"
    print(f"Password: '{pwd}' -> {status}")