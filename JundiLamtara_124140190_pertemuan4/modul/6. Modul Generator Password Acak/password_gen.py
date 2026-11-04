# ===================================================
# Berkas: password_gen.py
# Deskripsi: Modul pembuat password acak
# ===================================================

import random
import string


def buat_password_acak(panjang=8):
    """Membuat password acak dengan kombinasi huruf dan angka sepanjang 'panjang' karakter."""
    karakter = string.ascii_letters + string.digits
    return "".join(random.choice(karakter) for _ in range(panjang))
