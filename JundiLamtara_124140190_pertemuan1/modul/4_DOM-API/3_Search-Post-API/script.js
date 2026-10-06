let posts = [];

const searchInput = document.getElementById("search");
const daftarPost = document.getElementById("daftar-post");

async function ambilData() {
    const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
    );

    posts = await response.json();

    tampilkanPost(posts);
}

function tampilkanPost(data) {
    daftarPost.innerHTML = "";

    data.forEach(function(post) {
        daftarPost.innerHTML += `
            <div>
                <h3>${post.title}</h3>
                <p>${post.body}</p>
                <hr>
            </div>
        `;
    });
}

searchInput.addEventListener("input", function() {
    const kataKunci = searchInput.value.toLowerCase();

    const hasilPencarian = posts.filter(function(post) {
        return post.title.toLowerCase().includes(kataKunci);
    });

    tampilkanPost(hasilPencarian);
});

ambilData();