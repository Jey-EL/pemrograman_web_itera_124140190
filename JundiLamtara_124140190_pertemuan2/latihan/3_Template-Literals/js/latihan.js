// 1. Mencoba mengubah nilai const dan menangkap error-nya (try-catch)
export function latihanConstError() {
  const KAMPUS = "Institut Teknologi Sumatera";
  let pesanError = "";

  try {
    // Mencoba melakukan re-assignment pada variabel const
    KAMPUS = "Universitas Lain";
  } catch (error) {
    pesanError = `${error.name}: ${error.message}`;
  }

  return {
    nilaiAwal: KAMPUS,
    errorTertangkap: pesanError
  };
}

// 2. Membandingkan behavior var vs let di dalam dan luar block
export function latihanBlockScope() {
  var bahasaVar = "JavaScript (Luar Block)";
  let bahasaLet = "JavaScript (Luar Block)";

  if (true) {
    var bahasaVar = "Python (Diubah di Dalam Block - menimpa luar!)";
    let bahasaLet = "Python (Di Dalam Block - terisolasi)";
  }

  return {
    hasilVarDiLuarBlock: bahasaVar,
    hasilLetDiLuarBlock: bahasaLet
  };
}

// 3. Membuat arrow function dengan berbagai sintaks
export function latihanArrowFunctions() {
  // Tanpa parameter
  const salam = () => "Selamat mengerjakan praktikum ES6+!";

  // Satu parameter (tanpa tanda kurung)
  const kubik = n => n * n * n;

  // Dua parameter dengan implicit return
  const hitungDiskon = (harga, persen) => harga - (harga * persen / 100);

  // Mengembalikan object literal secara langsung (wajib pakai kurung biasa)
  const buatProfil = (nama, nim) => ({ nama, nim, status: "Aktif" });

  // Multi-baris dengan blok kurung kurawal & explicit return
  const cekKelulusan = (nilai) => {
    const keterangan = nilai >= 70 ? "Lulus" : "Remedial";
    return `Nilai ${nilai}: ${keterangan}`;
  };

  return {
    tanpaParam: salam(),
    satuParam: kubik(3),
    duaParamImplicit: hitungDiskon(100000, 15),
    returnObject: buatProfil("Jundi Lamtara", "124140190"),
    multiBaris: cekKelulusan(88)
  };
}

// 4. Menggunakan template literals untuk membuat HTML string dinamis
export function latihanTemplateHTML() {
  const mahasiswa = {
    nama: "Jundi Lamtara",
    nim: "124140190",
    prodi: "Teknik Informatika",
    mataKuliah: ["Pemrograman Web", "Basis Data", "Algoritma"]
  };

  const listMatkulHTML = mahasiswa.mataKuliah
    .map(mk => `<li class="text-sm text-gray-700">• ${mk}</li>`)
    .join("");

  return `
    <div class="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
      <h5 class="font-bold text-indigo-800 text-lg">${mahasiswa.nama}</h5>
      <p class="text-xs text-indigo-600 mb-2">NIM: ${mahasiswa.nim} | ${mahasiswa.prodi}</p>
      <p class="text-xs font-semibold text-gray-600 mb-1">Mata Kuliah Diambil:</p>
      <ul class="space-y-0.5">
        ${listMatkulHTML}
      </ul>
    </div>
  `;
}