let mahasiswa = [];
let indexEdit = null;

const namaInput = document.getElementById("nama");
const nimInput = document.getElementById("nim");
const jurusanInput = document.getElementById("jurusan");
const nilaiInput = document.getElementById("nilai");
const tombolTambah = document.getElementById("tambah");
const pesanError = document.getElementById("pesan-error");
const daftarMahasiswa = document.getElementById("daftar-mahasiswa");

function escapeHtml(teks) {
    return String(teks)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

function kosongkanForm() {
    namaInput.value = "";
    nimInput.value = "";
    jurusanInput.value = "";
    nilaiInput.value = "";
}

// Mengembalikan pesan error, atau "" jika semua input valid
function validasiForm() {
    const nama = namaInput.value.trim();
    const nim = nimInput.value.trim();
    const jurusan = jurusanInput.value.trim();
    const nilaiTeks = nilaiInput.value.trim();

    if (nama === "" || nim === "" || jurusan === "" || nilaiTeks === "") {
        return "Semua kolom wajib diisi.";
    }

    if (!/^\d+$/.test(nim)) {
        return "NIM hanya boleh berisi angka.";
    }

    const nilai = Number(nilaiTeks);

    if (isNaN(nilai) || nilai < 0 || nilai > 100) {
        return "Nilai harus berupa angka antara 0 sampai 100.";
    }

    const nimSudahAda = mahasiswa.some(function(mhs, index) {
        return mhs.nim === nim && index !== indexEdit;
    });

    if (nimSudahAda) {
        return "NIM sudah terdaftar.";
    }

    return "";
}

function tampilkanMahasiswa() {
    daftarMahasiswa.innerHTML = "";

    mahasiswa.forEach(function(mhs, index) {
        daftarMahasiswa.innerHTML += `
            <tr>
                <td>${escapeHtml(mhs.nama)}</td>
                <td>${escapeHtml(mhs.nim)}</td>
                <td>${escapeHtml(mhs.jurusan)}</td>
                <td>${escapeHtml(mhs.nilai)}</td>
                <td>
                    <button onclick="editMahasiswa(${index})">Edit</button>
                    <button onclick="hapusMahasiswa(${index})">Hapus</button>
                </td>
            </tr>
        `;
    });
}

tombolTambah.addEventListener("click", function() {
    const pesan = validasiForm();

    if (pesan !== "") {
        pesanError.textContent = pesan;
        return;
    }

    pesanError.textContent = "";

    const dataMahasiswa = {
        nama: namaInput.value.trim(),
        nim: nimInput.value.trim(),
        jurusan: jurusanInput.value.trim(),
        nilai: Number(nilaiInput.value)
    };

    if (indexEdit === null) {
        // Create
        mahasiswa.push(dataMahasiswa);
    } else {
        // Update
        mahasiswa[indexEdit] = dataMahasiswa;
        indexEdit = null;
        tombolTambah.textContent = "Tambah";
    }

    tampilkanMahasiswa();
    kosongkanForm();
});

function editMahasiswa(index) {
    const mhs = mahasiswa[index];

    namaInput.value = mhs.nama;
    nimInput.value = mhs.nim;
    jurusanInput.value = mhs.jurusan;
    nilaiInput.value = mhs.nilai;

    indexEdit = index;
    tombolTambah.textContent = "Update";
    pesanError.textContent = "";
}

function hapusMahasiswa(index) {
    mahasiswa.splice(index, 1);

    if (indexEdit === index) {
        indexEdit = null;
        tombolTambah.textContent = "Tambah";
        kosongkanForm();
    } else if (indexEdit !== null && indexEdit > index) {
        indexEdit--;
    }

    tampilkanMahasiswa();
}
