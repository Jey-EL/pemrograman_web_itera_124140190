import React, { useState } from 'react';
import './TaskForm.css';

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = {
      id: Date.now(),
      title: title,
      completed: false,
    };

    onAddTask(newTask);
    setTitle('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Ketik tugas baru lalu tekan Enter..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Tambah</button>
    </form>
  );
}

export default TaskForm;