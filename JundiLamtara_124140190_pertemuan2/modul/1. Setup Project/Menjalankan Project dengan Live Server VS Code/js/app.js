// js/app.js
// Kumpulan fungsi demo fitur modern JavaScript (ES6+) yang diekspor

import { addOutput } from "./main.js";
import { sampleUsers, sampleProducts } from "./modules/data.js";
import { formatRupiah, capitalize } from "./modules/utils.js";

// Helper: ubah nilai apa pun jadi string yang rapi
const show = (value) =>
  typeof value === "string" ? value : JSON.stringify(value, null, 2);

// 1. let, const & template literals
export function demoVariablesAndTemplate() {
  const nama = "Jundi";
  let semester = 5;
  semester++;
  const pesan = `Halo ${capitalize(nama)}, kamu sekarang di semester ${semester}.`;
  addOutput("1. let, const & Template Literals", "Deklarasi variabel block-scoped", pesan);
}

// 2. Arrow function & default parameter
export function demoArrowAndDefault() {
  const sapa = (nama = "Tamu", sapaan = "Halo") => `${sapaan}, ${nama}!`;
  const hasil = [sapa(), sapa("Alice"), sapa("Bob", "Selamat pagi")].join("\n");
  addOutput("2. Arrow Function & Default Parameter", "Sintaks fungsi ringkas", hasil);
}

// 3. Destructuring
export function demoDestructuring() {
  const [first, , third] = sampleUsers;
  const { name, role, age = 0 } = first;
  const { name: thirdName } = third;
  const hasil = `Object: ${name} (${role}), umur ${age}\nArray: user ke-3 = ${thirdName}`;
  addOutput("3. Destructuring", "Mengurai array dan object", hasil);
}

// 4. Spread & rest operator
export function demoSpreadRest() {
  const sum = (...nums) => nums.reduce((acc, n) => acc + n, 0);
  const arr1 = [1, 2, 3];
  const arr2 = [...arr1, 4, 5];
  const user = { ...sampleUsers[0], active: false, city: "Bandar Lampung" };
  const hasil = [
    `Gabung array: [${arr2}]`,
    `sum(...arr2) = ${sum(...arr2)}`,
    `Copy + override object:\n${show(user)}`
  ].join("\n");
  addOutput("4. Spread & Rest Operator", "Menyebar dan mengumpulkan nilai", hasil);
}

// 5. Array methods: map, filter, reduce, find, some, every
export function demoArrayMethods() {
  const namaUser = sampleUsers.map((u) => u.name);
  const aktif = sampleUsers.filter((u) => u.active).map((u) => u.name);
  const rataUmur = sampleUsers.reduce((s, u) => s + u.age, 0) / sampleUsers.length;
  const admin = sampleUsers.find((u) => u.role === "admin");
  const adaNonaktif = sampleUsers.some((u) => !u.active);
  const semuaDewasa = sampleUsers.every((u) => u.age >= 18);

  const hasil = [
    `map    -> ${namaUser.join(", ")}`,
    `filter -> aktif: ${aktif.join(", ")}`,
    `reduce -> rata-rata umur: ${rataUmur}`,
    `find   -> admin pertama: ${admin.name}`,
    `some   -> ada yang nonaktif? ${adaNonaktif}`,
    `every  -> semua >= 18 tahun? ${semuaDewasa}`
  ].join("\n");
  addOutput("5. Array Methods", "map, filter, reduce, find, some, every", hasil);
}

// 6. Modules (data.js & utils.js)
export function demoModules() {
  const hasil = sampleProducts
    .map((p) => `${p.id} | ${capitalize(p.category).padEnd(10)} | ${p.name.padEnd(20)} | ${formatRupiah(p.price)}`)
    .join("\n");
  addOutput("6. ES Modules", "import/export dari data.js dan utils.js", hasil);
}

// 7. Optional chaining & nullish coalescing
export function demoOptionalChaining() {
  const user = { name: "John", profile: { address: { city: "Lampung" } } };
  const guest = { name: "Guest" };
  const hasil = [
    `user.profile?.address?.city  -> ${user.profile?.address?.city}`,
    `guest.profile?.address?.city -> ${guest.profile?.address?.city}`,
    `guest.score ?? 0             -> ${guest.score ?? 0}`,
    `0 ?? 100 (bukan null)        -> ${0 ?? 100}`,
    `0 || 100 (falsy)             -> ${0 || 100}`
  ].join("\n");
  addOutput("7. Optional Chaining & Nullish Coalescing", "Akses aman ke properti ?. dan ??", hasil);
}

// 8. Class, inheritance & private field
export function demoClass() {
  class Produk {
    #stok = 0; // private field
    constructor(nama, harga, stok) {
      this.nama = nama;
      this.harga = harga;
      this.#stok = stok;
    }
    get stok() {
      return this.#stok;
    }
    jual(jumlah) {
      if (jumlah > this.#stok) throw new Error("Stok tidak cukup");
      this.#stok -= jumlah;
      return this;
    }
    toString() {
      return `${this.nama} - ${formatRupiah(this.harga)} (stok: ${this.#stok})`;
    }
  }

  class ProdukDigital extends Produk {
    constructor(nama, harga) {
      super(nama, harga, Infinity);
    }
  }

  const laptop = new Produk("Laptop Gaming", 15000000, 5);
  laptop.jual(2);
  const ebook = new ProdukDigital("E-Book JavaScript", 99000);

  let error = "";
  try {
    laptop.jual(10);
  } catch (e) {
    error = e.message;
  }

  const hasil = `${laptop}\n${ebook}\nJual 10 laptop -> Error: ${error}`;
  addOutput("8. Class, Inheritance & Private Field", "OOP gaya ES6+", hasil);
}

// 9. Map & Set
export function demoMapSet() {
  const unik = new Set([1, 2, 2, 3, 3, 3]);
  const peran = new Map();
  sampleUsers.forEach((u) => peran.set(u.role, (peran.get(u.role) ?? 0) + 1));

  const hasil = [
    `Set unik dari [1,2,2,3,3,3] -> [${[...unik]}]`,
    `Map jumlah per role -> ${show(Object.fromEntries(peran))}`
  ].join("\n");
  addOutput("9. Map & Set", "Struktur data koleksi modern", hasil);
}

// 10. Promise & async/await
const tunda = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function ambilUser(id) {
  await tunda(500); // simulasi request jaringan
  const user = sampleUsers.find((u) => u.id === id);
  if (!user) throw new Error(`User dengan id ${id} tidak ditemukan`);
  return user;
}

export async function demoAsync() {
  const mulai = performance.now();
  let hasil = "";
  try {
    const [u1, u2] = await Promise.all([ambilUser(1), ambilUser(2)]);
    hasil += `Promise.all -> ${u1.name} & ${u2.name}\n`;
    await ambilUser(99);
  } catch (err) {
    hasil += `Error ditangkap -> ${err.message}\n`;
  } finally {
    const durasi = Math.round(performance.now() - mulai);
    hasil += `Selesai dalam ±${durasi} ms`;
  }
  addOutput("10. Promise & async/await", "Operasi asinkron + try/catch/finally", hasil);
}

// Fungsi utama: jalankan semua demo
export async function runAllDemos() {
  demoVariablesAndTemplate();
  demoArrowAndDefault();
  demoDestructuring();
  demoSpreadRest();
  demoArrayMethods();
  demoModules();
  demoOptionalChaining();
  demoClass();
  demoMapSet();
  await demoAsync();
}