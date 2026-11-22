import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import useLocalStorage from '../hooks/useLocalStorage';
import useBookStats from '../hooks/useBookStats';

const BookContext = createContext();

export function useBooks() {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks harus digunakan di dalam BookProvider');
  }
  return context;
}

export function BookProvider({ children }) {
  const [books, setBooks] = useLocalStorage('personal_books_data', []);
  const [filterStatus, setFilterStatus] = useState('semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingBook, setEditingBook] = useState(null);

  // Tambah buku baru
  const addBook = (newBook) => {
    const bookWithId = {
      ...newBook,
      id: Date.now(),
    };
    setBooks([bookWithId, ...books]);
  };

  // Simpan perubahan edit buku
  const updateBook = (updatedBook) => {
    setBooks(
      books.map((book) => (book.id === updatedBook.id ? updatedBook : book))
    );
    setEditingBook(null);
  };

  // Hapus buku berdasarkan ID
  const deleteBook = (bookId) => {
    setBooks(books.filter((book) => book.id !== bookId));
    if (editingBook && editingBook.id === bookId) {
      setEditingBook(null);
    }
  };

  // Filter status dan pencarian judul/penulis
  const filteredBooks = books.filter((book) => {
    const matchesStatus =
      filterStatus === 'semua' || book.status === filterStatus;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query);

    return matchesStatus && matchesSearch;
  });

  // Hitung statistik menggunakan custom hook useBookStats
  const stats = useBookStats(books);

  const value = {
    books,
    filteredBooks,
    filterStatus,
    setFilterStatus,
    searchQuery,
    setSearchQuery,
    editingBook,
    setEditingBook,
    addBook,
    updateBook,
    deleteBook,
    stats,
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}

BookProvider.propTypes = {
  children: PropTypes.node.isRequired,
};