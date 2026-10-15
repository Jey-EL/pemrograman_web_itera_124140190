// js/latihan.js
// Latihan mandiri: Async Programming (simulasi API, tanpa jaringan sungguhan)

import { addOutput } from "./main.js";

// ============================================================
// Helper bersama
// ============================================================
const tunda = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Data palsu yang berperan sebagai "database" server
const DATA_API = {
  "/users": [
    { id: 1, name: "Ani" },
    { id: 2, name: "Budi" },
    { id: 3, name: "Citra" }
  ],
  "/posts": [
    { id: 1, userId: 1, title: "Belajar JavaScript" },
    { id: 2, userId: 1, title: "Async Await" },
    { id: 3, userId: 2, title: "Promise.all" },
    { id: 4, userId: 3, title: "Array Methods" }
  ],
  "/comments": [
    { id: 1, postId: 1, text: "Mantap" },
    { id: 2, postId: 2, text: "Jelas sekali" },
    { id: 3, postId: 2, text: "Terima kasih" },
    { id: 4, postId: 4, text: "Keren" }
  ]
};

// Simulasi fetch: lambat, bisa gagal, endpoint tidak dikenal = 404
const fakeFetch = async (endpoint, { delay = 300, gagal = false } = {}) => {
  await tunda(delay);
  if (gagal) throw new Error(`500 Server Error pada ${endpoint}`);
  if (!(endpoint in DATA_API)) throw new Error(`404 Not Found: ${endpoint}`);
  return [...DATA_API[endpoint]];
};

// Membuat kartu kosong bergaya sama dengan addOutput, mengembalikan area isinya
const buatKartu = (judul, subjudul) => {
  const kartu = document.createElement("div");
  kartu.className =
    "output-item bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4 shadow-sm";
  const h = document.createElement("h4");
  h.className = "font-bold text-blue-600 text-base mb-1";
  h.textContent = judul;
  const p = document.createElement("p");
  p.className = "text-xs text-gray-500 mb-2";
  p.textContent = subjudul;
  const isi = document.createElement("div");
  kartu.appendChild(h);
  kartu.appendChild(p);
  kartu.appendChild(isi);
  document.getElementById("output")?.appendChild(kartu);
  return isi;
};

const durasi = (mulai) => Math.round(performance.now() - mulai);

// ============================================================
// Latihan 1: Fetch beberapa endpoint dan gabungkan hasilnya
// ============================================================
export async function latihanFetchGabung() {
  // Paralel (Promise.all)
  let mulai = performance.now();
  const [users, posts, comments] = await Promise.all([
    fakeFetch("/users"),
    fakeFetch("/posts"),
    fakeFetch("/comments")
  ]);
  const waktuParalel = durasi(mulai);

  // Berurutan (pembanding)
  mulai = performance.now();
  await fakeFetch("/users");
  await fakeFetch("/posts");
  await fakeFetch("/comments");
  const waktuBerurutan = durasi(mulai);

  // Gabungkan 3 sumber data menjadi satu struktur
  const gabungan = users.map((u) => {
    const postUser = posts.filter((p) => p.userId === u.id);
    const komentar = comments.filter((c) => postUser.some((p) => p.id === c.postId));
    return { name: u.name, jumlahPost: postUser.length, jumlahKomentar: komentar.length };
  });

  // Satu endpoint gagal: allSettled tetap mengembalikan yang berhasil
  const hasilSettled = await Promise.allSettled([
    fakeFetch("/users"),
    fakeFetch("/tidak-ada"),
    fakeFetch("/posts")
  ]);

  const hasil = [
    `Paralel (Promise.all)    : ±${waktuParalel} ms`,
    `Berurutan (await satu2)  : ±${waktuBerurutan} ms`,
    ``,
    `Hasil gabungan 3 endpoint:`,
    ...gabungan.map(
      (g) => `  ${g.name.padEnd(6)} | post: ${g.jumlahPost} | komentar: ${g.jumlahKomentar}`
    ),
    ``,
    `Promise.allSettled dengan 1 endpoint salah:`,
    ...hasilSettled.map((r, i) =>
      r.status === "fulfilled"
        ? `  [${i}] fulfilled -> ${r.value.length} data`
        : `  [${i}] rejected  -> ${r.reason.message}`
    )
  ].join("\n");

  addOutput(
    "1. Latihan: Fetch Beberapa Endpoint & Gabungkan",
    "Promise.all (paralel) vs berurutan, plus allSettled",
    hasil
  );
}

