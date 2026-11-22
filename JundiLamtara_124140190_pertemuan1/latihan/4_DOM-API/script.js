// === 4. DARK MODE TOGGLE DENGAN MANIPULASI CLASS CSS ===
const btnDarkMode = document.getElementById("btn-dark-mode");
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark-mode");
}

btnDarkMode.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
});

// === 1 & 2. FORM INPUT MAHASISWA + VALIDASI + LOCALSTORAGE ===
let dataMhs = JSON.parse(localStorage.getItem("dataMahasiswa")) || [];

function renderMahasiswa() {
  const listEl = document.getElementById("list-mahasiswa");
  listEl.innerHTML = "";
  dataMhs.forEach((mhs, index) => {
    listEl.innerHTML += `
      <li class="flex justify-between items-center p-2 border rounded">
        <span><strong>${mhs.nama}</strong> (${mhs.nim}) — ${mhs.jurusan}</span>
        <button onclick="hapusMhsStorage(${index})" class="text-red-500 text-sm hover:underline">Hapus</button>
      </li>
    `;
  });
}

window.hapusMhsStorage = function (index) {
  dataMhs.splice(index, 1);
  localStorage.setItem("dataMahasiswa", JSON.stringify(dataMhs));
  renderMahasiswa();
};

document.getElementById("form-mahasiswa").addEventListener("submit", function (e) {
  e.preventDefault();
  const nama = document.getElementById("mhs-nama").value.trim();
  const nim = document.getElementById("mhs-nim").value.trim();
  const jurusan = document.getElementById("mhs-jurusan").value.trim();

  // Reset pesan error
  document.getElementById("err-nama").innerText = "";
  document.getElementById("err-nim").innerText = "";
  document.getElementById("err-jurusan").innerText = "";

  let valid = true;
  if (nama.length < 3) {
    document.getElementById("err-nama").innerText = "Nama minimal 3 karakter.";
    valid = false;
  }
  if (!/^\d{9}$/.test(nim)) {
    document.getElementById("err-nim").innerText = "NIM harus berupa 9 digit angka.";
    valid = false;
  }
  if (!jurusan) {
    document.getElementById("err-jurusan").innerText = "Jurusan wajib diisi.";
    valid = false;
  }

  if (!valid) return;

  dataMhs.push({ nama, nim, jurusan });
  localStorage.setItem("dataMahasiswa", JSON.stringify(dataMhs));
  this.reset();
  renderMahasiswa();
});

renderMahasiswa();

// === 6. APLIKASI TODO LIST SEDERHANA (DOM & LOCALSTORAGE) ===
let todos = JSON.parse(localStorage.getItem("todoList")) || [];

function renderTodos() {
  const todoListEl = document.getElementById("todo-list");
  todoListEl.innerHTML = "";

  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className = "flex justify-between items-center p-2 border rounded";

    const span = document.createElement("span");
    span.innerText = todo.text;
    span.className = `cursor-pointer flex-1 ${todo.done ? "line-through text-gray-400" : ""}`;
    span.addEventListener("click", () => {
      todos[index].done = !todos[index].done;
      localStorage.setItem("todoList", JSON.stringify(todos));
      renderTodos();
    });

    const btnHapus = document.createElement("button");
    btnHapus.innerText = "Hapus";
    btnHapus.className = "bg-red-500 text-white px-2 py-1 rounded text-xs ml-2";
    btnHapus.addEventListener("click", () => {
      todos.splice(index, 1);
      localStorage.setItem("todoList", JSON.stringify(todos));
      renderTodos();
    });

    li.appendChild(span);
    li.appendChild(btnHapus);
    todoListEl.appendChild(li);
  });
}

document.getElementById("btn-add-todo").addEventListener("click", function () {
  const input = document.getElementById("todo-input");
  const text = input.value.trim();
  if (!text) return;

  todos.push({ text, done: false });
  localStorage.setItem("todoList", JSON.stringify(todos));
  input.value = "";
  renderTodos();
});

renderTodos();

// === 3 & 5. FETCH API + SEARCH TITLE + PAGINATION ===
let allPosts = [];
let filteredPosts = [];
let currentPage = 1;
const itemsPerPage = 5;

function renderPosts() {
  const apiPostsEl = document.getElementById("api-posts");
  const paginationEl = document.getElementById("pagination-controls");
  const pageInfoEl = document.getElementById("page-info");
  const btnPrev = document.getElementById("btn-prev");
  const btnNext = document.getElementById("btn-next");

  apiPostsEl.innerHTML = "";

  if (filteredPosts.length === 0) {
    apiPostsEl.innerHTML = `<p class="text-sm text-gray-500">Tidak ada post ditemukan.</p>`;
    paginationEl.classList.add("hidden");
    return;
  }

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  if (currentPage > totalPages) currentPage = totalPages;

  const start = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredPosts.slice(start, start + itemsPerPage);

  paginatedItems.forEach(post => {
    apiPostsEl.innerHTML += `
      <div class="p-3 border rounded">
        <h3 class="font-semibold text-blue-600">#${post.id} — ${post.title}</h3>
        <p class="text-sm mt-1">${post.body}</p>
      </div>
    `;
  });

  paginationEl.classList.remove("hidden");
  pageInfoEl.innerText = `Halaman ${currentPage} dari ${totalPages}`;
  btnPrev.disabled = currentPage === 1;
  btnNext.disabled = currentPage === totalPages;
}

document.getElementById("btn-load-api").addEventListener("click", async function () {
  const apiPostsEl = document.getElementById("api-posts");
  apiPostsEl.innerHTML = `<p class="text-sm">Memuat data...</p>`;

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    allPosts = await response.json();
    filteredPosts = [...allPosts];
    currentPage = 1;
    renderPosts();
  } catch (error) {
    apiPostsEl.innerHTML = `<p class="text-red-500 text-sm">Gagal mengambil data: ${error.message}</p>`;
  }
});

// Fitur search/filter berdasarkan title
document.getElementById("search-post").addEventListener("input", function (e) {
  const keyword = e.target.value.toLowerCase();
  filteredPosts = allPosts.filter(post => post.title.toLowerCase().includes(keyword));
  currentPage = 1;
  renderPosts();
});

// Tombol Previous dan Next
document.getElementById("btn-prev").addEventListener("click", function () {
  if (currentPage > 1) {
    currentPage--;
    renderPosts();
  }
});

document.getElementById("btn-next").addEventListener("click", function () {
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderPosts();
  }
});