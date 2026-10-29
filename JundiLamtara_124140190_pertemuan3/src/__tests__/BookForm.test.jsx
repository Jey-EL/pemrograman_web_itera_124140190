import { render, screen, fireEvent } from '@testing-library/react';
import BookForm from '../components/BookForm/BookForm';

describe('BookForm', () => {
  it('menampilkan error dan tidak submit saat kolom kosong', () => {
    const onSubmit = vi.fn();
    render(<BookForm onSubmit={onSubmit} />);
    fireEvent.click(screen.getByRole('button', { name: 'Simpan buku' }));
    expect(screen.getByText('Judul buku wajib diisi.')).toBeInTheDocument();
    expect(screen.getByText('Nama penulis wajib diisi.')).toBeInTheDocument();
    expect(screen.getByLabelText('Judul')).toHaveAttribute('aria-invalid', 'true');
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('menganggap input berisi spasi saja sebagai kosong', () => {
    const onSubmit = vi.fn();
    render(<BookForm onSubmit={onSubmit} />);
    fireEvent.change(screen.getByLabelText('Judul'), { target: { value: '   ' } });
    fireEvent.change(screen.getByLabelText('Penulis'), { target: { value: 'Tere Liye' } });
    fireEvent.click(screen.getByRole('button', { name: 'Simpan buku' }));
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('memanggil onSubmit dengan data yang sudah di-trim', () => {
    const onSubmit = vi.fn();
    render(<BookForm onSubmit={onSubmit} />);
    fireEvent.change(screen.getByLabelText('Judul'), { target: { value: '  Bumi  ' } });
    fireEvent.change(screen.getByLabelText('Penulis'), { target: { value: 'Tere Liye' } });
    fireEvent.change(screen.getByLabelText('Status'), { target: { value: 'baca' } });
    fireEvent.click(screen.getByRole('button', { name: 'Simpan buku' }));
    expect(onSubmit).toHaveBeenCalledWith({ title: 'Bumi', author: 'Tere Liye', status: 'baca' });
  });

  it('terisi otomatis pada mode edit', () => {
    const book = { id: '1', title: 'Laskar Pelangi', author: 'Andrea Hirata', status: 'milik' };
    render(<BookForm initialData={book} onSubmit={() => {}} />);
    expect(screen.getByLabelText('Judul')).toHaveValue('Laskar Pelangi');
    expect(screen.getByRole('button', { name: 'Simpan perubahan' })).toBeInTheDocument();
  });
});
