import React, { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const TaskContext = createContext();

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks harus digunakan di dalam TaskProvider');
  }
  return context;
}

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useLocalStorage('tasks_data', []);

  const addTask = (newTask) => setTasks([...tasks, newTask]);
  const deleteTask = (taskId) => setTasks(tasks.filter(t => t.id !== taskId));
  const toggleComplete = (taskId) =>
    setTasks(tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t));

  // === LATIHAN MANDIRI: Fungsi Hapus Semua Tugas ===
  const clearAllTasks = () => setTasks([]);
  // === END LATIHAN MANDIRI ===

  const completedCount = tasks.filter(t => t.completed).length;

  const value = {
    tasks,
    addTask,
    deleteTask,
    toggleComplete,
    // === LATIHAN MANDIRI: Ekspos clearAllTasks ke Context ===
    clearAllTasks,
    // === END LATIHAN MANDIRI ===
    stats: {
      total: tasks.length,
      completed: completedCount,
      remaining: tasks.length - completedCount,
      completionRate: tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0
    }
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
}