// ============================================================
// Latihan 2: Retry dengan exponential backoff
// ============================================================
export async function retry(fn, { maxPercobaan = 4, delayAwal = 100, faktor = 2 } = {}, onRetry) {
  for (let percobaan = 1; ; percobaan++) {
    try {
      return await fn(percobaan);
    } catch (err) {
      if (percobaan >= maxPercobaan) {
        throw new Error(`Gagal setelah ${percobaan} percobaan (${err.message})`);
      }
      const tunggu = delayAwal * faktor ** (percobaan - 1); // 100, 200, 400, ...
      onRetry?.(percobaan, tunggu, err);
      await tunda(tunggu);
    }
  }
}

export async function latihanRetry() {
  const log = [];

  // Skenario A: gagal 2 kali, berhasil di percobaan ke-3
  const takStabil = async (percobaan) => {
    if (percobaan < 3) throw new Error(`timeout (percobaan ${percobaan})`);
    return "data berhasil diambil";
  };

  try {
    const hasil = await retry(takStabil, { maxPercobaan: 4, delayAwal: 100 }, (n, tunggu, err) =>
      log.push(`  percobaan ${n} gagal: ${err.message} -> tunggu ${tunggu} ms`)
    );
    log.unshift("Skenario A (gagal 2x lalu berhasil):");
    log.push(`  SUKSES: ${hasil}`);
  } catch (err) {
    log.push(`  ERROR: ${err.message}`);
  }

  // Skenario B: selalu gagal, menyerah setelah 3 percobaan
  log.push("", "Skenario B (selalu gagal, maks 3 percobaan):");
  try {
    await retry(
      () => fakeFetch("/users", { delay: 20, gagal: true }),
      { maxPercobaan: 3, delayAwal: 100 },
      (n, tunggu) => log.push(`  percobaan ${n} gagal -> tunggu ${tunggu} ms`)
    );
  } catch (err) {
    log.push(`  MENYERAH: ${err.message}`);
  }

  addOutput(
    "2. Latihan: Retry dengan Exponential Backoff",
    "Jeda dua kali lipat di setiap percobaan ulang",
    log.join("\n")
  );
}

// ============================================================
// Latihan 3: Loading state untuk operasi async di UI
// ============================================================
export function latihanLoadingState() {
  const isi = buatKartu(
    "3. Latihan: Loading State di UI",
    "idle -> loading -> sukses / error (klik tombolnya)"
  );

  const baris = document.createElement("div");
  baris.className = "flex items-center gap-3 mb-3";

  const tombol = document.createElement("button");
  tombol.className =
    "bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded text-sm font-medium";
  tombol.textContent = "Ambil Data";

  const label = document.createElement("label");
  label.className = "text-sm text-gray-600";
  const cek = document.createElement("input");
  cek.type = "checkbox";
  const teksCek = document.createElement("span");
  teksCek.textContent = " Simulasi error";
  label.appendChild(cek);
  label.appendChild(teksCek);

  baris.appendChild(tombol);
  baris.appendChild(label);

  const status = document.createElement("div");
  status.className = "text-sm";
  status.textContent = "Status: idle (belum ada permintaan)";

  isi.appendChild(baris);
  isi.appendChild(status);

  const setStatus = (state, pesan) => {
    if (state === "loading") {
      status.className = "text-sm text-blue-600";
      status.innerHTML =
        '<span class="inline-block w-4 h-4 mr-2 align-middle border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></span>Memuat data...';
    } else {
      status.className =
        state === "sukses" ? "text-sm text-green-600" : "text-sm text-red-600";
      status.textContent = pesan;
    }
  };

  tombol.addEventListener("click", async () => {
    tombol.disabled = true; // cegah klik ganda saat loading
    tombol.textContent = "Memuat...";
    setStatus("loading");
    try {
      const users = await fakeFetch("/users", { delay: 1200, gagal: cek.checked });
      setStatus("sukses", `Sukses: ${users.map((u) => u.name).join(", ")}`);
    } catch (err) {
      setStatus("error", `Error: ${err.message}`);
    } finally {
      tombol.disabled = false; // selalu dikembalikan, sukses maupun gagal
      tombol.textContent = "Ambil Data";
    }
  });
}

