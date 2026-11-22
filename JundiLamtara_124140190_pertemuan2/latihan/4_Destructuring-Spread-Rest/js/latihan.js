// 1. Destructure object dengan nested properties minimal 3 level
export function latihanNestedDestructuring() {
  const kampusData = {
    nama: "ITERA",
    fakultas: {
      namaFakultas: "FTI",
      prodi: {
        kodeProdi: "IF",
        namaProdi: "Teknik Informatika",
        akreditasi: {
          peringkat: "Baik Sekali",
          tahun: 2026
        }
      }
    }
  };

  // Ekstraksi langsung hingga level ke-4
  const {
    nama: kampus,
    fakultas: {
      prodi: {
        namaProdi,
        akreditasi: { peringkat, tahun }
      }
    }
  } = kampusData;

  return {
    kampus,
    namaProdi,
    peringkat,
    tahun
  };
}

// 2. Function dengan rest parameters yang mengembalikan statistik (min, max, average)
export function hitungStatistik(...angka) {
  if (angka.length === 0) {
    return { min: 0, max: 0, average: 0 };
  }

  const min = Math.min(...angka);
  const max = Math.max(...angka);
  const total = angka.reduce((acc, val) => acc + val, 0);
  const average = Number((total / angka.length).toFixed(2));

  return {
    jumlahData: angka.length,
    min,
    max,
    average
  };
}

// 3. Merge 3 objects dengan spread operator dan override beberapa properties
export function latihanMergeObjects() {
  const akunDasar = {
    username: "jundi190",
    email: "jundi@student.itera.ac.id",
    role: "guest",
    aktif: false
  };

  const profilAkademik = {
    nim: "124140190",
    prodi: "Teknik Informatika",
    semester: 5
  };

  const pengaturanUpdate = {
    role: "mahasiswa",   // Override dari akunDasar
    aktif: true,         // Override dari akunDasar
    tema: "dark"
  };

  const profilLengkap = {
    ...akunDasar,
    ...profilAkademik,
    ...pengaturanUpdate
  };

  return profilLengkap;
}

// 4. Menggunakan destructuring dalam loop for...of
export function latihanDestructuringForOf() {
  const daftarMahasiswa = [
    { nama: "Jundi Lamtara", nim: "124140190", nilai: { web: 92 } },
    { nama: "Syahrul Afwan", nim: "124140096", nilai: { web: 89 } },
    { nama: "Sahal Alvin Zairy", nim: "124140167", nilai: { web: 94 } }
  ];

  const hasilRingkasan = [];

  for (const { nama, nim, nilai: { web } } of daftarMahasiswa) {
    hasilRingkasan.push(`${nama} (${nim}) -> Nilai Web: ${web}`);
  }

  return hasilRingkasan;
}