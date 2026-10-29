import { renderHook } from '@testing-library/react';
import useBookStats from '../hooks/useBookStats';

const books = [
  { id: '1', title: 'A', author: 'X', status: 'milik' },
  { id: '2', title: 'B', author: 'Y', status: 'milik' },
  { id: '3', title: 'C', author: 'Z', status: 'baca' },
  { id: '4', title: 'D', author: 'W', status: 'beli' },
];

describe('useBookStats', () => {
  it('menghitung total, jumlah, dan persentase per status', () => {
    const { result } = renderHook(() => useBookStats(books));
    expect(result.current.total).toBe(4);
    expect(result.current.counts).toEqual({ milik: 2, baca: 1, beli: 1 });
    expect(result.current.percents.milik).toBe(50);
  });

  it('aman untuk daftar kosong (tanpa pembagian nol)', () => {
    const { result } = renderHook(() => useBookStats([]));
    expect(result.current.total).toBe(0);
    expect(result.current.percents.milik).toBe(0);
  });
});
