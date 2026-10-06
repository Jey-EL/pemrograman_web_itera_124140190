function cekPrima(angka) {
    if (angka < 2) {
        return false;
    }

    for (let i = 2; i < angka; i++) {
        if (angka % i === 0) {
            return false;
        }
    }

    return true;
}

let angka = 7;

if (cekPrima(angka)) {
    console.log(angka + " adalah bilangan prima");
} else {
    console.log(angka + " bukan bilangan prima");
}