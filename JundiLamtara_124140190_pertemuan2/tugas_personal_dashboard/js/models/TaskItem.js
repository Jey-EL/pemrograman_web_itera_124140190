export class TaskItem {
  constructor({
    id = `task_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    title,
    course,
    category = "Tugas Kuliah",
    deadline,
    priority = "Sedang",
    note = "",
    completed = false,
    createdAt = new Date().toISOString()
  }) {
    this.id = id;
    this.title = title;
    this.course = course;
    this.category = category;
    this.deadline = deadline;
    this.priority = priority;
    this.note = note;
    this.completed = completed;
    this.createdAt = createdAt;
  }

  toggleStatus() {
    this.completed = !this.completed;
  }

  updateDetails({ title, course, category, deadline, priority, note }) {
    this.title = title ?? this.title;
    this.course = course ?? this.course;
    this.category = category ?? this.category;
    this.deadline = deadline ?? this.deadline;
    this.priority = priority ?? this.priority;
    this.note = note ?? this.note;
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      course: this.course,
      category: this.category,
      deadline: this.deadline,
      priority: this.priority,
      note: this.note,
      completed: this.completed,
      createdAt: this.createdAt
    };
  }
}