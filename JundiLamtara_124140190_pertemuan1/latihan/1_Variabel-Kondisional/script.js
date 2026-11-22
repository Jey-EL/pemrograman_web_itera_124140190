const resultDiv = document.getElementById("result");

// 1. Variabel data diri menggunakan const dan let
const NAMA = "Jundi Lamtara";
let umur = 20;
let kotaAsal = "Bandar Lampung";

resultDiv.innerHTML += `
  <div class="p-4 border rounded">
    <h2 class="font-bold mb-2">1. Data Diri</h2>
    <p>Nama: <strong>${NAMA}</strong></p>
    <p>Umur: <strong>${umur} tahun</strong></p>
    <p>Kota Asal: <strong>${kotaAsal}</strong></p>
  </div>
`;

// 2. Program pengecekan kelulusan dengan syarat nilai >= 70
let nilaiUjian = 82;
let statusKelulusan = "";

if (nilaiUjian >= 70) {
  statusKelulusan = "Lulus";
} else {
  statusKelulusan = "Tidak Lulus";
}

resultDiv.innerHTML += `
  <div class="p-4 border rounded">
    <h2 class="font-bold mb-2">2. Pengecekan Kelulusan (Syarat >= 70)</h2>
    <p>Nilai Ujian: <strong>${nilaiUjian}</strong></p>
    <p>Status: <strong>${statusKelulusan}</strong></p>
  </div>
`;

// 3. Program pengecekan kategori umur (anak: <12, remaja: 12-17, dewasa: 18-59, lansia: >=60)
let kategoriUmur = "";

if (umur < 12) {
  kategoriUmur = "Anak";
} else if (umur >= 12 && umur <= 17) {
  kategoriUmur = "Remaja";
} else if (umur >= 18 && umur <= 59) {
  kategoriUmur = "Dewasa";
} else {
  kategoriUmur = "Lansia";
}

resultDiv.innerHTML += `
  <div class="p-4 border rounded">
    <h2 class="font-bold mb-2">3. Kategori Umur</h2>
    <p>Umur: <strong>${umur} tahun</strong></p>
    <p>Kategori: <strong>${kategoriUmur}</strong></p>
  </div>
`;

// 4. Switch-case konversi angka hari (1-7) ke nama hari dalam bahasa Inggris
let angkaHari = 5;
let hariInggris = "";

switch (angkaHari) {
  case 1:
    hariInggris = "Monday";
    break;
  case 2:
    hariInggris = "Tuesday";
    break;
  case 3:
    hariInggris = "Wednesday";
    break;
  case 4:
    hariInggris = "Thursday";
    break;
  case 5:
    hariInggris = "Friday";
    break;
  case 6:
    hariInggris = "Saturday";
    break;
  case 7:
    hariInggris = "Sunday";
    break;
  default:
    hariInggris = "Invalid Day";
}

resultDiv.innerHTML += `
  <div class="p-4 border rounded">
    <h2 class="font-bold mb-2">4. Konversi Hari (Bahasa Inggris)</h2>
    <p>Hari ke-${angkaHari}: <strong>${hariInggris}</strong></p>
  </div>
`;

// 5. Kalkulator sederhana grade nilai dengan ternary operator
let skor = 88;
let gradeTernary =
  skor >= 90 ? "A" :
  skor >= 80 ? "B" :
  skor >= 70 ? "C" :
  skor >= 60 ? "D" : "E";

resultDiv.innerHTML += `
  <div class="p-4 border rounded">
    <h2 class="font-bold mb-2">5. Kalkulator Grade (Ternary Operator)</h2>
    <p>Skor: <strong>${skor}</strong></p>
    <p>Grade: <strong>${gradeTernary}</strong></p>
  </div>
`;