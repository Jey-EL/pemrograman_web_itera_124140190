import { render, screen, fireEvent } from '@testing-library/react';
import BookList from '../components/BookList/BookList';

const books = [{ id: '1', title: 'Bumi', author: 'Tere Liye', status: 'milik' }];

describe('BookList', () => {
  it('menampilkan pesan kosong bila tidak ada buku', () => {
    render(<BookList books={[]} onEdit={() => {}} onDelete={() => {}} />);
    expect(screen.getByText(/Belum ada buku/)).toBeInTheDocument();
  });

  it('menampilkan buku dan memanggil onDelete / onEdit', () => {
    const onDelete = vi.fn();
    const onEdit = vi.fn();
    render(<BookList books={books} onEdit={onEdit} onDelete={onDelete} />);
    expect(screen.getByText('Bumi')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Hapus Bumi' }));
    fireEvent.click(screen.getByRole('button', { name: 'Edit Bumi' }));
    expect(onDelete).toHaveBeenCalledWith(books[0]);
    expect(onEdit).toHaveBeenCalledWith(books[0]);
  });
});
