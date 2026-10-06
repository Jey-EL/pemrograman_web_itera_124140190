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

const total = mahasiswa.reduce(function(sum, mhs) {
    return sum + mhs.nilai;
}, 0);

const rataRata = total / mahasiswa.length;

const diAtasRataRata = mahasiswa.filter(function(mhs) {
    return mhs.nilai > rataRata;
});

console.log("Rata-rata:", rataRata);
console.log("Mahasiswa dengan nilai di atas rata-rata:");

diAtasRataRata.forEach(function(mhs) {
    console.log(mhs.nama, "-", mhs.nilai);
});