// js/latihan.js
// Latihan mandiri: groupBy, rata-rata, flatten, dan kombinasi filter-map-reduce

import { addOutput } from "./main.js";
import { sampleUsers, sampleProducts } from "./modules/data.js";
import { formatRupiah } from "./modules/utils.js";

// Latihan 1: Implementasi fungsi groupBy menggunakan reduce()
export const groupBy = (array, key) =>
  array.reduce((acc, item) => {
    const group = typeof key === "function" ? key(item) : item[key];
    acc[group] = acc[group] || [];
    acc[group].push(item);
    return acc;
  }, {});

export function latihanGroupBy() {
  const perRole = groupBy(sampleUsers, "role");
  const perStatus = groupBy(sampleUsers, (u) => (u.active ? "aktif" : "nonaktif"));
  const perKategori = groupBy(sampleProducts, "category");

  const namaSaja = (kelompok) =>
    Object.entries(kelompok)
      .map(([k, daftar]) => `  ${k}: [${daftar.map((d) => d.name).join(", ")}]`)
      .join("\n");

  const hasil = [
    `groupBy(sampleUsers, "role")`,
    namaSaja(perRole),
    ``,
    `groupBy(sampleUsers, u => u.active ? "aktif" : "nonaktif")`,
    namaSaja(perStatus),
    ``,
    `groupBy(sampleProducts, "category")`,
    namaSaja(perKategori)
  ].join("\n");

  addOutput(
    "1. Latihan: groupBy dengan reduce()",
    "Mengelompokkan array berdasarkan key atau fungsi",
    hasil
  );
}

// Latihan 2: Fungsi untuk menghitung rata-rata dari array of objects
export const rataRata = (array, key) =>
  array.length === 0
    ? 0
    : array.reduce((total, item) => total + item[key], 0) / array.length;

export function latihanRataRata() {
  const rataUmur = rataRata(sampleUsers, "age");
  const rataHarga = rataRata(sampleProducts, "price");

  // Rata-rata per kelompok (menggabungkan dengan groupBy)
  const perRole = Object.entries(groupBy(sampleUsers, "role"))
    .map(([role, daftar]) => `  ${role}: ${rataRata(daftar, "age").toFixed(1)} tahun`)
    .join("\n");

  const hasil = [
    `rataRata(sampleUsers, "age")      = ${rataUmur} tahun`,
    `rataRata(sampleProducts, "price") = ${formatRupiah(rataHarga)}`,
    `rataRata([], "age")               = ${rataRata([], "age")}  (aman untuk array kosong)`,
    ``,
    `Rata-rata umur per role:`,
    perRole
  ].join("\n");

  addOutput(
    "2. Latihan: Rata-rata Array of Objects",
    "reduce untuk menjumlah, lalu dibagi jumlah elemen",
    hasil
  );
}

// Latihan 3: Transform struktur array bersarang menjadi struktur flat
export function latihanFlatten() {
  // a. Array angka bersarang
  const bersarang = [1, [2, 3], [[4, 5], 6], [[[7]]]];

  // Flatten manual dengan reduce + rekursi
  const ratakan = (arr) =>
    arr.reduce(
      (acc, item) => acc.concat(Array.isArray(item) ? ratakan(item) : item),
      []
    );

  // b. Struktur bersarang: departemen -> karyawan
  const departemen = [
    { nama: "IT", karyawan: [{ name: "Ani", gaji: 8000000 }, { name: "Budi", gaji: 7000000 }] },
    { nama: "HR", karyawan: [{ name: "Citra", gaji: 6000000 }] },
    { nama: "Finance", karyawan: [{ name: "Dedi", gaji: 7500000 }, { name: "Eka", gaji: 6500000 }] }
  ];

  const semuaKaryawan = departemen.flatMap((d) =>
    d.karyawan.map((k) => ({ ...k, departemen: d.nama }))
  );

  const hasil = [
    `Input a: ${JSON.stringify(bersarang)}`,
    `flat()         = ${JSON.stringify(bersarang.flat())}`,
    `flat(Infinity) = ${JSON.stringify(bersarang.flat(Infinity))}`,
    `ratakan (reduce rekursif) = ${JSON.stringify(ratakan(bersarang))}`,
    ``,
    `Input b: 3 departemen, masing-masing berisi array karyawan`,
    `flatMap menjadi ${semuaKaryawan.length} baris:`,
    ...semuaKaryawan.map((k) => `  ${k.name.padEnd(6)} | ${k.departemen.padEnd(8)} | ${formatRupiah(k.gaji)}`)
  ].join("\n");

  addOutput(
    "3. Latihan: Flatten Array Bersarang",
    "flat, flatMap, dan reduce rekursif",
    hasil
  );
}

// Latihan 4: Gabungkan filter, map, dan reduce untuk analisis data kompleks
export function latihanAnalisis() {
  const transaksi = [
    { id: 1, produk: "Laptop", kategori: "tech", harga: 15000000, qty: 1, status: "selesai" },
    { id: 2, produk: "Keyboard", kategori: "tech", harga: 850000, qty: 3, status: "selesai" },
    { id: 3, produk: "Kursi", kategori: "furniture", harga: 2200000, qty: 2, status: "batal" },
    { id: 4, produk: "Mouse", kategori: "tech", harga: 300000, qty: 5, status: "selesai" },
    { id: 5, produk: "Meja", kategori: "furniture", harga: 1800000, qty: 1, status: "selesai" },
    { id: 6, produk: "Monitor", kategori: "tech", harga: 2500000, qty: 2, status: "batal" }
  ];

  // filter: hanya transaksi selesai, lalu map: hitung subtotal tiap transaksi
  const selesai = transaksi
    .filter((t) => t.status === "selesai")
    .map((t) => ({ ...t, subtotal: t.harga * t.qty }));

  // reduce: total pendapatan dan total per kategori
  const totalPendapatan = selesai.reduce((total, t) => total + t.subtotal, 0);
  const perKategori = selesai.reduce((acc, t) => {
    acc[t.kategori] = (acc[t.kategori] ?? 0) + t.subtotal;
    return acc;
  }, {});

  // reduce: produk terlaris (qty terbesar) di antara yang selesai
  const terlaris = selesai.reduce((a, b) => (b.qty > a.qty ? b : a));

  // filter + map: produk dengan subtotal di atas 1 juta
  const besar = selesai
    .filter((t) => t.subtotal > 1000000)
    .map((t) => `${t.produk} (${formatRupiah(t.subtotal)})`);

  // filter + reduce: nilai transaksi yang dibatalkan
  const nilaiBatal = transaksi
    .filter((t) => t.status === "batal")
    .reduce((total, t) => total + t.harga * t.qty, 0);

  const hasil = [
    `Total transaksi : ${transaksi.length} (selesai: ${selesai.length})`,
    `Total pendapatan: ${formatRupiah(totalPendapatan)}`,
    `Per kategori    :`,
    ...Object.entries(perKategori).map(([k, v]) => `  ${k.padEnd(10)} ${formatRupiah(v)}`),
    `Terlaris (qty)  : ${terlaris.produk} (${terlaris.qty} unit)`,
    `Subtotal > 1 jt : ${besar.join(", ")}`,
    `Nilai dibatalkan: ${formatRupiah(nilaiBatal)}`
  ].join("\n");

  addOutput(
    "4. Latihan: Analisis dengan filter + map + reduce",
    "Satu pipeline data dari transaksi mentah sampai ringkasan",
    hasil
  );
}

// Jalankan semua latihan
export function runLatihan() {
  latihanGroupBy();
  latihanRataRata();
  latihanFlatten();
  latihanAnalisis();
}