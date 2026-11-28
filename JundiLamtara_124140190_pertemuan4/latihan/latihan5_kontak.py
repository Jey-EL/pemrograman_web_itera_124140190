# ===================================================
# Berkas: latihan5_kontak.py
# Deskripsi: Katalog Kontak Sederhana menggunakan Dictionary
# ===================================================

daftar_kontak = {
    "Jundi Lamtara": "081234567890",
    "Dosen PA ITERA": "082198765432",
    "Admin Prodi IF": "085211223344"
}

while True:
    print("\n=== KATALOG KONTAK SEDERHANA ===")
    print("Pemilik: Jundi Lamtara (124140190)")
    print("1. Tambah Kontak Baru")
    print("2. Cari Nomor Telepon")
    print("3. Tampilkan Semua Kontak")
    print("4. Keluar")

    pilihan = input("Pilih menu (1-4): ")

    if pilihan == "1":
        nama = input("Masukkan nama kontak baru : ")
        telepon = input("Masukkan nomor telepon     : ")
        daftar_kontak[nama] = telepon
        print(f"--> Kontak '{nama}' berhasil ditambahkan!")

    elif pilihan == "2":
        cari_nama = input("Masukkan nama yang dicari: ")
        nomor = daftar_kontak.get(cari_nama, "Kontak tidak ditemukan.")
        print(f"Hasil pencarian '{cari_nama}': {nomor}")

    elif pilihan == "3":
        print("\n--- DAFTAR KONTAK TERSIMPAN ---")
        if not daftar_kontak:
            print("Belum ada kontak yang tersimpan.")
        else:
            for nomor_urut, (nama, telepon) in enumerate(daftar_kontak.items(), start=1):
                print(f"{nomor_urut}. {nama} : {telepon}")

    elif pilihan == "4":
        print("Terima kasih telah menggunakan Katalog Kontak.")
        break

    else:
        print("Pilihan tidak valid, silakan masukkan angka 1-4.")