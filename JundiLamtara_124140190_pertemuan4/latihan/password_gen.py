# ===================================================
# Berkas: password_gen.py
# Deskripsi: Modul Generator Password Acak
# ===================================================

import random
import string

def buat_password_acak(panjang: int = 8) -> str:
    """Menghasilkan password acak dari kombinasi huruf dan angka."""
    karakter = string.ascii_letters + string.digits
    password = "".join(random.choice(karakter) for _ in range(panjang))
    return password

if __name__ == "__main__":
    print("[TEST MODUL] Contoh password acak (default 8 karakter):", buat_password_acak())