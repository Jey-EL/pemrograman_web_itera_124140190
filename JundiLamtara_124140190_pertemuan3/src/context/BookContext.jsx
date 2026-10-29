import { createContext, useContext, useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import useLocalStorage from '../hooks/useLocalStorage';
import { STORAGE_KEY } from '../constants';

const BookContext = createContext(null);

const createId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

/**
 * Provider global: menyimpan data buku (persisten di localStorage),
 * state filter/pencarian, dan buku yang sedang diedit.
 */
export function BookProvider({ children }) {
  const [books, setBooks] = useLocalStorage(STORAGE_KEY, []);
  const [statusFilter, setStatusFilter] = useState('semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingBook, setEditingBook] = useState(null);

  const addBook = useCallback(
    (data) => setBooks((prev) => [{ id: createId(), ...data }, ...prev]),
    [setBooks]
  );

  const updateBook = useCallback(
    (id, data) =>
      setBooks((prev) => prev.map((b) => (b.id === id ? { ...b, ...data } : b))),
    [setBooks]
  );

  const deleteBook = useCallback(
    (id) => {
      setBooks((prev) => prev.filter((b) => b.id !== id));
      setEditingBook((current) => (current?.id === id ? null : current));
    },
    [setBooks]
  );

  // Filter status + pencarian judul/penulis (tidak peka huruf besar-kecil)
  const filteredBooks = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return books.filter((b) => {
      const matchStatus = statusFilter === 'semua' || b.status === statusFilter;
      const matchSearch =
        q === '' ||
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q);
      return matchStatus && matchSearch;
    });
  }, [books, statusFilter, searchQuery]);

  const value = useMemo(
    () => ({
      books,
      filteredBooks,
      statusFilter,
      searchQuery,
      editingBook,
      setStatusFilter,
      setSearchQuery,
      setEditingBook,
      addBook,
      updateBook,
      deleteBook,
    }),
    [books, filteredBooks, statusFilter, searchQuery, editingBook, addBook, updateBook, deleteBook]
  );

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}

BookProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line react-refresh/only-export-components
export function useBooks() {
  const ctx = useContext(BookContext);
  if (!ctx) throw new Error('useBooks harus dipakai di dalam <BookProvider>');
  return ctx;
}
