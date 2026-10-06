let mahasiswa = JSON.parse(localStorage.getItem("mahasiswa")) || [];

const namaInput = document.getElementById("nama");
const nimInput = document.getElementById("nim");
const daftarMahasiswa = document.getElementById("daftar-mahasiswa");

function tampilkanMahasiswa() {
    daftarMahasiswa.innerHTML = "";

    mahasiswa.forEach(function(mhs) {
        daftarMahasiswa.innerHTML += `
            <li>${mhs.nama} - ${mhs.nim}</li>
        `;
    });
}

document.getElementById("simpan").addEventListener("click", function() {
    const data = {
        nama: namaInput.value,
        nim: nimInput.value
    };

    mahasiswa.push(data);

    localStorage.setItem("mahasiswa", JSON.stringify(mahasiswa));

    tampilkanMahasiswa();

    namaInput.value = "";
    nimInput.value = "";
});

tampilkanMahasiswa();