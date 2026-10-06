let mahasiswa = [];
let indexEdit = null;

const namaInput = document.getElementById("nama");
const nimInput = document.getElementById("nim");
const jurusanInput = document.getElementById("jurusan");
const nilaiInput = document.getElementById("nilai");
const tombolTambah = document.getElementById("tambah");
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

// READ
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

// CREATE dan UPDATE (tergantung indexEdit)
tombolTambah.addEventListener("click", function() {
    const dataMahasiswa = {
        nama: namaInput.value,
        nim: nimInput.value,
        jurusan: jurusanInput.value,
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

// Isi form dengan data yang akan diubah
function editMahasiswa(index) {
    const mhs = mahasiswa[index];

    namaInput.value = mhs.nama;
    nimInput.value = mhs.nim;
    jurusanInput.value = mhs.jurusan;
    nilaiInput.value = mhs.nilai;

    indexEdit = index;
    tombolTambah.textContent = "Update";
}

// DELETE
function hapusMahasiswa(index) {
    mahasiswa.splice(index, 1);

    // Jaga agar mode edit tidak menunjuk data yang salah
    if (indexEdit === index) {
        indexEdit = null;
        tombolTambah.textContent = "Tambah";
        kosongkanForm();
    } else if (indexEdit !== null && indexEdit > index) {
        indexEdit--;
    }

    tampilkanMahasiswa();
}
