// === BAGIAN 1: MANIPULASI DOM ===

const domOutput = document.getElementById("dom-output");
let itemCount = 0;

// Fungsi untuk menambahkan item
document.getElementById("btn-tambah-item").addEventListener("click", function() {
  itemCount++;
  const newItem = document.createElement("div");
  newItem.className = "p-2 mb-2 bg-gray-100 rounded";
  newItem.innerText = `Item ${itemCount}`;
  domOutput.appendChild(newItem);
});

// Fungsi untuk menghapus item
document.getElementById("btn-hapus-item").addEventListener("click", function() {
  if (domOutput.lastChild) {
    domOutput.removeChild(domOutput.lastChild);
    itemCount--;
  }
});

// Fungsi untuk mengubah warna background
document.getElementById("btn-ubah-warna").addEventListener("click", function() {
  const colors = ["bg-blue-100", "bg-green-100", "bg-yellow-100", "bg-pink-100"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  domOutput.className = `p-4 mb-3 ${randomColor} rounded`;
});

// === BAGIAN 2: FETCH API DAN ASYNC/AWAIT ===

document.getElementById("btn-fetch").addEventListener("click", async function() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    const apiOutput = document.getElementById("api-output");
    apiOutput.innerHTML = "<h3 class='font-bold mb-2'>Daftar Post:</h3>";

    data.slice(0, 5).forEach(post => {
      apiOutput.innerHTML += `
        <div class="p-3 mb-2 bg-gray-100 rounded">
          <h4 class="font-semibold">${post.title}</h4>
          <p class="text-sm">${post.body}</p>
        </div>
      `;
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    document.getElementById("api-output").innerHTML = `
      <div class="p-3 bg-red-100 text-red-800 rounded">
        Gagal mengambil data: ${error.message}
      </div>
    `;
  }
});