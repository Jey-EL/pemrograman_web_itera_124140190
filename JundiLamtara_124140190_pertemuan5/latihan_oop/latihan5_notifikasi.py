
# ==============================================================================
# Berkas: latihan_notifikasi.py
# Deskripsi: Implementasi Polymorphism pada Sistem Notifikasi Multi-Saluran
# ==============================================================================

# 1. CLASS NOTIFIKASI EMAIL
class NotifikasiEmail:
    def kirim(self, pesan: str, penerima: str):
        print(f"[EMAIL] Mengirim pesan ke {penerima}")
        print(f"Pesan: {pesan}")
        print("Status: Email berhasil dikirim!\n")


# 2. CLASS NOTIFIKASI SMS
class NotifikasiSMS:
    def kirim(self, pesan: str, penerima: str):
        print(f"[SMS] Mengirim pesan ke {penerima}")
        print(f"Pesan: {pesan}")
        print("Status: SMS berhasil dikirim!\n")


# 3. CLASS NOTIFIKASI WHATSAPP
class NotifikasiWhatsApp:
    def kirim(self, pesan: str, penerima: str):
        print(f"[WHATSAPP] Mengirim pesan ke {penerima}")
        print(f"Pesan: {pesan}")
        print("Status: WhatsApp berhasil dikirim!\n")


# 4. FUNGSI BROADCAST PENGUMUMAN
def broadcast_pengumuman(daftar_channel: list, pesan: str):
    print("=" * 55)
    print("       SISTEM BROADCAST PENGUMUMAN DARURAT")
    print("=" * 55)

    for channel, penerima in daftar_channel:
        channel.kirim(pesan, penerima)

    print("=" * 55)
    print("   PROSES BROADCAST SELESAI")
    print("=" * 55)


# PROGRAM UTAMA
if __name__ == "__main__":

    # Membuat objek masing-masing kanal notifikasi
    email = NotifikasiEmail()
    sms = NotifikasiSMS()
    whatsapp = NotifikasiWhatsApp()

    # Menggabungkan seluruh kanal dan penerimanya dalam satu list
    daftar_channel = [
        (email, "jundi@gmail.com"),
        (sms, "081234567890"),
        (whatsapp, "081298765432")
    ]

    # Pesan pengumuman darurat
    pesan_darurat = (
        "PERINGATAN DARURAT! "
        "Mohon segera menjauhi area kampus "
        "dan mengikuti arahan petugas."
    )

    # Menjalankan broadcast ke seluruh kanal
    broadcast_pengumuman(daftar_channel, pesan_darurat)
