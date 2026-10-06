let posts = [];
let halaman = 1;
const dataPerHalaman = 5;

async function ambilData() {
    const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
    );

    posts = await response.json();

    tampilkanPost();
}

function tampilkanPost() {
    const daftarPost = document.getElementById("daftar-post");

    daftarPost.innerHTML = "";

    const mulai = (halaman - 1) * dataPerHalaman;
    const selesai = mulai + dataPerHalaman;

    const dataHalaman = posts.slice(mulai, selesai);

    dataHalaman.forEach(function(post) {
        daftarPost.innerHTML += `
            <div>
                <h3>${post.title}</h3>
                <p>${post.body}</p>
                <hr>
            </div>
        `;
    });

    document.getElementById("halaman").innerText =
        "Halaman: " + halaman;
}

document.getElementById("previous").addEventListener("click", function() {
    if (halaman > 1) {
        halaman--;
        tampilkanPost();
    }
});

document.getElementById("next").addEventListener("click", function() {
    if (halaman < Math.ceil(posts.length / dataPerHalaman)) {
        halaman++;
        tampilkanPost();
    }
});

ambilData();