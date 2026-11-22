import {
  demoProductInheritance,
  demoComputedDynamicKeys,
  buatKonfigurasiApp
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

  // 1 & 2. Product Inheritance + Getter & Setter
  const productRes = demoProductInheritance();
  addCard(
    "1 & 2. Class Product Inheritance + Getter & Setter",
    "DigitalProduct & PhysicalProduct mewarisi Product dengan validasi harga dan diskon",
    `Digital: ${productRes.digitalInfo}
Physical: ${productRes.physicalInfo}
ebook instanceof Product: ${productRes.isDigitalInstanceOfProduct}
keyboard instanceof Product: ${productRes.isPhysicalInstanceOfProduct}`
  );

  // 3. Computed Property Names
  const dynamicObj = demoComputedDynamicKeys("praktikan", 190);
  addCard(
    "3. Computed Property Names (Dynamic Keys)",
    "Membuat kunci properti objek secara dinamis dari variabel parameter",
    JSON.stringify(dynamicObj, null, 2)
  );

  // 4. Default Parameters + Destructuring
  const configDefault = buatKonfigurasiApp();
  const configCustom = buatKonfigurasiApp({
    appName: "Mini POS Praktikum",
    port: 3000,
    features: { darkMode: true }
  });
  addCard(
    "4. Default Parameters + Object Destructuring",
    "Perbandingan pemanggilan tanpa argumen vs argumen parsial",
    `Tanpa Argumen (Semua Default):
${JSON.stringify(configDefault, null, 2)}

Dengan Argumen Parsial:
${JSON.stringify(configCustom, null, 2)}`
  );
});

document.getElementById("clearBtn")?.addEventListener("click", () => {
  const outputEl = document.getElementById("output");
  if (outputEl) outputEl.innerHTML = "";
});