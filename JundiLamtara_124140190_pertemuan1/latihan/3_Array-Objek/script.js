// 1. Array berisi minimal 5 objek mahasiswa
let daftarMahasiswa = [
  { nama: "Syahrul Afwan", nim: "124140096", jurusan: "Teknik Informatika", nilai: 88 },
  { nama: "Muhammad Alfarabi", nim: "124140197", jurusan: "Teknik Informatika", nilai: 82 },
  { nama: "Sahal Alvin Zairy", nim: "124140167", jurusan: "Teknik Informatika", nilai: 91 },
  { nama: "Jundi Lamtara", nim: "124140190", jurusan: "Teknik Informatika", nilai: 94 },
  { nama: "Roy Kurniawan", nim: "124140024", jurusan: "Teknik Informatika", nilai: 79 }
];

// 2. Fungsi mencari mahasiswa dengan nilai tertinggi menggunakan method array
function cariNilaiTertinggi(data) {
  if (data.length === 0) return null;
  return data.reduce((tertinggi, mhs) => (mhs.nilai > tertinggi.nilai ? mhs : tertinggi), data[0]);
}

// Fungsi menghitung rata-rata nilai
function hitungRataRata(data) {
  if (data.length === 0) return 0;
  const total = data.reduce((sum, mhs) => sum + mhs.nilai, 0);
  return total / data.length;
}

// Render tabel dan statistik (Read)
function renderTabel(dataTampil = daftarMahasiswa) {
  const tbody = document.getElementById("tabel-mahasiswa");
  const statBox = document.getElementById("statistik-box");
  tbody.innerHTML = "";

  const rataRata = hitungRataRata(daftarMahasiswa);
  const mhsTertinggi = cariNilaiTertinggi(daftarMahasiswa);

  statBox.innerHTML = `
    <p><strong>Rata-rata Nilai Kelas:</strong> ${rataRata.toFixed(2)}</p>
    <p><strong>Mahasiswa Nilai Tertinggi:</strong> ${mhsTertinggi ? `${mhsTertinggi.nama} (${mhsTertinggi.nim}) — Nilai: ${mhsTertinggi.nilai}` : "-"}</p>
  `;

  dataTampil.forEach((mhs, idx) => {
    const originalIndex = daftarMahasiswa.indexOf(mhs);
    tbody.innerHTML += `
      <tr class="hover:bg-gray-50">
        <td class="border p-2">${idx + 1}</td>
        <td class="border p-2">${mhs.nim}</td>
        <td class="border p-2">${mhs.nama}</td>
        <td class="border p-2">${mhs.jurusan}</td>
        <td class="border p-2 font-semibold">${mhs.nilai}</td>
        <td class="border p-2 space-x-1">
          <button onclick="editMahasiswa(${originalIndex})" class="bg-yellow-500 text-white px-2 py-1 rounded text-xs">Edit</button>
          <button onclick="hapusMahasiswa(${originalIndex})" class="bg-red-600 text-white px-2 py-1 rounded text-xs">Hapus</button>
        </td>
      </tr>
    `;
  });
}

// 3. Filter mahasiswa yang nilainya di atas rata-rata
document.getElementById("btn-diatas-rata").addEventListener("click", function () {
  const rataRata = hitungRataRata(daftarMahasiswa);
  const diAtasRata = daftarMahasiswa.filter(mhs => mhs.nilai > rataRata);
  renderTabel(diAtasRata);
});

document.getElementById("btn-semua").addEventListener("click", function () {
  renderTabel(daftarMahasiswa);
});

// 4. Fungsi mengurutkan mahasiswa berdasarkan nama (ascending / descending)
function urutkanNama(arah = "asc") {
  daftarMahasiswa.sort((a, b) => {
    return arah === "asc"
      ? a.nama.localeCompare(b.nama)
      : b.nama.localeCompare(a.nama);
  });
  renderTabel(daftarMahasiswa);
}

document.getElementById("btn-sort-asc").addEventListener("click", () => urutkanNama("asc"));
document.getElementById("btn-sort-desc").addEventListener("click", () => urutkanNama("desc"));

// 5. CRUD (Create, Update, Delete)
document.getElementById("btn-simpan").addEventListener("click", function () {
  const nama = document.getElementById("input-nama").value.trim();
  const nim = document.getElementById("input-nim").value.trim();
  const jurusan = document.getElementById("input-jurusan").value.trim();
  const nilai = parseFloat(document.getElementById("input-nilai").value);
  const editIndex = parseInt(document.getElementById("edit-index").value);

  if (!nama || !nim || !jurusan || isNaN(nilai) || nilai < 0 || nilai > 100) {
    alert("Harap isi semua field dengan benar (nilai 0 - 100)!");
    return;
  }

  if (editIndex === -1) {
    // Create
    daftarMahasiswa.push({ nama, nim, jurusan, nilai });
  } else {
    // Update
    daftarMahasiswa[editIndex] = { nama, nim, jurusan, nilai };
    resetForm();
  }

  document.getElementById("input-nama").value = "";
  document.getElementById("input-nim").value = "";
  document.getElementById("input-jurusan").value = "";
  document.getElementById("input-nilai").value = "";
  renderTabel();
});

window.editMahasiswa = function (index) {
  const mhs = daftarMahasiswa[index];
  document.getElementById("input-nama").value = mhs.nama;
  document.getElementById("input-nim").value = mhs.nim;
  document.getElementById("input-jurusan").value = mhs.jurusan;
  document.getElementById("input-nilai").value = mhs.nilai;
  document.getElementById("edit-index").value = index;
  document.getElementById("form-title").innerText = "Edit Data Mahasiswa";
  document.getElementById("btn-batal").classList.remove("hidden");
};

window.hapusMahasiswa = function (index) {
  if (confirm(`Yakin ingin menghapus ${daftarMahasiswa[index].nama}?`)) {
    daftarMahasiswa.splice(index, 1);
    renderTabel();
  }
};

function resetForm() {
  document.getElementById("edit-index").value = "-1";
  document.getElementById("form-title").innerText = "Tambah Data Mahasiswa";
  document.getElementById("btn-batal").classList.add("hidden");
  document.getElementById("input-nama").value = "";
  document.getElementById("input-nim").value = "";
  document.getElementById("input-jurusan").value = "";
  document.getElementById("input-nilai").value = "";
}

document.getElementById("btn-batal").addEventListener("click", resetForm);

// Tampilkan data awal
renderTabel();