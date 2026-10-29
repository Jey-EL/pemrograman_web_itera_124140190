import React from 'react';
import Header from '../../components/Header/Header';
import TaskForm from '../../components/TaskForm/TaskForm';
import TaskItem from '../../components/TaskItem/TaskItem';
import useLocalStorage from '../../hooks/useLocalStorage';
import useWindowSize from '../../hooks/useWindowSize';
import './Home.css';

function Home() {
  const [tasks, setTasks] = useLocalStorage('tasks_data', []);
  const { width } = useWindowSize();
  const isMobile = width < 768;

  const handleAddTask = (newTask) => setTasks([...tasks, newTask]);
  const handleDeleteTask = (taskId) => setTasks(tasks.filter(t => t.id !== taskId));
  const handleToggleComplete = (taskId) =>
    setTasks(tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t));

  return (
    <div className="home">
      <Header title="React Task Manager" description="Kelola tugas dengan Custom Hook" />
      <main className="container">
        <span className={`screen-badge ${isMobile ? 'mobile' : 'desktop'}`}>
          {isMobile ? 'Mode Layar Mobile' : 'Mode Layar Desktop'}
        </span>
        <TaskForm onAddTask={handleAddTask} />
        <div className="task-list">
          {tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={handleDeleteTask}
              onToggleComplete={handleToggleComplete}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default Home;