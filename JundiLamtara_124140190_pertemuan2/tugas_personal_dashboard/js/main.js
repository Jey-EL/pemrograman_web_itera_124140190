import { DashboardApp } from "./models/DashboardApp.js";

const app = new DashboardApp();

// Referensi elemen DOM
const taskForm = document.getElementById("taskForm");
const formTitle = document.getElementById("formTitle");
const editTaskIdInput = document.getElementById("editTaskId");
const taskTitleInput = document.getElementById("taskTitle");
const taskCourseInput = document.getElementById("taskCourse");
const taskCategoryInput = document.getElementById("taskCategory");
const taskDeadlineInput = document.getElementById("taskDeadline");
const taskPriorityInput = document.getElementById("taskPriority");
const taskNoteInput = document.getElementById("taskNote");
const submitBtn = document.getElementById("submitBtn");
const cancelEditBtn = document.getElementById("cancelEditBtn");

const taskListContainer = document.getElementById("taskListContainer");
const statsContainer = document.getElementById("statsContainer");
const filterStatusSelect = document.getElementById("filterStatus");
const filterCategorySelect = document.getElementById("filterCategory");
const resetSampleBtn = document.getElementById("resetSampleBtn");

const weatherWidget = document.getElementById("weatherWidget");
const quoteWidget = document.getElementById("quoteWidget");

// Arrow Function 1: Konversi kode cuaca WMO Open-Meteo ke deskripsi bahasa Indonesia
const describeWeatherCode = (code) => {
  if (code === 0) return "Cerah";
  if ([1, 2, 3].includes(code)) return "Cerah Berawan";
  if ([45, 48].includes(code)) return "Berkabut";
  if ([51, 53, 55, 61, 63, 65].includes(code)) return "Hujan Ringan - Sedang";
  if ([80, 81, 82].includes(code)) return "Hujan Lokal";
  if ([95, 96, 99].includes(code)) return "Hujan Petir";
  return "Berawan";
};

// Arrow Function 2: Badge warna berdasarkan prioritas
const getPriorityBadgeClass = (priority) => {
  const styles = {
    Tinggi: "bg-rose-100 text-rose-700 border-rose-200",
    Sedang: "bg-amber-100 text-amber-700 border-amber-200",
    Rendah: "bg-emerald-100 text-emerald-700 border-emerald-200"
  };
  return styles[priority] || "bg-slate-100 text-slate-700";
};

// Arrow Function 3: Update jam digital & tanggal real-time
const updateClock = () => {
  const now = new Date();
  const clockEl = document.getElementById("liveClock");
  const dateEl = document.getElementById("liveDate");

  if (clockEl) {
    clockEl.textContent = now.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  }
  if (dateEl) {
    dateEl.textContent = now.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  }
};

// Render kartu statistik
const renderStatistics = () => {
  const { total, completed, pending, highPriority } = app.getStatistics();
  statsContainer.innerHTML = `
    <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
      <p class="text-xs text-slate-500 font-medium">Total Agenda</p>
      <p class="text-2xl font-bold text-slate-800 mt-1">${total}</p>
    </div>
    <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
      <p class="text-xs text-slate-500 font-medium">Belum Selesai</p>
      <p class="text-2xl font-bold text-amber-600 mt-1">${pending}</p>
    </div>
    <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
      <p class="text-xs text-slate-500 font-medium">Selesai</p>
      <p class="text-2xl font-bold text-emerald-600 mt-1">${completed}</p>
    </div>
    <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
      <p class="text-xs text-slate-500 font-medium">Prioritas Tinggi</p>
      <p class="text-2xl font-bold text-rose-600 mt-1">${highPriority}</p>
    </div>
  `;
};

// Render daftar tugas dengan template literals
const renderTaskList = () => {
  const filteredTasks = app.getFilteredTasks();

  if (filteredTasks.length === 0) {
    taskListContainer.innerHTML = `
      <div class="text-center py-10 px-4 border-2 border-dashed border-slate-200 rounded-xl">
        <p class="text-sm font-medium text-slate-500">Belum ada agenda atau tugas yang sesuai filter.</p>
        <p class="text-xs text-slate-400 mt-1">Tambahkan jadwal kuliah atau tugas baru melalui formulir di samping.</p>
      </div>
    `;
    renderStatistics();
    return;
  }

  taskListContainer.innerHTML = filteredTasks
    .map(
      ({ id, title, course, category, deadline, priority, note, completed }) => `
      <article class="task-card p-4 rounded-xl border ${
        completed ? "bg-slate-50 border-slate-200 opacity-75" : "bg-white border-slate-200 shadow-sm"
      } flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="flex items-start gap-3">
          <input
            type="checkbox"
            data-action="toggle"
            data-id="${id}"
            ${completed ? "checked" : ""}
            class="mt-1 w-4 h-4 text-blue-600 rounded border-slate-300 cursor-pointer"
          />
          <div>
            <div class="flex flex-wrap items-center gap-2">
              <h3 class="font-bold text-sm ${
                completed ? "line-through text-slate-400" : "text-slate-800"
              }">${title}</h3>
              <span class="text-[11px] font-semibold px-2 py-0.5 rounded-full border ${getPriorityBadgeClass(
                priority
              )}">
                ${priority}
              </span>
              <span class="text-[11px] font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                ${category}
              </span>
            </div>
            <p class="text-xs text-slate-600 mt-1">
              <span class="font-semibold">${course}</span> • Tenggat: <span class="font-mono">${deadline}</span>
            </p>
            ${
              note
                ? `<p class="text-xs text-slate-500 mt-1 italic">"${note}"</p>`
                : ""
            }
          </div>
        </div>

        <div class="flex items-center gap-2 self-end sm:self-center shrink-0">
          <button
            data-action="edit"
            data-id="${id}"
            class="text-xs bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 px-3 py-1.5 rounded-lg font-medium transition"
          >
            Edit
          </button>
          <button
            data-action="delete"
            data-id="${id}"
            class="text-xs bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 px-3 py-1.5 rounded-lg font-medium transition"
          >
            Hapus
          </button>
        </div>
      </article>
    `
    )
    .join("");

  renderStatistics();
};

