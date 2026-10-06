let todos = [];

try {
    const tersimpan = JSON.parse(localStorage.getItem("todos"));
    todos = Array.isArray(tersimpan) ? tersimpan : [];
} catch (error) {
    todos = [];
}

const todoInput = document.getElementById("todo-input");
const tombolTambah = document.getElementById("tambah");
const pesanError = document.getElementById("pesan-error");
const daftarTodo = document.getElementById("daftar-todo");

function simpanTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function tampilkanTodos() {
    daftarTodo.innerHTML = "";

    if (todos.length === 0) {
        daftarTodo.innerHTML = "<li>Belum ada kegiatan.</li>";
        return;
    }

    todos.forEach(function(todo) {
        const li = document.createElement("li");

        if (todo.selesai) {
            li.classList.add("selesai");
        }

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.selesai;
        checkbox.addEventListener("change", function() {
            tandaiSelesai(todo.id);
        });

        const teks = document.createElement("span");
        teks.textContent = " " + todo.teks + " ";

        const tombolHapus = document.createElement("button");
        tombolHapus.textContent = "Hapus";
        tombolHapus.addEventListener("click", function() {
            hapusTodo(todo.id);
        });

        li.appendChild(checkbox);
        li.appendChild(teks);
        li.appendChild(tombolHapus);
        daftarTodo.appendChild(li);
    });
}

// Tambah
function tambahTodo() {
    const teks = todoInput.value.trim();

    if (teks === "") {
        pesanError.textContent = "Kegiatan tidak boleh kosong.";
        return;
    }

    pesanError.textContent = "";

    todos.push({
        id: Date.now(),
        teks: teks,
        selesai: false
    });

    simpanTodos();
    tampilkanTodos();
    todoInput.value = "";
}

// Tandai selesai / belum selesai
function tandaiSelesai(id) {
    todos = todos.map(function(todo) {
        if (todo.id === id) {
            return { id: todo.id, teks: todo.teks, selesai: !todo.selesai };
        }
        return todo;
    });

    simpanTodos();
    tampilkanTodos();
}

// Hapus
function hapusTodo(id) {
    todos = todos.filter(function(todo) {
        return todo.id !== id;
    });

    simpanTodos();
    tampilkanTodos();
}

tombolTambah.addEventListener("click", tambahTodo);

todoInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        tambahTodo();
    }
});

tampilkanTodos();
