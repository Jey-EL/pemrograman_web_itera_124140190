'use strict';

/* ===== Konfigurasi ===== */
const STORAGE_KEY = 'itera-deadline-board-v1';
const API = {
  weather: 'https://api.open-meteo.com/v1/forecast?latitude=-5.36&longitude=105.31&current_weather=true',
  quote: 'https://dummyjson.com/quotes/random',
  todos: 'https://jsonplaceholder.typicode.com/todos?_limit=5'
};
const COURSES = ['Pemrograman Web', 'Basis Data', 'Kecerdasan Buatan', 'Jaringan Komputer', 'Lainnya'];
const DAY_MS = 86400000;
const toISODate = (date) => date.toISOString().slice(0, 10);
const escapeHTML = (str) => str.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

/* ===== Class model data ===== */
class TaskItem {
  constructor({ id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6), title, course = 'Lainnya', deadline, done = false }) {
    this.id = id;
    this.title = title;
    this.course = course;
    this.deadline = deadline;
    this.done = done;
  }

  // Sisa hari sampai tenggat (negatif = terlewat)
  get daysLeft() {
    const today = new Date(toISODate(new Date()));
    return Math.round((new Date(this.deadline) - today) / DAY_MS);
  }

  get status() {
    if (this.done) return 'done';
    if (this.daysLeft < 0) return 'late';
    return this.daysLeft <= 2 ? 'soon' : 'ok';
  }

  get label() {
    const d = this.daysLeft;
    if (d < 0) return `Terlambat ${-d} hari`;
    if (d === 0) return 'Hari ini';
    return d === 1 ? 'Besok' : `${d} hari lagi`;
  }
}

/* ===== Class pengelola aplikasi ===== */
class DashboardApp {
  constructor() {
    this.tasks = [];
    this.filter = 'all';
    this.editingId = null;
    this.els = {
      list: document.querySelector('#task-list'),
      form: document.querySelector('#task-form'),
      title: document.querySelector('#title'),
      course: document.querySelector('#course'),
      deadline: document.querySelector('#deadline'),
      submit: document.querySelector('#submit-btn'),
      cancel: document.querySelector('#cancel-btn'),
      stats: document.querySelector('#stats'),
      filters: document.querySelector('.filters')
    };
  }

  /* --- localStorage --- */
  load() {
    try {
      const raw = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return Array.isArray(raw) ? raw.map((item) => new TaskItem(item)) : null;
    } catch {
      return null;
    }
  }

