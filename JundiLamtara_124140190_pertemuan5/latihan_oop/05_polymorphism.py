# ==============================================================================
# Berkas: 05_polymorphism.py
# Deskripsi: Penerapan Polymorphism, Duck Typing, Dispatch Loop & Operator Overloading
# ==============================================================================

# ------------------------------------------------------------------------------
# 1. HIERARKI CLASS PEMBAYARAN (Polymorphism via Inheritance)
# ------------------------------------------------------------------------------
class MetodePembayaran:
    def __init__(self, nama_metode: str):
        self.nama_metode = nama_metode

    def bayar(self, tagihan: float) -> bool:
        """Metode dasar yang akan dioverride oleh seluruh subclass"""
        raise NotImplementedError("Subclass wajib mengimplementasikan method bayar()!")


class TransferBank(MetodePembayaran):
    def __init__(self, nama_bank: str, nomor_va: str):
        super().__init__(f"Transfer Bank {nama_bank}")
        self.nomor_va = nomor_va

    def bayar(self, tagihan: float) -> bool:
        biaya_admin = 4000
        total = tagihan + biaya_admin
        print(f"[{self.nama_metode}] Tagihan: Rp {tagihan:,.2f} + Admin: Rp {biaya_admin:,} = Total: Rp {total:,.2f}")
        print(f" -> Silakan transfer tepat ke Virtual Account: {self.nomor_va}")
        return True


class EWallet(MetodePembayaran):
    def __init__(self, nama_provider: str, nomor_hp: str, saldo_wallet: float):
        super().__init__(f"E-Wallet {nama_provider}")
        self.nomor_hp = nomor_hp
        self.saldo_wallet = saldo_wallet

    def bayar(self, tagihan: float) -> bool:
        cashback = tagihan * 0.05  # Promo cashback 5%
        if self.saldo_wallet >= tagihan:
            self.saldo_wallet -= tagihan
            print(f"[{self.nama_metode}] Pembayaran Rp {tagihan:,.2f} BERHASIL via akun {self.nomor_hp}.")
            print(f" -> Selamat! Anda mendapatkan cashback Rp {cashback:,.2f}. Sisa saldo: Rp {self.saldo_wallet:,.2f}")
            return True
        else:
            print(f"[{self.nama_metode}] Gagal: Saldo e-wallet tidak cukup! (Saldo: Rp {self.saldo_wallet:,.2f})")
            return False


# ------------------------------------------------------------------------------
# 2. DUCK TYPING: Class Bebas Tanpa Inheritance dari MetodePembayaran
# Tetap valid secara polimorfik karena memiliki method bayar(tagihan)
# ------------------------------------------------------------------------------
class CryptoPayment:
    def __init__(self, wallet_address: str, crypto_symbol: str = "USDT"):
        self.wallet_address = wallet_address
        self.crypto_symbol = crypto_symbol

    def bayar(self, tagihan: float) -> bool:
        # Konversi kurs asumsi 1 USDT = Rp 16.000
        total_crypto = tagihan / 16000
        print(f"[Crypto Gateway] Mengonversi Rp {tagihan:,.2f} -> {total_crypto:.2f} {self.crypto_symbol}")
        print(f" -> Transaksi tercatat di blockchain untuk wallet {self.wallet_address[:10]}... Success!")
        return True


# ------------------------------------------------------------------------------
# 3. FUNGSI POLIMORFIK (Menerima Koleksi Objek Heterogen)
# ------------------------------------------------------------------------------
def proses_checkout_pesanan(daftar_opsi_bayar: list, total_belanja: float):
    print(f"\n================ PROSES CHECKOUT TAGIHAN Rp {total_belanja:,.2f} ================")
    for opsi in daftar_opsi_bayar:
        print(f"\nMemproses opsi: {getattr(opsi, 'nama_metode', type(opsi).__name__)}...")
        opsi.bayar(total_belanja)


# ------------------------------------------------------------------------------
# 4. OPERATOR OVERLOADING: Class Nilai Uang
# ------------------------------------------------------------------------------
class Dompet:
    def __init__(self, pemilik: str, saldo: float):
        self.pemilik = pemilik
        self.saldo = saldo

    # Operator Overloading '+': Menggabungkan dua objek Dompet
    def __add__(self, other):
        if isinstance(other, Dompet):
            return Dompet(f"{self.pemilik} & {other.pemilik}", self.saldo + other.saldo)
        elif isinstance(other, (int, float)):
            return Dompet(self.pemilik, self.saldo + other)
        return NotImplemented

    def __eq__(self, other):
        if isinstance(other, Dompet):
            return self.saldo == other.saldo
        return False

    def __str__(self):
        return f"Dompet({self.pemilik}): Rp {self.saldo:,.2f}"


# --- PROGRAM UTAMA ---
if __name__ == "__main__":
    # Inisialisasi berbagai objek metode pembayaran
    va_bca = TransferBank("BCA", "880121140001")
    gopay = EWallet("GoPay", "081234567890", saldo_wallet=500000)
    crypto = CryptoPayment("0x71C...b89A", "USDT")

    # Seluruh objek dimasukkan ke satu list heterogen
    channel_pembayaran = [va_bca, gopay, crypto]

    # Eksekusi fungsi polymorphic seragam
    proses_checkout_pesanan(channel_pembayaran, 320000)

    # Uji Operator Overloading
    print("\n--- Uji Operator Overloading Dompet ---")
    d1 = Dompet("Andi", 150000)
    d2 = Dompet("Budi", 250000)
    d_gabungan = d1 + d2  # Memanggil __add__
    print("Dompet 1 :", d1)
    print("Dompet 2 :", d2)
    print("Hasil d1 + d2 :", d_gabungan)
    print("Apakah saldo d1 == d2? :", d1 == d2)