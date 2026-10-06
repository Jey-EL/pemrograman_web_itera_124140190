const tombol = document.getElementById("toggle-dark");

tombol.addEventListener("click", function() {
    document.body.classList.toggle("dark");
});