import { useMemo } from 'react';
import { STATUS_KEYS } from '../constants';

/**
 * Custom hook #2: menghitung statistik koleksi buku.
 * Hasil dihitung ulang hanya saat daftar buku berubah (useMemo).
 */
export default function useBookStats(books) {
  return useMemo(() => {
    const counts = Object.fromEntries(STATUS_KEYS.map((key) => [key, 0]));
    books.forEach((book) => {
      if (book.status in counts) counts[book.status] += 1;
    });
    const total = books.length;
    const percent = (n) => (total === 0 ? 0 : Math.round((n / total) * 100));
    const percents = Object.fromEntries(
      STATUS_KEYS.map((key) => [key, percent(counts[key])])
    );
    return { total, counts, percents };
  }, [books]);
}
