# ==============================================================================
# Berkas: latihan_storage.py
# Deskripsi: Penerapan Abstract Class dan Interface File Storage Service
# ==============================================================================

from abc import ABC, abstractmethod


# ------------------------------------------------------------------------------
# 1. ABSTRACT CLASS: FILE STORAGE
# ------------------------------------------------------------------------------
class FileStorage(ABC):

    @abstractmethod
    def upload_file(self, nama_file, data_bytes):
        """Mengunggah atau menyimpan file"""
        pass

    @abstractmethod
    def download_file(self, nama_file):
        """Mengunduh atau mengambil file"""
        pass


# ------------------------------------------------------------------------------
# 2. LOCAL DISK STORAGE
# ------------------------------------------------------------------------------
class LocalDiskStorage(FileStorage):

    def __init__(self):
        # Simulasi folder penyimpanan lokal menggunakan dictionary
        self.files = {}

    def upload_file(self, nama_file, data_bytes):
        self.files[nama_file] = data_bytes
        print(f"[Local Disk] File '{nama_file}' berhasil disimpan.")

    def download_file(self, nama_file):
        if nama_file in self.files:
            print(f"[Local Disk] File '{nama_file}' berhasil ditemukan.")
            return self.files[nama_file]
        else:
            print(f"[Local Disk] File '{nama_file}' tidak ditemukan.")
            return None


# ------------------------------------------------------------------------------
# 3. CLOUD STORAGE
# ------------------------------------------------------------------------------
class CloudStorage(FileStorage):

    def __init__(self):
        # Simulasi server cloud menggunakan dictionary
        self.cloud_files = {}

    def upload_file(self, nama_file, data_bytes):
        self.cloud_files[nama_file] = data_bytes
        print(f"[Cloud Storage] File '{nama_file}' berhasil diunggah ke server cloud.")

    def download_file(self, nama_file):
        if nama_file in self.cloud_files:
            print(f"[Cloud Storage] File '{nama_file}' berhasil diunduh dari server cloud.")
            return self.cloud_files[nama_file]
        else:
            print(f"[Cloud Storage] File '{nama_file}' tidak ditemukan di cloud.")
            return None


# ------------------------------------------------------------------------------
# 4. PROGRAM UTAMA
# ------------------------------------------------------------------------------
if __name__ == "__main__":

    print("=== 1. PENGUJIAN LOCAL DISK STORAGE ===")

    local_storage = LocalDiskStorage()

    data_file = b"Ini adalah isi dokumen praktikum Python."

    local_storage.upload_file("dokumen.txt", data_file)

    hasil_local = local_storage.download_file("dokumen.txt")

    if hasil_local:
        print("Isi file:", hasil_local.decode("utf-8"))

    print("\n=== 2. PENGUJIAN CLOUD STORAGE ===")

    cloud_storage = CloudStorage()

    cloud_storage.upload_file("laporan.pdf", b"Isi laporan praktikum")

    hasil_cloud = cloud_storage.download_file("laporan.pdf")

    if hasil_cloud:
        print("Isi file:", hasil_cloud.decode("utf-8"))

    print("\n=== 3. PENGUJIAN FILE TIDAK DITEMUKAN ===")

    local_storage.download_file("gambar.png")
    cloud_storage.download_file("video.mp4")
