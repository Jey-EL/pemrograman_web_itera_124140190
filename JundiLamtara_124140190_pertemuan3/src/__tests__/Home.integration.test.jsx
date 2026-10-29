import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { BookProvider } from '../context/BookContext';
import Home from '../pages/Home/Home';

const renderHome = () =>
  render(
    <MemoryRouter>
      <BookProvider>
        <Home />
      </BookProvider>
    </MemoryRouter>
  );

const addBook = (title, author, status) => {
  fireEvent.change(screen.getByLabelText('Judul'), { target: { value: title } });
  fireEvent.change(screen.getByLabelText('Penulis'), { target: { value: author } });
  fireEvent.change(screen.getByLabelText('Status'), { target: { value: status } });
  fireEvent.click(screen.getByRole('button', { name: 'Simpan buku' }));
};

describe('Home (integrasi Context + localStorage)', () => {
  it('menambah buku dan menyimpannya ke localStorage', () => {
    renderHome();
    addBook('Laskar Pelangi', 'Andrea Hirata', 'milik');
    expect(screen.getByText('Laskar Pelangi')).toBeInTheDocument();
    expect(window.localStorage.getItem('personal-books')).toContain('Laskar Pelangi');
  });

  it('memfilter berdasarkan status dan mencari berdasarkan penulis', () => {
    renderHome();
    addBook('Bumi', 'Tere Liye', 'baca');
    addBook('Bulan', 'Tere Liye', 'beli');
    addBook('Laskar Pelangi', 'Andrea Hirata', 'milik');

    fireEvent.click(screen.getByRole('button', { name: 'Ingin dibeli' }));
    expect(screen.getByText('Bulan')).toBeInTheDocument();
    expect(screen.queryByText('Bumi')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Semua' }));
    fireEvent.change(screen.getByLabelText('Cari judul atau penulis'), { target: { value: 'andrea' } });
    expect(screen.getByText('Laskar Pelangi')).toBeInTheDocument();
    expect(screen.queryByText('Bumi')).not.toBeInTheDocument();
  });

  it('mengedit dan menghapus buku', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    renderHome();
    addBook('Bumi', 'Tere Liye', 'baca');

    fireEvent.click(screen.getByRole('button', { name: 'Edit Bumi' }));
    fireEvent.change(screen.getByLabelText('Judul'), { target: { value: 'Bumi (Revisi)' } });
    fireEvent.click(screen.getByRole('button', { name: 'Simpan perubahan' }));
    expect(screen.getByText('Bumi (Revisi)')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Hapus Bumi (Revisi)' }));
    expect(screen.queryByText('Bumi (Revisi)')).not.toBeInTheDocument();
  });
});
