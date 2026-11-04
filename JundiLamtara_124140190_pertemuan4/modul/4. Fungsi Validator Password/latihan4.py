# ===================================================
# Berkas: latihan4.py
# Deskripsi: Fungsi validasi password (minimal 8 karakter dan mengandung angka)
# ===================================================

def validasi_password(password: str) -> bool:
    """Mengembalikan True jika panjang password minimal 8 dan mengandung minimal satu angka."""
    if len(password) < 8:
        return False
    for karakter in password:
        if karakter.isdigit():
            return True
    return False


# Uji coba dengan contoh password valid dan tidak valid
daftar_uji = [
    "password123",   # valid: 11 karakter, ada angka
    "rahasia2026",   # valid
    "abc12345",      # valid
    "passwordku",    # tidak valid: tidak ada angka
    "abc123",        # tidak valid: kurang dari 8 karakter
    "12345",         # tidak valid: kurang dari 8 karakter
]

for pw in daftar_uji:
    status = "VALID" if validasi_password(pw) else "TIDAK VALID"
    print(f"{pw:<15} -> {status}")
