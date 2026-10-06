function hitungBMI(berat, tinggi) {
    let tinggiMeter = tinggi / 100;
    return berat / (tinggiMeter * tinggiMeter);
}

document.getElementById("hitung").addEventListener("click", function() {
    let berat = parseFloat(document.getElementById("berat").value);
    let tinggi = parseFloat(document.getElementById("tinggi").value);

    if (isNaN(berat) || isNaN(tinggi) || berat <= 0 || tinggi <= 0) {
        document.getElementById("hasil").innerText =
            "Masukkan berat dan tinggi yang valid.";
        return;
    }

    let bmi = hitungBMI(berat, tinggi);

    document.getElementById("hasil").innerText =
        "BMI Anda: " + bmi.toFixed(2);
});