import { demoPromises, demoAsyncAwait } from './app.js';

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

function runAllDemos() {
  // Demo Promises
  addOutput(
    "1. Promises",
    "Penanganan operasi asinkron dengan Promise (.then, .catch, Promise.all, Promise.race)",
    ""
  );
  const promiseOutput = demoPromises();
  document.querySelector('.output-item:last-child .result')?.appendChild(promiseOutput);

  // Demo Async/Await
  addOutput(
    "2. Async/Await",
    "Penanganan operasi asinkron sekuensial dan paralel dengan syntax yang lebih bersih",
    ""
  );
  const asyncOutput = demoAsyncAwait();
  document.querySelector('.output-item:last-child .result')?.appendChild(asyncOutput);
}

document.getElementById("runBtn")?.addEventListener("click", () => {
  const outputEl = document.getElementById("output");
  if (outputEl) outputEl.innerHTML = "";
  runAllDemos();
});

document.getElementById("clearBtn")?.addEventListener("click", () => {
  const outputEl = document.getElementById("output");
  if (outputEl) outputEl.innerHTML = "";
});