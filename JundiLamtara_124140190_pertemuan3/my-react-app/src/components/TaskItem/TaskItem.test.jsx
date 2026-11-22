import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskItem from './TaskItem';

// Deteksi otomatis mock function: vi untuk Vite (Vitest), jest untuk Create React App
const mockFn = typeof vi !== 'undefined' ? vi.fn : jest.fn;
const clearMocks = typeof vi !== 'undefined' ? vi.clearAllMocks : jest.clearAllMocks;

describe('Komponen TaskItem', () => {
  const dummyTask = {
    id: 1,
    title: 'Belajar React Testing',
    completed: false
  };

  const mockDelete = mockFn();
  const mockToggle = mockFn();

  beforeEach(() => {
    clearMocks();
  });

  test('merender judul tugas dengan benar', () => {
    render(<TaskItem task={dummyTask} onDelete={mockDelete} onToggleComplete={mockToggle} />);
    expect(screen.getByText('Belajar React Testing')).toBeInTheDocument();
  });

  test('memanggil fungsi onToggleComplete saat checkbox diklik', () => {
    render(<TaskItem task={dummyTask} onDelete={mockDelete} onToggleComplete={mockToggle} />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(mockToggle).toHaveBeenCalledWith(1);
  });

  test('memanggil fungsi onDelete saat tombol hapus diklik', () => {
    render(<TaskItem task={dummyTask} onDelete={mockDelete} onToggleComplete={mockToggle} />);
    const deleteBtn = screen.getByText('Hapus');
    fireEvent.click(deleteBtn);
    expect(mockDelete).toHaveBeenCalledWith(1);
  });
});