// Render widget cuaca async/await
const loadWeatherWidget = async () => {
  weatherWidget.innerHTML = `<p class="text-xs text-slate-400 animate-pulse">Memuat cuaca terkini...</p>`;
  try {
    const { temperature, windspeed, weathercode } = await app.fetchIteraWeather();
    weatherWidget.innerHTML = `
      <div class="flex items-baseline gap-3">
        <span class="text-3xl font-extrabold text-blue-700">${temperature}°C</span>
        <span class="text-sm font-semibold text-slate-700">${describeWeatherCode(weathercode)}</span>
      </div>
      <p class="text-xs text-slate-500 mt-1">Kecepatan angin: ${windspeed} km/jam</p>
    `;
  } catch (error) {
    weatherWidget.innerHTML = `<p class="text-xs text-rose-600">${error.message}</p>`;
  }
};

// Render widget kutipan async/await
const loadQuoteWidget = async () => {
  quoteWidget.innerHTML = `<p class="text-xs text-slate-400 animate-pulse">Mengambil kutipan motivasi...</p>`;
  try {
    const { quote, author } = await app.fetchDailyQuote();
    quoteWidget.innerHTML = `
      <blockquote class="text-sm italic text-slate-700 leading-relaxed">“${quote}”</blockquote>
      <p class="text-xs font-semibold text-indigo-600 mt-2">— ${author}</p>
    `;
  } catch (error) {
    quoteWidget.innerHTML = `<p class="text-xs text-rose-600">${error.message}</p>`;
  }
};

// Reset form kembali ke mode tambah
const resetFormMode = () => {
  taskForm.reset();
  editTaskIdInput.value = "";
  formTitle.textContent = "Tambah Agenda / Tugas Baru";
  submitBtn.textContent = "Simpan Agenda";
  cancelEditBtn.classList.add("hidden");
  taskDeadlineInput.value = new Date().toISOString().split("T")[0];
};

// Event Submit Form (Tambah atau Update)
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const payload = {
    title: taskTitleInput.value.trim(),
    course: taskCourseInput.value.trim(),
    category: taskCategoryInput.value,
    deadline: taskDeadlineInput.value,
    priority: taskPriorityInput.value,
    note: taskNoteInput.value.trim()
  };

  const editingId = editTaskIdInput.value;
  if (editingId) {
    app.updateTask(editingId, payload);
  } else {
    app.addTask(payload);
  }

  resetFormMode();
  renderTaskList();
});

cancelEditBtn.addEventListener("click", resetFormMode);

// Event Delegasi pada daftar tugas (Toggle, Edit, Hapus)
taskListContainer.addEventListener("click", (e) => {
  const target = e.target.closest("[data-action]");
  if (!target) return;

  const { action, id } = target.dataset;

  if (action === "toggle") {
    app.toggleTaskCompletion(id);
    renderTaskList();
  } else if (action === "edit") {
    const task = app.tasks.find(t => t.id === id);
    if (!task) return;

    editTaskIdInput.value = task.id;
    taskTitleInput.value = task.title;
    taskCourseInput.value = task.course;
    taskCategoryInput.value = task.category;
    taskDeadlineInput.value = task.deadline;
    taskPriorityInput.value = task.priority;
    taskNoteInput.value = task.note;

    formTitle.textContent = "Edit Agenda / Tugas";
    submitBtn.textContent = "Simpan Perubahan";
    cancelEditBtn.classList.remove("hidden");
    taskTitleInput.focus();
  } else if (action === "delete") {
    app.deleteTask(id);
    if (editTaskIdInput.value === id) {
      resetFormMode();
    }
    renderTaskList();
  }
});

// Event Filter & Reset Default
filterStatusSelect.addEventListener("change", (e) => {
  app.filterStatus = e.target.value;
  renderTaskList();
});

filterCategorySelect.addEventListener("change", (e) => {
  app.filterCategory = e.target.value;
  renderTaskList();
});

resetSampleBtn.addEventListener("click", () => {
  app.resetToDefault();
  resetFormMode();
  renderTaskList();
});

document.getElementById("refreshWeatherBtn")?.addEventListener("click", loadWeatherWidget);
document.getElementById("refreshQuoteBtn")?.addEventListener("click", loadQuoteWidget);

// Inisialisasi awal saat halaman dimuat
taskDeadlineInput.value = new Date().toISOString().split("T")[0];
updateClock();
setInterval(updateClock, 1000);
renderTaskList();
loadWeatherWidget();
loadQuoteWidget();