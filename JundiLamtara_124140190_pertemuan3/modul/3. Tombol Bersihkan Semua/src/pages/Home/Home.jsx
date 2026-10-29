import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import TaskForm from '../../components/TaskForm/TaskForm';
import TaskItem from '../../components/TaskItem/TaskItem';
import './Home.css';

function Home() {
  const [tasks, setTasks] = useState([]);

  // 1. Ambil data dari localStorage saat komponen pertama kali dimuat
  useEffect(() => {
    const saved = localStorage.getItem('tasks_data');
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }, []);

  // 2. Simpan setiap pembaruan tasks ke localStorage
  useEffect(() => {
    localStorage.setItem('tasks_data', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(t => t.id !== taskId));
  };

  const handleToggleComplete = (taskId) => {
    setTasks(tasks.map(t =>
      t.id === taskId ? { ...t, completed: !t.completed } : t
    ));
  };

  // LATIHAN: hapus semua tugas setelah konfirmasi
  const handleClearAll = () => {
    if (window.confirm('Yakin ingin menghapus semua tugas?')) {
      setTasks([]);
    }
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const remainingCount = tasks.length - completedCount;

  return (
    <div className="home">
      <Header
        title="React Task Manager"
        description="Kelola tugas harian Anda secara terstruktur"
      />

      <main className="container">
        <div className="stats-wrapper">
          <div className="stats">
            <p>Total: <strong>{tasks.length}</strong> tugas</p>
            <p>Selesai: <strong style={{ color: '#10b981' }}>{completedCount}</strong></p>
            <p>Belum Selesai: <strong style={{ color: '#ef4444' }}>{remainingCount}</strong></p>
          </div>
          <button
            className="clear-btn"
            onClick={handleClearAll}
            disabled={tasks.length === 0}
          >
            Hapus Semua Tugas
          </button>
        </div>

        <TaskForm onAddTask={handleAddTask} />

        <div className="task-list">
          {tasks.length === 0 ? (
            <p className="empty-message">Belum ada tugas. Tambahkan tugas baru di atas!</p>
          ) : (
            tasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onDelete={handleDeleteTask}
                onToggleComplete={handleToggleComplete}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default Home;