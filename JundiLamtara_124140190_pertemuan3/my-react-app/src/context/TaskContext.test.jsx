import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TaskProvider, useTasks } from './TaskContext';

// Komponen pembantu kecil untuk memicu fungsi dari TaskContext
function TestConsumer() {
  const { tasks, addTask, clearAllTasks } = useTasks();

  return (
    <div>
      <p data-testid="task-count">Jumlah: {tasks.length}</p>
      <button
        onClick={() =>
          addTask({ id: 1, title: 'Belajar Testing', completed: false })
        }
      >
        Tambah Dummy
      </button>
      <button onClick={clearAllTasks}>Hapus Semua</button>
    </div>
  );
}

describe('TaskContext & clearAllTasks', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('menambah tugas lalu menghapus semua tugas menggunakan clearAllTasks', () => {
    render(
      <TaskProvider>
        <TestConsumer />
      </TaskProvider>
    );

    // 1. Pastikan awalnya jumlah tugas 0
    expect(screen.getByTestId('task-count')).toHaveTextContent('Jumlah: 0');

    // 2. Klik tombol tambah tugas
    fireEvent.click(screen.getByText('Tambah Dummy'));
    expect(screen.getByTestId('task-count')).toHaveTextContent('Jumlah: 1');

    // 3. Klik tombol hapus semua (memanggil clearAllTasks)
    fireEvent.click(screen.getByText('Hapus Semua'));
    expect(screen.getByTestId('task-count')).toHaveTextContent('Jumlah: 0');
  });
});