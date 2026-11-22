// ==============================
// KONSTANTA
// ==============================

const KUNCI_STORAGE = "keranjang";

const MIN_NAMA = 3;                 // minimal karakter nama barang
const MIN_HARGA = 500;              // harga satuan minimal (Rp)
const MIN_QTY = 1;                  // qty minimal
const MIN_BELANJA_DISKON = 50000;   // total belanja minimal untuk diskon (Rp)
const PERSEN_DISKON = 10;           // besar diskon (%)


// ==============================
// AMBIL ELEMEN HTML
// ==============================

const formBarang = document.getElementById("form-barang");

const inputNama = document.getElementById("nama-barang");
const inputHarga = document.getElementById("harga");
const inputQty = document.getElementById("qty");

const errorNama = document.getElementById("error-nama");
const errorHarga = document.getElementById("error-harga");
const errorQty = document.getElementById("error-qty");

const tabelKeranjang = document.getElementById("keranjang");

const totalBelanja = document.getElementById("total-belanja");
const diskon = document.getElementById("diskon");
const totalAkhir = document.getElementById("total-akhir");

const inputBayar = document.getElementById("uang-bayar");
const kembalian = document.getElementById("kembalian");
const statusPembayaran = document.getElementById("status-pembayaran");

const tombolTransaksiBaru = document.getElementById("transaksi-baru");


// ==============================
// DATA KERANJANG (LOCAL STORAGE)
// ==============================

// Memuat keranjang dari localStorage (JSON.parse).
// Jika data kosong atau rusak, kembalikan keranjang kosong.
function muatKeranjang() {
    try {
        const data = JSON.parse(localStorage.getItem(KUNCI_STORAGE));

        if (!Array.isArray(data)) {
            return [];
        }

        return data.filter(function(item) {
            return item &&
                typeof item.nama === "string" &&
                Number.isFinite(item.harga) &&
                Number.isInteger(item.qty) &&
                item.qty >= MIN_QTY;
        });
    } catch (error) {
        return [];
    }
}

// Menyimpan keranjang ke localStorage (JSON.stringify).
function simpanKeranjang() {
    try {
        localStorage.setItem(KUNCI_STORAGE, JSON.stringify(keranjang));
    } catch (error) {
        console.error("Keranjang gagal disimpan:", error);
    }
}

let keranjang = muatKeranjang();


// ==============================
// FORMAT RUPIAH
// ==============================

function formatRupiah(angka) {
    return "Rp" + angka.toLocaleString("id-ID");
}


// ==============================
// PERHITUNGAN
// ==============================

// Subtotal satu baris = harga satuan x qty.
function hitungSubtotal(item) {
    return item.harga * item.qty;
}

// Menghitung total belanja, diskon, dan total akhir dari isi keranjang.
// Dipakai oleh tampilan ringkasan dan oleh perhitungan kembalian.
function hitungRingkasan() {
    let total = 0;

    keranjang.forEach(function(item) {
        total += hitungSubtotal(item);
    });

    let jumlahDiskon = 0;

    if (total >= MIN_BELANJA_DISKON) {
        jumlahDiskon = Math.round(total * PERSEN_DISKON / 100);
    }

    return {
        total: total,
        diskon: jumlahDiskon,
        totalAkhir: total - jumlahDiskon
    };
}

// Menghitung kembalian = uang bayar - total akhir, lalu menampilkan statusnya.
function hitungKembalian() {
    const ringkasan = hitungRingkasan();
    const teksBayar = inputBayar.value.trim();

    kembalian.textContent = formatRupiah(0);

    if (teksBayar === "") {
        tampilkanStatus("", "");
        return;
    }

    const uangBayar = Number(teksBayar);

    if (!Number.isFinite(uangBayar) || uangBayar < 0) {
        tampilkanStatus("Uang bayar tidak valid.", "gagal");
    } else if (keranjang.length === 0) {
        tampilkanStatus("Keranjang masih kosong.", "gagal");
    } else if (uangBayar < ringkasan.totalAkhir) {
        tampilkanStatus(
            "Uang belum mencukupi, kurang " +
            formatRupiah(ringkasan.totalAkhir - uangBayar) + ".",
            "gagal"
        );
    } else {
        kembalian.textContent = formatRupiah(uangBayar - ringkasan.totalAkhir);
        tampilkanStatus("Pembayaran mencukupi.", "sukses");
    }
}


// ==============================
// TAMPILAN
// ==============================

function tampilkanStatus(pesan, jenis) {
    statusPembayaran.textContent = pesan;
    statusPembayaran.className = jenis === "" ? "status" : "status " + jenis;
}

function buatSel(teks) {
    const td = document.createElement("td");
    td.textContent = teks;
    return td;
}

