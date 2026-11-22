import {
  latihanNestedDestructuring,
  hitungStatistik,
  latihanMergeObjects,
  latihanDestructuringForOf
} from "./latihan.js";

function addCard(title, subtitle, content) {
  const outputEl = document.getElementById("output");
  if (!outputEl) return;

  const card = document.createElement("div");
  card.className = "bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm";
  card.innerHTML = `
    <h4 class="font-bold text-indigo-600 text-base mb-1">${title}</h4>
    <p class="text-xs text-gray-500 mb-3">${subtitle}</p>
    <pre class="bg-gray-800 text-green-400 p-3 rounded text-xs font-mono whitespace-pre-wrap">${content}</pre>
  `;
  outputEl.appendChild(card);
}

document.getElementById("runLatihanBtn")?.addEventListener("click", () => {
  const outputEl = document.getElementById("output");
  if (outputEl) outputEl.innerHTML = "";

  // 1. Nested Destructuring 3+ level
  const nestedRes = latihanNestedDestructuring();
  addCard(
    "1. Nested Destructuring (Multi-Level)",
    "Ekstraksi properti dari kampus -> fakultas -> prodi -> akreditasi",
    JSON.stringify(nestedRes, null, 2)
  );

  // 2. Rest Parameter Statistik
  const statRes = hitungStatistik(78, 92, 85, 64, 96, 88);
  addCard(
    "2. Fungsi Statistik dengan Rest Parameter (...angka)",
    "Input: hitungStatistik(78, 92, 85, 64, 96, 88)",
    JSON.stringify(statRes, null, 2)
  );

  // 3. Merge 3 Objects
  const mergeRes = latihanMergeObjects();
  addCard(
    "3. Merge 3 Objek dengan Spread Operator & Override",
    "Menggabungkan akunDasar, profilAkademik, dan pengaturanUpdate",
    JSON.stringify(mergeRes, null, 2)
  );

  // 4. Destructuring dalam Loop for...of
  const loopRes = latihanDestructuringForOf();
  addCard(
    "4. Destructuring di Dalam Loop for...of",
    "Membongkar nama, nim, dan nested nilai.web tiap iterasi",
    loopRes.join("\n")
  );
});

document.getElementById("clearBtn")?.addEventListener("click", () => {
  const outputEl = document.getElementById("output");
  if (outputEl) outputEl.innerHTML = "";
});