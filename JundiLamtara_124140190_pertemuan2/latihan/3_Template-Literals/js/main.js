import {
  latihanConstError,
  latihanBlockScope,
  latihanArrowFunctions,
  latihanTemplateHTML
} from "./latihan.js";

function addCard(title, subtitle, bodyHTML) {
  const outputEl = document.getElementById("output");
  if (!outputEl) return;

  const card = document.createElement("div");
  card.className = "bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm";
  card.innerHTML = `
    <h4 class="font-bold text-indigo-600 text-base mb-1">${title}</h4>
    <p class="text-xs text-gray-500 mb-3">${subtitle}</p>
    ${bodyHTML}
  `;
  outputEl.appendChild(card);
}

document.getElementById("runLatihanBtn")?.addEventListener("click", () => {
  const outputEl = document.getElementById("output");
  if (outputEl) outputEl.innerHTML = "";

  // 1. Const Error
  const resConst = latihanConstError();
  addCard(
    "1. Uji Re-assign Variabel const",
    "Menangkap TypeError saat nilai const coba diubah",
    `<pre class="bg-gray-800 text-red-400 p-3 rounded text-xs font-mono whitespace-pre-wrap">${JSON.stringify(resConst, null, 2)}</pre>`
  );

  // 2. Var vs Let Block Scope
  const resScope = latihanBlockScope();
  addCard(
    "2. Perbandingan var vs let di Dalam & Luar Block",
    "var bocor keluar blok { }, sedangkan let tetap terisolasi",
    `<pre class="bg-gray-800 text-green-400 p-3 rounded text-xs font-mono whitespace-pre-wrap">${JSON.stringify(resScope, null, 2)}</pre>`
  );

  // 3. Variasi Arrow Function
  const resArrow = latihanArrowFunctions();
  addCard(
    "3. Variasi Sintaks Arrow Function",
    "0 parameter, 1 parameter, implicit return, return object, dan multi-baris",
    `<pre class="bg-gray-800 text-green-400 p-3 rounded text-xs font-mono whitespace-pre-wrap">${JSON.stringify(resArrow, null, 2)}</pre>`
  );

  // 4. HTML String dengan Template Literals
  const htmlCard = latihanTemplateHTML();
  addCard(
    "4. Render HTML String dengan Template Literals",
    "Menyusun kartu profil dan daftar mata kuliah secara dinamis",
    htmlCard
  );
});

document.getElementById("clearBtn")?.addEventListener("click", () => {
  const outputEl = document.getElementById("output");
  if (outputEl) outputEl.innerHTML = "";
});