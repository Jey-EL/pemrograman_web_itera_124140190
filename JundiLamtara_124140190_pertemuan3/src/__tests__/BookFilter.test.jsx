import { render, screen, fireEvent } from '@testing-library/react';
import BookFilter from '../components/BookFilter/BookFilter';

describe('BookFilter', () => {
  it('memanggil onStatusChange saat tombol status diklik', () => {
    const onStatusChange = vi.fn();
    render(<BookFilter status="semua" search="" onStatusChange={onStatusChange} onSearchChange={() => {}} />);
    fireEvent.click(screen.getByRole('button', { name: 'Sedang dibaca' }));
    expect(onStatusChange).toHaveBeenCalledWith('baca');
  });

  it('memanggil onSearchChange saat mengetik', () => {
    const onSearchChange = vi.fn();
    render(<BookFilter status="semua" search="" onStatusChange={() => {}} onSearchChange={onSearchChange} />);
    fireEvent.change(screen.getByLabelText('Cari judul atau penulis'), { target: { value: 'bumi' } });
    expect(onSearchChange).toHaveBeenCalledWith('bumi');
  });
});
