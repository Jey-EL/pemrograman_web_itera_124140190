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

function cariNilaiTertinggi(data) {
    return data.reduce(function(tertinggi, mahasiswa) {
        return mahasiswa.nilai > tertinggi.nilai ? mahasiswa : tertinggi;
    });
}

const mahasiswaTertinggi = cariNilaiTertinggi(mahasiswa);

console.log("Mahasiswa dengan nilai tertinggi:");
console.log("Nama:", mahasiswaTertinggi.nama);
console.log("NIM:", mahasiswaTertinggi.nim);
console.log("Jurusan:", mahasiswaTertinggi.jurusan);
console.log("Nilai:", mahasiswaTertinggi.nilai);