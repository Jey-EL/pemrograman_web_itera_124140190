// js/latihan.js
// Latihan mandiri: const, var vs let/const, arrow function, template literals

import { addOutput } from "./main.js";
import { sampleUsers, sampleProducts } from "./modules/data.js";
import { formatRupiah } from "./modules/utils.js";

// Helper: escape tag HTML supaya bisa ditampilkan sebagai teks
const escapeHtml = (str) =>
  str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Latihan 1: Ubah nilai const dan lihat error yang muncul
export function latihanConst() {
  const PI = 3.14159;
  const user = { name: "John" };
  const log = [];

  try {
    PI = 3.14; // error: const tidak bisa di-assign ulang
  } catch (e) {
    log.push(`PI = 3.14  -> ${e.name}: ${e.message}`);
  }

  user.name = "Jane"; // boleh: isi object bisa diubah
  user.age = 20;
  log.push(`user.name = "Jane"  -> OK: ${JSON.stringify(user)}`);

  try {
    user = { name: "Baru" }; // error: assign ulang referensi
  } catch (e) {
    log.push(`user = {...}  -> ${e.name}: ${e.message}`);
  }

  addOutput(
    "1. Latihan: Error pada const",
    "const tidak bisa di-assign ulang, tapi isi object bisa berubah",
    log.join("\n")
  );
}

// Latihan 2: Bandingkan perilaku var di dalam dan luar block
export function latihanVarScope() {
  const log = [];

  log.push(`Sebelum deklarasi, hoisted = ${hoisted}  (var di-hoist, nilainya undefined)`);
  var hoisted = "sudah terisi";

  if (true) {
    var a = "saya var";
    let b = "saya let";
    const c = "saya const";
    log.push(`[di dalam block] a=${a} | b=${b} | c=${c}`);
  }

  log.push(`[di luar block]  a=${a}  (var bocor keluar block)`);

  try {
    log.push(`[di luar block]  b=${b}`);
  } catch (e) {
    log.push(`[di luar block]  b  -> ${e.name}: ${e.message}`);
  }
  try {
    log.push(`[di luar block]  c=${c}`);
  } catch (e) {
    log.push(`[di luar block]  c  -> ${e.name}: ${e.message}`);
  }

  // Perbedaan di dalam loop
  const hasilVar = [];
  const hasilLet = [];
  for (var i = 0; i < 3; i++) hasilVar.push(() => i);
  for (let j = 0; j < 3; j++) hasilLet.push(() => j);
  log.push(`Closure loop var -> [${hasilVar.map((f) => f())}]  (semua 3)`);
  log.push(`Closure loop let -> [${hasilLet.map((f) => f())}]  (0,1,2 sesuai harapan)`);

  addOutput(
    "2. Latihan: var vs let/const di Block",
    "var function-scoped, let/const block-scoped",
    log.join("\n")
  );
}

// Latihan 3: Arrow function dengan berbagai sintaks
export function latihanArrow() {
  const regular = function (a, b) {
    return a + b;
  };
  const arrowBlock = (a, b) => {
    return a + b;
  };
  const arrowShort = (a, b) => a + b;
  const kuadrat = (x) => x * x;
  const salam = () => "Halo dari arrow function!";
  const buatUser = (nama, umur) => ({ nama, umur }); // object literal wajib dibungkus ()
  const sapa = (nama = "Tamu") => `Halo, ${nama}!`;
  const nilaiHuruf = (skor) => {
    if (skor >= 85) return "A";
    if (skor >= 70) return "B";
    return "C";
  };
  const angka = [1, 2, 3, 4, 5];
  const genap = angka.filter((n) => n % 2 === 0);
  const dikali2 = angka.map((n) => n * 2);

  const hasil = [
    `a. regular(2, 3)        = ${regular(2, 3)}`,
    `b. arrowBlock(2, 3)     = ${arrowBlock(2, 3)}`,
    `c. arrowShort(2, 3)     = ${arrowShort(2, 3)}`,
    `d. kuadrat(4)           = ${kuadrat(4)}`,
    `e. salam()              = ${salam()}`,
    `f. buatUser("Ani", 20)  = ${JSON.stringify(buatUser("Ani", 20))}`,
    `g. sapa() / sapa("Budi")= ${sapa()} / ${sapa("Budi")}`,
    `h. nilaiHuruf(90)       = ${nilaiHuruf(90)}`,
    `i. filter genap         = [${genap}]`,
    `   map dikali 2         = [${dikali2}]`
  ].join("\n");

  addOutput(
    "3. Latihan: Variasi Sintaks Arrow Function",
    "Dari block body sampai callback",
    hasil
  );
}

// Latihan 4: Template literals untuk membuat HTML string
export function latihanTemplateHTML() {
  const user = sampleUsers[0];

  const kartu = `
<div class="p-3 border rounded">
  <h3 class="font-bold">${user.name}</h3>
  <p>Role: ${user.role}</p>
  <p>Status: ${user.active ? "Aktif" : "Nonaktif"}</p>
</div>`.trim();

  const daftar = `
<ul class="list-disc pl-5">
${sampleProducts
  .map((p) => `  <li>${p.name} - <b>${formatRupiah(p.price)}</b></li>`)
  .join("\n")}
</ul>`.trim();

  // Tampilkan source HTML sebagai teks
  addOutput(
    "4. Latihan: Template Literals untuk HTML",
    "Source HTML string yang dihasilkan",
    escapeHtml(`${kartu}\n\n${daftar}`)
  );

  // Tampilkan hasil render HTML-nya
  const outputEl = document.getElementById("output");
  if (!outputEl) return;
  const preview = document.createElement("div");
  preview.className =
    "output-item bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-sm space-y-3";
  preview.innerHTML = `
    <p class="text-xs text-gray-500">Hasil render:</p>
    ${kartu}
    ${daftar}
  `;
  outputEl.appendChild(preview);
}

// Jalankan semua latihan
export function runLatihan() {
  latihanConst();
  latihanVarScope();
  latihanArrow();
  latihanTemplateHTML();
}