// js/main.js
// File pengendali antarmuka web (DOM Controller)

import { runAllDemos } from "./app.js";

// Fungsi helper untuk merender kartu hasil demo ke dalam antarmuka
export function addOutput(title, subtitle, content) {
  const outputEl = document.getElementById("output");
  if (!outputEl) return;
  const card = document.createElement("div");
  card.className = "output-item bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4 shadow-sm";
  card.innerHTML = `
    <h4 class="font-bold text-blue-600 text-base mb-1">${title}</h4>
    <p class="text-xs text-gray-500 mb-2">${subtitle}</p>
    <pre class="bg-gray-800 text-green-400 p-3 rounded text-xs font-mono whitespace-pre-wrap overflow-x-auto result">${content}</pre>
  `;
  outputEl.appendChild(card);
}

// Event handler untuk tombol menjalankan demo
document.getElementById("runBtn")?.addEventListener("click", async (e) => {
  const btn = e.currentTarget;
  btn.disabled = true;
  btn.textContent = "Running...";
  document.getElementById("output").innerHTML = ""; // bersihkan hasil lama
  try {
    await runAllDemos();
  } finally {
    btn.disabled = false;
    btn.textContent = "Run Demo";
  }
});

// Event handler untuk tombol pembersih layar
document.getElementById("clearBtn")?.addEventListener("click", () => {
  const outputEl = document.getElementById("output");
  if (outputEl) outputEl.innerHTML = "";
});