  save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasks));
  }

  /* --- Async: fetch API publik --- */
  async fetchJSON(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  }

  async loadWeather() {
    const el = document.querySelector('#weather');
    try {
      const { current_weather: { temperature, windspeed } } = await this.fetchJSON(API.weather);
      el.textContent = `${temperature}°C · angin ${windspeed} km/j`;
    } catch {
      el.textContent = 'Cuaca tidak tersedia (offline?)';
    }
  }

  async loadQuote() {
    try {
      const { quote, author } = await this.fetchJSON(API.quote);
      document.querySelector('#quote').textContent = `“${quote}”`;
      document.querySelector('#author').textContent = `— ${author}`;
    } catch {
      document.querySelector('#quote').textContent = 'Kerjakan sedikit setiap hari.';
    }
  }

  // Isi awal daftar tugas dari JSONPlaceholder, hanya saat localStorage masih kosong
  async seedTasks() {
    try {
      const todos = await this.fetchJSON(API.todos);
      return todos.map(({ title, completed }, i) =>
        new TaskItem({ title, done: completed, deadline: toISODate(new Date(Date.now() + (i + 1) * DAY_MS)) }));
    } catch {
      return [new TaskItem({ title: 'Contoh: Tugas Praktikum Web', course: 'Pemrograman Web', deadline: toISODate(new Date(Date.now() + 3 * DAY_MS)) })];
    }
  }

  /* --- CRUD (immutable: spread & map/filter) --- */
  addTask({ title, course, deadline }) {
    this.tasks = [...this.tasks, new TaskItem({ title, course, deadline })];
  }

  updateTask(id, changes) {
    this.tasks = this.tasks.map((t) => (t.id === id ? new TaskItem({ ...t, ...changes }) : t));
  }

  removeTask(id) {
    this.tasks = this.tasks.filter((t) => t.id !== id);
  }

  /* --- Render --- */
  get visibleTasks() {
    const byFilter = { all: () => true, active: (t) => !t.done, done: (t) => t.done };
    return this.tasks.filter(byFilter[this.filter]).sort((a, b) => a.deadline.localeCompare(b.deadline));
  }

  render() {
    const { list, stats } = this.els;
    const shown = this.visibleTasks;
    const pending = this.tasks.filter((t) => !t.done).length;
    stats.textContent = `${pending} belum selesai dari ${this.tasks.length} tugas`;
    list.innerHTML = shown.length
      ? shown.map(({ id, title, course, deadline, done, status, label }) => `
        <li class="task ${status}" data-id="${id}">
          <input type="checkbox" class="toggle" ${done ? 'checked' : ''} aria-label="Tandai selesai: ${escapeHTML(title)}">
          <div><div class="t">${escapeHTML(title)}</div>
            <div class="meta">${escapeHTML(course)} · ${deadline} · <b>${done ? 'Selesai' : label}</b></div></div>
          <div class="row"><button class="act edit">Edit</button> <button class="act del">Hapus</button></div>
        </li>`).join('')
      : '<li class="empty">Belum ada tugas di sini. Tambahkan dari formulir di atas.</li>';
  }

  update() {
    this.save();
    this.render();
  }

  /* --- Form & events --- */
  resetForm() {
    const { form, submit, cancel } = this.els;
    this.editingId = null;
    form.reset();
    submit.textContent = 'Tambah tugas';
    cancel.hidden = true;
  }

  startEdit(id) {
    const task = this.tasks.find((t) => t.id === id);
    const { title, course, deadline, submit, cancel } = this.els;
    this.editingId = id;
    title.value = task.title;
    course.value = task.course;
    deadline.value = task.deadline;
    submit.textContent = 'Simpan perubahan';
    cancel.hidden = false;
    title.focus();
  }

  bindEvents() {
    const { form, list, cancel, filters, title, course, deadline } = this.els;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = { title: title.value.trim(), course: course.value, deadline: deadline.value };
      if (!data.title) return;
      this.editingId ? this.updateTask(this.editingId, data) : this.addTask(data);
      this.resetForm();
      this.update();
    });

    cancel.addEventListener('click', () => this.resetForm());

    list.addEventListener('click', ({ target }) => {
      const id = target.closest('.task')?.dataset.id;
      if (!id) return;
      if (target.classList.contains('del')) {
        this.removeTask(id);
        this.update();
      } else if (target.classList.contains('edit')) {
        this.startEdit(id);
      } else if (target.classList.contains('toggle')) {
        this.updateTask(id, { done: target.checked });
        this.update();
      }
    });

    filters.addEventListener('click', ({ target }) => {
      if (!target.dataset.filter) return;
      this.filter = target.dataset.filter;
      filters.querySelectorAll('button').forEach((b) => b.classList.toggle('on', b === target));
      this.render();
    });
  }

  startClock() {
    const tick = () => {
      const now = new Date();
      document.querySelector('#time').textContent = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
      document.querySelector('#date').textContent = now.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    };
    tick();
    setInterval(tick, 1000);
  }

  async init() {
    this.els.course.innerHTML = COURSES.map((c) => `<option>${c}</option>`).join('');
    this.bindEvents();
    this.startClock();
    this.tasks = this.load() ?? await this.seedTasks();
    this.update();
    this.loadWeather();
    this.loadQuote();
  }
}

new DashboardApp().init();
