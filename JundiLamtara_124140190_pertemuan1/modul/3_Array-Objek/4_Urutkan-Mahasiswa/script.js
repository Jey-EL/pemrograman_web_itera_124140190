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

function urutkanMahasiswa(data, urutan) {
    return [...data].sort(function(a, b) {
        if (urutan === "ascending") {
            return a.nama.localeCompare(b.nama);
        } else {
            return b.nama.localeCompare(a.nama);
        }
    });
}

console.log("Ascending:");

const ascending = urutkanMahasiswa(mahasiswa, "ascending");

ascending.forEach(function(mhs) {
    console.log(mhs.nama);
});

console.log("Descending:");

const descending = urutkanMahasiswa(mahasiswa, "descending");

descending.forEach(function(mhs) {
    console.log(mhs.nama);
});