// Menampilkan isi keranjang ke tabel, lalu memperbarui ringkasan.
function tampilkanKeranjang() {
    tabelKeranjang.innerHTML = "";

    if (keranjang.length === 0) {
        const baris = document.createElement("tr");
        const sel = buatSel("Keranjang masih kosong. Tambahkan barang lewat form di atas.");

        sel.colSpan = 6;
        sel.className = "kosong";

        baris.appendChild(sel);
        tabelKeranjang.appendChild(baris);
    }

    keranjang.forEach(function(item, index) {
        const baris = document.createElement("tr");

        baris.appendChild(buatSel(index + 1));
        baris.appendChild(buatSel(item.nama));
        baris.appendChild(buatSel(formatRupiah(item.harga)));
        baris.appendChild(buatSel(item.qty));
        baris.appendChild(buatSel(formatRupiah(hitungSubtotal(item))));

        const selAksi = document.createElement("td");
        const tombolHapus = document.createElement("button");

        tombolHapus.type = "button";
        tombolHapus.className = "tombol-hapus";
        tombolHapus.textContent = "Hapus";
        tombolHapus.setAttribute("aria-label", "Hapus " + item.nama);
        tombolHapus.addEventListener("click", function() {
            hapusBarang(index);
        });

        selAksi.appendChild(tombolHapus);
        baris.appendChild(selAksi);

        tabelKeranjang.appendChild(baris);
    });

    tampilkanRingkasan();
}

// Menampilkan total belanja, diskon, total akhir, dan kembalian.
function tampilkanRingkasan() {
    const ringkasan = hitungRingkasan();

    totalBelanja.textContent = formatRupiah(ringkasan.total);
    diskon.textContent = formatRupiah(ringkasan.diskon);
    totalAkhir.textContent = formatRupiah(ringkasan.totalAkhir);

    hitungKembalian();
}


// ==============================
// VALIDASI FORM
// ==============================

// Memeriksa semua input. Mengembalikan pesan error per input
// (string kosong berarti input tersebut valid).
function validasiForm() {
    const pesan = { nama: "", harga: "", qty: "" };

    // Nama barang: wajib diisi, minimal 3 karakter
    const nama = inputNama.value.trim();

    if (nama === "") {
        pesan.nama = "Nama barang wajib diisi.";
    } else if (nama.length < MIN_NAMA) {
        pesan.nama = "Nama barang minimal " + MIN_NAMA + " karakter.";
    }

    // Harga satuan: angka, minimal Rp500
    const teksHarga = inputHarga.value.trim();
    const harga = Number(teksHarga);

    if (teksHarga === "" || !Number.isFinite(harga)) {
        pesan.harga = "Harga satuan wajib diisi dengan angka.";
    } else if (harga < MIN_HARGA) {
        pesan.harga = "Harga minimal " + formatRupiah(MIN_HARGA) + " (tidak boleh 0 atau negatif).";
    } else if (!Number.isInteger(harga)) {
        pesan.harga = "Harga harus berupa bilangan bulat.";
    }

    // Qty: angka bulat, minimal 1
    const teksQty = inputQty.value.trim();
    const jumlah = Number(teksQty);

    if (teksQty === "" || !Number.isFinite(jumlah)) {
        pesan.qty = "Qty wajib diisi dengan angka.";
    } else if (!Number.isInteger(jumlah)) {
        pesan.qty = "Qty harus berupa bilangan bulat.";
    } else if (jumlah < MIN_QTY) {
        pesan.qty = "Qty minimal " + MIN_QTY + ".";
    }

    return pesan;
}

// Menampilkan pesan error merah di bawah input yang salah.
function tampilkanError(pesan) {
    errorNama.textContent = pesan.nama;
    errorHarga.textContent = pesan.harga;
    errorQty.textContent = pesan.qty;

    inputNama.classList.toggle("invalid", pesan.nama !== "");
    inputHarga.classList.toggle("invalid", pesan.harga !== "");
    inputQty.classList.toggle("invalid", pesan.qty !== "");

    inputNama.setAttribute("aria-invalid", pesan.nama !== "");
    inputHarga.setAttribute("aria-invalid", pesan.harga !== "");
    inputQty.setAttribute("aria-invalid", pesan.qty !== "");
}

function bersihkanError() {
    tampilkanError({ nama: "", harga: "", qty: "" });
}


// ==============================
// TAMBAH BARANG
// ==============================

formBarang.addEventListener("submit", function(event) {
    event.preventDefault();

    const pesan = validasiForm();

    tampilkanError(pesan);

    // Jika ada input yang tidak valid, barang tidak masuk keranjang
    if (pesan.nama !== "" || pesan.harga !== "" || pesan.qty !== "") {
        if (pesan.nama !== "") {
            inputNama.focus();
        } else if (pesan.harga !== "") {
            inputHarga.focus();
        } else {
            inputQty.focus();
        }

        return;
    }

    keranjang.push({
        nama: inputNama.value.trim(),
        harga: Number(inputHarga.value),
        qty: Number(inputQty.value)
    });

    simpanKeranjang();
    tampilkanKeranjang();

    // Form otomatis di-reset setelah berhasil
    formBarang.reset();
    inputNama.focus();
});


// ==============================
// HAPUS BARANG
// ==============================

function hapusBarang(index) {
    keranjang.splice(index, 1);

    simpanKeranjang();
    tampilkanKeranjang();
}


// ==============================
// UANG BAYAR
// ==============================

inputBayar.addEventListener("input", hitungKembalian);


// ==============================
// TRANSAKSI BARU / RESET
// ==============================

tombolTransaksiBaru.addEventListener("click", function() {
    keranjang = [];

    try {
        localStorage.removeItem(KUNCI_STORAGE);
    } catch (error) {
        console.error("localStorage gagal dibersihkan:", error);
    }

    formBarang.reset();
    inputBayar.value = "";

    bersihkanError();
    tampilkanKeranjang();
});


// ==============================
// TAMPILKAN DATA SAAT HALAMAN DIBUKA
// ==============================

tampilkanKeranjang();
