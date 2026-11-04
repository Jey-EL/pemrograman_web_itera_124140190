# ===================================================
# Berkas: latihan3.py
# Deskripsi: Game tebak angka rahasia dengan while loop dan break
# ===================================================

angka_rahasia = 7

print("=== GAME TEBAK ANGKA RAHASIA ===")
print("Tebak angka antara 1 sampai 10!")

while True:
    tebakan = int(input("Masukkan tebakan Anda: "))

    if tebakan < angka_rahasia:
        print("Terlalu kecil!")
    elif tebakan > angka_rahasia:
        print("Terlalu besar!")
    else:
        print("Selamat, tebakan benar!")
        break
