const resultDiv = document.getElementById("result");

// === 1. TABEL PERKALIAN 1 - 10 ===
const angkaPerkalian = 7;
let listPerkalian = "";

for (let i = 1; i <= 10; i++) {
  listPerkalian += `<li>${angkaPerkalian} × ${i} = <strong>${angkaPerkalian * i}</strong></li>`;
}

resultDiv.innerHTML += `
  <div class="p-4 border rounded">
    <h2 class="text-lg font-bold mb-2">1. Tabel Perkalian ${angkaPerkalian} (1 - 10)</h2>
    <ul class="list-disc pl-5">${listPerkalian}</ul>
  </div>
`;

// === 2. FUNGSI FAKTORIAL ===
function hitungFaktorial(n) {
  if (n < 0) return "Tidak terdefinisi";
  if (n === 0 || n === 1) return 1;
  let hasil = 1;
  for (let i = 2; i <= n; i++) {
    hasil *= i;
  }
  return hasil;
}

const angkaFaktorial = 5;
resultDiv.innerHTML += `
  <div class="p-4 border rounded">
    <h2 class="text-lg font-bold mb-2">2. Fungsi Faktorial</h2>
    <p>Faktorial dari <strong>${angkaFaktorial}!</strong> adalah <strong>${hitungFaktorial(angkaFaktorial)}</strong></p>
  </div>
`;

// === 3. FUNGSI CEK BILANGAN PRIMA ===
function cekBilanganPrima(angka) {
  if (angka <= 1) return false;
  for (let i = 2; i <= Math.sqrt(angka); i++) {
    if (angka % i === 0) return false;
  }
  return true;
}

const ujiPrima1 = 17;
const ujiPrima2 = 20;
resultDiv.innerHTML += `
  <div class="p-4 border rounded">
    <h2 class="text-lg font-bold mb-2">3. Cek Bilangan Prima</h2>
    <p>Apakah <strong>${ujiPrima1}</strong> bilangan prima? <strong>${cekBilanganPrima(ujiPrima1) ? "Ya, Prima" : "Bukan Prima"}</strong></p>
    <p>Apakah <strong>${ujiPrima2}</strong> bilangan prima? <strong>${cekBilanganPrima(ujiPrima2) ? "Ya, Prima" : "Bukan Prima"}</strong></p>
  </div>
`;

// === 4. KALKULATOR BMI DENGAN FUNGSI & EVENT HANDLER ===
function hitungBMI(beratKg, tinggiCm) {
  const tinggiMeter = tinggiCm / 100;
  const bmi = beratKg / (tinggiMeter * tinggiMeter);
  let kategori = "";

  if (bmi < 18.5) {
    kategori = "Kurus (Underweight)";
  } else if (bmi < 25) {
    kategori = "Normal (Ideal)";
  } else if (bmi < 30) {
    kategori = "Gemuk (Overweight)";
  } else {
    kategori = "Obesitas";
  }

  return { nilai: bmi.toFixed(2), kategori };
}

document.getElementById("btn-hitung-bmi").addEventListener("click", function () {
  const berat = parseFloat(document.getElementById("berat-badan").value);
  const tinggi = parseFloat(document.getElementById("tinggi-badan").value);
  const outputBMI = document.getElementById("hasil-bmi");

  if (isNaN(berat) || isNaN(tinggi) || berat <= 0 || tinggi <= 0) {
    outputBMI.innerHTML = `<span class="text-red-600">Masukkan berat dan tinggi badan yang valid!</span>`;
    return;
  }

  const hasil = hitungBMI(berat, tinggi);
  outputBMI.innerHTML = `<span class="text-green-700">BMI Anda: ${hasil.nilai} — Kategori: ${hasil.kategori}</span>`;
});

// === 5. PROGRAM FIZZBUZZ (1 - 100) ===
const fizzBuzzDiv = document.getElementById("fizzbuzz-output");

for (let i = 1; i <= 100; i++) {
  let teks = "";
  let warna = "bg-gray-100 text-gray-800";

  if (i % 3 === 0 && i % 5 === 0) {
    teks = "FizzBuzz";
    warna = "bg-purple-200 text-purple-900 font-bold";
  } else if (i % 3 === 0) {
    teks = "Fizz";
    warna = "bg-blue-200 text-blue-900 font-semibold";
  } else if (i % 5 === 0) {
    teks = "Buzz";
    warna = "bg-green-200 text-green-900 font-semibold";
  } else {
    teks = i;
  }

  fizzBuzzDiv.innerHTML += `<span class="px-2 py-1 rounded ${warna}">${teks}</span>`;
}