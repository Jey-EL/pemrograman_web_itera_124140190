// js/latihan.js
// Latihan mandiri: destructuring, rest parameter, spread, for...of

import { addOutput } from "./main.js";
import { sampleUsers } from "./modules/data.js";

// Latihan 1: Destructure object dengan nested properties minimal 3 level
export function latihanNested() {
  const response = {
    status: 200,
    data: {
      user: {
        profile: {
          name: "Alice",
          address: {
            city: "Jakarta",
            postalCode: "12345"
          }
        }
      }
    }
  };

  // 5 level: response -> data -> user -> profile -> address
  const {
    status,
    data: {
      user: {
        profile: {
          name,
          hobby = "coding", // nilai default (properti tidak ada)
          address: { city, postalCode }
        }
      }
    }
  } = response;

  const hasil = [
    `status     = ${status}`,
    `name       = ${name}`,
    `hobby      = ${hobby}  (nilai default)`,
    `city       = ${city}`,
    `postalCode = ${postalCode}`
  ].join("\n");

  addOutput(
    "1. Latihan: Nested Destructuring",
    "Mengambil nilai dari object bertingkat (5 level) dalam satu baris",
    hasil
  );
}

// Latihan 2: Function dengan rest parameters yang mengembalikan statistik
export function latihanStatistik() {
  const statistik = (...angka) => {
    if (angka.length === 0) return { min: null, max: null, average: null };
    return {
      min: Math.min(...angka),
      max: Math.max(...angka),
      average: angka.reduce((total, n) => total + n, 0) / angka.length
    };
  };

  const { min, max, average } = statistik(4, 8, 15, 16, 23, 42);
  const kosong = statistik();

  const hasil = [
    `statistik(4, 8, 15, 16, 23, 42)`,
    `  min     = ${min}`,
    `  max     = ${max}`,
    `  average = ${average.toFixed(2)}`,
    ``,
    `statistik() tanpa argumen -> ${JSON.stringify(kosong)}`
  ].join("\n");

  addOutput(
    "2. Latihan: Rest Parameter & Statistik",
    "...angka menampung semua argumen menjadi array",
    hasil
  );
}

// Latihan 3: Merge 3 object dengan spread dan override beberapa properti
export function latihanMergeObject() {
  const defaults = { tema: "terang", bahasa: "id", fontSize: 14 };
  const preferensiUser = { tema: "gelap", notifikasi: true };
  const override = { fontSize: 18, bahasa: "en" };

  // Properti yang sama ditimpa oleh object yang lebih belakang
  const hasilMerge = { ...defaults, ...preferensiUser, ...override };

  const hasil = [
    `defaults       : ${JSON.stringify(defaults)}`,
    `preferensiUser : ${JSON.stringify(preferensiUser)}`,
    `override       : ${JSON.stringify(override)}`,
    ``,
    `Hasil merge    : ${JSON.stringify(hasilMerge)}`,
    ``,
    `tema     -> "${hasilMerge.tema}" (ditimpa preferensiUser)`,
    `bahasa   -> "${hasilMerge.bahasa}" (ditimpa override)`,
    `fontSize -> ${hasilMerge.fontSize} (ditimpa override)`,
    `defaults asli tetap: ${JSON.stringify(defaults)}`
  ].join("\n");

  addOutput(
    "3. Latihan: Merge 3 Object dengan Spread",
    "Object di posisi belakang menimpa properti yang sama",
    hasil
  );
}

// Latihan 4: Destructuring di dalam loop for...of
export function latihanForOf() {
  const log = [];

  // a. Destructuring object langsung di for...of
  log.push("a. for (const { name, role } of sampleUsers)");
  for (const { name, role } of sampleUsers) {
    log.push(`   ${name} (${role})`);
  }

  // b. Destructuring array [index, item] dari .entries()
  log.push("\nb. for (const [i, { name, age }] of sampleUsers.entries())");
  for (const [i, { name, age }] of sampleUsers.entries()) {
    log.push(`   ${i + 1}. ${name}, ${age} tahun`);
  }

  // c. Destructuring [key, value] dari Object.entries()
  const stok = { laptop: 5, keyboard: 12, kursi: 3 };
  log.push("\nc. for (const [barang, jumlah] of Object.entries(stok))");
  for (const [barang, jumlah] of Object.entries(stok)) {
    log.push(`   ${barang}: ${jumlah} unit`);
  }

  addOutput(
    "4. Latihan: Destructuring di for...of",
    "Membongkar object dan array langsung di kepala loop",
    log.join("\n")
  );
}

// Jalankan semua latihan
export function runLatihan() {
  latihanNested();
  latihanStatistik();
  latihanMergeObject();
  latihanForOf();
}