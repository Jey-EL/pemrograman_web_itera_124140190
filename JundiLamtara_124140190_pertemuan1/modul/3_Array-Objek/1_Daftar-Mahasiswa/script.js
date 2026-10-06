const mahasiswa = [
    {
        nama: "Andi",
        nim: "124140001",
        jurusan: "Teknik Informatika",
        nilai: 85
    },
    {
        nama: "Budi",
        nim: "124140002",
        jurusan: "Teknik Informatika",
        nilai: 90
    },
    {
        nama: "Citra",
        nim: "124140003",
        jurusan: "Teknik Informatika",
        nilai: 78
    },
    {
        nama: "Dina",
        nim: "124140004",
        jurusan: "Teknik Informatika",
        nilai: 88
    },
    {
        nama: "Eko",
        nim: "124140005",
        jurusan: "Teknik Informatika",
        nilai: 92
    }
];

const tabel = document.getElementById("daftar-mahasiswa");

mahasiswa.forEach(function(mhs) {
    tabel.innerHTML += `
        <tr>
            <td>${mhs.nama}</td>
            <td>${mhs.nim}</td>
            <td>${mhs.jurusan}</td>
            <td>${mhs.nilai}</td>
        </tr>
    `;
});