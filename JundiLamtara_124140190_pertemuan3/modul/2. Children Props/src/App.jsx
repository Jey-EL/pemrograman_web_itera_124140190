import React from 'react';
import Header from './components/Header/Header';
import TaskForm from './components/TaskForm/TaskForm';
import TaskItem from './components/TaskItem/TaskItem';
import Card from './components/Card/Card';
import './App.css';

function App() {
  const dummyTask = {
    id: 1,
    title: 'Mempelajari Komponen dan Props React',
    completed: false,
  };

  const handleAddTask = (newTask) => {
    console.log('Tugas baru ditambahkan:', newTask);
  };

  const handleDeleteTask = (id) => {
    console.log('Hapus tugas dengan ID:', id);
  };

  const handleToggleComplete = (id) => {
    console.log('Toggle status ID:', id);
  };

  return (
    <div className="App">
      <Header
        title="React Task Manager"
        description="Kelola daftar tugas Anda secara efisien"
      />
      <main style={{ maxWidth: '720px', margin: '2rem auto', padding: '0 1rem' }}>
        <Card>
          <TaskForm onAddTask={handleAddTask} />
        </Card>
        <TaskItem
          task={dummyTask}
          onDelete={handleDeleteTask}
          onToggleComplete={handleToggleComplete}
        />
      </main>
    </div>
  );
}

export default App;