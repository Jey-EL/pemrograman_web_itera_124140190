# ===================================================
# Berkas: latihan3_tebak.py
# Deskripsi: Game Tebak Angka Rahasia Sederhana
# ===================================================

print("=== GAME TEBAK ANGKA RAHASIA ===")
print("Pemain: Jundi Lamtara (124140190)\n")

angka_rahasia = 7

while True:
    tebakan = int(input("Masukkan tebakan angka rahasia: "))

    if tebakan < angka_rahasia:
        print("Terlalu kecil!")
    elif tebakan > angka_rahasia:
        print("Terlalu besar!")
    else:
        print("Selamat, tebakan benar!")
        break