import { demoDefaultParams, demoClasses, demoObjectLiterals } from './app.js';

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
  const defaultParamsResults = demoDefaultParams();
  addOutput(
    "1. Default Parameters",
    "Nilai default untuk parameter fungsi",
    `Old way: ${defaultParamsResults.oldWay}
Old way with params: ${defaultParamsResults.oldWayParams}
New way: ${defaultParamsResults.newWay}
New way with params: ${defaultParamsResults.newWayParams}
With expression: ${JSON.stringify(defaultParamsResults.withExpression)}
Using previous params: ${JSON.stringify(defaultParamsResults.usingPrevious)}`
  );

  const classesResults = demoClasses();
  addOutput(
    "2. Classes",
    "Penggunaan class dan inheritance",
    `User: ${classesResults.user.info}
User created: ${classesResults.user.createdDate}
Admin: ${classesResults.admin.info}
Admin created: ${classesResults.admin.createdDate}
Admin has access: ${classesResults.admin.hasAccess}
user instanceof User: ${classesResults.isUserInstance}
admin instanceof User: ${classesResults.isAdminInstance}`
  );

  const objectLiteralsResults = demoObjectLiterals();
  addOutput(
    "3. Enhanced Object Literals",
    "Penulisan objek yang lebih ringkas",
    `Property shorthand: ${JSON.stringify(objectLiteralsResults.newWay)}
Method shorthand: ${objectLiteralsResults.methods.new}
Computed properties: ${JSON.stringify(objectLiteralsResults.computedProps)}
Dynamic properties: ${JSON.stringify(objectLiteralsResults.dynamicProps)}`
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