import { demoArrayMethods, demoAdvancedArrays } from './app.js';

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
  const arrayMethodsResults = demoArrayMethods();
  addOutput(
    "1. Modern Array Methods",
    "Higher-Order Functions pada array",
    `map: ${JSON.stringify(arrayMethodsResults.map)}
filter (evenNumbers): ${JSON.stringify(arrayMethodsResults.filter.evenNumbers)}
filter (activeUsers): ${arrayMethodsResults.filter.activeUsers}
find: ${JSON.stringify(arrayMethodsResults.find)}
some (hasAdult): ${arrayMethodsResults.some}
every (allAdults): ${arrayMethodsResults.every}
reduce (sum): ${arrayMethodsResults.reduce.sum}
reduce (oldest): ${arrayMethodsResults.reduce.oldest}
chaining (activeUsersNames): ${JSON.stringify(arrayMethodsResults.chaining.activeUsersNames)}
chaining (totalActiveAge): ${arrayMethodsResults.chaining.totalActiveAge}`
  );

  const advArraysResults = demoAdvancedArrays();
  addOutput(
    "2. Advanced Arrays",
    "Fitur array lanjutan",
    `Clone: ${JSON.stringify(advArraysResults.clone)}
Concat: ${JSON.stringify(advArraysResults.concat.combinedArrays)}
Array.from: ${JSON.stringify(advArraysResults.arrayFrom.withMapFn)}
Array.of: ${JSON.stringify(advArraysResults.arrayOf)}
flat: ${JSON.stringify(advArraysResults.flatAndFlatMap.flattened)}
deepFlat: ${JSON.stringify(advArraysResults.flatAndFlatMap.deepFlattened)}
flatMap: ${JSON.stringify(advArraysResults.flatAndFlatMap.flatMapped)}
includes: ${advArraysResults.includes}`
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