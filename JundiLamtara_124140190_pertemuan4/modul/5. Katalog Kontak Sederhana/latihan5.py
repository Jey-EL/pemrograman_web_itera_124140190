# ===================================================
# Berkas: latihan5.py
# Deskripsi: Katalog kontak sederhana menggunakan dictionary
# ===================================================

kontak = {}

while True:
    print("\n=== KATALOG KONTAK ===")
    print("1. Tambah kontak baru")
    print("2. Cari nomor telepon")
    print("3. Tampilkan semua kontak")
    print("4. Keluar")
    pilihan = input("Pilih menu (1-4): ")

    if pilihan == "1":
        nama = input("Nama kontak      : ")
        nomor = input("Nomor telepon    : ")
        kontak[nama] = nomor
        print(f"Kontak '{nama}' berhasil disimpan.")

    elif pilihan == "2":
        nama = input("Cari nama kontak : ")
        nomor = kontak.get(nama)
        if nomor:
            print(f"Nomor telepon {nama}: {nomor}")
        else:
            print(f"Kontak '{nama}' tidak ditemukan.")

    elif pilihan == "3":
        if not kontak:
            print("Belum ada kontak tersimpan.")
        else:
            print("\nDaftar kontak:")
            for nama, nomor in kontak.items():
                print(f"  - {nama}: {nomor}")

    elif pilihan == "4":
        print("Sampai jumpa!")
        break

    else:
        print("Pilihan tidak valid, silakan pilih 1-4.")