// ============================================================
// Latihan 4: Error boundary untuk error async
// ============================================================
export class AsyncError extends Error {
  constructor(pesan, { konteks, sebab } = {}) {
    super(pesan, { cause: sebab });
    this.name = "AsyncError";
    this.konteks = konteks;
  }
}

// Pembungkus: error ditangkap, dicatat, dan diganti nilai fallback
export const denganBatas =
  (fn, { konteks = "operasi", fallback = null, onError } = {}) =>
  async (...args) => {
    try {
      return await fn(...args);
    } catch (err) {
      const galat = new AsyncError(`Gagal pada ${konteks}: ${err.message}`, {
        konteks,
        sebab: err
      });
      onError?.(galat);
      return typeof fallback === "function" ? fallback(galat) : fallback;
    }
  };

export async function latihanErrorBoundary() {
  const log = [];

  // Tanpa boundary: 1 endpoint gagal menjatuhkan semuanya
  try {
    await Promise.all([fakeFetch("/users"), fakeFetch("/posts", { gagal: true })]);
  } catch (err) {
    log.push(`Tanpa boundary : seluruh Promise.all gagal -> ${err.message}`);
  }

  // Dengan boundary: tiap bagian terisolasi
  const catat = (e) => log.push(`  onError -> ${e.name}: ${e.message} (cause: ${e.cause.message})`);
  const ambilUsers = denganBatas(() => fakeFetch("/users"), { konteks: "users", fallback: [], onError: catat });
  const ambilPosts = denganBatas(() => fakeFetch("/posts", { gagal: true }), { konteks: "posts", fallback: [], onError: catat });
  const ambilKomentar = denganBatas(() => fakeFetch("/comments"), { konteks: "komentar", fallback: [], onError: catat });

  log.push("", "Dengan boundary:");
  const [users, posts, komentar] = await Promise.all([ambilUsers(), ambilPosts(), ambilKomentar()]);

  log.push(
    `  users: ${users.length} data | posts: ${posts.length} data (fallback []) | komentar: ${komentar.length} data`,
    `  Halaman tetap tampil dengan data parsial, tidak crash.`
  );

  addOutput(
    "4. Latihan: Error Boundary untuk Async",
    "Error diisolasi per bagian dan diganti nilai fallback",
    log.join("\n")
  );
}

// ============================================================
// Latihan 5: Pagination dengan async/await
// ============================================================
const DATA_ARTIKEL = Array.from({ length: 23 }, (_, i) => ({
  id: i + 1,
  judul: `Artikel ${i + 1}`
}));

const ambilHalaman = async (halaman, ukuran = 5) => {
  await tunda(150);
  const totalHalaman = Math.ceil(DATA_ARTIKEL.length / ukuran);
  if (halaman < 1 || halaman > totalHalaman) {
    throw new RangeError(`Halaman ${halaman} di luar jangkauan (1-${totalHalaman})`);
  }
  const mulai = (halaman - 1) * ukuran;
  return {
    halaman,
    totalHalaman,
    total: DATA_ARTIKEL.length,
    data: DATA_ARTIKEL.slice(mulai, mulai + ukuran),
    adaBerikutnya: halaman < totalHalaman
  };
};

