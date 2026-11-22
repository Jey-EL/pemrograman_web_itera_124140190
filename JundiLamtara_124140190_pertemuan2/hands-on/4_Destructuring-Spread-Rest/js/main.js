import { demoDestructuring, demoSpreadRest } from './app.js';

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
  const destructuringResults = demoDestructuring();
  addOutput(
    "1. Destructuring",
    "Ekstraksi nilai dari objek dan array",
    `Object basic: ${JSON.stringify(destructuringResults.objectBasic)}
Object renamed: ${JSON.stringify(destructuringResults.objectRenamed)}
Object default: ${destructuringResults.objectDefault}
Object nested: ${JSON.stringify(destructuringResults.objectNested)}
Array basic: ${JSON.stringify(destructuringResults.arrayBasic)}
Array skipped: ${destructuringResults.arraySkipped}
Array with rest: ${JSON.stringify(destructuringResults.arrayRest)}
Swapped variables: ${JSON.stringify(destructuringResults.swapped)}`
  );

  const spreadRestResults = demoSpreadRest();
  addOutput(
    "2. Spread dan Rest Operators",
    "Penggunaan ... untuk array dan objek",
    `Spread in array: ${JSON.stringify(spreadRestResults.spreadArray)}
Copy array: ${JSON.stringify(spreadRestResults.copyArray)}
Merged arrays: ${JSON.stringify(spreadRestResults.mergedArrays)}
Spread in object: ${JSON.stringify(spreadRestResults.spreadObject)}
Rest in function (sum): ${spreadRestResults.restSum}
Rest with regular params: ${JSON.stringify(spreadRestResults.restProcess)}`
  );
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