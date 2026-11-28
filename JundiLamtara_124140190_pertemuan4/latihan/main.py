# ===================================================
# Berkas: main.py
# Deskripsi: Program utama penguji modul password_gen
# ===================================================

import password_gen

print("=== GENERATOR PASSWORD ACAK ===")
print("Praktikan: Jundi Lamtara (124140190)\n")

print(f"Password default (8 karakter) : {password_gen.buat_password_acak()}")
print(f"Password 12 karakter          : {password_gen.buat_password_acak(12)}")
print(f"Password 16 karakter          : {password_gen.buat_password_acak(16)}")