export async function latihanPagination() {
  const log = [];

  // a. Ambil halaman tertentu
  const h2 = await ambilHalaman(2);
  log.push(
    `a. Halaman ${h2.halaman}/${h2.totalHalaman} (total ${h2.total} artikel):`,
    `   ${h2.data.map((a) => a.judul).join(", ")}`
  );

  // b. Ambil SEMUA halaman secara berurutan (loop sampai habis)
  const semua = [];
  let halaman = 1;
  let adaBerikutnya = true;
  while (adaBerikutnya) {
    const hasil = await ambilHalaman(halaman);
    semua.push(...hasil.data);
    log.push(`b. memuat halaman ${halaman}: +${hasil.data.length} artikel`);
    adaBerikutnya = hasil.adaBerikutnya;
    halaman++;
  }
  log.push(`   Total terkumpul: ${semua.length} artikel`);

  // c. Halaman di luar jangkauan
  try {
    await ambilHalaman(99);
  } catch (err) {
    log.push(`c. ${err.name}: ${err.message}`);
  }

  addOutput(
    "5. Latihan: Pagination dengan async/await",
    "Mengambil data per halaman sampai habis",
    log.join("\n")
  );
}

// ============================================================
// Latihan 6: Debounced search dengan async API call
// ============================================================
export const debounce = (fn, ms) => {
  let timer;
  return (...args) => {
    clearTimeout(timer); // batalkan jadwal sebelumnya
    timer = setTimeout(() => fn(...args), ms);
  };
};

const DAFTAR_KOTA = [
  "Bandar Lampung", "Jakarta", "Bandung", "Surabaya", "Semarang", "Yogyakarta",
  "Medan", "Makassar", "Palembang", "Balikpapan", "Denpasar", "Malang"
];

const cariKota = async (kata) => {
  await tunda(300 + Math.random() * 400); // latensi acak 300-700 ms
  return DAFTAR_KOTA.filter((k) => k.toLowerCase().includes(kata.toLowerCase()));
};

export function latihanDebounceSearch() {
  const isi = buatKartu(
    "6. Latihan: Debounced Search",
    "Ketik nama kota (mis. 'ba'); API baru dipanggil 400 ms setelah berhenti mengetik"
  );

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Cari kota...";
  input.className = "w-full border border-gray-300 rounded px-3 py-2 text-sm mb-2";

  const statistik = document.createElement("div");
  statistik.className = "text-xs text-gray-500 mb-2";
  const hasil = document.createElement("div");
  hasil.className = "text-sm text-gray-700";
  hasil.textContent = "Mulai mengetik...";

  isi.appendChild(input);
  isi.appendChild(statistik);
  isi.appendChild(hasil);

  let ketikan = 0;
  let panggilanApi = 0;
  let idTerakhir = 0;
  const perbaruiStatistik = () => {
    statistik.textContent = `Ketikan: ${ketikan} | Panggilan API: ${panggilanApi}`;
  };
  perbaruiStatistik();

  const cari = debounce(async (kata) => {
    if (!kata.trim()) {
      hasil.textContent = "Mulai mengetik...";
      return;
    }
    panggilanApi++;
    perbaruiStatistik();
    const id = ++idTerakhir;
    hasil.textContent = "Mencari...";
    try {
      const data = await cariKota(kata);
      if (id !== idTerakhir) return; // abaikan respons usang (kalah cepat)
      hasil.textContent = data.length ? data.join(", ") : "Tidak ada hasil";
    } catch (err) {
      hasil.textContent = `Error: ${err.message}`;
    }
  }, 400);

  input.addEventListener("input", () => {
    ketikan++;
    perbaruiStatistik();
    cari(input.value);
  });
}

// ============================================================
// Jalankan semua latihan (berurutan agar kartu muncul sesuai nomor)
// ============================================================
export async function runLatihan() {
  await latihanFetchGabung();
  await latihanRetry();
  latihanLoadingState();
  await latihanErrorBoundary();
  await latihanPagination();
  latihanDebounceSearch();
}