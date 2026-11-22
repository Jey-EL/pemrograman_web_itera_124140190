import React from 'react';
import Header from '../../components/Header/Header';
import TaskForm from '../../components/TaskForm/TaskForm';
import TaskItem from '../../components/TaskItem/TaskItem';
import { useTasks } from '../../context/TaskContext';
// === LATIHAN MANDIRI (Submodul 5): Import useWindowSize ===
import useWindowSize from '../../hooks/useWindowSize';
// === END LATIHAN MANDIRI ===
import './Home.css';

function Home() {
  // Panggil context langsung tanpa menerima props dari App!
  const {
    tasks,
    addTask,
    deleteTask,
    toggleComplete,
    // === LATIHAN MANDIRI (Submodul 3): Ambil clearAllTasks dari Context ===
    clearAllTasks,
    // === END LATIHAN MANDIRI ===
    stats,
  } = useTasks();

  // === LATIHAN MANDIRI (Submodul 5): Ambil lebar layar dari useWindowSize ===
  const { width } = useWindowSize();
  // === END LATIHAN MANDIRI ===

  // === LATIHAN MANDIRI (Submodul 3): Konfirmasi Hapus Semua Tugas ===
  const handleClearAll = () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus semua tugas?')) {
      clearAllTasks();
    }
  };
  // === END LATIHAN MANDIRI ===

  return (
    <div className="home">
      <Header title="React Task Manager" description="State Global dengan Context API" />
      <main className="container">
        {/* === LATIHAN MANDIRI (Submodul 5): Badge Mode Layar === */}
        <div className="screen-mode-wrapper">
          <span className={`screen-badge ${width < 768 ? 'mobile' : 'desktop'}`}>
            {width < 768 ? 'Mode Layar Mobile' : 'Mode Layar Desktop'}
          </span>
        </div>
        {/* === END LATIHAN MANDIRI === */}

        <div className="stats">
          <p>Total: <strong>{stats.total}</strong></p>
          <p>Selesai: <strong style={{ color: '#10b981' }}>{stats.completed}</strong></p>
          <p>Progress: <strong>{stats.completionRate.toFixed(0)}%</strong></p>

          {/* === LATIHAN MANDIRI (Submodul 3): Tombol Bersihkan Semua === */}
          <button
            className="clear-all-btn"
            onClick={handleClearAll}
            disabled={tasks.length === 0}
          >
            Hapus Semua Tugas
          </button>
          {/* === END LATIHAN MANDIRI === */}
        </div>

        <TaskForm onAddTask={addTask} />

        <div className="task-list">
          {tasks.length === 0 ? (
            <p className="empty-message">Belum ada tugas. Tambahkan tugas baru di atas!</p>
          ) : (
            tasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onDelete={deleteTask}
                onToggleComplete={toggleComplete}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default Home;