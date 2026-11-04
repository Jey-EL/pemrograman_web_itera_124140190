# ===================================================
# Berkas: main.py
# Deskripsi: Menguji modul password_gen
# ===================================================

from password_gen import buat_password_acak

print("=== GENERATOR PASSWORD ACAK ===")
print("Password default (8 karakter):", buat_password_acak())
print("Password 12 karakter         :", buat_password_acak(12))
print("Password 16 karakter         :", buat_password_acak(panjang=16))
