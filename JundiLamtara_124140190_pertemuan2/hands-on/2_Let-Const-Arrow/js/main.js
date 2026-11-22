// File pengendali antarmuka web (DOM Controller)
import { demoVariables, demoArrowFunctions } from "./app.js";

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

// Event handler untuk tombol Run Demo
document.getElementById("runBtn")?.addEventListener("click", () => {
  const outputEl = document.getElementById("output");
  if (outputEl) outputEl.innerHTML = "";

  // Demo Let dan Const
  const varResults = demoVariables();
  addOutput(
    "1. Let dan Const",
    "var vs let/const dan block scope",
    `var (function scope): ${varResults.oldVar}
let (block scope): ${varResults.newLet}
const (immutable): ${varResults.PI}
const object (mutable content): ${JSON.stringify(varResults.user)}`
  );

  // Demo Arrow Functions
  const arrowResults = demoArrowFunctions();
  addOutput(
    "2. Arrow Functions",
    "Perbandingan fungsi reguler dan arrow functions",
    `Regular function: ${arrowResults.regularSum}
Arrow function: ${arrowResults.arrowSum}
Short arrow: ${arrowResults.shortArrowSum}
No params: ${arrowResults.sayHello}
Single param: ${arrowResults.square}`
  );
});

// Event handler untuk tombol pembersih layar
document.getElementById("clearBtn")?.addEventListener("click", () => {
  const outputEl = document.getElementById("output");
  if (outputEl) outputEl.innerHTML = "";
});