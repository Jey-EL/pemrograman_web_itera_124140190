import { TaskItem } from "./TaskItem.js";

const STORAGE_KEY = "itera_personal_dashboard_tasks_v1";

export class DashboardApp {
  constructor() {
    this.tasks = this.loadFromStorage();
    this.filterStatus = "all";
    this.filterCategory = "all";
  }

  // Memuat data dari localStorage atau mengisi data awal mahasiswa
  loadFromStorage() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initialTasks = this.getDefaultTasks();
      this.saveToStorage(initialTasks);
      return initialTasks;
    }

    try {
      const parsed = JSON.parse(raw);
      return parsed.map(item => new TaskItem(item));
    } catch (error) {
      console.error("Gagal membaca localStorage:", error);
      return this.getDefaultTasks();
    }
  }

  saveToStorage(taskList = this.tasks) {
    const serialized = JSON.stringify(taskList.map(task => task.toJSON()));
    localStorage.setItem(STORAGE_KEY, serialized);
  }

  getDefaultTasks() {
    const today = new Date().toISOString().split("T")[0];
    return [
      new TaskItem({
        title: "Tugas Personal Dashboard ES6+",
        course: "Pemrograman Web RB",
        category: "Praktikum",
        deadline: today,
        priority: "Tinggi",
        note: "Push ke repository GitHub pemrograman_web_itera_124140190"
      }),
      new TaskItem({
        title: "Review Endpoint Backend SI PANDA",
        course: "Proyek Perangkat Lunak",
        category: "Organisasi / Proyek",
        deadline: today,
        priority: "Sedang",
        note: "Sinkronisasi struktur data Firestore dengan tim Kelompok 1"
      }),
      new TaskItem({
        title: "Kuliah Tatap Muka Gedung E",
        course: "Rekayasa Perangkat Lunak",
        category: "Jadwal Kuliah",
        deadline: today,
        priority: "Rendah",
        note: "Pukul 09.30 WIB di Ruang E204"
      })
    ];
  }

  // Tambah item baru menggunakan spread operator agar tetap immutable
  addTask(taskData) {
    const newTask = new TaskItem(taskData);
    this.tasks = [newTask, ...this.tasks];
    this.saveToStorage();
    return newTask;
  }

  // Edit item berdasarkan id
  updateTask(id, updatedFields) {
    this.tasks = this.tasks.map(task => {
      if (task.id === id) {
        task.updateDetails(updatedFields);
      }
      return task;
    });
    this.saveToStorage();
  }

  // Toggle status selesai/belum
  toggleTaskCompletion(id) {
    this.tasks = this.tasks.map(task => {
      if (task.id === id) {
        task.toggleStatus();
      }
      return task;
    });
    this.saveToStorage();
  }

  // Hapus item dengan filter (immutable)
  deleteTask(id) {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.saveToStorage();
  }

  resetToDefault() {
    this.tasks = this.getDefaultTasks();
    this.saveToStorage();
  }

  getFilteredTasks() {
    return this.tasks.filter(task => {
      const matchStatus =
        this.filterStatus === "all" ||
        (this.filterStatus === "completed" && task.completed) ||
        (this.filterStatus === "pending" && !task.completed);

      const matchCategory =
        this.filterCategory === "all" || task.category === this.filterCategory;

      return matchStatus && matchCategory;
    });
  }

  getStatistics() {
    const total = this.tasks.length;
    const completed = this.tasks.filter(t => t.completed).length;
    const pending = total - completed;
    const highPriority = this.tasks.filter(t => !t.completed && t.priority === "Tinggi").length;

    return { total, completed, pending, highPriority };
  }

  // Operasi Asinkron 1: Mengambil cuaca real-time kampus ITERA (Open-Meteo API)
  async fetchIteraWeather() {
    const endpoint =
      "https://api.open-meteo.com/v1/forecast?latitude=-5.36&longitude=105.31&current_weather=true";
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error("Gagal memuat cuaca kampus ITERA");
    }
    const data = await response.json();
    return data.current_weather;
  }

  // Operasi Asinkron 2: Mengambil kutipan harian acak (DummyJSON Quotes API)
  async fetchDailyQuote() {
    const endpoint = "https://dummyjson.com/quotes/random";
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error("Gagal memuat kutipan harian");
    }
    return response.json();
  }
}