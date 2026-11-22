import { useMemo } from 'react';

function useBookStats(books) {
  // Menghitung total dan jumlah buku berdasarkan masing-masing status
  const stats = useMemo(() => {
    const total = books.length;
    const owned = books.filter((book) => book.status === 'milik').length;
    const reading = books.filter((book) => book.status === 'baca').length;
    const wishlist = books.filter((book) => book.status === 'beli').length;

    return {
      total,
      owned,
      reading,
      wishlist,
    };
  }, [books]);

  return stats;
}

export default useBookStats;