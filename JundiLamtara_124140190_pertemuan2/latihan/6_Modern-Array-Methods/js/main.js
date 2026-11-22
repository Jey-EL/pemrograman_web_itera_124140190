import {
  groupBy,
  hitungRataRataObjek,
  flattenNestedData,
  analisisTransaksi
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

  const dataMahasiswa = [
    { nama: "Jundi Lamtara", divisi: "Backend", nilai: 92 },
    { nama: "Syahrul Afwan", divisi: "PM", nilai: 90 },
    { nama: "Sahal Alvin Zairy", divisi: "Frontend", nilai: 94 },
    { nama: "Muhammad Alfarabi", divisi: "Tester", nilai: 88 },
    { nama: "Roy Kurniawan", divisi: "UI/UX", nilai: 91 }
  ];

  // 1. groupBy dengan reduce()
  const groupedByDivisi = groupBy(dataMahasiswa, "divisi");
  addCard(
    "1. Fungsi groupBy() dengan reduce()",
    "Mengelompokkan anggota tim berdasarkan properti 'divisi'",
    JSON.stringify(groupedByDivisi, null, 2)
  );

  // 2. Rata-rata dari Array of Objects
  const rataRataNilai = hitungRataRataObjek(dataMahasiswa, "nilai");
  addCard(
    "2. Rata-Rata Nilai dari Array of Objects",
    "Menghitung rata-rata properti 'nilai' menggunakan reduce()",
    `Jumlah Mahasiswa: ${dataMahasiswa.length}\nRata-rata Nilai: ${rataRataNilai}`
  );

  // 3. Flatten Struktur Array Bersarang
  const flatMahasiswa = flattenNestedData();
  addCard(
    "3. Transform Array Bersarang Menjadi Flat",
    "Menggunakan flatMap() dan map() untuk meratakan kelas -> kelompok -> anggota",
    JSON.stringify(flatMahasiswa, null, 2)
  );

  // 4. Chaining filter, map, dan reduce
  const hasilAnalisis = analisisTransaksi();
  addCard(
    "4. Analisis Kompleks (filter -> map -> reduce)",
    "Total pendapatan transaksi 'Elektronik' yang berstatus 'selesai'",
    JSON.stringify(hasilAnalisis, null, 2)
  );
});

document.getElementById("clearBtn")?.addEventListener("click", () => {
  const outputEl = document.getElementById("output");
  if (outputEl) outputEl.innerHTML = "";
});