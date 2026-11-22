// 1. Implementasi fungsi groupBy menggunakan reduce()
export function groupBy(array, key) {
  return array.reduce((acc, item) => {
    const groupKey = item[key];
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(item);
    return acc;
  }, {});
}

// 2. Fungsi untuk menghitung rata-rata dari array of objects berdasarkan properti numerik
export function hitungRataRataObjek(items, property) {
  if (!items.length) return 0;
  const total = items.reduce((sum, item) => sum + (Number(item[property]) || 0), 0);
  return Number((total / items.length).toFixed(2));
}

// 3. Transform struktur array bersarang menjadi struktur flat
export function flattenNestedData() {
  const kelasPraktikum = [
    {
      kelas: "RB",
      kelompok: [
        { namaKelompok: "Kelompok 1", anggota: ["Jundi", "Syahrul", "Sahal"] },
        { namaKelompok: "Kelompok 2", anggota: ["Alfarabi", "Roy"] }
      ]
    },
    {
      kelas: "RA",
      kelompok: [
        { namaKelompok: "Kelompok 3", anggota: ["Dina", "Raka"] }
      ]
    }
  ];

  // Meratakan struktur bertingkat menjadi array objek datar per mahasiswa
  return kelasPraktikum.flatMap(({ kelas, kelompok }) =>
    kelompok.flatMap(({ namaKelompok, anggota }) =>
      anggota.map(nama => ({
        nama,
        kelas,
        kelompok: namaKelompok
      }))
    )
  );
}

// 4. Gabungkan filter, map, dan reduce untuk analisis data transaksi kompleks
export function analisisTransaksi() {
  const transaksi = [
    { id: "TRX01", kategori: "Elektronik", harga: 1500000, qty: 2, status: "selesai" },
    { id: "TRX02", kategori: "Aksesoris", harga: 250000, qty: 3, status: "selesai" },
    { id: "TRX03", kategori: "Elektronik", harga: 3000000, qty: 1, status: "batal" },
    { id: "TRX04", kategori: "Elektronik", harga: 850000, qty: 4, status: "selesai" },
    { id: "TRX05", kategori: "Furniture", harga: 1200000, qty: 1, status: "selesai" }
  ];

  // Hitung total pendapatan kategori "Elektronik" yang statusnya "selesai"
  const rincianElektronikSelesai = transaksi
    .filter(trx => trx.status === "selesai" && trx.kategori === "Elektronik")
    .map(trx => ({
      id: trx.id,
      subtotal: trx.harga * trx.qty
    }));

  const totalPendapatanElektronik = rincianElektronikSelesai.reduce(
    (total, item) => total + item.subtotal,
    0
  );

  return {
    rincianElektronikSelesai,
    totalPendapatanElektronik
  };
}