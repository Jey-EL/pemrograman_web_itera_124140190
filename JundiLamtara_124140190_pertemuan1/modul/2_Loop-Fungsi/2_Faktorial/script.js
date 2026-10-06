function faktorial(angka) {
    let hasil = 1;

    for (let i = 1; i <= angka; i++) {
        hasil *= i;
    }

    return hasil;
}

let angka = 5;

console.log("Faktorial dari", angka, "=", faktorial(angka));